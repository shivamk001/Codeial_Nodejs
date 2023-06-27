const passport=require('passport');
const User=require('../models/user');
const LocalStrategy=require('passport-local').Strategy;

//authentication using passport
passport.use(new LocalStrategy(
    //we are using this options field because passport expects username and password as credentials by default
    // but we are using email and password as credentials
    //so in this object below we mention that usernameField is 'email'
    {
    usernameField: 'email'
    },
    //this call-back is used to verify the username and password, done called on conclusion
   async function(email, password, done){
        //find a user and establish identity
        console.log(`Called to authenticate: ${email}, ${password}`)
        try{
            const user=await User.findOne({email: email})
            if(!user || user.password!=password){
                console.log('Invalid Username/password')
                return done(none, false)
            }
            return done(null, user);
        }
        catch(err){
            return done(err);
        }
    }
))

//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //console.log(`Serialize User: ${user.id}`)
    done(null, user.id);
})

//deserialize the user from the key in the cookies, find the identity when requests are made
passport.deserializeUser(async function(id, done){
    try{
        console.log(`Deserialize user`)
        const user=await User.findById({_id: id})
        console.log(`Deserialize user: ${user}`)
        return done(null, user);
    }
    catch(err){
        return done(err);
    }
})

//check if the user is authenticated, used to allow only logged in users to access profile page
passport.checkAuthentication=function(req, res, next){
    console.log(`Is Authenticated in CHECKAUTHENTICATION: ${req.isAuthenticated()}`)
    if(req.isAuthenticated()){
        //if user is signed then pass on request to the next function(controllers action)
        return next()
    }
    //if the user is not signed in
    return res.redirect('/users/signin')
}

passport.setAuthenticatedUser=function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains current signed in user from session cookie and we send this to locals for views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;