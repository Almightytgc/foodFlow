import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateProduct = async (req, res) => {

    const idProducto = parseInt(req.params.id_producto);
    const {name, category, price} = req.body;
    // console.log(req.body);
    const precioParseado = parseFloat(price);

    const findProduct = await prisma.productos.findFirst({
        where: {id_producto: idProducto}
    })

    // if (findProduct) {
    //     console.log("el producto fue encontrado");
    // } else {
    //     return console.log("el producto no fue encontrado");
    // }

    if (!findProduct) return console.log("el producto no fue encontrado");


    const actualizar = await prisma.productos.update({
        where: {id_producto: idProducto},
        data: {
            nombre: name,
            precio: precioParseado,
            categoria: category
        }
    })

    if (actualizar) {
        // console.log("todo en orden");
        return res.status(200).json(actualizar);
    } else {
        return res.status(500).json({msg: "La ejecución de la función falló"});
    }
}