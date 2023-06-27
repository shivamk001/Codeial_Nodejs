const Post=require('../models/post')


module.exports.post=function(req, res){
    return res.render('user_profile')
}


module.exports.createPost=async function(req, res){
    console.log(`CREATE POST: ${req.body.content}`)
    console.log(`USER; ${req.user._id}`)
    try{
        const post=await Post.create({content: req.body.content, user: req.user._id})
        console.log(`Post created: ${post}`)
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
        console.log(`Error while creating post: ${err}`)
    }
    
    return res.redirect('back')
}