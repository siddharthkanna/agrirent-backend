/*
  Warnings:

  - You are about to drop the column `available` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - Added the required column `condition` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryMode` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentalPrice` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "available",
DROP COLUMN "price",
ADD COLUMN     "availabilityDates" TEXT[],
ADD COLUMN     "category" TEXT,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "deliveryMode" TEXT NOT NULL,
ADD COLUMN     "features" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "rentalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "renterId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar";
