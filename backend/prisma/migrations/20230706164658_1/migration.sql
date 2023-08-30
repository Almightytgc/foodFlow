-- CreateTable
CREATE TABLE `rol` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `contrasenia` VARCHAR(191) NOT NULL,
    `preguntaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    `respuestaSeguridad` VARCHAR(191) NULL DEFAULT NULL,
    `salario` DOUBLE NULL DEFAULT NULL,
    `fk_rol` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesas` (
    `id_mesa` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_mesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orden` (
    `id_orden` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_mesa` INTEGER NOT NULL,
    `fk_producto` INTEGER NOT NULL,
    `fk_usuario` INTEGER NOT NULL,
    `nota` VARCHAR(191) NULL DEFAULT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`id_orden`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_fk_rol_fkey` FOREIGN KEY (`fk_rol`) REFERENCES `rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden` ADD CONSTRAINT `orden_fk_mesa_fkey` FOREIGN KEY (`fk_mesa`) REFERENCES `mesas`(`id_mesa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden` ADD CONSTRAINT `orden_fk_producto_fkey` FOREIGN KEY (`fk_producto`) REFERENCES `productos`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden` ADD CONSTRAINT `orden_fk_usuario_fkey` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
