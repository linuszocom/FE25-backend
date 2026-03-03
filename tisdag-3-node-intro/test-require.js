// require() CommonJS
// const http = require("http");

// console.log("http modul laddad med require", typeof http.createServer);

// import med ES modul
// import http from "http";
// console.log("http modul laddad med require", typeof http.createServer);

import fs from "fs/promises";
import readlineSync from "readline-sync";

const text = readlineSync.question("Skriv något du vill spara: ");
await fs.writeFile("data.txt", text, "utf-8");

console.log("sparat till data.txt");

const readData = await fs.readFile("data.txt", "utf-8");
console.log("Data från filen:", readData);

// const text = "Detta sparas i en textfil";

// await fs.writeFile("data.txt", text, "utf-8");
// console.log("sparat till data.txt");

// const readData = await fs.readFile("data.txt", "utf-8");
// console.log("Data från filen:", readData);
