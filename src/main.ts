import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  app.commandLine.appendSwitch(
    "enable-experimental-web-platform-features",
    "true"
  );
  app.commandLine.appendSwitch("enable-web-bluetooth", "true");

  win.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      event.preventDefault();
      if (deviceList && deviceList.length > 0) {
        callback(deviceList[0].deviceId);
      }
    }
  );

  const isDevelopment = process.env.NODE_ENV !== "production";
  if (isDevelopment) {
    win.webContents.openDevTools();
  }

  win.loadFile("../index.html");
  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
};

app.on("ready", () => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
  // ipcRenderer.send
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
