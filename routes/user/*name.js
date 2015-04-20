var Models = require('../../lib/core');
var $Topic = Models.$Topic;

exports.get = function* (name) {
  yield this.render('user', {
    topics: $Topic.getTopicsByName(name),
    name: name
  });
};