const User=require('../models/user')

module.exports.profile=function(req, res){
    return res.render('user_profile', {title: 'Codial | My Profile'})
}


module.exports.signup=function(req, res){
    console.log(`SIGNUP: ${req.isAuthenticated()}`)
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signup', {title: 'Codial | Sign Up'})
}

module.exports.signin=function(req, res){
    console.log(`SIGNIN: ${req.isAuthenticated()}`)
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signin', {title: 'Codial | Sign In'})
}

module.exports.signout=function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.clearCookie();
        res.redirect('/');
      });
}

module.exports.create=function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    const user=User.findOne({email: req.body.email});
    user
    .then((data)=>{
        console.log('DATA:',data)
        console.log('Req Data:', req.body)
        if(!data){        
            User.create(req.body)
            .then(u=>{
                console.log(`Then u: ${u}`)
                res.redirect('/users/signin')
            })
            .catch(err=>{
                console.log('Error in creating user')
                return res.redirect('back')
            })
        }else{
            console.log('User already exists')
            res.redirect('back')
        }
    })
    .catch(err=>{
        console.log('Error in finding user in signing up')
    })
}

module.exports.createSession=function(req, res){
    console.log(`Create session: Request authenticated: ${req.isAuthenticated()}`)
    console.log(`Create session: Request authenticated: ${req.user}`)
    return res.redirect('/')
}
