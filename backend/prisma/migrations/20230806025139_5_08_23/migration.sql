/*
  Warnings:

  - Added the required column `fk_usuario` to the `mesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesas` ADD COLUMN `fk_usuario` INTEGER NOT NULL,
    ADD COLUMN `rolId_rol` INTEGER NULL;

-- AlterTable
ALTER TABLE `orden` MODIFY `nota` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- AddForeignKey
ALTER TABLE `mesas` ADD CONSTRAINT `mesas_fk_usuario_fkey` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mesas` ADD CONSTRAINT `mesas_rolId_rol_fkey` FOREIGN KEY (`rolId_rol`) REFERENCES `rol`(`id_rol`) ON DELETE SET NULL ON UPDATE CASCADE;
