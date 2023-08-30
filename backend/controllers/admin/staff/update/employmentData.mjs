import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//registro usuario

export const updateEmploymentData = async (req, res) => {
  const { salario, rol } = req.body;
  console.log(req.body);

  const idUsuario = parseInt(req.params.id_usuario, 10);


  const actualizar = await prisma.usuarios.update({
    where: {
      id_usuario: idUsuario,
    },
    data: {
      salario: salario,
      fk_rol: rol
    },
  });

  res.status(200).json(actualizar);

  if (!actualizar) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
