const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');


// @des: Register a new user
// @route: POST /api/users
// @access: Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash pw
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPass
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
})

// @des: Login
// @route: POST /api/users/login
// @access: Public

const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  // check for email
  const user = await User.findOne({ email });

  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
})

// @des: Get user info
// @route: GET /api/users/me
// @access: Private

const getUserInfo = asyncHandler(async(req, res) => {
  res.status(200).json(req.user);
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo
}