const express = require('express');
const videoRouter=require('./videos.route');

const router=express.Router();

router.use('/videos', videoRouter);
module.exports=router;