const Post=require('../models/post')
const User=require('../models/user')

module.exports.home=async function(req, res){
    // console.log(`Res session: ${res.user.id}`)
    //console.log(`REQ.cookies in home:`,req.cookies)
    try{
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
        console.log(`All Users;`, res.locals.allUsers)
    }
    catch(err){
        console.log(`Err: ${err}`)
    }
    return res.render('home', {title:'Home'})
}