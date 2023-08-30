import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const updateGeneralInformation = async(req,res)=>{
    const { nombres, apellidos, telefono, correo, usuario} = req.body;
    console.log(req.body);

    const idUsuario = parseInt(req.params.id_usuario, 10);
  
    try {

        const actualizar = await prisma.usuarios.update({
            where:{
                id_usuario: idUsuario
                
            },data:{
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                correo: correo,
                usuario: usuario,
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




