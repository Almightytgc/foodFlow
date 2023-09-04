import React from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useEffect } from "react";
import { alertaAutenticacion, alertaProductoEliminado, alertaImagenProducto } from "../../alerts";

export const TablaPostres = () => {

    const navigate = useNavigate();

    //proteger ruta
    const adminLoggedStorage = localStorage.getItem("adminLogged");

    useEffect(() => {
        const loadAdminLoggedValue = () => {
            return adminLoggedStorage ? JSON.parse(adminLoggedStorage) : false;
        };

        const adminLoggedValue = loadAdminLoggedValue();
        // console.log("el admin está ", adminLoggedValue);
        if (!adminLoggedValue) {
            navigate("/authentication");
            return alertaAutenticacion();
        }
    }, []);


    const { mutate } = useSWRConfig();
    const fetcher = async () => {
        const Response = await axios.get("http://localhost:5000/products/getDesserts");
        return Response.data;
    };

    const { data } = useSWR("Entradas", fetcher);
    mutate("Entradas");

    // console.log(data);
    //verificar si se encontraron registros en la base de datos
    if (!data) {
        return <h2 className="text-white text-6xl">Cargando...</h2>;
    }

    //eliminar producto
    const eliminarProducto = async (idProducto) => {
        const result = await Swal.fire({
            title: "¿Desea confirmar?",
            text: "Los cambios no podran ser revertidos",
            icon: "warning",
            iconColor: "#F47228",
            showCancelButton: true,
            confirmButtonColor: "#58764E",
            cancelButtonColor: "red",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/admin/products/deleteProduct/${idProducto}`);
                mutate("Entradas");
                alertaProductoEliminado();
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <>
            <div className="overflow-x mx-8 w-full">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 mx-auto"> {/* Modificación aquí */}
                    {/* titulo de gestion de personal */}
                    <h1 className="border-[#58764E] border-b-4 p-2 w-[40%] text-5xl my-8 font-bold text-[#F47228]" >Gestionar postres</h1>

                    <div className="overflow-hidden">


                        <div className="w-full flex justify-center bg-[#1C1C1C] overflow-auto">
                            <div className="p-5">
                                <Link className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/admin/productsOptions"}>
                                    <span className="font-bold">
                                    </span>  Regresar
                                </Link>
                            </div>


                            <div className="p-5">
                                <Link className="bg-[#58764E] max-sm:mx-auto text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/admin/addProduct"}>+ Añadir producto</Link>
                            </div>
                        </div>

                        <table className="auto w-full text-center">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">#</th>
                                    <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Nombre</th>
                                    <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Fotografía</th>
                                    <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Precio</th>
                                    <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {data.map((producto, index) => {
                                    return (
                                        <tr key={producto.id_producto}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0]">{index + 1}</td>

                                            <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-2 py-4 whitespace-nowrap">{producto.nombre}</td>

                                            <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-2 py-4 whitespace-nowrap"> <p onClick={ () => alertaImagenProducto(producto.nombre, producto.foto, producto.precio)} className="hover:text-[#F47228] duration-300 font-bold">Click para ver la imagen</p> </td>

                                            <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-2 py-4 whitespace-nowrap">${producto.precio}</td>

                                            <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-2 py-4 whitespace-nowrap">
                                                <div className="flex flex-row gap-4 justify-center items-center">
                                                <Link to={`/admin/products/edit/${producto.id_producto}`}>
                                                        <span >
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512" className="hover:scale-125 duration-300">
                                                                <path fill="#F47228" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                    <span>
                                                        <svg onClick={() => eliminarProducto(producto.id_producto)} xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512" className="hover:scale-125 duration-300">
                                                            <path fill="#58764E" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
};
