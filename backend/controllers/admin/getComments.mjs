import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComments = async (req, res) => {
    try {
      const readComments = await prisma.comentarios.findMany({
        include: {
          autor: {
            select: {
              nombres: true,
              usuario: true
            }
          }
        }
      });
      res.status(200).json(readComments);
    } catch (error) {
      console.log(error);
      res.status(500).json({msg: error.message});
    }
  }