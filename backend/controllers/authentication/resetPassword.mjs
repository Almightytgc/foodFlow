import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const ResetPassword = async (req, res) => {
  const { usuario, preguntaSeguridad, respuestaSeguridad, contrasenia } =
    req.body;

  console.log("-----------------------------------------------------");
  console.log("VALORES DE LAS VARIABLES RECEPCIONADAS POR EL REQ.BODY");
  console.log("-----------------------------------------------------");

  console.log(req.body);

  const existingUser = await prisma.usuarios.findFirst({
    where: {
      usuario: usuario,
      preguntaSeguridad: preguntaSeguridad,
    },
  });

  if (!existingUser) {
    console.log("el usuario no fue encontrado aaa");
    return res.status(404).json({ msg: "el usuario no fue encontrado" });
  } else {
    console.log("usuario encontrado");
    console.log("la rspuesta recibida es ",respuestaSeguridad, "la respuesta a comparar es ", existingUser.respuestaSeguridad )
  }

  const verifySecurityAnswer = await bcrypt.compare(respuestaSeguridad, existingUser.respuestaSeguridad);

  if (!verifySecurityAnswer) {
    console.log("no se encontró la respuesta de seguridad");
  } else {
    console.log("si se encontró la respuesta de seguridad");  
  }

  const hashedPassword = await bcrypt.hash(contrasenia, 10);

  if (!existingUser || !verifySecurityAnswer) {
    return res
      .status(404)
      .json({ msg: "Los datos ingresados no son correctos" });
  } else {
    console.log("-----------------------------------------------------");
    console.log("Hasta aquí todo en orden");
    console.log("-----------------------------------------------------");

    const updatePassword = await prisma.usuarios.update({
      where: {
        id_usuario: existingUser.id_usuario,
      },
      data: {
        contrasenia: hashedPassword,
      },
    });

    if (updatePassword) {
      console.log(
        "La contraseña ha sido reestablecida correctamente, la nueva contraseña es  " + hashedPassword
      );
    } else {
      console.log("Algo salió mal");
      res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
    res.status(200).json({ msg: "La contraseña ha sido reestablecida exitosamente" });

  }
};
