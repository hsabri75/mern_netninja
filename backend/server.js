const express = require('express');
const app =express();

const dotenv= require('dotenv');
dotenv.config();


app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

app.get('/',(req,res)=>{
    res.json({msg: 'Welcome to the app !'});
})

app.listen(process.env.PORT,()=>{
    console.log("listening on port ", process.env.PORT);
});