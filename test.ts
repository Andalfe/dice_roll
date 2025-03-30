const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
require("ts-node").register(); // Enable TypeScript execution

// Load index.html from the local filesystem
const filePath = path.resolve(__dirname, "./public/index.html");
const htmlContent = fs.readFileSync(filePath, "utf8");

// Create a JSDOM instance from the file
const dom = new JSDOM(htmlContent, { runScripts: "dangerously", resources: "usable" });

// Set global window and document
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.window.console.log = (...args) => console.log("[JSDOM]", ...args);

global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;

global.window.onerror = function (message, source, lineno, colno, error) {
    console.error("[JSDOM Error]", message, source, lineno, colno, error);
};

// Import and execute your TypeScript file
require("./public/script.ts");