const Post=require('../models/post')

module.exports.home=async function(req, res){
    // console.log(`Res session: ${res.user.id}`)
    //console.log(`REQ.cookies in home:`,req.cookies)
    try{
        res.locals.posts=await Post.find({
            user: req.user._id
        })
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        })
        
    }
    catch(err){
        console.log(`Err: ${err}`)
    }
    return res.render('home', {title:'Home'})
}