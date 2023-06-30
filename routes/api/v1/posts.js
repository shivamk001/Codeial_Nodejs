const express=require('express')
const router=express.Router()
const passport=require('passport')
const postApi=require('../../../controllers/api/v1/posts_api')

router.get('/', (req, res, next)=>{console.log('In get'); next()}, postApi.index)
router.delete('/:id', passport.authenticate('jwt', {session: false}), postApi.deletePost)

module.exports=router;