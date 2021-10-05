var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false, // session 데이터가 바뀌기전까지는 저장소를 바뀌지 않는다. 트루면, 바뀌었건 안바뀌었건 바뀌지 않는다.
  saveUninitialized: true, // 세션이 필요하기 전까지 세션을 구동시키지 않는다.
  store: new FileStore()
}))

app.get('/', function (req, res, next) {
    console.log(req.session)
    if(req.session.num === undefined){
      req.session.num = 1;
    } else{
      req.session.num ++
    }
  res.send(`View : ${req.session.num}`);
})

app.listen(5000, () => {
    console.log(`Example app listening on port 5000!`)
  });