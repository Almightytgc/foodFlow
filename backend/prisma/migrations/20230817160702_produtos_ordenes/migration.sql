-- AlterTable
ALTER TABLE `mesas` MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- CreateTable
CREATE TABLE `productosPedidos` (
    `id_productosPedidos` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `id_orden` INTEGER NOT NULL,

    PRIMARY KEY (`id_productosPedidos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productosPedidos` ADD CONSTRAINT `productosPedidos_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productosPedidos` ADD CONSTRAINT `productosPedidos_id_orden_fkey` FOREIGN KEY (`id_orden`) REFERENCES `orden`(`id_orden`) ON DELETE RESTRICT ON UPDATE CASCADE;
