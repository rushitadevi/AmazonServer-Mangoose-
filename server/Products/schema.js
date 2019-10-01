const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const validator = require("validator")


const ProductSchemas = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type:Number,
        validator(value)
        {
            if(value<0)
            {
                throw new error("Price should be greater than 0");
            }
        }
    },
    category:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    },
    Reviews: [
        {
          _id: { type: Schema.Types.ObjectId, auto: true },
          comment: String,
          rate : Number,
          createdAt : {
              type:Date,
              default:new Date()
          }
                }
      ],
      CartItems:[
          {
              productId:{
                  type:String
                  
              },
              quantity :{
                  type:Number
              }
          }
      ]
})


module.exports = mongoose.model("product", ProductSchemas);