const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./backend/router');
const http = require('http');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.use('/api', api);


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));