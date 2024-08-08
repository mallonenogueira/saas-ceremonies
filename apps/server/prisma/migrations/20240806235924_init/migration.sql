/*
  Warnings:

  - Added the required column `zip_code` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "zip_code" TEXT NOT NULL;
