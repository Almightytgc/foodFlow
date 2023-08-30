import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const addComment = async (req, res) => {
  const { comment, id_usuario } = req.body;

  try {
    const sendComment = await prisma.comentarios.create({
      data: {
        comentario: comment,
        fk_usuario: id_usuario,
      },
    });

    res.status(200).json(sendComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


