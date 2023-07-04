const Post=require('../models/post')
const Like=require('../models/likes')
const Comment=require('../models/comment')


module.exports.toggleLike=async function(req, res){
    try{
        console.log('Like button clicked', req.query.type, req.query.id);
        
    
        let likeable;
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id)
        }
        else{
            likeable=await Comment.findById(req.query.id)
        }
        console.log('Likeable:', likeable)

        let existingLike=await Like.findOne({
            likeable: likeable._id,
            onModel: req.query.type,
            user: req.user._id
        })
        console.log('Existing Like:', existingLike)
        if(existingLike){
            likeable.likes.pull({_id: existingLike._id})
            likeable.save();
            let deleted=await Like.findByIdAndDelete({_id: existingLike._id})
            console.log('Deleted:', deleted)
        }
        else{
            console.log(likeable.likes)
            let newLike=await Like.create({
                user: req.user._id,
                likeable: likeable._id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id)
            likeable.save()
            console.log(likeable.likes)
            console.log('Created:', newLike)
        }
        return res.redirect('back')
    }
    catch(err){
        console.log(err);
        return;
    }



}