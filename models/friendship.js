const mongoose=require('mongoose')

const friendshipSchema=mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friendid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Friendship=mongoose.model('Friendship', friendshipSchema)
module.exports=Friendship

