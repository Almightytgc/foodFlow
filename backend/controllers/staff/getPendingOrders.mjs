import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPendingOrders = async (req, res) => {

  try {
    const orders = await prisma.orden.findMany({
      include: {
        mesa: {
          select: {
            token: true
          }
        }
      }
    });

    if (orders) {
      const ordersWithProductNames = orders.map(order => {
        const products = JSON.parse(order.productos);
        const productNames = products.map(product => product.nombre).join(", \n");
        return {
          ...order,
          productos: productNames
        };
      });

      return res.status(200).json(ordersWithProductNames);
    } else {
      return res.status(500).json({msg: "Error al cargar las ordenes pendientes"});
    }
  } catch (error) {
    return res.status(500).json({msg: "Error al cargar las ordenes pendientes"});
  }

}

