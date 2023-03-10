/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
