const { ipcRenderer } = require("electron");

document.getElementById("connect").addEventListener("click", async () => {
    const name = document.getElementById("player-name").value;
    const uuid = Math.random().toString(36).substring(2, 15);
    await ipcRenderer.invoke("connect-server", uuid, name);
});
