/*
  Warnings:

  - You are about to drop the column `estado` on the `mesas` table. All the data in the column will be lost.
  - You are about to drop the `productospedidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productospedidos` DROP FOREIGN KEY `productosPedidos_id_orden_fkey`;

-- DropForeignKey
ALTER TABLE `productospedidos` DROP FOREIGN KEY `productosPedidos_id_producto_fkey`;

-- AlterTable
ALTER TABLE `mesas` DROP COLUMN `estado`,
    MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- DropTable
DROP TABLE `productospedidos`;
