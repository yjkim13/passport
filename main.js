var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser')
var compression = require('compression')
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

app.use(flash());

var passport = require('./lib/passport')(app);

app.post('/auth/login_process', (req, res, next) => {
  passport.authenticate('local',(err, user, info) => {
      if(req.session.flash) {
          req.session.flash = {}
      }
      req.flash('message', info.message)
      req.session.save(() => {
            if (err) { 
                return next(err)
            }
            if (!user) {
                return res.redirect('/auth/login')
            } 
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          return req.session.save(() => {
            res.redirect('/')
          })
        })
      })
  })(req, res, next)
})

app.get('*',function(request,response,next){
  fs.readdir('./data',(error, filelist)=>{
    request.list = filelist;
    next();
  });
});

var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);


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