const User=require('../models/user')
const fs=require('fs')
const path=require('path')

module.exports.profile=async function(req, res){
    try{
        console.log('User Profile:', req.params.userid)
        const profile_user=await User.findById(req.params.userid)
        console.log('Profile User:', profile_user)
        return res.render('user_profile', {
            title: 'Codial | My Profile',   
            profile_user: profile_user
            })
    }
    catch(err){
        console.log(`Error in rendering profile page: ${err}`)
        `Error while creating post: ${err}`
        return res.redirect('back')
    }
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
        req.flash('success', 'Logged out successfully!')
        res.redirect('/');
      });
}

//create user
module.exports.create=async function(req, res){

    try{
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Passwords do not match. Re-enter password')
            return res.redirect('back');
        }
        const user=await User.findOne({email: req.body.email});

        if(!user){
            await User.create(req.body)
            req.flash('success', 'User created successfully!')
            return res.redirect('/users/signin')
        }
        else{
            req.flash('error', 'User already exists')
        }
    }
    catch(err){
        req.flash('error', 'Error in creating user')
        req.flash('error', 'Error in finding user in signing up')
    }
    return res.redirect('back')
}

module.exports.createSession=function(req, res){
    console.log(`Create session: Request authenticated: ${req.isAuthenticated()}`)
    //console.log(`Create session: Request authenticated: ${req.user}`)
    req.flash('success', 'Logged in Successfully!')
    return res.redirect('/')
}


module.exports.updateUserProfile=async function(req, res){
    console.log(`In EditUserProfile`)
    try{
        console.log('ReQ.user in editUserProfile:', req.user)
        const user=await User.findById({_id: req.user.id})
        
        User.uploadedAvatar(req, res, function(err){
            if(err){
                console.log(`Multer Error: ${err}`)
                //req.flash('error', `Error in updating user: ${err}`)
                //return res.redirect('back')
            }

            console.log('User:', user)
            user.name=req.body.name!=''? req.body.name: user.name
            user.email=req.body.email!=''? req.body.email: user.email
            user.password=(req.body.password!='' && req.body.password==req.body.confirm_password)?req.body.password: user.password

            if(req.file){

                if(user.avatar){
                    //if user.avatar file exists
                    if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        //then only delete the file
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }
                }
                console.log('Req.file:', req.file)
                user.avatar=User.avatarPath+'/'+req.file.filename
            }
            user.save()


        })
        
        req.flash('success', 'User updation done Successfully!')
    }
    catch(err){
        req.flash('error', `Error in updating user: ${err}`)
    }

    return res.redirect('back')
}