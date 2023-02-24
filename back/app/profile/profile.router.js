import express from 'express';
import { profileUser, updateProfileUser } from './profile.controller.js';
import { protect } from './../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/:name')
    .get(profileUser)
    .put(protect, updateProfileUser)

export default router