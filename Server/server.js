const http = require('http');
const mongodb = require('mongodb');

const hostname = '127.0.0.1'; // localhost
const port = 3000;
const url = 'mongodb://127.0.0.1:27017'; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(url);

async function startServer() {
  await mongoClient.connect(); // Verbindung zur Datenbank herstellen
  server.listen(port, hostname, () => { // Server starten
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

const server = http.createServer((request, response) => { 
  const listenCollection = mongoClient.db('PickMySheet').collection('liste');
  if (request.method === 'GET') {
      // Informationen an den Client senden
      response.setHeader("Content-Type", "application/json");
      const data = { message: "Hello World"};
      response.end(JSON.stringify(data));
  }
  if (request.method === 'POST') {
    // Daten vom Client empfangen
    let jsonString = '';
    request.on('data', (data) => {
      jsonString += data;
    });
    request.on('end', () => {
      console.log(JSON.parse(jsonString));
      listenCollection.insertOne(JSON.parse(jsonString));
    });
  }
});

startServer();