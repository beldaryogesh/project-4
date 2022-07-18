const express=require('express')
const app=express()

const bodyparser=require('body-parser')
const router = require('./router/routes')
 app.use(bodyparser.json())



 
 const mongoose=require('mongoose')
 mongoose.connect("mongodb+srv://Prashant10:Cv4uY0uU1ijKMVpu@cluster0.j9jd1jo.mongodb.net/GroupDatabase60",
    {useNewUrlParser:true})
    .then(()=>console.log("mongoDB is Connected!!"))
    .catch(err=>console.log(err))

    app.use('/',router)

    app.listen(process.env.PORT||3000,()=>{
        console.log("server connected at Port 3000:",process.env.PORT||3000)
    })
