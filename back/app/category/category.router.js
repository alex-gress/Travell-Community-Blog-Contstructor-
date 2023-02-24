import express from 'express';
import { getAllCategories, createNewCategory, getCategory, deleteCategory, updateCategory } from './category.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
    .get(getAllCategories)
    .post(protect, createNewCategory)

router
  .route('/:name')
    .get(getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory)

export default router;