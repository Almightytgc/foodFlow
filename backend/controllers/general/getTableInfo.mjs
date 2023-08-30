import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTableByUserId = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id_usuario);

        const mesa = await prisma.mesas.findFirst({
            where: {
                fk_usuario: id_usuario
            }
        });

        if (mesa) {
            return res.status(200).json(mesa);
        } else {
            return res.status(404).json({ message: "No se encontró una mesa para el usuario dado." });
        }
    } catch (error) {
        console.error("Error al obtener la mesa:", error);
        return res.status(500).json({ message: "Ocurrió un error al obtener la mesa." });
    }
};
