var fs      = require("fs");
var should  = require("should");
var node_dropbox = require('../');

describe("Node Dropbox", function() {
  var config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json'))
  var api, ref;

  before(function(done) {
    api = node_dropbox.api(config.access_token);
    done();
  })

  describe("#Authenticate", function() {

    it("should create valid auth url", function(done) {
      link = "https://www.dropbox.com/1/oauth2/authorize?client_id=" + config.app_key + "&response_type=code&redirect_uri=" + config.redirect_url;
      node_dropbox.Authenticate(config.app_key, config.app_secret, config.redirect_url, function(err, url) {
        url.should.eql(link);
        err.should.eql("");
        done();
      })
    })

    it("should validate params", function(done) {
      node_dropbox.Authenticate(config.app_key, "", config.redirect_url, function(err, url) {
        err.should.eql("Missing client key and/or client secret key.");
        done();
      })
    })

  })

  describe("#API", function() {
    this.timeout(15000);

    it("should get account object", function(done) {
      api.account(function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("display_name");
        body.should.have.property("email");
        done();
      })
    })

    it("should create a directory", function(done) {
      api.createDir("myfirstdir", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("path", "/myfirstdir");
        done();
      })
    })

    it("should get metadata of directory", function(done) {
      api.getMetadata("myfirstdir", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("is_dir", true);
        done();
      })
    })

    it("should remove a directory", function(done) {
      api.removeDir("myfirstdir", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("path", "/myfirstdir");
        done();
      })
    })

    it("should create a file", function(done) {
      api.createFile("test_file.txt", "Test Content", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("path", "/test_file.txt");
        done();
      })
    })

    it("should get metadata of file", function(done) {
      api.getMetadata("test_file.txt", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("is_dir", false);
        done();
      })
    })

    it("should move a file", function(done) {
      api.moveSomething("test_file.txt", "renamed_testfile.txt", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("path", "/renamed_testfile.txt");
        done();
      })
    })

    it("should remove a file", function(done) {
      api.removeFile("renamed_testfile.txt", function(err, res, body) {
        res.statusCode.should.eql(200);
        body.should.have.property("path", "/renamed_testfile.txt");
        body.should.have.property("is_deleted", true);
        done();
      })
    })

    it.skip("should get delta of file", function(done) {})

  })

});
