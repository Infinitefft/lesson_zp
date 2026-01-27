/*
  Warnings:

  - You are about to drop the column `file` on the `avatars` table. All the data in the column will be lost.
  - Added the required column `filename` to the `avatars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "file",
ADD COLUMN     "filename" VARCHAR(255) NOT NULL;
