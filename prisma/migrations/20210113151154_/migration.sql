/*
  Warnings:

  - Added the required column `id_trip` to the `step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `step` ADD COLUMN     `id_trip` INT NOT NULL;

-- AlterTable
ALTER TABLE `trip` ADD COLUMN     `id_user` INT NOT NULL;

-- AddForeignKey
ALTER TABLE `step` ADD FOREIGN KEY (`id_trip`) REFERENCES `trip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip` ADD FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
