var Comment = require('./comment');
var Topic = require('./topic');
var User = require('./user');

module.exports = {
  get $User () {
    return User;
  },

  get $Comment () {
    return Comment;
  },

  get $Topic () {
    return Topic;
  }
};