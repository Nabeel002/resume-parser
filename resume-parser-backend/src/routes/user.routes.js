const express = require('express');
const router  = express.Router();
const verifyToken = require('../middleware/auth.middleware');

router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.userName} (${req.user.email})! This is your profile.` })
})

module.exports = router;
