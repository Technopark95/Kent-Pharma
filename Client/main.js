const { app, BrowserWindow } = require('electron')
const { webFrame } = require('electron')

let shortcut = require('electron').globalShortcut


function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame:true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  

  win.loadFile('index.html');

  


win.removeMenu()


shortcut.register('f5', function() {

  win.reload();
})


shortcut.register('f11', function() {

  win.isFullScreen() ? win.setFullScreen(false) : win.setFullScreen(true);
  
})
  win.maximize();

  

 //win.webContents.openDevTools();
  // Open the DevTools.
}




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


//https://docs.woocommerce.com/document/add-a-custom-field-in-an-order-to-the-emails/#:~:text=You%20can%20add%20any%20custom,from%20PayPal%20orders%2C%20for%20example.

