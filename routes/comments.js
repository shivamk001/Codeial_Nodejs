const express=require('express')
const router=express.Router()
const passport=require('passport')
const commentController=require('../controllers/comment_controller')

// My solution
// router.post('/create-comment/:postid', passport.checkAuthentication, commentController.createComment);

router.post('/create-comment', passport.checkAuthentication, commentController.createComment);
// router.get('/delete-comment/:commentid/:postid/:userid', passport.checkAuthentication, commentController.deleteComment);
router.get('/delete-comment/:commentid', passport.checkAuthentication, commentController.deleteComment);
module.exports=router;