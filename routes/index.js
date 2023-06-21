const express=require('express')
const router=express.Router()

const homeController=require('../controllers/home_controller')
const postController=require('../controllers/post_controller')

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', postController.post);
//for any further routes, access from here
//router.use('/routerName', require('/routerFile'))

module.exports=router;