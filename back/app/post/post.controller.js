import  asyncHandler  from 'express-async-handler';
import { prisma } from './../prisma.js';

// @desc     create nw post
// @route    POST posts
// @access  Private
export const createNewPost = asyncHandler(async(req,res) => {
  const {title, text, category} = req.body;

  let slug = title.toLowerCase();
  let new_slug = ''

  for (let i of slug) {
    if (i == ' ') {
      new_slug += '-'
    } else {
      new_slug += i
    }
  }

  const isHaveSlug = await prisma.post.findUnique({
    where: {
      slug: new_slug
    }
  })

  if (isHaveSlug) {
    res.status(404);
    throw new Error('Slug not found')
  }

  const post = await prisma.post.create({
    data: {
      title, 
      slug: new_slug,
      user: req.user.id,
      text,
      category
    }
  })

  res.json(post)
})

// @desc     get all posts
// @route    GET posts
// @access  Public
export const AllPosts = asyncHandler(async(req,res) => {
  const posts = await prisma.post.findMany()

  res.json(posts)
})

// @desc     get one  post
// @route    GET posts/slug
// @access  Public
export const getPost = asyncHandler(async(req,res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: req.params.slug
      }
    })

    res.status(post)
  }catch(err) {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc     update post
// @route    PUT posts/slug
// @access  Private
export const updatePost = asyncHandler(async(req,res) => {
  const {title, text, category} = req.body
  try {
    const post = await prisma.post.update({
      where: {
        slug: req.params.slug
      },
      data: {
        title, text, category
      }
    })

    res.status(post)
  } catch (err) {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc     delete post
// @route    DELETE posts/slug
// @access  Private
export const deletePost = asyncHandler(async(req,res) => {
  try {
    const post = await prisma.post.delete({
      where: {
        slug: req.params.slug
      }
    })

    res.json("Post has been deleted successfully")
  } catch (err) {
    res.status(404)
    throw new Error('Post not found')
  }
})