-- CreateTable
CREATE TABLE `tb_card` (
    `cardId` BIGINT NOT NULL AUTO_INCREMENT,
    `userNo` BIGINT NOT NULL,
    `title` VARCHAR(256) NOT NULL,
    `content` TEXT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `valid` BOOLEAN NOT NULL DEFAULT true,
    `recruitAt` TIMESTAMP(0) NULL,
    `recruitNum` INTEGER NULL,

    INDEX `tb_card_FK`(`userNo`),
    PRIMARY KEY (`cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_like` (
    `likeId` BIGINT NOT NULL AUTO_INCREMENT,
    `likeType` INTEGER NOT NULL DEFAULT 0,
    `userNo` BIGINT NOT NULL,
    `cardId` BIGINT NULL,
    `replyId` BIGINT NULL,
    `valid` BOOLEAN NOT NULL DEFAULT true,

    INDEX `tb_like_FK`(`userNo`),
    INDEX `tb_like_FK_1`(`cardId`),
    INDEX `tb_like_FK_2`(`replyId`),
    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_reply` (
    `replyId` BIGINT NOT NULL AUTO_INCREMENT,
    `cardId` BIGINT NOT NULL,
    `userNo` BIGINT NOT NULL,
    `content` TEXT NOT NULL,
    `parentId` BIGINT NULL,
    `valid` BOOLEAN NOT NULL DEFAULT true,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `tb_reply_FK`(`cardId`),
    INDEX `tb_reply_FK_1`(`userNo`),
    PRIMARY KEY (`replyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user` (
    `userNo` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(64) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`userNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_card` ADD CONSTRAINT `tb_card_FK` FOREIGN KEY (`userNo`) REFERENCES `tb_user`(`userNo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_like` ADD CONSTRAINT `tb_like_FK` FOREIGN KEY (`userNo`) REFERENCES `tb_user`(`userNo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_like` ADD CONSTRAINT `tb_like_FK_1` FOREIGN KEY (`cardId`) REFERENCES `tb_card`(`cardId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_like` ADD CONSTRAINT `tb_like_FK_2` FOREIGN KEY (`replyId`) REFERENCES `tb_reply`(`replyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_reply` ADD CONSTRAINT `tb_reply_FK` FOREIGN KEY (`cardId`) REFERENCES `tb_card`(`cardId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_reply` ADD CONSTRAINT `tb_reply_FK_1` FOREIGN KEY (`userNo`) REFERENCES `tb_user`(`userNo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
