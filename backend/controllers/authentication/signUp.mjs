import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//registro usuario

export const createUser = async (req, res) => {
  const { nombres, apellidos, telefono, correo, usuario, contrasenia, preguntaSeguridad, respuesta } = req.body;

    // Verificar si ya existe un usuario con el mismo nombre de usuario
    const usuarioExistente = await prisma.usuarios.findFirst({
      where: {
        usuario: usuario
      }
    });
    const correoExistente = await prisma.usuarios.findFirst({
      where: {
        correo: correo
      }
    });

    if (correoExistente) {
      return res.status(400).json({ msg: "El correo ingresado ya está en uso, por favor seleccione otro" });
    } else if (usuarioExistente) {
      return res.status(400).json({ msg: "El usuario ingresado ya está en uso, por favor seleccione otro" });
    } 

    // Si no existe un usuario con el mismo nombre de usuario, continuar con el registro
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const hashedAnswer = await bcrypt.hash(respuesta, 10);

    const newUser = await prisma.usuarios.create({
      data: {
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        usuario: usuario,
        contrasenia: hashedPassword,
        preguntaSeguridad: preguntaSeguridad,
        respuestaSeguridad: hashedAnswer
      },
    });

    res.status(200).json(newUser);

    if (!newUser) {
      res.status(500).json({ msg: "Error en el servidor" });
    }

};









