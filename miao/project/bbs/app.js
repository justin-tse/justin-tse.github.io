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
  res.end(`
    <h1>BBS</h1>
    <div>
      <a href="/login">login</a>
      <a href="/register">register</a>
    </div>
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
  res.sendFile(__dirname + '/static/login.html');
})
.post((req, res, next) => {
  var loginInfo = req.body;
  var  user = users.find(it => it.name == loginInfo.name && it.password == loginInfo.password);
  if (user) {
    //  res.clearCookie('loginUser')// when logout, we should clear Cookie
    res.cookie('loginUserName', user.name, {
      signed: true
      // maxAge: 8640000,
      // expires: new Date(),
      // httpOnly: true
    });
    res.end('login success!');
  } else {
    res.end('username or password incorrect...');
  }
})

app.route('/post')
  .get((req, res, next) => {
  res.sendFile(__dirname + '/static/post.html');
  })
  .post((req, res, next) => {
    var postInfo = req.body;
    var userName = req.signedCookies.loginUserName;

    postInfo.timeStamp = new Date().toISOString();
    postInfo.id = posts.length;
    postInfo.postedBy = userName;
      
    posts.push(postInfo);
    res.end('post success, post id is ' + postInfo.id);
  })

app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id;
  var post = posts.find(it => it.id == postId);
  if (post) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.end(`
      <h1>${post.title}</h1>
      <fieldset>${post.content}</fieldset>
    `)
  } else {
    res.end('404 post not found');
  }
})

app.listen(port, () => {
  console.log('listening on port', port);
})
