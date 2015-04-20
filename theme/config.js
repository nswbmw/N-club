// for co-ejs
module.exports = {
  root: __dirname,
  layout: false,
  viewExt: 'ejs',
  cache: true,
  debug: false,
  filters: require('./helpers/filters'),
  locals: require('./helpers/locals')
};