import { app, BrowserWindow } from "electron";
import * as path from "path";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  // index 
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  // 개발자 도구생성
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 앱이 준비됬을 대 실행
app.on("ready", () => {
  // 위에서 생성한 window 실행
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // 맥은 사용가능 창이 없을때 앱을 활성화
    // 따라서 브라우저가 열려있지 않다면 새로운 창을 오픈
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// 창을 끄면 동작 정지
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
