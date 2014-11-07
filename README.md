exec-spawn
==========

wrapper of spawn that can be used as exec.

## Install
```bash
npm install exec-spawn
```

## Usage
```javascript
var excec = require('exec-spawn');

exec('echo', ['test'], function(err, stdout, stderr) {
  console.dir(stdout.toString()); // 'test\n'
});
```
