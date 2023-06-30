const Post=require('../../../models/post')
const Comment=require('../../../models/comment')

module.exports.index=async function(req, res){

    let posts=await Post.find({
        // user: req.user._id
    })
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })

    return res.status(200).json( {
        message: "List of posts v1",
        posts:posts
    })
}

module.exports.deletePost=async function(req, res){
    try{
        console.log(`In deletePost:`, req.params.id)
        const post=await Post.findById(req.params.id)

        if(post.user==req.user.id){
            await Post.deleteOne({_id: req.params.id});
            await Comment.deleteMany({post: req.params.id});
            return res.status(200).json({
                message: 'Post and associated comments deleted successfully'
            })
        }
        else{
            return res.status(401).json({
                message: "You cannot delete this post"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal Server Error',
            err: err
        })
    }
}