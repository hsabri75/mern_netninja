const express = require('express');
const app =express();

const workoutRoutes = require('./routes/workouts');

const dotenv= require('dotenv');
dotenv.config();


app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts',workoutRoutes)

app.listen(process.env.PORT,()=>{
    console.log("listening on port ", process.env.PORT);
});