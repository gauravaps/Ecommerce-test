const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const secretkey=process.env.KEY;

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    secretans:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0,
    }
},{timestamps:true})
// generate token here ++++++ 

userschema.methods.generatetoken=function(){
    try {
        let usertoken=jwt.sign({_id:this._id},secretkey);
        return usertoken
        
    } catch (error) {
        console.log('generate token error here=',error);
         
    }
}

const usermodel=mongoose.model('user',userschema) 
module.exports=usermodel