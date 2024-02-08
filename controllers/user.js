const user = require('../models/user');
const url = require('../models/url');
const {setUser } = require('../service/auth');
const bcryptjs = require('bcryptjs');


async function handleUerSingUp(req,res) {

    const {email , password , cpassword} = req.body;
    if(password!=cpassword){
        return res.json({message :"Password Not match" , error : 1})
    }

    try {
        await user.create({
            email : email,
            password : password
        })
        res.json({message : "Successfully Signup" , error : 0});
    } catch (error) {
        return res.json({message : "Email Address Already Register" , error : 1});
    }

 
}

async function handleUserLogin(req,res){

    const {email,password} = req.body;
    
    try {
        const data = await user.findOne({email});
        if(data===null || !(await bcryptjs.compare(password , data.password))){
            return res.json({message : "User Not Found" , error : 1});
        }

        const token = setUser(data);
        res.cookie("uid", token);

        res.json({message : "Successfully Login" , error : 0});
    } catch (error) {
        return res.json({message : "User Not Found" , error : 1})
        
    }
}

async function handleUserProfile (req,res){
    if(req.user==undefined){
        return res.redirect('../login')
    }

    try {
        const User = await user.findOne({_id : req.user._id}).populate('shortenedUrls');
        res.render('profile',{data : User.shortenedUrls});
    } catch (error) {
        res.send(error);
    }
}

async function handleLogout(res,res){
    res.clearCookie('uid');
    res.redirect('/')
}

module.exports = {
    handleUerSingUp,
    handleUserLogin,
    handleUserProfile,
    handleLogout
}