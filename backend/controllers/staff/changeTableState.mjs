    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();

    export const changeTableState = async (req, res) => {
        const idMesa = parseInt(req.params.id_mesa);
        // console.log(idMesa);
        try {
            const cambiarEstado = await prisma.mesas.update({
                where: {id_mesa: idMesa},
                data: {fk_usuario: null}
            })
        res.status(200).json(cambiarEstado);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Algo salió mal"})
        }

    }