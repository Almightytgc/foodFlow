import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const editProfile = async(req,res)=>{
    const { nombres, apellidos, telefono, correo, usuario, contrasenia, securityQuestion } = req.body;
    let {securityAnswer} = req.body;
    
    console.log(req.body);
    //obtener de la url el usuario y convertirlo de string a entero
    const idUsuario = parseInt(req.params.id_usuario, 10);
    console.log(idUsuario);
    try {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);


        const actualizar = await prisma.usuarios.update({
            where:{
                id_usuario: idUsuario
                
            },
            data:{
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                correo: correo,
                usuario: usuario,
                contrasenia: hashedPassword,
                preguntaSeguridad: securityQuestion,
                respuestaSeguridad: hashedSecurityAnswer
            }
        })
        res.status(200).json(actualizar);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: error.message});
    }
}




