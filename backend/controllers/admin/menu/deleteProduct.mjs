import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import url from "url";

const prisma = new PrismaClient();

export const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id_producto);

  const findProductName = await prisma.productos.findFirst({
    where: {
      id_producto: productId,
    },
  });

  if (!findProductName) {
    return res.status(404).json({ msg: "El producto no fue encontrado" });
  }

  const fileName = findProductName.foto.split("/producto/").pop();


  const eliminarFotoProducto = async (filePath) => {
    try {
      await fs.unlink(filePath);
      // console.log("Foto borrada exitosamente");
    } catch (error) {
      return console.log("Error al eliminar el archivo", error);
    }
  };

  // Obtener la ruta del archivo actual y convertirla en ruta de sistema de archivos
  const currentFilePath = url.fileURLToPath(import.meta.url);
  const filePath = path.join(path.dirname(currentFilePath), "/producto", fileName);

  try {
    await eliminarFotoProducto(filePath); // Eliminar la foto
    await prisma.productos.delete({
      where: {id_producto: findProductName.id_producto,}
    });

    // console.log("El producto y la foto se borraron exitosamente");
    return res.status(200).json({ msg: "El producto y la foto se borraron exitosamente" });

  } catch (error) {
    // console.error("Error al borrar el producto o la foto:", error);
    return res.status(500).json({ msg: "Hubo un error al borrar el producto o la foto" });
  }
};
