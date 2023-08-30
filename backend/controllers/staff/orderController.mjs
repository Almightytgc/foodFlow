import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { cart } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        items: {
          createMany: {
            data: cart.map(item => ({
              product_id: item.id_producto,
              quantity: item.cantidad
            }))
          }
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "Ocurrió un error al crear el pedido" });
  }
};

export { createOrder };
