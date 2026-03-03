// import för commonJS
// const { appName } = require("./modul1.js");
// const { getGreeting } = require("./modul2.js");

// ESM import
import { appName } from "./modul1.js";
import { getGreeting } from "./modul2.js";
import fs from "fs";

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<title>Modul demo</title></head>
<body>
<h1>${appName}</h1>
<p>${getGreeting()}</p>
</body>
</html>`;

fs.writeFileSync("index.html", html, "utf-8");
console.log("index.html skapad");
