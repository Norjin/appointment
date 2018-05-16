const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('appointments.db');

let corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS appointments (date DATE, time TIME, description TEXT)");
})

app.listen(8000, () => {
	console.log('server started');
});

app.route('/api').get((req, res) => {
	db.all("SELECT * FROM appointments", function(err, row){
		console.log("err ", err)
		res.send(row);
    });
});

app.route(`/api/search/:text`).get((req, res) => {
	console.log("text ", req.params.text);
	db.all("SELECT * FROM appointments where description LIKE ?",'%'+req.params.text+'%' , function(err, row){
		if(err) {
			console.err(err);
			res.status(500);
		}
		res.status(200);
		res.send(row);
    });
});

app.route('/api/new').post((req, res) => {
	db.run("INSERT into appointments (date, time, description)"+
		"VALUES (?, ?, ?)", req.body.date, req.body.time, req.body.description, function(err, row) {
			if(err) {
				console.err(err);
				res.status(500);
			}
			else {
				res.status(201);
				res.send(req.body)
			}
		});
});