import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTableByUserId = async (req, res) => {

    const id_usuario = parseInt(req.params.id_usuario);

    const obtenerMesa = await prisma.mesas.findFirst({
        where: {
            fk_usuario: id_usuario
        }
    })

    if (obtenerMesa) {
        // console.log("el id de la mesa encontrada es ", obtenerMesa.id_mesa);
        return res.status(200).json(obtenerMesa);
    } else {
        return res.json(null);
    } 
} 