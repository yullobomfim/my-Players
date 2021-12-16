var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            country text,
            team text,
            avatar text 
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                console.log('create success')
            }
        })
    }
})


module.exports = db

