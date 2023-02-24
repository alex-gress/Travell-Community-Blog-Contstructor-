
import  asyncHandler  from 'express-async-handler';
import { prisma } from './../prisma.js';
import { userProfileFields } from '../utils/user.utils.js';
import { hash } from 'argon2';
// import { imageUpload } from './../utils/imageUploader.utils.js';

export const profileUser = asyncHandler(async(req,res) => {
  try {
    const profile = await prisma.user.findUnique({
      where: {
        name: req.params.name
      },
      select: userProfileFields,
    })
  
    res.json(profile)
  } catch (err) {
    res.status
  }
})

export const updateProfileUser = asyncHandler(async(req,res) => {
  const {name, email, password, bio} = req.body;

  try {
    let profile = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      }
    })

    if (email && email !=profile.email) { //! EMAIL CHECKING
      const isHaveEmail = await prisma.user.findUnique({
        where: {
          email
        }
      })
    
      if (isHaveEmail) {
        res.status(400)
        throw new Error('Email already exits')
      }
    }

    if (name && name != profile.name) { //! NAME CHECKING
      const isHaveName = await prisma.user.findUnique({
        where: {
          name
        }
      })

      if (isHaveName) {
        res.status(400)
        throw new Error('Name already exits')
      }
    }

    profile = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name, 
        email,
        password: await hash(password),
        bio
      }
    })

    res.json(profile)
  } catch(err) {
    res.status(404)
    throw new Error("User Not found")
  }
})