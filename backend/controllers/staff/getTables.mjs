import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTables = async (req, res) => {
  const obtenerMesas = await prisma.mesas.findMany({
    where: {
      fk_usuario: {
        not: { equals: null }
      },
    },
    include: {
      usuario: {
        select: { nombres: true},
      },
    },
  });

  obtenerMesas
    ? res.status(200).json(obtenerMesas)
    : res.status(500).json({ msg: "algo falló en la ejecución" });
};
