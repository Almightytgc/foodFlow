-- AlterTable
ALTER TABLE `mesas` MODIFY `fk_usuario` INTEGER NULL DEFAULT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    MODIFY `salario` DOUBLE NULL DEFAULT NULL;

-- CreateTable
CREATE TABLE `_ordenToproductos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ordenToproductos_AB_unique`(`A`, `B`),
    INDEX `_ordenToproductos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ordenToproductos` ADD CONSTRAINT `_ordenToproductos_A_fkey` FOREIGN KEY (`A`) REFERENCES `orden`(`id_orden`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ordenToproductos` ADD CONSTRAINT `_ordenToproductos_B_fkey` FOREIGN KEY (`B`) REFERENCES `productos`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
