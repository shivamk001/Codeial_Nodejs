const Post=require('../models/post')
const Comment=require('../models/comment')
const Like=require('../models/likes')
module.exports.post=function(req, res){
    return res.render('user_profile')
}


module.exports.createPost=async function(req, res){
    //console.log(`CREATE POST: ${req.body.content}`)
    //console.log(`USER; ${req.user._id}`)
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
        res.locals.liked=false
        req.flash('success',`Post created successfully`)
    }
    catch(err){
        req.flash('error',`Error while creating post: ${err}`)
    }
    
    return res.redirect('back')
}

module.exports.deletePost=async function(req, res){
    console.log('In delete POST')
    try{
        const post=await Post.findById(req.params.id)

        if(post.user==req.user.id){
            const post=await Post.findById({_id: req.params.id});
            console.log('POST::', post)
            //delete comments
            const comments=await Comment.deleteMany({post: req.params.id});
            //delete likes
            const likes=await Like.deleteMany({onModel: 'Post', likeable: req.params.id});
            //delete likes of comments also
            const deleteLikeComs=await Like.deleteMany({onModel: 'Post', likeable: post.comments});
            post=await Post.deleteOne({_id: req.params.id});
            console.log('COMMENTS AND LIKES:', comments, likes, deleteLikeComs)
            req.flash('success',`Post and associated comments deleted successfully`)
            //return res.redirect('back')
        }
    }
    catch(err){
        req.flash('error',`Error in deleteing post: ${err}`)
    }
    return res.redirect('back')
}