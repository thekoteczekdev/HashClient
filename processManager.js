const { exec } = require("child_process");

function closeUnnecessaryProcesses() {
    const processesToKill = ["Discord.exe", "Steam.exe", "EpicGamesLauncher.exe"];

    processesToKill.forEach((process) => {
        exec(`taskkill /F /IM ${process}`, (err) => {
            if (!err) {
                console.log(`Zamknięto: ${process}`);
            }
        });
    });
}

module.exports = { closeUnnecessaryProcesses };
