import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const orderDelivered = async (req, res) => {
    const idOrden = parseInt(req.params.id_orden);

    const eliminarOrden = await prisma.orden.delete({
        where: {
            id_orden: idOrden
        }
    })

    if (eliminarOrden) {
        return res.status(200).json(eliminarOrden);
    } else {
        return res.status(500).json({msg: "Hubo en error en la ejecución"});
    }
}