/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads', function() {
    
    suite('POST', function() {
      test('Test POST /api/threads', function(done) {
        chai.request(server)
          .post('/api/threads')
          .send({"text": "text",
          "delete_password":"del"})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, '_id');
            assert.property(res.body, 'text');
            assert.property(res.body, 'replies');
            assert.property(res.body, 'delete_password');
            assert.equal(res.body.text, 'text');
            assert.equal(res.body.delete_password, 'del');
            assert.isArray(res.body.replies);
            assert.lengthOf(res.body.replies, 0);
            done()
          });
        });
      });
    
    suite('GET', function() {
      test('Test GET /api/threads',  function(done){
        chai.request(server)
        .get('/api/threads')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'delete_password');
          done();
        });
      });      
      
    });
    
    suite('DELETE', function() {
      test('Test DELETE /api/threads',  function(done){
        chai.request(server)
        .delete('/api/threads')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'complete delete successful');
          done();
        });
      });    
    });

  });


});
