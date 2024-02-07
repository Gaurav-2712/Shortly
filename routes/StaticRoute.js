const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/',async(req,res)=>{
    res.render('index');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/signup',(req,res)=>{
    res.render('register')
})


module.exports = router;