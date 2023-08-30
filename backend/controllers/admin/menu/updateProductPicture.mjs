
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
  
  const idProducto = parseInt(req.params.id_producto);
  const { filename } = req.file;


  console.log(req.file);
  console.log(req.body);

  const rutaProducto = `/producto/${filename}`;

  try {
    const actualizarImagenProducto = await prisma.productos.update({
      where: {
        id_producto: idProducto
      }, data: {
        foto: rutaProducto
      }
    });

    if (!actualizarImagenProducto) {
      return console.error("no se envió nada a prisma we");
    }
  } catch (error) {
    return console.error(error);
  }
};

export const uploadProductPicture = (req, res) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ msg: "no furuló" });
    }

    uploadHandler(req, res);
    res.status(200).json({msg: "todo furuló waaaa"});
  });
};
