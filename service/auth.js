const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTKEY


function setUser(user){
    const payload = {
        _id : user._id,
        email : user.email
        
    }
    return jwt.sign(payload,secretKey);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}