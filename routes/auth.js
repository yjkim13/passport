var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var session = require('express-session');


router.get('/login', (request, response) => {
  var fmsg = request.flash();
  console.log(fmsg);
  var feedback = '';
  if(fmsg.message){
    feedback = fmsg.message;
  }
  var title = `WEB - login`
  var list = template.list(request.list);
  var html = template.HTML(title,list,`
    <div style="color:red;">${feedback}</div>
    <form action="/auth/login_process" method="post">
    <p><input type="text" name="email" placeholder="email"></p>
    <p>
    <input type="password" name="pwd" placeholder="password"></p>
    <p>
      <input type="submit" value="login">
    </p>
    </form>
    `, '');
  response.send(html);
});

 router.get('/logout', (request, response) => {
  request.logout();
  request.session.save(function(){
    response.redirect('/');
  });
});

  module.exports = router;