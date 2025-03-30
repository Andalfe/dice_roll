// the below file creates a server to log the errors to the terminal


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
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Capture and log client-side errors sent via POST requests
app.post('/logError', express.json(), (req, res) => {
    console.error("Client-side Error:", req.body);  // Log the client-side error to terminal
    res.status(200).send('Error logged');
});

// Set up an error handler to capture server-side errors
app.use((err, req, res, next) => {
    console.error('Server-side Error:', err.message);  // Log server-side errors
    res.status(500).send('Something went wrong! Check the server logs.');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
