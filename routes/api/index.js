const express=require('express')
const router=express.Router()

router.use('/v1', (req, res, next)=>{console.log('v1'); next()},require('./v1'))
router.use('/v2', require('./v2'))
module.exports=router;