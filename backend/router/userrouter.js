const express =require('express')
const { register,login ,forgetpw,edituser,getorderfunction,getallorderfunction,orderstatusfunction} = require('../usercontroller/usercontroller')
const { authlogin, admin } = require('../middleware/userauth')
const route=express.Router()


route.post('/register',register) 
route.post('/login',login)
route.post('/forgetpw',forgetpw)
route.get('/loginverify',authlogin,(req,res)=>{
    res.send({ok:'user verify successfully'})
})
route.get('/adminverify',authlogin,admin,(req,res)=>{
    res.send({ok:'user verify successfully'}) 
})

// Edit user...
route.put('/edit',authlogin,edituser) 

//user order detail 

route.get('/userorders',authlogin,getorderfunction) 

//for admin order detail....

route.get('/allorders',authlogin,admin,getallorderfunction)

// for status update..

route.put('/orderstatus/:id',authlogin,admin,orderstatusfunction)


module.exports=route;  