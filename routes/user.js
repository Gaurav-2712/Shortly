const express = require('express');
const {handleUerSingUp , handleUserLogin , handleUserProfile , handleLogout} = require('../controllers/user')

const router = express.Router();

router.post('/signup',handleUerSingUp)

router.post('/login',handleUserLogin);

router.get('/profile',handleUserProfile)

router.get('/logout',handleLogout)

module.exports = router;