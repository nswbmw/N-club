var Models = require('../lib/core');
var $User = Models.$User;

exports.get = function* () {
  yield this.render('signup');
};

exports.post = function* () {
  var data = this.request.body;

  var userExist = yield $User.getUserByName(data.name);
  if (userExist) {
    this.flash = {error: '用户名已存在!'};
    return this.redirect('back');
  }

  yield $User.addUser(data);

  this.session.user = {
    name: data.name,
    email: data.email
  };

  this.flash = {success: '注册成功!'};
  this.redirect('/');
};