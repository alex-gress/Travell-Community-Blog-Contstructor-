import  asyncHandler from 'express-async-handler';
import { prisma } from './../prisma.js';

// @desc     create new category
// @route    POST categories
// @access  Private
export const createNewCategory = asyncHandler(async(req,res) => {
  const {name} = req.body;

  const isCategoryHave = await prisma.category.findUnique({
    where: {
      name
    }
  })

  if (isCategoryHave) {
    res.status(400)
    throw new Error("Category has already been created")
  }

  const category = await prisma.category.create({
    data: {
      name
    }
  })

  res.json(category)
})

// @desc     get  all categories
// @route    GET categories
// @access  Public
export const getAllCategories = asyncHandler(async(req,res) => {
  const categories = await prisma.category.findMany({
    include: {
      posts: true
    }
  })

  res.json({
    "count": categories.length,
    "categories": categories
  })
})

// @desc     get  category
// @route    GET category
// @access  Public
export const getCategory = asyncHandler(async(req,res) => {
  try {
    const category = await prisma.category.findUnique({
      where: req.params,
      include: {
        posts: true
      }
    })
    
    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error("Category not found")
    }
  } catch (err) {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc     update  category
// @route    PUT category
// @access  Private
export const updateCategory = asyncHandler(async(req,res) => {
  const {name} = req.body
  try {
    const category = await prisma.category.findUnique({
      where: req.params,
      data: {
        name
      }
    })

    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error("Category not found")
    }
  } catch (err) {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc     delete  category
// @route    DELETE category
// @access  Private
export const deleteCategory = asyncHandler(async(req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        name: req.params.name
      }
    })

    res.json("Category Has been deleted successfully")
  } catch (err) {
    res.status(404)
    throw new Error("Category not found")
  }
})