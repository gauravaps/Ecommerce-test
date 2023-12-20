const { haspassword, compare } = require("../middleware/password");
const usermodel = require("../model/usermodel");
const ordermodel=require('../model/ordermodel')

// +++++ registration start here...+++++
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, secretans, address } = req.body;
    if (!name || !email || !password || !phone || !secretans || !address) {
      return res.status(400).send("please all field is require");
    }

    const userexist = await usermodel.findOne({ email });
    if (userexist) {
      return res.status(200).send("user already registered please login");
    } 

    const hash = await haspassword(password);
    const newuser = new usermodel({
      name,
      email,
      password: hash,
      phone,
      secretans, 
      address,
    });

    const saveuser = await newuser.save();
    res.status(200).send({ message: "user created successfull", saveuser });
  } catch (error) {
    res.status(400).send({ message: "user registration failed..." });
  }
};

// Login route function++++++

exports.login=async(req,res)=>{
  try {
    const {email,password}=req.body;

    if(!email || !password){
     return res.status(400).send('please fill valid email and password..!!!!')
    }
    const user=await usermodel.findOne({email})
    if(!user){
      return res.json('invalid email') 
    }
    const matchPassword=await compare(password,user.password);
    if(!matchPassword){
      return res.status(400).send({message:'Invalid password intered..!!!'})
    }
    const token=await user.generatetoken();
    //res.json('success',token,user) 
    res.status(200).send({message:'login success full',token,user})

 

    
  } catch (error) {
    res.status(400).send({message:'user login failed!!!!',error})
    
       
  }
}

// ++++++ forget password here ..++++++
exports.forgetpw=async(req,res)=>{
  try {
    const{email,secretans,newpassword}=req.body;
    if(!email || !secretans || !newpassword){
      res.status(400).send({message:'please filled all details..!!'})
    }
    const  user=await usermodel.findOne({email:email,secretans:secretans});
    if(!user){
      return res.status(400).send({message:'user does not exist, please signup first !!'})
    }
    const hash= await haspassword(newpassword)
    const updatepassword=await usermodel.findByIdAndUpdate(user._id,{password:hash},{new:true})
    res.status(200).send({message:'password reset successfully..!!1'})

    
  } catch (error) {
    res.json('password updation failed',error)
    
  }

}


//Edit user 

exports.edituser=async(req,res)=>{
  try {
    const {name,email,phone,address}=req.body;
    
    if(!name || !email || !phone || !address){
      return res.status(400).send({message:'please fill edit field'})
    }
    const updateUser=await usermodel.findByIdAndUpdate(req.user._id,{name,email,phone,address},{new:true})
    res.status(200).send({message:'user updated successfull',updateUser})

    
  } catch (error) {
    res.status(400).send({message:'user update failed'}) 

    
  }

}

// user order function...


exports.getorderfunction=async(req,res)=>{

  try {
    const orders=await ordermodel.find({buyer:req.user._id}).populate('products').populate('buyer','name')
    res.status(200).send(orders)

    
  } catch (error) {
    res.status(400).send(error)
  }
}
 
// for admin order function...

exports.getallorderfunction=async(req,res)=>{
  try {
    const orders=await ordermodel.find({}).populate('products').populate('buyer','name').sort({createdAt:-1})

    res.json(orders)


    
  } catch (error) {
    res.status(400).send(error)
    
  }
}

// order status ...

exports.orderstatusfunction=async(req,res)=>{
  try {
    const {id}=req.params;
    const {status}=req.body;
    const orders=await ordermodel.findByIdAndUpdate(id,{status},{new:true})
    res.status(200).send(orders)
    
  } catch (error) {
    res.status(500).send(error)
  }
}


 















