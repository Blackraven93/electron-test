// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
/// <reference types="web-bluetooth" />

const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

(async () => {
  const response = await window.versions.ping();
  console.log(response);
})();

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "System";
  });

const bluetoothTest = async () => {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });

  document.getElementById("device-name").innerHTML =
    device.name || `ID: ${device.id}`;
};

document.getElementById("clickme").addEventListener("click", bluetoothTest);
