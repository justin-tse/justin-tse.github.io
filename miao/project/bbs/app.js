const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
// const escape = require('lodash/escape');
const { traceDeprecation } = require('process');
const Database  = require('better-sqlite3');

const db = new Database(__dirname + '/bbs.sqlite3');

const port = 8888;
const app = express();


app.set('view engine', 'pug'); // 模版默认扩展名， render时可以不写
app.set('views', __dirname + '/templates');
app.locals.pretty = true; // 让pug输出格式化过的html（https://stackoverflow.com/questions/5276892/how-can-i-get-express-to-output-nicely-formatted-html）

// res.render('fooo.pug');

const users = loadfile('./users.json');
const posts = loadfile('./posts.json');
const comments = loadfile('./comments.json');

function loadfile(file) {
  try {
    var content = fs.readFileSync(file);
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

setInterval(() => {
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
  fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2));
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
  console.log('saved');
}, 5000)

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

app.use(cookieParser('cookie sign secert'))
app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  if (req.signedCookies.loginUser) {
    req.isLogin = true;
    // req.loginUser = users.find(it => it.name == req.signedCookies.loginUser)
  } else {
    req.isLogin = false;
    // req.loginUser = null;
  }
  next();
})

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  console.log('当前登陆用户', req.signedCookies.loginUser);
  var page = Number(req.query.page || 1);
  var pageSize = 10;
  var totalPage = Math.ceil(posts.length / pageSize);
  var startIdx = (page - 1) * pageSize;
  var endIdx = startIdx + pageSize;
  var pagePosts = posts.slice(startIdx, endIdx);

  if (!pagePosts.length) {
    res.render('404.pug');
    return;
  }

  res.render('home.pug', {
    isLogin: req.isLogin,
    posts: pagePosts,
    page: page,
    totalPage: totalPage
  });
})

app.route('/register')
.get((req, res, next) => {
  res.render('register.pug');
})
.post((req, res, next) => {
  var regInfo = req.body;
  var USERNAME_RE = /^\w+$/i;
  if (!USERNAME_RE.test(regInfo.name)) {
    res.status(400).end('Username invalid, please use only contain digit and letter or underscore');
  } else if (!regInfo.password) {
    res.status(400).end('password must not be empty')
  } else {
    try {
      var addUser = db.prepare('INSERT INTO users (name, password, email) VALUES (?, ?, ?)')
      var result = addUser.run(regInfo.name, regInfo.password, regInfo.email);
      console.log(result);
      res.render('register-success.pug');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
})

app.route('/login')
  .get((req, res, next) => {
    console.log('从哪里进到login页面的: ', req.headers.referer);
    res.render('login.pug');
    
  })
.post((req, res, next) => {
  var loginInfo = req.body;
  var userStmt = db.prepare('SELECT * FROM users WHERE name = ? AND password = ?');
  var user = userStmt.get(loginInfo.name, loginInfo.password);
  if (user) { 
    //  res.clearCookie('loginUser')// when logout, we should clear Cookie
    res.cookie('loginUser', user.name, {
      signed: true
      // maxAge: 8640000,
      // expires: new Date(),
      // httpOnly: true
    });
    res.redirect(loginInfo.return_to);
  } else {
    res.end('username or password incorrect...');
  }
})

app.get('/logout', (req, res, next) => {
  res.clearCookie('loginUser');
  res.redirect(req.headers.referer || '/');
})

app.route('/post')
  .get((req, res, next) => {
    res.render('issue-post.pug', {
      isLogin: req.isLogin
    });
  })
  .post((req, res, next) => {
    var postInfo = req.body;
    var userName = req.signedCookies.loginUser;
    
    if (userName) {
      postInfo.timeStamp = new Date().toISOString();
      postInfo.id = posts.length;
      postInfo.postedBy = userName;
        
      posts.push(postInfo);
      res.redirect('/post/' + postInfo.id);
    } else {
      res.render('not-login.pug');
    }
  })

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id;
  var post = posts.find(it => it.id == postId);
  if (post) {
    var postComments = comments.filter(it => it.postId == postId);
    res.render('post.pug', {
      isLogin: req.isLogin,
      post: post,
      comments: postComments,
    })
  } else {
    res.render('404.pug');
  }
})

// 向帖子发表评论，id为帖子编号
app.post('/comment/post/:id', (req, res, next) => {
  if (req.isLogin) {

    var comment = req.body;
    comment.timeStamp = new Date().toISOString();
    comment.postId = req.params.id;
    comment.commentBy = req.signedCookies.loginUser;
    comments.push(comment);
    res.redirect(req.headers.referer || '/');
  } else {
    res.render('not-login.pug');
  }
})

app.listen(port, () => {
  console.log('listening on port', port);
})
