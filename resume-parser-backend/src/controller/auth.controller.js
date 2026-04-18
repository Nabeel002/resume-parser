// src/controllers/auth.controller.js
const authService = require('../services/auth.service')
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { generateAccessToken } = require('../utils/tokens')
exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body)
    res.status(201).json({ message: 'User created', user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { token, refreshToken } = await authService.login(req.body);

     res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    })

    res.json({ token, refreshToken })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: 'No refresh token' })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
  
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: `Invalid refresh token ${token}`})
    }
    const newAccessToken  = generateAccessToken(user)
  
  
    res.cookie('accessToken',newAccessToken,{
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    })
  
    res.json({message: 'Access token refreshed'})
  }
  catch(err){
    res.status(401).json({ message: 'Invalid refresh token' })
  }
}