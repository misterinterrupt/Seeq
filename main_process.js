const { fork } = require('child_process');
// const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

// Basic init
const electron = require('electron')
const {app, BrowserWindow} = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {

  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));
  // installExtension(REDUX_DEVTOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));

  mainWindow = new BrowserWindow({
    webPreferences: {
      webviewTag: false,
      nodeIntegration: true
    },
    width: 1030,
    height: 650
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

});

let clockForkOpts = {
  cwd: './app/src',
  silent: false
};

let systemClockThread = fork('./systemclock/startClockThread.js', clockForkOpts);

systemClockThread.on('message', (message) => {
  console.log('got a message from the clock', message);
});

systemClockThread.send({msg:'tell me you exist'});
