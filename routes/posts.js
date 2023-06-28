const express = require('express')
const router=express.Router()
const passport=require('passport')

const postController=require('../controllers/post_controller')


//if user accessing profile page is not logged in, redirect to signin
router.get('/profile', postController.post)

router.post('/create-post', 
    (req, res, next)=>{
        console.log(`THIS IS WORKING`)
        next()
    },
    passport.checkAuthentication,    
    postController.createPost
)

router.get('/delete-post/:id', 
    (req, res, next)=>{
        console.log('In DELETE POST')
        next()
    }, 
    passport.checkAuthentication, 
    postController.deletePost
)



module.exports=router