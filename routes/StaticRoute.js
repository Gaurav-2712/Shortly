const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/',async(req,res)=>{
    if(req.user===null)
    return res.render('index');

    res.render('index',{id : req.user._id})
    
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/signup',(req,res)=>{
    res.render('register')
})


module.exports = router;