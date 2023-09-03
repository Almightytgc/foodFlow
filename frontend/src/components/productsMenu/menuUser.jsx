import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPDF from './receiptPDF';


const MenuUser = () => {
  const [cart, setCart] = useState([]); // Estado del carrito
  //valor de localSTorage para verificar si un usuario está logueado
  const userLoggedStorage = localStorage.getItem("userLogged");
  let rutaRegresarMenu = "";
  let rutaValidada = "";

  // Llamadas a la API para diferentes categorías
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data: dataEntradas } = useSWR("http://localhost:5000/products/getAppetizers", fetcher);
  const { data: dataBebidas } = useSWR("http://localhost:5000/products/getBeverages", fetcher);
  const { data: dataMainDishes } = useSWR("http://localhost:5000/products/getMainDishes", fetcher);
  const { data: dataDesserts } = useSWR("http://localhost:5000/products/getDesserts", fetcher);

  if (!dataEntradas || !dataBebidas || !dataMainDishes || !dataDesserts) return <h2 className="text-white text-6xl mx-auto">Cargando...</h2>;

  //validar ruta para salir del menú
  const validarRuta = () => {
    if (userLoggedStorage) {
      rutaRegresarMenu = "/customer/"
    } else {
      rutaRegresarMenu = "/";
    }
    return rutaRegresarMenu;
  }

  rutaValidada = validarRuta();
  return (
    <>
      <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-col max-sm:flex-wrap-reverse">
        <section className="text-gray-400">
          <div className="container px-5 py-24 mx-auto">
            <div className="w-full flex flex-row justify-center my-11">
              <div className="mx-1">
                <Link
                  className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                  to={rutaValidada}
                >
                  <span className="font-bold"></span> Regresar
                </Link>
              </div>
            </div>

            {/* Sección de Entradas */}
            <div className="flex flex-col w-[15%] text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full">
                Entradas
              </h1>
            </div>

            <div className="flex flex-wrap -m-4 text-center">
              {dataEntradas.map((entrada) => {
                return (
                  <div className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto" key={entrada.id_producto}>
                    <div className="border-2 border-white px-4 py-6 rounded-lg ">
                      <img src={`http://localhost:5000${entrada.foto}`} alt="" />
                      <h2 className="title-font font-medium text-2xl text-white my-2">
                        {entrada.nombre}
                      </h2>
                      <p className="leading-relaxed px-5 text-center">
                        Precio: {entrada.precio}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sección de Platillos principales */}
            <div className="flex flex-col w-[25%] mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">
                Platillos principales
              </h1>
            </div>

            <div className="flex flex-wrap -m-4 text-center">
              {dataMainDishes.map((mainDish) => {
                return (
                  <div className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto" key={mainDish.id_producto}>
                    <div className="border-2 border-white px-4 py-6 rounded-lg ">
                      <img src={`http://localhost:5000${mainDish.foto}`} alt="" />
                      <h2 className="title-font font-medium text-2xl text-white my-2">
                        {mainDish.nombre}
                      </h2>
                      <p className="leading-relaxed px-5 text-center">
                        Precio: {mainDish.precio}

                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sección de Bebidas */}
            <div className="flex flex-col w-[15%] mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">
                Bebidas
              </h1>
            </div>

            <div className="flex flex-wrap -m-4 text-center">
              {dataBebidas.map((bebida) => {
                return (
                  <div className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto" key={bebida.id_producto}>
                    <div className="border-2 border-white px-4 py-6 rounded-lg ">
                      <img src={`http://localhost:5000${bebida.foto}`} alt="" />
                      <h2 className="title-font font-medium text-2xl text-white my-2">
                        {bebida.nombre}
                      </h2>
                      <p className="leading-relaxed px-5 text-center">
                        Precio: {bebida.precio}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sección de Postres */}
            <div className="flex flex-col w-[15%] mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">
                Postres
              </h1>
            </div>

            <div className="flex flex-wrap -m-4 text-center">
              {dataDesserts.map((dessert) => {
                return (
                  <div className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto" key={dessert.id_producto}>
                    <div className="border-2 border-white px-4 py-6 rounded-lg ">
                      <img src={`http://localhost:5000${dessert.foto}`} alt="" />
                      <h2 className="title-font font-medium text-2xl text-white my-2">
                        {dessert.nombre}
                      </h2>
                      <p className="leading-relaxed px-5 text-center">
                        Precio: {dessert.precio}

                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default MenuUser;
