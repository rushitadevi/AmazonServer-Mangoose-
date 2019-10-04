var Connection = require('tedious').Connection
var Request = require('tedious').Request
//require('dotenv').config()

var config = {
    server: 'rushita.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: "Rushita", // update me
            password: "rushi123@" // update me
        }
    },
    options: {
        database: 'StudentDB'
    }
  }

var connection = new Connection(config)
connection.on('connect', err =>{
  if (err) console.log(err)
  else console.log("connected")
})

connection.on('end',err=>{
    connection=new Connection(config)
})

//connection.on('debug', function(err) { console.log('debug:', err);});
module.exports = connection;