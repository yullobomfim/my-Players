var express = require("express")
var app = express()
var db = require("./database.js")
const cors = require('cors');
app.use(cors({
    origin: 'http://192.168.1.123:8000/api/players',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


app.get("/api/players", cors(), (req, res, next) => {
    var sql = "select * from players"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
      console.log('fiz a requisicao com cors')
});


app.get("/api/players/:id", (req, res, next) => {
    var sql = "select * from player where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/api/players/", (req, res, next) => {
    var data = {
        name: req.body.name,
        country: req.body.country,
        team: req.body.team,
        avatar : req.body.avatar
    }
    var sql ='INSERT INTO players (name, country, team, avatar) VALUES (?,?,?,?)'
    var params =[data.name, data.country, data.team, data.avatar]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// app.delete("/api/user/:id", (req, res, next) => {
//     db.run(
//         'DELETE FROM user WHERE id = ?',
//         req.params.id,
//         function (err, result) {
//             if (err){
//                 res.status(400).json({"error": res.message})
//                 return;
//             }
//             res.json({"message":"deleted", rows: this.changes})
//     });
// })

// Root path
app.get("/api/", (req, res, next) => {
    res.json({"message":"Ok"})
});

