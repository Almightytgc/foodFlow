/*
  Warnings:

  - You are about to drop the column `rolId_rol` on the `mesas` table. All the data in the column will be lost.
  - You are about to drop the column `nota` on the `orden` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `mesas` DROP FOREIGN KEY `mesas_fk_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `mesas` DROP FOREIGN KEY `mesas_rolId_rol_fkey`;

-- AlterTable
ALTER TABLE `mesas` DROP COLUMN `rolId_rol`,
    MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `orden` DROP COLUMN `nota`;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- AddForeignKey
ALTER TABLE `mesas` ADD CONSTRAINT `mesas_fk_usuario_fkey` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
