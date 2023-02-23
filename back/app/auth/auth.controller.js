import {hash, verify}  from 'argon2';
import {prisma} from './../prisma.js'
import asyncHandler from 'express-async-handler';
import { generateToken } from './generate-token.js';
import { userRegistrationFields } from './../utils/user.utils.js';

// @desc     Login 
// @route    POST auth/login
// @access  Public
export const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  const isValidPassword = await verify(user.password, password)

  if (user && isValidPassword) {
    const token = generateToken(user.id)
    res.json({user, token})
  } else {
    res.status(404)
    throw new Error('Email Or Password are not correct')
  }

  res.json(email);
})


// @desc     Register 
// @route    POST auth/register
// @access  Public
export const registerUser = asyncHandler(async (req,res) => {
  const {name, email, password} = req.body

  const isHaveUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (isHaveUser) {
    res.status(400)
    throw new Error('User already exits')
  }

  const user = await prisma.user.create({
    data: {
        name,
        email,
        password: await hash(password),

        image: "",
        bio: ""
      },
      select: userRegistrationFields
  })

  const token = generateToken(user.id)

  res.json({token})
})