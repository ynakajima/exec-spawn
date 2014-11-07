'use strict';
var spawn = require('child_process').spawn;

/**
 * exec-spawn
 * wrapper of spawn that can be used as exec.
 *
 * @param command {String} String The command to run
 * @param args {Array} Array List of string arguments
 * @param options {Object} options of child_process.spawn
 * @param callback {Function} function(err:Error, stdout:Buffer, stderr:Buffer)
 */
module.exports = function(command, args, options, callback) {
  
  // init arguments
  var _command, _args, _options, _callback;
  for (var i = 0, l = arguments.length; i < l; i++) {
    var argument = arguments[i];
    var type = typeof argument;
    
    if (type === 'string') {
      _command = argument;
    } else if (argument instanceof Array) {
      _args = argument;
    } else if (type === 'function') {
      _callback = argument;
    } else if (type === 'object') {
      _options = argument;
    }
  }
  command = _command;
  args = _args || [];
  options = _options || {env: process.env};
  callback = _callback;

  // init buffer
  var bufSize = options.maxBuffer || 200 * 1024;
  var stdoutBuf = new Buffer(bufSize);
  var stderrBuf = new Buffer(bufSize);
  var stdoutIndex = 0;
  var stderrIndex = 0;
  stdoutBuf.fill(0);
  stderrBuf.fill(0);

  // excec
  var cmd = spawn(command, args, options);

  cmd.stdout.on('data', function(data) {
    data.copy(stdoutBuf, stdoutIndex);
    stdoutIndex += data.length;
  });

  cmd.stderr.on('data', function(data) {
    data.copy(stderrBuf, stderrIndex);
    stderrIndex += data.length;
  });

  cmd.on('close', function(code) {
    // bufferの切り詰め
    var _stdoutBuf = new Buffer(stdoutIndex);
    var _stderrBuf = new Buffer(stderrIndex);
    stdoutBuf.copy(_stdoutBuf, 0);
    stderrBuf.copy(_stderrBuf, 0);

    if (code !== 0) {
      callback(new Error('Error: ' + _stderrBuf.toString()), undefined, _stderrBuf);
      return;
    }

    callback(null, _stdoutBuf, _stderrBuf);
  });

};

