const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Create an Express app
const app = express();

// Use morgan for logging HTTP requests to the terminal
app.use(morgan('dev'));

// Serve static files (e.g., CSS, JS, images, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
    console.log('Serving index.html'); // Server-side log
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Assuming index.html is in the public folder
});

// Capture and log client-side errors sent via POST requests
app.post('/logError', express.json(), (req, res) => {
    console.error("Client-side Error:");
    console.error(req.body); // Log the entire error object
    console.log("Received client-side error:", req.body.message || 'No message'); // Server-side log
    res.status(200).send('Error logged');
});

// Set up an error handler to capture server-side errors
app.use((err, req, res, next) => {
    console.error('Server-side Error:', err.message); // Log server-side errors
    console.log('Server-side error occurred:', err.message); // Server-side log
    res.status(500).send('Something went wrong! Check the server logs.');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Server-side log
});