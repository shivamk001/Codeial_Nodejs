const Comment=require('../models/comment')
const Post=require('../models/post')
const User=require('../models/user')

module.exports.createComment=async function(req, res){
    console.log(`Comment: ${req.body.content}`)
    console.log(`User: ${req.user._id}`)
    // console.log(req.params)
    // console.log(`Post: ${req.params.postid}`)

    console.log(`Post: ${req.body.post}`)

    try{
        const post=await Post.findById(req.body.post);

        if(post){
            const comment=await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            console.log(`Comment Created: ${comment}`)
            post.comments.push(comment);
            post.save();
        }
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
    return res.redirect('back')
}

module.exports.deleteComment=async function(req, res){
    console.log(`IN DELETE COMMENT`)
    try{
        const commentid=req.params.commentid

        console.log('Delete the comment:', commentid)

        let comment=await Comment.findById({_id: commentid}).populate('user').populate('post')
        console.log('Comment:', comment)

        let postid=comment.post._id;
        const post=await Post.findById({_id: postid})      
            .populate({
            path: 'comments'
        })
        console.log('Post:', post)

        comment=await Comment.deleteOne({_id: commentid});
        console.log('Comment Deleted:', comment)

        post.comments.pull({_id: commentid})
        post.save();
        
        return res.redirect('back')
    }
    catch(err){
        console.log(`Error in deleteing comment: ${err}`)
    }
    return res.redirect('back')
}