var Topic = require('../models').Topic;
var cache = require('co-cache');

//新建一个话题
exports.addTopic = function* (data) {
  return yield Topic.create(data);
};

//通过id获取一个话题,并增加pv 1
exports.getTopicById = function* (id) {
  return yield Topic.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec();
};

//通过标签和页码获取10个话题
exports.getTopicsByTab = cache(function* getTopicsByTab(tab, p) {
  var query = {};
  if (tab) { query.tab = tab; }
  return yield Topic.find(query).skip((p - 1) * 10).sort('-updated_at').limit(10).select('-content').exec();
}, 10000);

//获取用户所有话题
exports.getTopicsByName = function* (name) {
  return yield Topic.find({'user.name': name}).sort('-updated_at').exec();
};

//通过id增加一个话题的评论数
exports.incCommentById = function* (id) {
  return yield Topic.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec();
};

//获取5条最新未评论的话题
exports.getNoReplyTopics = cache(function* getNoReplyTopics() {
  return yield Topic.find({comment: 0}).sort('-updated_at').limit(5).select('title').exec();
}, 10000);

//获取不同标签的话题数
exports.getTopicsCount = cache(function* (tab) {
  var query = {};
  if (tab) { query.tab = tab; }
  return yield Topic.count(query).exec();
}, 10000);