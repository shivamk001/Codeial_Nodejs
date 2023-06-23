const User=require('../models/user')

module.exports.profile=async function(req, res){
    console.log(`4. Cookie: ${req.cookies.user_id}`)
    if(req.cookies.user_id){
        const user=await User.findById(req.cookies.user_id)

        if(user){
            return res.render('user_profile', {title: 'Codial | Profile', user: user})
        }
        return res.redirect('/users/signin')
    }
    else{
        return res.redirect('/users/signin')
    }
   
}


module.exports.signup=function(req, res){
    return res.render('user_signup', {title: 'Codial | Sign Up'})
}

module.exports.signin=function(req, res){
    return res.render('user_signin', {title: 'Codial | Sign In'})
}

module.exports.create=async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    const user=await User.findOne({email: req.body.email});

        console.log('DATA:',user)
        console.log('Req Data:', req.body)
        if(!user){        
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
}

module.exports.createSession=async function(req, res){
    //find the user
    console.log(`Email: ${req.body.email}`)
    const user= await User.findOne({email: req.body.email})

    console.log(`51. User: ${user}`)

        console.log(`54. User: ${user}`)
        console.log(`55. Body: ${req.body}`)
        //handle user found
        if(user){
            //handle password which doesnt match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            console.log(`64, ${req.cookies.user_id}`)
            return res.redirect('/users/profile')
        }
        else{
            //handle user not found
            return res.redirect('back');
        }
        // console.log(`76 Error in finding user in sign in`);
        // return res.redirect('back');
}


module.exports.signout=function(req, res){
    console.log(`Signout: ${req.cookies.user_id}`)
    res.clearCookie('user_id')
    return res.redirect('/users/signin')
}