interface IpcRenderCallback {
  (arg: string): void;
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        once(ipc: string, callback: IpcRenderCallback): void;
        sendMessage(ipc: string, messages: string[]): void;
      };
    };
  }
}

// window.electron.ipcRenderer.once("ipc-example", (arg) => {
//   // eslint-disable-next-line no-console

// window.electron.ipcRenderer.sendMessage("ipc-example", ["ping"]);

export {};
