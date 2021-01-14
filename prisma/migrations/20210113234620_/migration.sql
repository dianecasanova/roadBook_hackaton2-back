-- CreateTable
CREATE TABLE `step` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `duration` INT,
    `description` VARCHAR(191),
    `media_path` VARCHAR(191),
    `id_trip` INT NOT NULL,
INDEX `step_user_FK`(`id_trip`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `duration` INT,
    `description` VARCHAR(191),
    `id_user` INT NOT NULL,
INDEX `trip_user_FK`(`id_user`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `step` ADD FOREIGN KEY (`id_trip`) REFERENCES `trip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip` ADD FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
