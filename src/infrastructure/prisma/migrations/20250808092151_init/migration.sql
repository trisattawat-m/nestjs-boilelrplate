/*
  Warnings:

  - You are about to drop the `DahuaEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."DahuaEvent";

-- CreateTable
CREATE TABLE "public"."dahuaEvent" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "dahuaEvent_pkey" PRIMARY KEY ("id")
);
