const mongoose=require('mongoose')

const orderschema=new mongoose.Schema({

    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
    }],
    payment:{
        

    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:String,
        default:'Not process',
        enum:['Not process','Processing','Shipped','Delivered','Cancel'],
    
    },



},{timestamps:true}

    
)

const ordermodel=mongoose.model('order',orderschema)

module.exports=ordermodel;