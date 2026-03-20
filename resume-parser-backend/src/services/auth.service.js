const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.signup = async ({email, password})=>{
    const exisitingUser = User.findOne({email});

    if(exisitingUser){
        throw new Error('User already exist')
    }

    // hash Passowrd
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password:hashPassword
    })


    return user

}


exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return token
}