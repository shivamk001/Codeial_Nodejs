const express=require('express')
const router=express.Router()
const colors=require('colors')
const homeController=require('../controllers/home_controller')
const postController=require('../controllers/post_controller')
const passport=require('passport')

router.use((req,res,next)=>{console.log(colors.green.bgMagenta('URL: %s'), req.url); next()})
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'))
router.use('/api', require('./api'))
//for any further routes, access from here
//router.use('/routerName', require('/routerFile'))

module.exports=router;