/*
  Warnings:

  - You are about to drop the column `fk_producto` on the `orden` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `orden` DROP FOREIGN KEY `orden_fk_producto_fkey`;

-- AlterTable
ALTER TABLE `mesas` MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `orden` DROP COLUMN `fk_producto`;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;
