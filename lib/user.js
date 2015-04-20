var User = require('../models').User;

//新建一个用户
exports.addUser = function* (data) {
  return yield User.create(data);
};

//通过id获取用户
exports.getUserById = function* (id) {
  return yield User.findbyId(id).exec();
};

//通过name获取用户
exports.getUserByName = function* (name) {
  return yield User.findOne({name: name}).exec();
};