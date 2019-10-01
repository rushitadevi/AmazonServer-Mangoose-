const express = require('express')
const fs = require("fs")
const router = express.Router()
var multer  = require('multer')
var upload = multer()
const ProductSchemas = require("./schema");


router.get("/", async (req, res) => {
    try {
      const products = await ProductSchemas.find({})
      res.send(products)
    } catch (err) {
      console.log(err);
    }
  });
  
router.get('/:id',async(request,response)=>{
    var product =await ProductSchemas.findById(request.params.id)
    if (!product)
    response.send("No Products Yet... ")
    else
    response.send(product)
})

router.delete('/:id',(request,response)=>{
    var product = ProductSchemas.findByIdAndDelete(request.params.id)
    response.send(product)
})

router.put('/:id',(request,response)=>{
    var product = ProductSchemas.findByIdAndUpdate(request.params.id,req.body)
    response.send(product)
})

router.post("/",async(req,res)=>{
        const newProduct = new ProductSchemas(req.body
            );
            console.log(newProduct)
           
            console.log(newProduct)
        const { _id } = await newProduct.save();
        res.send(_id);
})

//to get reviews
router.get("/:id/reviews", async (req, res) => {
    try {
      const reviews = await ProductSchemas.findById(req.params.id,{
        Reviews: 1
      })
      res.send(reviews)
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/:id/reviews",async(req,res)=>{
    try {
        const review = await ProductSchemas.findByIdAndUpdate(
          req.params.id,
          { $push: { Reviews: req.body } } //
        );
        res.send("Reviews added.");
      } catch (error) {}
})


router.delete("/:id/reviews/:reviewId", async (req, res) => {
    try {
      const review = await ProductSchemas.findByIdAndUpdate(req.params.id, {
        $pull: { Reviews: { _id: req.params.reviewId } }
      });
      res.send(review);
    } catch (error) {}
  });

router.post('/:id/add-to-cart/', async(req, res) => {

    //1. Find the product by ID

    const product = await ProductSchemas.findById(req.params.id)
    
    const newProduct = {...product.toObject()}

    //2. Check in user's cart if the book is already there
    
    // const response = await userSchema.find($and: [{_id: req.params.id}, {cart: {}}}])
    const response = await ProductSchemas.find({_id: req.params.id, CartItems: {$elemMatch: {_id: new ObjectID(req.params.id)}}})
    console.log(response.length)
    if(response.length > 0){
        //3. If it is already there, increment quantity
        const response2 = await userSchema.updateOne({
            _id: req.params.id, 
            "cart._id": new ObjectID(req.params.id)}, 
            {$inc: {"cart.$.quantity": 1}})
        console.log(response2)
        res.send("Incremented quantity")
    } else{

        //4. If it is not add to cart (push to array)
    
        await userSchema.updateOne({_id: req.params.id}, {$addToSet: {"cart": newProduct}})
        res.send('Items Added!')
    }

})


// var multerInstance=new multer({})

// router.post("/",multerInstance.single("Img"), (req,response)=>{

//     var fullUrl = req.protocol + "://" + req.get("host") + "/Img/"
//     var ext = req.file.originalname.split(".").reverse()[0];
//     //var path = "./img/" + req.params.id+ext;
   
//     var productID = id.generate()
   
//     var fileName = productID + ext;
//     var buffer = req.file
  
   
//      fs.writeFile("./Img/" + fileName,buffer)
//     // var reqBody=request.body 
//     //     var buffer = fs.readFileSync("./Files/Products.json");
//     //     var content = buffer.toString()
//     //     var reviewDB = JSON.parse(content)
//     console.log("hihi")          
//       var newProduct = req.body;
//      var newProduct = JSON.parse(req.body.metadata)
//      newProduct.createdAt = new Date()
//     newProduct.updatedAt = newProduct.createdAt
//      newProduct.ID = productID
//      newProduct.Image = fullUrl + fileName
//      console.log(newProduct)
//      products.push(newProduct)
//      fs.writeFileSync("./Files/Products.json", JSON.stringify(newProduct));

//      response.send(newProduct)
// //     console.log(req.body.metadata)
// //     var reqBody=request.body 
// //     var buffer = fs.readFileSync("./Files/Products.json");
// //     var content = buffer.toString()
// //     var reviewDB = JSON.parse(content)
// //     reqBody._id = reviewDB.length + 1;
// //    reqBody.createdAt=new Date();
// //     reviewDB.push(reqBody)
// //     fs.writeFileSync("./Files/Products.json", JSON.stringify(reviewDB))
// //     response.send(reviewDB)
// })


module.exports = router;