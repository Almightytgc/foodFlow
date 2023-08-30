import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export const updatePassword = async(req,res)=>{
    const {contrasenia} = req.body;
    console.log(req.body);
    const idUsuario = parseInt(req.params.id_usuario, 10);
    try {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const actualizar = await prisma.usuarios.update({
            where:{
                id_usuario: idUsuario
                
            },data:{
                contrasenia: hashedPassword
            }
        })
        res.status(200).json(actualizar)
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: error.message
        })
    }
}




