const express=require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const server=express()
server.set("port", process.env.PORT || 3600)
var cors = require('cors')
server.use(cors())

//const ReviewRouter = require("./Reviews/Index")
const ProductRouter=require("./Products/Index")
server.use(bodyParser.json())

//server.use("/whatever", express.static(__dirname + "/img"))

//server.use("/reviews", ReviewRouter)
server.use("/products", ProductRouter)

mongoose.connect("mongodb://localhost:27017/ProductsDB", {
  useNewUrlParser: true
}).then(
  server.listen(server.get('port'), () => {
      console.log("SERVER IS RUNNING ON " + server.get("port"))
  })
).catch(err => console.log(err))
