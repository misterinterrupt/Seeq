const { spawn } = require('child_process');

var opts = {
    stdio: [process.stdin, process.stdout, process.stderr, 'pipe']
};

var child = spawn('node', ['./app/src/startClockThread.js'], opts);

// send data
//mySource.pipe(child.stdio[3]);

let printChildData = (data) => {
  console.log(data);
}
//read data
child.stdio[3].pipe(printChildData);
