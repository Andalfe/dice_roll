// the below file creates a fake DOM in order to comile the javascript locally to find syntax errrors/

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Load index.html from the local filesystem
const filePath = path.resolve(__dirname, "./public/index.html");
const htmlContent = fs.readFileSync(filePath, "utf8");

// Create a JSDOM instance from the file
const dom = new JSDOM(htmlContent, { runScripts: "dangerously", resources: "usable" });

// Set global window and document
global.window = dom.window;
global.document = dom.window.document;
global.window.console.log = (...args) => console.log("[JSDOM]", ...args);


// Import and execute your script
require("./public/script.js");