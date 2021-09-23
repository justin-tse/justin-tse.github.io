const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const port = 8008;
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

const users = loadfile('./users.json');
const posts = loadfile('./posts.json');

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

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  console.log('sdfsdf',req.signedCookies.loginUser);
  res.end(`
    <h1>BBS</h1>
    <div>
      ${
        req.signedCookies.loginUser ?
          `
            <a href="/post">post</a>
            <a href="/logout">logout</a>  
          ` : `
            <a href="/login">login</a>
            <a href="/register">register</a>
          `
      }
    </div>
    <ul>
      ${
    posts.map(post => {
          return `<li><a href="/post/${post.id}">${post.title}</a> by <span>${post.postedBy}</span></li>`
        }).join('\n')
      }
    </ul>
  `);
})

app.route('/register')
.get((req, res, next) => {
  res.sendFile(__dirname + '/static/register.html');
})
  .post((req, res, next) => {
  var regInfo = req.body;
  if (users.some(it => it.name == regInfo.name || users.some(it => it.email == regInfo.email))) {
    res.status(400).end('username or email already exists...');
  } else {
    regInfo.id = users.length;
    users.push(req.body);
    res.end('register success...');
  }
})

app.route('/login')
  .get((req, res, next) => {
    console.log('从哪里进到login页面的: ', req.headers.referer);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end(` 
      <h1>login</h1>
      <form action="/login" method="POST">
        <div>Username: </div>
        <input type="text" name="name">
        <div>Password: </div>
        <input type="text" name="password">
        <input hidden name="return_to" value="${req.headers.referer || '/'}">
        <div><button>login</button></div>
      </form> 
    `
  );
})
.post((req, res, next) => {
  var loginInfo = req.body;
  var  user = users.find(it => it.name == loginInfo.name && it.password == loginInfo.password);
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
  res.sendFile(__dirname + '/static/post.html');
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
      res.end('401 not login')
    }
  })

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id;
  var post = posts.find(it => it.id == postId);
  if (post) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.end(`
    <h1>BBS</h1>
    <div>
      ${req.signedCookies.loginUser ?
        `
            <a href="/post">post</a>
            <a href="/logout">logout</a>  
          ` : `
            <a href="/login">login</a>
            <a href="/register">register</a>
          `
      }
    </div>
      <h2>${post.title}</h2>
      <fieldset>${post.content}</fieldset>
    `)
  } else {
    res.end('404 post not found');
  }
})

app.listen(port, () => {
  console.log('listening on port', port);
})
