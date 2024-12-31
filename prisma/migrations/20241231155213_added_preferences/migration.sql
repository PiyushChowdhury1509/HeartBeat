-- CreateTable
CREATE TABLE "Preferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ageRangeMin" INTEGER NOT NULL,
    "ageRangeMax" INTEGER NOT NULL,
    "distanceMax" INTEGER NOT NULL,
    "interests" TEXT[],

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");
