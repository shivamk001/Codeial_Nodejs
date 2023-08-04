const colors=require('colors')
const Post=require('../models/post')
const User=require('../models/user')

module.exports.home=async function(req, res){
    // console.log(`Res session: ${res.user.id}`)
    //console.log(`REQ.cookies in home:`,req.cookies)
    //console.log(colors.green('Home %s'), req.user.email)
    try{
        console.log('Home', res.locals)
        res.locals.posts=await Post.find({
            // user: req.user._id
        })
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        })

        res.locals.allUsers=await User.find({})
        //console.log(`All Users;`, res.locals.allUsers)
    }
    catch(err){
        req.flash('error',err)
    }
    return res.render('home', {title:'Home'})
}