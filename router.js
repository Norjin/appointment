const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('appointments.db');
const router = express.Router();

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS appointments (date DATE, time TIME, description TEXT)");
})

router.get('/', (req, res) => {
	db.all("SELECT * FROM appointments", function(err, row){
		if(err) {
			console.err(err);
			res.status(500);
		}
		res.status(200);
		res.send(row);
    });
});

router.get(`/search/:text`, (req, res) => {
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

router.post('/new', (req, res) => {
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

module.exports = router;