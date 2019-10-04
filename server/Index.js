const express=require("express")
const bodyParser = require("body-parser")

const server=express()
server.set("port", process.env.PORT || 3600)
var cors = require('cors')
server.use(cors())


const ProductRouter=require("./Products/Index")
server.use(bodyParser.json())

var Connection = require('tedious').Connection

// var config = {
//   server: 'rushita.database.windows.net',
//   authentication: {
//       type: 'default',
//       options: {
//           userName: "Rushita", // update me
//           password: "rushi123@" // update me
//       }
//   },
//   options: {
//       database: 'StudentDB'
//   }
// }

server.use("/products", ProductRouter)
// var connection = new Connection(config)
// connection.on('connect', err =>{
//   if (err) console.log(err)
//   else console.log("connected")
// })

// connection.on('end',err=>{
//   connection=new Connection(config)
// })


server.listen(3000, () => {
  console.log("SERVER IS RUNNING ON " + 3000)
})