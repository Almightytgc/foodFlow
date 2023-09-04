
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./controllers/admin/menu/producto");
  },
  filename: (req, file, cb) => {
    const typeOfImage = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${typeOfImage}`);
  },
});

const upload = multer({ storage });

const uploadHandler = async (req, res) => {
    
  const { filename } = req.file;
  const { name, price, category } = req.body;

  const precioParseado = parseFloat(price);

  // console.log(req.file);
  // console.log(req.body);

  const rutaProducto = `/producto/${filename}`;

  try {
    const crearImagenProducto = await prisma.productos.create({
      data: {
        nombre: name,
        foto: rutaProducto,
        precio: precioParseado,
        categoria: category,
      },
    });

    // if (!crearImagenProducto) {
    //   return console.error("no se envió nada a prisma we");
    // }
  } catch (error) {
    return console.error(error);
  }
};

export const uploadProducto = (req, res) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ msg: "no furuló" });
    }

    uploadHandler(req, res);
    res.status(200).json({msg: "todo furuló waaaa"});
  });
};
