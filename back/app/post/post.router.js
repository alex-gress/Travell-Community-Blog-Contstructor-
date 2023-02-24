import express from 'express';
import { AllPosts, createNewPost, deletePost, getPost, updatePost } from './post.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('')
    .post(protect, createNewPost)
    .get(AllPosts)

router
  .route('/:slug')
    .get(getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost)

export default router;