var path = require('path');
var cache = require('koa-router-cache');
var MemoryCache = cache.MemoryCache;

module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/club'
  },
  schemeConf: path.join(__dirname, './default.scheme'),
  staticCacheConf: path.join(__dirname, '../theme/publices'),
  renderConf: path.join(__dirname, '../theme/config'),
  routerConf: 'routes',
  routerCacheConf: {
    'GET /': {
      key: 'cache:index',
      expire: 10 * 1000,
      get: MemoryCache.get,
      set: MemoryCache.set,
      destroy: MemoryCache.destroy,
      passthrough: function* passthrough(_cache) {
        // 游客
        if (!this.session || !this.session.user) {
          if (_cache == null) {
            return {
              shouldCache: true,
              shouldPass: true
            };
          }
          this.type = 'text/html; charset=utf-8';
          this.set('content-encoding', 'gzip');
          this.body = _cache;
          return {
            shouldCache: true,
            shouldPass: false
          };
        }
        // 已登录用户
        return {
          shouldCache: false,
          shouldPass: true
        };
      }
    }
  }
};