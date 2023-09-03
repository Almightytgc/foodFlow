import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "./receiptPDF";


import { alertaErrorMesaVacia, alertaErrorCarritoVacio, alertaPedidoEnviado } from "../alerts";

const MenuOptions = () => {
  const [cart, setCart] = useState([]); // Estado del carrito
  const [cartPDF, setCartPDF] = useState([]); // Estado del carrito
  const [total, setTotal] = useState(0);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);
  const pdfDownloader = useRef();

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staff/getTables");
      setTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const carritoPDFClick = () => {
    setTotal(calculateTotal());
    setCartPDF([...cart]); // Crear una copia del carrito
  };

  useEffect(() => {
    setCartPDF([]);
  }, [cart]);

  // Llamadas a la API para diferentes categorías
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data: dataEntradas, isLoading: isLoadingDataEntradas } = useSWR(
    "http://localhost:5000/products/getAppetizers",
    fetcher
  );
  const { data: dataBebidas, isLoading: isLoadingDataBebidas } = useSWR(
    "http://localhost:5000/products/getBeverages",
    fetcher
  );
  const { data: dataMainDishes, isLoading: isLoadingDataMainDishes } = useSWR(
    "http://localhost:5000/products/getMainDishes",
    fetcher
  );
  const { data: dataDesserts, isLoading: isLoadingDataDesserts } = useSWR(
    "http://localhost:5000/products/getDesserts",
    fetcher
  )
  //carrito de compras

  const handleAddToCart = (item) => {
    const existingCartItem = cart.find(
      (cartItem) => cartItem.id_producto === item.id_producto
    );

    if (existingCartItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id_producto === item.id_producto
          ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, cantidad: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    if (item.cantidad > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id_producto === item.id_producto
          ? { ...cartItem, cantidad: cartItem.cantidad - 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter(
        (cartItem) => cartItem.id_producto !== item.id_producto
      );
      setCart(updatedCart);
    }
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  // Función para tomar orden de una mesa
  const handleTakeOrder = (table) => {
    console.log(table); // Verifica si la información de la mesa es correcta

    setSelectedTable(table);
    // Aquí podrías realizar cualquier acción necesaria al tomar la orden de la mesa,
    // como redirigir a otra página para gestionar la orden, etc.
  };



  if (isLoadingDataEntradas || isLoadingDataBebidas || isLoadingDataMainDishes || isLoadingDataDesserts) {
    return <h2 className="text-white text-6xl">Cargando...</h2>;
  }


  const handleSendOrder = async () => {
    try {
      if (!selectedTable) {
        return alertaErrorMesaVacia();
      }

      if (cart.length === 0) {

        return alertaErrorCarritoVacio();
      }

      const uniqueProductIds = new Set();
      const uniqueProducts = cart.filter((item) => {
        if (uniqueProductIds.has(item.id_producto)) {
          return false;
        }
        uniqueProductIds.add(item.id_producto);
        return true;
      });

      const productos = uniqueProducts
        .map((item) => {
          if (item.nombre) {
            return {
              id_producto: item.id_producto,
              nombre: item.nombre,
              precio: item.precio,
              categoria: item.categoria,
            };
          } else {
            console.error(
              `El producto ${item.id_producto} no tiene nombre válido`
            );
            return null;
          }
        })
        .filter((producto) => producto !== null);

      console.log("Datos del arreglo de productos:", productos);

      const response = await axios.post(
        "http://localhost:5000/staff/sendOrder",
        {
          idMesa: selectedTable.id_mesa,
          productos: productos,
          total: calculateTotal(),
        }
      );

      setCart([]);
      setTotal(0);

      alertaPedidoEnviado();
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
      alert("Ocurrió un error al enviar el pedido");
    }
  };

  return (
    <>
      <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-wrap flex-col">
        <div className="w-full flex flex-row justify-center my-20">
          <div className="mx-1">
            <Link
              className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
              to={"/staff/"}
            >
              <span className="font-bold"></span> Regresar
            </Link>
          </div>
        </div>

        {/* Sección de Mesas Desocupadas */}
        <div className=" text-white">
          <h2 className="text-2xl font-semibold my-8 text-center">Mesas Disponibles</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4 mx-auto"
                >
                  Mesa
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4 mx-auto"
                >
                  Token de la mesa
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4 mx-auto"
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.id_mesa}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] text-center">{table.id_mesa}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] text-center">{table.token}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] text-center">
                    <button
                      className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-sm font-bold"
                      onClick={() => handleTakeOrder(table)}
                    >
                      Tomar orden
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedTable && (
            <div>
              <p>Mesa seleccionada para tomar orden: {selectedTable.token}</p>
            </div>
          )}
        </div>

        {/*Inicio de menú*/}

        <div className="my-8 rounded-2xl p-5 flex items-center justify-center flex-col max-sm:flex-wrap-reverse">
          <section className="text-gray-400">
            <div className="container px-5 mx-auto">
              {/* Sección de Entradas */}
              <div className="flex flex-col w-[15%] text-center mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full">
                  Entradas
                </h1>
              </div>

              <div className="flex flex-wrap -m-4 text-center">
                {dataEntradas.map((entrada) => {
                  return (
                    <div
                      className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto"
                      key={entrada.id_producto}
                    >
                      <div className="border-2 border-white px-4 py-6 rounded-lg ">
                        <img
                          src={`http://localhost:5000${entrada.foto}`}
                          alt=""
                        />
                        <h2 className="title-font font-medium text-2xl text-white my-2">
                          {entrada.nombre}
                        </h2>
                        <p className="leading-relaxed px-5 text-center">
                          Precio: {entrada.precio}
                          <div className="mx-1 my-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(entrada)}
                              className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                            >
                              <span className="font-bold">
                                Agregar al carrito
                              </span>
                            </button>
                          </div>
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
                    <div
                      className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto"
                      key={mainDish.id_producto}
                    >
                      <div className="border-2 border-white px-4 py-6 rounded-lg ">
                        <img
                          src={`http://localhost:5000${mainDish.foto}`}
                          alt=""
                        />
                        <h2 className="title-font font-medium text-2xl text-white my-2">
                          {mainDish.nombre}
                        </h2>
                        <p className="leading-relaxed px-5 text-center">
                          Precio: {mainDish.precio}
                          <div className="mx-1 my-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(mainDish)}
                              className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                            >
                              <span className="font-bold">
                                Agregar al carrito
                              </span>
                            </button>
                          </div>
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
                    <div
                      className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto"
                      key={bebida.id_producto}
                    >
                      <div className="border-2 border-white px-4 py-6 rounded-lg ">
                        <img
                          src={`http://localhost:5000${bebida.foto}`}
                          alt=""
                        />
                        <h2 className="title-font font-medium text-2xl text-white my-2">
                          {bebida.nombre}
                        </h2>
                        <p className="leading-relaxed px-5 text-center">
                          Precio: {bebida.precio}
                          <div className="mx-1 my-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(bebida)}
                              className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                            >
                              <span className="font-bold">
                                Agregar al carrito
                              </span>
                            </button>
                          </div>
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
                    <div
                      className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto"
                      key={dessert.id_producto}
                    >
                      <div className="border-2 border-white px-4 py-6 rounded-lg ">
                        <img
                          src={`http://localhost:5000${dessert.foto}`}
                          alt=""
                        />
                        <h2 className="title-font font-medium text-2xl text-white my-2">
                          {dessert.nombre}
                        </h2>
                        <p className="leading-relaxed px-5 text-center">
                          Precio: {dessert.precio}
                          <div className="mx-1 my-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(dessert)}
                              className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                            >
                              <span className="font-bold">
                                Agregar al carrito
                              </span>
                            </button>
                          </div>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carrito de Compras */}
              <div className="my-20 text-white">
                <h2 className="text-2xl font-semibold mb-4">
                  Carrito de Compras
                </h2>
                <table className="w-full border-collapse bg-[#1C1C1C]">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2">Producto</th>
                      <th className="text-left px-4 py-2">Precio</th>
                      <th className="text-left px-4 py-2">Cantidad</th>
                      <th className="text-left px-4 py-2">Subtotal</th>
                      <th className="text-left px-4 py-2">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id_producto}>
                        <td className=" px-4 py-2">{item.nombre}</td>
                        <td className=" px-4 py-2">${item.precio}</td>
                        <td className=" px-4 py-2">
                          <button
                            className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                            onClick={() => handleRemoveFromCart(item)}
                          >
                            -
                          </button>
                          <span className="mx-5">{item.cantidad}</span>
                          <button
                            className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                            onClick={() => handleAddToCart(item)}
                          >
                            +
                          </button>
                        </td>
                        {/* subtotal */}
                        <td className="">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </td>
                        <td className=" mx-8">
                          <button
                            className="bg-red-500 hover.bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleRemoveFromCart(item)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* total */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    Total: $ {calculateTotal().toFixed(2)}
                  </h3>
                </div>

                <div className="flex flex-row justify-center gap-6">
                  <button
                    type="button"
                    onClick={handleSendOrder}
                    className="bg-[green] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold"
                  >
                    <span className="font-bold">Enviar pedido</span>
                  </button>


                  <div
                    onClick={carritoPDFClick}
                    className="w-[15%] bg-[#F47228] text-center p-2 rounded-xl text-white hover:text-[#000] hover:bg-[#fff] duration-300 font-bold"
                  >
                    {cartPDF.length ? (
                      <PDFDownloadLink
                        document={
                          cartPDF.length && (
                            <ReceiptPDF cartItems={cartPDF} total={total} />
                          )
                        }
                        fileName="receipt.pdf"
                        ref={pdfDownloader}
                      >
                        {({ blob, url, loading, error }) => {
                          return loading
                            ? "Cargando documento..."
                            : "Descargar recibo";
                        }}
                      </PDFDownloadLink>
                    ) : (
                      "Generar pdf"
                    )}
                  </div>
                </div>


              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MenuOptions;
