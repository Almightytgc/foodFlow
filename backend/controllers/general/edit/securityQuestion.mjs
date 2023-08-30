import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const editSecurityQuestion = async (req, res) => {
  const { contrasenia, securityQuestion, securityAnswer} = req.body;

  const idUsuario = parseInt(req.params.id_usuario, 10);

  console.log(req.body);
  console.log(idUsuario);

  const existingUser = await prisma.usuarios.findFirst({
    where: {
      id_usuario: idUsuario
    }
  });

  if (!existingUser) {
    console.log("el usuario no fue encontrado aaa");
    return res.status(404).json({ msg: "el usuario no fue encontrado" });
  } else {
    console.log("usuario encontrado");
  }

  const verifyPassword = await bcrypt.compare(contrasenia, existingUser.contrasenia);

  if (!verifyPassword) {
    console.log("la contraseña ingresada no coincide con la guardada");
    return res.status(404).json({msg: "la contraseña ingresada no coincide con la guardada"});
  } else {
    console.log("la contraseña ingresada coincide con la guardada");  
  }

  const securityAnswerHashed = await bcrypt.hash(securityAnswer, 10);

    console.log("Hasta aquí todo en orden, procedemos a guardar los datos en la bd");

    const updateSecurityQuestion = await prisma.usuarios.update({
      where: {
        id_usuario: existingUser.id_usuario
      },
      data: {
        preguntaSeguridad: securityQuestion,
        respuestaSeguridad: securityAnswerHashed
      },
    });

    if (updateSecurityQuestion) {
      console.log(
        "La pregunta de seguridad ha sido establecida correctamente");
    } else {
      console.log("Algo salió mal");
      return res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
    res.status(200).json({ msg: "La contraseña ha sido reestablecida exitosamente" });
};
