/*
  Warnings:

  - You are about to drop the column `detallesProductos` on the `orden` table. All the data in the column will be lost.
  - Added the required column `productos` to the `orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesas` MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `orden` DROP COLUMN `detallesProductos`,
    ADD COLUMN `productos` JSON NOT NULL;

-- AlterTable
ALTER TABLE `productos` MODIFY `foto` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;
