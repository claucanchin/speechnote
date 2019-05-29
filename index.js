const express = require('express');
// const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const speech = require('@google-cloud/speech');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db');

// Set up middleware
// app.use(methodOverride('_method'));
app.use(cookieParser());
// app.use(express.static('public'));
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

const client = new speech.SpeechClient();
const request = {
  config: {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  },
  interimResults: false, // If you want interim results, set this to true
};

let server = require('http').createServer();
let WSServer = require('ws').Server;
let wss = new WSServer({server: server});

wss.on('connection', (ws) => {
  const recognizeStream = client.streamingRecognize(request);
  recognizeStream.on('data', (data) => {
    if (data.results[0] && data.results[0].alternatives[0]) {
      console.log(data.results[0].alternatives);
      ws.send(JSON.stringify(data.results[0].alternatives[0].transcript));
    }
  }).on('error', console.error);

  ws.on('message', (data) => {
    const buffer = new Int16Array(data, 0, Math.floor(data.byteLength / 2));
    recognizeStream.write(buffer);
  });

  ws.on('close', () => {
    recognizeStream.end();
    console.log('closing stream');
  });
});


app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));
server.listen((PORT + 1), () => console.log('~~~ Websocket server listening on ' +(PORT+1)+' ~~~'));