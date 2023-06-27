const Comment=require('../models/comment')
const Post=require('../models/post')

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
                post: req.params.postid
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