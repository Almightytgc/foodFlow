import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAppetizers = async (req, res) => {

  const category = "Entradas";

  const findProducts = await prisma.productos.findMany({
    where: {
      categoria: category
    },
  });

  if (findProducts) {
    return res.status(200).json(findProducts);
  } else {
    return res.status(500).json({msg: "No furulaaa"});
  }
};

export const getBeverages = async (req, res) => {

  const category = "Bebidas";

  const findProducts = await prisma.productos.findMany({
    where: {
      categoria: category
    },
  });

  if (findProducts) {
    return res.status(200).json(findProducts);
  } else {
    return res.status(500).json({msg: "No furulaaa"});
  }
};

export const getMainDishes = async (req, res) => {

  const category = "Platillo Principal";

  const findProducts = await prisma.productos.findMany({
    where: {
      categoria: category
    },
  });

  if (findProducts) {
    return res.status(200).json(findProducts);
  } else {
    return res.status(500).json({msg: "No furulaaa"});
  }
};

export const getDesserts = async (req, res) => {

  const category = "Postre";

  const findProducts = await prisma.productos.findMany({
    where: {
      categoria: category
    },
  });

  if (findProducts) {
    return res.status(200).json(findProducts);
  } else {
    return res.status(500).json({msg: "No furulaaa"});
  }
};


