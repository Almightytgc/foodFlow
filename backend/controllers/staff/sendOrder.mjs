import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendOrder = async (req, res) => {
  try {
    // Obtener los datos necesarios del cuerpo de la solicitud
    const { idMesa, productos, total } = req.body;

    // Buscar el mesero con id_rol de 2
    const mesero = await prisma.usuarios.findFirst({
      where: {
        fk_rol: 2,
      },
    });

    if (!mesero) {
      return res.status(400).json({ error: "No se encontró el mesero" });
    }

    // Crear la orden con el mesero correcto y los detalles de productos
    const detallesProductos = JSON.stringify(productos); // Almacenar los detalles de productos en formato JSON

    const orden = await prisma.orden.create({
      data: {
        fk_mesa: idMesa,
        fk_usuario: mesero.id_usuario,
        total: total,
        productos: JSON.stringify(productos) // Convertir el arreglo a una cadena JSON
      },
    });

    res.status(201).json({ message: "Orden creada con éxito", orden });
  } catch (error) {
    console.error("Error al enviar la orden:", error);
    res.status(500).json({ error: "Ocurrió un error al enviar la orden" });
  }
};