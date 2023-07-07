const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user')
const env=require('./environment')

let options={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}


passport.use(new JWTStrategy(options, async function(jwtPayload, done){
    try{
        console.log(`Called to authenticate: ${jwtPayload}`)
        let user=await User.findById(jwtPayload._id)

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    }
    catch(err){
        console.log(`Error in finding user from JWT`);
        return done(err);
    }
}))

module.exports=passport;