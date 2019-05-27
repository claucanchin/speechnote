const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db');

app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ===================================================
// ROUTES
// ===================================================

// Import routes to match incoming requests
require('./routes')(app, db);

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  response.send('home');
});

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
  response.send('Page not found');
});

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));