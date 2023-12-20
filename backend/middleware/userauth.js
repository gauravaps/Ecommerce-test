const usermodel = require('../model/usermodel')
const jwt=require('jsonwebtoken')

 require('dotenv').config()





 // ++++...user login authentication here...++++++

 exports.authlogin=(req,res,next)=>{
    // const token=req.headers('Authorization')
    // if (!token) {
    //     return res.status(401).json({ msg: 'No token, authorization denied' });
    // }

    try {
        const decode=jwt.verify(req.headers.authorization, process.env.KEY)
        req.user=decode
        next()
        
    } catch (error) {
        console.log(error);
        
    }
 }

 //user admit panel authentication....+++

 exports.admin=async(req,res,next)=>{
    try {
        const user=await usermodel.findById(req.user._id);
        if(user.role!==1){
            return res.status(400).send({message:"unauthorized acces"})
        }
        else{
            next();
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'unauthorized acces'})
        
    }
 }