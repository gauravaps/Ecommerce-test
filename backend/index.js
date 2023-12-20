const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
require('./dbconnection/dbconnection')
const route=require('./router/userrouter')
const productroute=require('./router/productroute')

app.use(cors())
app.use('/uploads',express.static('./uploads'))
app.use(express.json())
app.use('/',route)
app.use(productroute)



 



const port=process.env.port

app.listen(port,()=>{
    console.log('express server connected successfully+++++')
})