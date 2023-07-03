const Comment=require('../models/comment')
const Post=require('../models/post')
const User=require('../models/user')
const commentMailer=require('../mailers/comments_mailer');

module.exports.createComment=async function(req, res){
    console.log(`Comment: ${req.body.content}`)
    console.log(`User: ${req.user._id}`)
    // console.log(req.params)
    // console.log(`Post: ${req.params.postid}`)

    console.log(`Post: ${req.body.post}`)

    try{
        const post=await Post.findById(req.body.post);
        console.log(`Try Post: ${post}`)
        if(post){
            let comment=await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            comment=await Comment.findById(comment._id).populate('user')
            req.flash('success', `Comment Created`)
            post.comments.push(comment);
            post.save();
            console.log(`If Post Saved: ${comment}`)
            console.log(commentMailer.newComment(comment));
        }
    }
    catch(err){
        console.log('Error in creating comment:', err)
        req.flash('error',err)
    }
    return res.redirect('back')
}

module.exports.deleteComment=async function(req, res){
    console.log(`IN DELETE COMMENT`)
    try{
        const commentid=req.params.commentid

        console.log('Delete the comment:', commentid)

        let comment=await Comment.findById({_id: commentid}).populate('user').populate('post')
        //console.log('Comment:', comment)

        let postid=comment.post._id;
        const post=await Post.findById({_id: postid})      
            .populate({
            path: 'comments'
        })
        //console.log('Post:', post)

        comment=await Comment.deleteOne({_id: commentid});
        

        post.comments.pull({_id: commentid})
        post.save();

        req.flash('success', `Comment Deleted`)
        //return res.redirect('back')
    }
    catch(err){
        req.flash('error',err)
    }
    return res.redirect('back')
}