import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (req, res) => {
  const idUsuario = parseInt(req.params.id_usuario, 10);
  // console.log(idUsuario);

  try {
    const response = await prisma.usuarios.findFirst({
      where: {
        id_usuario: idUsuario
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.msg });
  }
};
