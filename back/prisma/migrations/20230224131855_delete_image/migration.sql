/*
  Warnings:

  - You are about to drop the column `dataImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `filenameImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `mimetypeImage` on the `Post` table. All the data in the column will be lost.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "dataImage",
DROP COLUMN "filenameImage",
DROP COLUMN "mimetypeImage",
ADD COLUMN     "image" TEXT NOT NULL;
