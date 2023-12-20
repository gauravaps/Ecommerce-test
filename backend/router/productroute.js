const express=require('express')
const { authlogin, admin } = require('../middleware/userauth')
const upload = require('../middleware/upload');
const { Addproduct,Allproduct ,singleproduct,Editproduct,Deleteproduct,braintreefunction,braintreePaymentFunction} = require('../usercontroller/productcontroller');
const route=express.Router()

route.post('/addproduct',upload.single('img'),authlogin,admin,Addproduct);
route.get('/allproduct',Allproduct)
route.get('/singleproduct/:id',singleproduct);
route.put('/editproduct/:id',upload.single('img'),authlogin,admin,Editproduct)
route.delete('/deleteproduct/:id',authlogin,admin,Deleteproduct) 
route.get('/braintree/token',braintreefunction)
route.post('/braintree/payment',authlogin,braintreePaymentFunction) 









module.exports=route