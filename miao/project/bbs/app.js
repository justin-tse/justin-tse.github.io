// /主页/
// post/
// user/
// login
// register
// forget
// /post
const express = require('express');
const fs = require('fs');

const port = 8008;
const app = express();

const user = [];

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(express.urlencoded()); 

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.end(`
    <h1>BBS</h1>
    <div>
      <a href="/login">登陆</a>
      <a href="/register">注册</a>
    </div>
  `);
})

app.get('/register', (req, res, next) => {
  res.sendFile(__dirname + '/static/register.html')
})

app.post('/register', (req, res, next) => {
  console.log(req.body);
  res.end('register...');
})

app.listen(port, () => {
  console.log('listening on port', port);
})
