exec-spawn
==========

wrapper of spawn that can be used as exec.

## Install
```bash
npm install exec-spawn
```

## Usage
```javascript
var exec = require('exec-spawn');

exec('echo', ['test'], function(err, stdout, stderr) {
  console.dir(stdout.toString()); // 'test\n'
});
```

```javascript
var exec = require('exec-spawn');

var cmd = 'git';
var argument = ['log', '-n 1', '--oneline'];
var options =  {
  cwd: '../exec-spawn',
  env: process.env
};

exec(cmd, argument, options, function(err, stdout, stderr) {
  console.dir(stdout.toString()); // '9b1de95 Initial commit\n'
});
```
