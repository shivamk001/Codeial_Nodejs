const passport=require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
        //find the user
        const user= await User.findOne({email: profile.emails[0].value})
        console.log('PROFILE IN GOOGLE STRATEGY:', profile)

        if(user){
            //if found set this user as req.user
            return done(null, user)
        }
        else{
            //if user doen not exist, create user and set req.user
            await User.create({
                name: profile.displayName,
                email: profile.email,
                password: crypto.randomBytes(20).toString('hex')
            })
            return done(null, user);
        }
    }
    catch(err){
        console.log('ERROR IN GOOGLE STRATEGY PASSPORT', err);
    }
  }
));

module.exports=passport;