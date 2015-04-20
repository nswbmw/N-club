var User = require('../models').User;
var request = require('co-supertest');
var app = require('../app');

describe('/signup', function () {
  var agent = request.agent(app);
  
  before(function (done) {
    User.remove({name: 'nswbmw'}, done);
  });

  after(function (done) {
    User.remove({name: 'nswbmw'}, done);
  });

  it('GET /signup without cookie', function* () {
    yield agent.get('/signup').expect(200).end();
  });

  it('POST /signup without cookie', function* () {
    yield agent
      .post('/signup')
      .send({
        name: 'nswbmw',
        email: 'nswbmw@example.com',
        password: '123456',
        re_password: '123456',
        gender: '男',
        signature: '你是我的小呀小苹果～'
      })
      .expect(302)
      .end();
  });

  it('GET /signup with cookie', function* () {
    yield agent.get('/signup').expect(302).end();
  });

  it('POST /signup with cookie', function* () {
    yield agent
      .post('/signup')
      .send({
        name: 'nswbmw',
        email: 'nswbmw@example.com',
        password: '123456',
        re_password: '123456',
        gender: '男',
        signature: '你是我的小呀小苹果～'
      })
      .expect(302)
      .end();
  });
});