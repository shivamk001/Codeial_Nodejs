const express = require('express')
const router=express.Router()
const passport=require('passport')

const userController=require('../controllers/user_controller')


//if user accessing profile page is not logged in, redirect to signin
router.get('/profile/:userid', passport.checkAuthentication, userController.profile)

router.get('/signup', userController.signup)
router.get('/signin', userController.signin)
router.get('/signout', userController.signout)
router.post('/create', userController.create)
router.post('/create-session', 
(req, res, next)=>{
    console.log(`Before: ${req.user}`)
    next()
},
//to authenticate requests
    passport.authenticate(
        'local',
        {failureRedirect: '/users/signin'}
    ),
    userController.createSession
)

router.post('/update-profile', passport.checkAuthentication, userController.updateUserProfile)

module.exports=router