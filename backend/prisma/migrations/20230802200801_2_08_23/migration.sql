-- AlterTable
ALTER TABLE `orden` MODIFY `nota` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- CreateTable
CREATE TABLE `comentarios` (
    `id_comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario` VARCHAR(191) NOT NULL,
    `fk_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_fk_usuario_fkey` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
