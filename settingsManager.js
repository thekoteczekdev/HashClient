const fs = require("fs");
const path = require("path");

const mcSettingsPath = path.join(process.env.APPDATA, ".minecraft", "options.txt");

function optimizeSettings() {
    if (!fs.existsSync(mcSettingsPath)) return;

    let settings = fs.readFileSync(mcSettingsPath, "utf8");
    settings = settings.replace(/fancyGraphics:true/g, "fancyGraphics:false");
    settings = settings.replace(/renderDistance:\d+/g, "renderDistance:6");
    settings = settings.replace(/maxFps:\d+/g, "maxFps:120");

    fs.writeFileSync(mcSettingsPath, settings, "utf8");
    console.log("Ustawienia Minecrafta zoptymalizowane!");
}

module.exports = { optimizeSettings };
