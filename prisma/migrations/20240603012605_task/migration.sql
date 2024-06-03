-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "time" TIMESTAMP(3),
    "urgency" TEXT,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
