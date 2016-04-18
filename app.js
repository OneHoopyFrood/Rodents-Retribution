var electron = require('electron');

electron.app.on('ready', function () {
  var win = new electron.BrowserWindow({
    width: 484,
    height: 427,
    resizeable: false,
    title: "Rodents Revenge",
    icon: __dirname + "/imgs/mouse.png"
  });
  win.loadURL('file://' + __dirname + '/index.html');
});
