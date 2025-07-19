-- CreateTable
CREATE TABLE "Artist" (
    "mb_artist_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_name" TEXT,
    "country_code" TEXT,
    "type" TEXT,
    "formed_year" INTEGER,
    "disbanded_year" INTEGER,
    "ext_json" JSONB,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("mb_artist_id")
);

-- CreateTable
CREATE TABLE "ReleaseGroup" (
    "mb_release_group_id" TEXT NOT NULL,
    "primary_type" TEXT,
    "title" TEXT NOT NULL,
    "first_release_date" TIMESTAMP(3),
    "ext_json" JSONB,

    CONSTRAINT "ReleaseGroup_pkey" PRIMARY KEY ("mb_release_group_id")
);

-- CreateTable
CREATE TABLE "Release" (
    "mb_release_id" TEXT NOT NULL,
    "release_group_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "country" TEXT,
    "label" TEXT,
    "barcode" TEXT,
    "catalog_no" TEXT,
    "langauge_code" TEXT,
    "script_code" TEXT,
    "ext_json" JSONB,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("mb_release_id")
);

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_release_group_id_fkey" FOREIGN KEY ("release_group_id") REFERENCES "ReleaseGroup"("mb_release_group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
