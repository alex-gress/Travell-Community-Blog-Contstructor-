import express from 'express';
import { getAllCategories, createNewCategory, getCategory } from './category.controller.js';

const router = express.Router();

router
  .route('/')
    .get(getAllCategories)
    .post(createNewCategory)

router
  .route('/:name')
    .get(getCategory)

export default router;