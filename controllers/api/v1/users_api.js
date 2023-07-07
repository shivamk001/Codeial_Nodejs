const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment')

module.exports.createSession=async function(req, res){
    try{
        let user=await User.findOne({email: req.body.email})
        
        if(!user || user.password!=req.body.password){

            return res.status(422).json({
                messsage: 'Invalid username/password'
            })
        }
        return res.status(200).json({
            messsage: 'Sign In successful',
            data:{
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '600000'})
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal Server Error',
            err: err
        })
    }
}