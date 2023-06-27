const express=require('express')
const router=express.Router()
const passport=require('passport')
const commentController=require('../controllers/comment_controller')

// My solution
// router.post('/create-comment/:postid', passport.checkAuthentication, commentController.createComment);

router.post('/create-comment', passport.checkAuthentication, commentController.createComment);

module.exports=router;