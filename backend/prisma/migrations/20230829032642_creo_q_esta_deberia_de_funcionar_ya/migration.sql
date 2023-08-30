/*
  Warnings:

  - You are about to drop the `_ordentoproductos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `detallesProductos` to the `orden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ordentoproductos` DROP FOREIGN KEY `_ordenToproductos_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordentoproductos` DROP FOREIGN KEY `_ordenToproductos_B_fkey`;

-- AlterTable
ALTER TABLE `mesas` MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `orden` ADD COLUMN `detallesProductos` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `productos` MODIFY `foto` VARCHAR(191) NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- DropTable
DROP TABLE `_ordentoproductos`;
