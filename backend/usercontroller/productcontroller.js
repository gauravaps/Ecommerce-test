const productmodel=require('../model/productmodel')
const ordermodel=require('../model/ordermodel')
const braintree=require('braintree');
require('dotenv').config();

//payment gateway....
var gateway=new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:process.env.MERCHANT_ID,
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
})


exports.Addproduct= async(req,res)=>{
    try {
    
        const{name,description,category,price,quantity,shipping}=req.body;
        const img=req.file.filename;
        if(!name || !description || !category || !price || !quantity || !img){
            return res.status(400).send({message:'all filled required..'})
        }
        const newproduct= new productmodel({
            name,description,category,price,quantity,shipping,img
        })
        const saveproduct=await newproduct.save()
        res.status(200).send({message:'successfully create product',saveproduct})


        
    } catch (error) {
        res.status(404).send({error,message:'error to create product'}) 
        
    }
}

exports.Allproduct=async(req,res)=>{
    try {
        const products=await productmodel.find({}).sort({createdAt:-1});
        res.status(200).send({message:'all product available here',products})
        
    } catch (error) {
        res.status(400).send({message:'product not available here...',error})
    }
}

// single product get+++
exports.singleproduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await productmodel.findOne({_id:id});
        res.status(200).send({message:'single product is here ',product})
        
        

    } catch (error) {
        res.status(400).send({message:'did not get single product',error})
    }
}

// Edit product++++

exports.Editproduct=async(req,res)=>{
    try {
        
    const {id}=req.params;
    const{name,description,category,price,quantity,img}=req.body;
    const file=req.file ? req.file.filename :img;
    const updateproduct=await productmodel.findByIdAndUpdate({_id:id},{
        name,description,category,price,quantity,img:file
    })
    res.status(200).send(updateproduct)

        
    } catch (error) {
        res.status(400).send({message:'product updation error',error})
        
    }
}

// Delete product 

exports.Deleteproduct=async(req,res)=>{
    try {
        
        await productmodel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({message:'product deleted successfully'})
        
    } catch (error) {
        res.status(400).send({message:'product not deleted please check',error})
    }
}

// brain tree token function!!!!

exports.braintreefunction=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }
            else{
                res.send(response)
            }
        })


        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }

}

// brain tree payment function!!!

exports.braintreePaymentFunction=async(req,res)=>{
    try {
        const{cart,nonce}=req.body;
        let total=0;
        cart.map((i)=>{
            total+=i.price;
        })

        let newtransaction =gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },function(err,result){
            if(result){
                const order=new ordermodel({products:cart,payment:result,buyer:req.user._id}).save();
                res.json({ok:true});

            }
            else{
                res.status(500).send(err)
            } 
        })



        
    } catch (error) {
        console.log(error);
        
    }
}