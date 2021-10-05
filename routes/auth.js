var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');
const session = require('express-session');


router.get('/login', (request, response) => {
  var title = `WEB - login`
  var list = template.list(request.list);
  var html = template.HTML(title,list,`
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