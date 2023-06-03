const jwt= require('jsonwebtoken')
const User= require('../models/userModel')

const requireAuth= async (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(" ")[1]
    try {
        console.log({token})
        const {_id} = await jwt.verify(token, process.env.SECRET)

        req.user = User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        res.status(401).json({error: 'Request is not authorized'})
    }   


}
 module.exports=requireAuth