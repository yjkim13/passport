const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser')
const compression = require('compression')
var session = require('express-session')
var FileStore = require('session-file-store')(session);


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pwd'
    },
    function(username, password, done) {
      console.log('LocalStrategy',username,password);
      /*
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }); */
    }
  )); 

app.post('/auth/login_process',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/auth/login' }));

app.get('*',function(request,response,next){
  fs.readdir('./data',(error, filelist)=>{
    request.list = filelist;
    next();
  });
});

const topicRouter = require('./routes/topic')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use('/auth', authRouter)


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})