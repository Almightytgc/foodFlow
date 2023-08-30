import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const deleteEmployees = async (req, res) => {
  try {
    const eliminar = await prisma.usuarios.delete({
      where: {
        id_usuario: Number(req.params.id_usuario),
      },
    });
    res.status(200).json(eliminar);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: error.message });
  }
};
