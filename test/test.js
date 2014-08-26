var fs      = require("fs")
var should  = require("should")
var node_dropbox = require('../');

describe("new", function() {
  var config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json'))
  var api, ref;

  before(function(done) {
    api = node_dropbox.api(config.access_token)
    done()
  })

  it("should get account object", function(done) {
    api.account(function(err, res, body) {
      var json = JSON.parse(body);
      res.statusCode.should.eql(200)
      json.should.have.property("display_name")
      json.should.have.property("email")
      done()
    })
  })

  it("should create a directory", function(done) {
    api.createDir("myfirstdir", function(err, res, body) {
      var json = JSON.parse(body);
      res.statusCode.should.eql(200)
      json.should.have.property("path", "/myfirstdir")
      done()
    })
  })

  it("should remove a directory", function(done) {
    api.removeDir("myfirstdir", function(err, res, body) {
      var json = JSON.parse(body);
      res.statusCode.should.eql(200)
      json.should.have.property("path", "/myfirstdir")
      done()
    })
  })

  it("should create a file", function(done) {
    api.createFile("test_file.txt", "Test Content", function(err, res, body) {
      var json = JSON.parse(body);
      res.statusCode.should.eql(200)
      json.should.have.property("path", "/test_file.txt")
      done()
    })
  })

  it("should move a file", function(done) {
    api.moveSomething("test_file.txt", "renamed_testfile.txt", function(err, res, body) {
      var json = JSON.parse(body);
      res.statusCode.should.eql(200)
      json.should.have.property("path", "/renamed_testfile.txt")
      done()
    })
  })

  it("should remove a file", function(done) {
    api.removeFile("renamed_testfile.txt", function(err, res, body) {
      var json = JSON.parse(body);
      res.statusCode.should.eql(200)
      json.should.have.property("path", "/renamed_testfile.txt")
      json.should.have.property("is_deleted", true)
      done()
    })
  })

  it.skip("should get metadata of file", function(done) {
  })

  it.skip("should get delta of file", function(done) {
  })

});