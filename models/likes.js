const mongoose=require('mongoose');

const likeSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel:{
        type: String,
        required: true,
        enum:['Comment', 'Post']
    }
    },
    {
        timestamps: true
    }
)

const Like=mongoose.model('Like', likeSchema)
module.exports=Like;