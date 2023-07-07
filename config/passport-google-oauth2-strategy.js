const passport=require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment')

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url 
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