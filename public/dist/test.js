const { JSDOM } = require("jsdom");

// Create a simple HTML structure with a Hello World paragraph
const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head><title>Test</title></head>
  <body>
    <p>Hello, World!</p>
  </body>
  </html>
`;

// Create a JSDOM instance from the HTML string
const dom = new JSDOM(htmlContent, { runScripts: "dangerously", resources: "usable" });

// Set global window and document
global.window = dom.window;
global.document = dom.window.document;
global.window.console.log = (...args) => console.log("[JSDOM]", ...args);

// Import and execute your script
require("./script.js");
