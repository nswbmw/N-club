exports.get = function* () {
  this.session = null;
  this.redirect('back');
};