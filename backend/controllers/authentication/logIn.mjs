import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//LOGIN
export const logIn = async (req, res) => {
  const { usuario, contrasenia } = req.body;


    // Verificar si existe un usuario con el nombre de usuario proporcionado
    const existingUser = await prisma.usuarios.findFirst({
      where: {
        usuario: usuario,
      },
    });

    if (!existingUser) {
      res.status(400).json({ msg: "El usuario no existe" });
      return console.log("usuario no encontrado")
    }

    // Verificar si la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare(contrasenia, existingUser.contrasenia);
    //atrapar el id del usuario logueado
    const id_usuario = existingUser.id_usuario;


    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Login exitoso
    if ((existingUser && isPasswordCorrect) && (existingUser.fk_rol < 2)) {
      return res.status(200).json({ msg: "Inicio de sesión exitoso, bienvenido usuario", id_usuario });

    } else if ((existingUser && isPasswordCorrect) && (existingUser.fk_rol >= 2 && existingUser.fk_rol <4)) {
      return res.status(200).json({ msg: "Inicio de sesión exitoso, bienvenido mesero / chef", id_usuario });

    } else if ((existingUser && isPasswordCorrect) && (existingUser.fk_rol == 4)) {
      return res.status(200).json({ msg: "Inicio de sesión exitoso, bienvenido administrador", id_usuario })
      
    } else {
      return res.status(500).json({ msg: "Error en el servidor" });
    } 
};






