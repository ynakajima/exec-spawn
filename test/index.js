var mocha = require('mocha');
var expect = require('chai').expect;
var exec = require('../');

describe('exec-spawn', function(){

  it('should return a result When given command has completed successfully', function(done){
    exec('echo', ['test'], function(err, stdout, stderr) {
      expect(err).to.be.null;
      expect(stdout).to.be.an.instanceof(Buffer);
      expect(stderr).to.be.an.instanceof(Buffer);
      expect(stdout.toString()).to.be.equal('test\n');
      done();
    });
  });

  it('should return a error When given command terminates abnormally', function(done){
    exec('ls', ['./', '&& echo "Hello!!"'], function(err, stdout, stderr) {
      expect(err).to.be.an.instanceof(Error);
      expect(stdout).to.be.undefined;
      expect(stderr).to.be.an.instanceof(Buffer);
      done();
    });
  });

});

