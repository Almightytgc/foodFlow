import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const setTable = async (req, res) => {
  const { token } = req.body;
  const idUsuario = parseInt(req.params.id_usuario);
  console.log(
    "la mesa recibida es ",
    req.body,
    "y el id del usuario es",
    idUsuario
  );

  const verificarMesaExiste = await prisma.mesas.findFirst({
    where: {
      token: token,
    },
  });

  if (!verificarMesaExiste) {
    console.log("la mesa no fue encontrada");
    return res.status(404).json({msg: "la mesa no fue encontrada"});

  } else if (verificarMesaExiste.fk_usuario != null) {
    console.log("la mesa ya está en uso")
    return res.status(404).json({msg: "la mesa ya está en uso"});

  } else {
    console.log("la mesa fue encontrada");
    console.log("id de la mesa", verificarMesaExiste.id_mesa);
  }


  const setMesa = await prisma.mesas.update({
    where: {
      id_mesa: verificarMesaExiste.id_mesa,
    },
    data: {
      fk_usuario: idUsuario,
    },
  });

  if (!setMesa) {
    return res.status(500).json({msg: "error al asignar el id del usuario a la mesa"});
  } else {
    console.log("todo salió bien");

  return res.status(200).json({msg: "todo salió bien"});
  }

};
