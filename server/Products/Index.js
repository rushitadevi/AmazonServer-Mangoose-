const express = require('express')
const fs = require("fs")
const router = express.Router()
const connection = require('../db')
const Request = require("tedious").Request
var dateFormat = require('dateformat');
var now = new Date();

router.get("/",async(req,res)=>{
  var products = "SELECT * FROM products"
  var request = new Request(products, (err, rowCount, rows) =>{
    if(err) res.send(err)
    else res.send(productsData)
  })

  var productsData = [];
  request.on('row', (columns) => { //every time we receive back a row from SQLServer
    var product = {}
    columns.forEach(column =>{
      product[column.metadata.colName] = column.value //add property to the book object
    })
    productsData.push(product);
  })
  connection.execSql(request);
})


router.get("/:id",async(req,res)=>{
  var product = "SELECT * FROM products WHERE _id=" + req.params.id
  var request = new Request(product, (err, rowCount, rows) =>{
    if(err) res.send(err)
    else res.send(productData)
  })

  var productData = [];
  request.on('row', (columns) => { //every time we receive back a row from SQLServer
    var productd = {}
    columns.forEach(column =>{
      productd[column.metadata.colName] = column.value //add property to the book object
    })
    productData.push(productd);
  })
  connection.execSql(request);
})

router.post("/", async (req, res) => {
  console.log(req.body)
  
  var query = `INSERT INTO products(name ,description,brand ,imageUrl,price,category,createdAt,updatedAt)
                     VALUES ('${req.body.name}', '${req.body.description}', 
                     '${req.body.brand}','${req.body.imageUrl}',${req.body.price},'${req.body.category}',
                     '${dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss")}','${dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss")}')`
    console.log(query)
  var request = new Request(query, (err) =>{ 
      if(err) res.send(err)
      else res.send("Product added")
   })
   
  connection.execSql(request); //Execute Query
})

 //router.delete()
router.delete("/:id", async (req, res) => {
    var product = `DELETE FROM products WHERE _ID=`+req.params.id
console.log(product)
  var request = new Request(product, (err) =>{ 
      if(err) res.send(err)
      else res.send("product deleted")
   })
  connection.execSql(request); //Execute Query
})


//to get reviews
router.get("/:id/reviews", async (req, res) => {
  var query = "SELECT * FROM reviews WHERE product_id=" + req.params.id
  var request = new Request(query, (err, rowCount, rows) =>{
    if(err) res.send(err)
    else res.send(reviewsData)
  })

  var reviewsData = [];
  request.on('row', (columns) => { //every time we receive back a row from SQLServer
    var product = {}
    columns.forEach(column =>{
      product[column.metadata.colName] = column.value //add property to the book object
    })
    reviewsData.push(product);
  })
  connection.execSql(request);
  });

  router.post("/:id/reviews",async(req,res)=>{
    //console.log(req.body)
      var query = `INSERT INTO reviews(comment,rate,product_id,createdAt)
    VALUES ('${req.body.comment}', ${req.body.rate}, 
    ${req.params.id},
    '${dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss")}')`
    console.log(query)
  var request = new Request(query, (err) =>{ 
      if(err) res.send(err)
      else res.send("reviews added")
   })
   
  connection.execSql(request);
})


router.delete("/:id/reviews/:reviewId", async (req, res) => {
  console.log(req.body)
  var query = `DELETE FROM reviews WHERE _ID=`+req.params.reviewId

  var request = new Request(query, (err) =>{ 
      if(err) res.send(err)
      else res.send("review deleted")
   })
  connection.execSql(request); //Execute Query
  });

// router.post('/:id/add-to-cart/', async(req, res) => {

//     //1. Find the product by ID

//     const product = await ProductSchemas.findById(req.params.id)
    
//     const newProduct = {...product.toObject()}

//     //2. Check in user's cart if the book is already there
    
//     // const response = await userSchema.find($and: [{_id: req.params.id}, {cart: {}}}])
//     const response = await ProductSchemas.find({_id: req.params.id, CartItems: {$elemMatch: {_id: new ObjectID(req.params.id)}}})
//     console.log(response.length)
//     if(response.length > 0){
//         //3. If it is already there, increment quantity
//         const response2 = await userSchema.updateOne({
//             _id: req.params.id, 
//             "cart._id": new ObjectID(req.params.id)}, 
//             {$inc: {"cart.$.quantity": 1}})
//         console.log(response2)
//         res.send("Incremented quantity")
//     } else{

//         //4. If it is not add to cart (push to array)
    
//         await userSchema.updateOne({_id: req.params.id}, {$addToSet: {"cart": newProduct}})
//         res.send('Items Added!')
//     }

// })



module.exports = router;