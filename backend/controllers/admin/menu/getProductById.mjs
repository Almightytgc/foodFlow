import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductById = async (req, res) => {

    const productId = parseInt(req.params.id_producto);

    const findProduct = await prisma.productos.findFirst({
        where: {id_producto: productId}
    })

    if (findProduct) {
        return res.status(200).json(findProduct);
    } else {
        // console.log("no se encontró el producto");
        return res.status(500).json({msg: "algo salió mal en la solicitud"});
    }
}