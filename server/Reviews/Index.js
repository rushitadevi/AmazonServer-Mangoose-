const express = require('express')
const fs = require("fs")
const router = express.Router()
const ProductSchemas = require("./Products/schema");


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
//to add reviews
router.post("/",async(req,res)=>{
        const newProduct = new ProductSchemas(req.body
            );
            console.log(newProduct)
           
            console.log(newProduct)
        const { _id } = await newProduct.save();
        res.send(_id);
})

module.exports = router;