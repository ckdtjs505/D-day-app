const { app, BrowserWindow } = require("electron");

function createWindow() {
  // 화면 보호기 설정
  if (process.argv.length > 1) {
    // The /p option tells us to display the screen saver in the tiny preview window in the Screen Saver Settings dialog.
    if (process.argv[1] === "/p") {
      app.quit();
      return;
    }

    // The /S option is passed when the user chooses Configure from the .scr file context menu (although we don't see this in practice).
    // The /c:# option is passed when the user clicks Settings... in the Screen Saver Settings dialog.
    if (process.argv[1] === "/S" || process.argv[1].match(/^\/c/)) {
      electron.dialog.showMessageBox({
        message: "This screen saver has no options that you can set.",
        buttons: ["OK"]
      });
      app.quit();
      return;
    }
  }

  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: null,
    kiosk: true,
    resizable: true,
    autoHideMenuBar: true, // 메뉴바 숨김
    fullScreen: true
  });

  setTimeout(() => {
    // and load the index.html of the app.
    win.loadFile("./src/index.html");
  }, 2000);

  // Open the DevTools.
  // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath("exe")
});
