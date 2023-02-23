import express from 'express';

import authRoutes from './app/auth/auth.router.js';
import categoryRoutes from './app/category/category.router.js';

import dotenv from 'dotenv';
import morgan from 'morgan';

import 'colors';
import { prisma } from './app/prisma.js';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';

dotenv.config()

const app = express();

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/categories', categoryRoutes);

  app.use(notFound)
  app.use(errorHandler)

  const PORT = process.env.PORT || 5000

  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold)
  )
}

main()
  .then(async() => {
    await prisma.$disconnect()
  }).catch(async e => {
    console.log(e);
    await prisma.$disconnect()
    process.exit(1)
  })