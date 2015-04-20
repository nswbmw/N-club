var Comment = require('../models').Comment;

//添加一条评论
exports.addComment = function* (data) {
  return yield Comment.create(data);
};

//根据话题id获取对应评论
exports.getCommentsByTopicId = function* (id) {
  return yield Comment.find({topic_id: id}).sort('updated_at').exec();
};