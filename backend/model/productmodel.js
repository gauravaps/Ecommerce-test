const mongoose=require('mongoose')

const producrschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    shipping:{
        type:Boolean
        
    }
    

},{timestamps:true})

const productmodel=mongoose.model('product',producrschema)
module.exports=productmodel