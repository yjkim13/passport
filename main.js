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

var authData = {
  email:'hobbit09@gmail.com',
  password:'111111',
  nickname:'kimew'
}

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.email);
    // done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    done(null, authData)
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pwd'
    },
    function(username, password, done) {
      console.log('LocalStrategy',username,password);
      if(username === authData.email){
        console.log(1);
        if(password === authData.password){
          console.log(2);
          return done(null, authData);
        } else{
          console.log(3);
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
      } else {
        console.log(4);
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
    }
  )); 

  app.post('/auth/login_process', passport.authenticate('local', {failureRedirect : '/auth/login'}) , (req, res) => {
    req.session.save( () => {
            res.redirect('/')
    })
})


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