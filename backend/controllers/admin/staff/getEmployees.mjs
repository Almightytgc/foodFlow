import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmployees = async (req, res) => {
    try {
      const response = await prisma.usuarios.findMany({
        where: {
          AND: [
            {
              fk_rol: {
                gt: 1,
              },
            },
            {
              fk_rol: {
                lt: 4,
              },
            },
          ],
        },
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.msg });
    }
  };