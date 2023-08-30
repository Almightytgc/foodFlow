import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { alertaAutenticacion } from "../../../alerts";


export const EditProductsOptions = () => {

    const navigate = useNavigate();

    //proteger ruta
    const adminLoggedStorage = localStorage.getItem("adminLogged");

    useEffect(() => {
        const loadAdminLoggedValue = () => {
            return adminLoggedStorage ? JSON.parse(adminLoggedStorage) : false;
        };

        const adminLoggedValue = loadAdminLoggedValue();
        if (!adminLoggedValue) {
            navigate("/authentication");
            return alertaAutenticacion();
        }
    }, []);

    const { id_producto } = useParams();

    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center  max-sm:flex-wrap-reverse">
                <section className="text-gray-400">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">Elija la información que desea editar</h1>
                        </div>

                        <div className="w-full flex flex-row justify-center my-11">

                            <div className="mx-1">
                                <Link className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/admin/"}>
                                    <span className="font-bold">
                                    </span>  Regresar
                                </Link>
                            </div>

                            <div className="mx-1">
                                <Link className="bg-[#58764E] max-sm:mx-auto text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/admin/addProduct"}>+ Añadir producto</Link>
                            </div>

                        </div>

                        <div className="flex flex-wrap text-center justify-center items-center">

                            <Link to={`/admin/products/editPicture/${id_producto}`} className="p-4 lg:w-1/4 sm:w-1/2 w-full hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#fff" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
                                    <h2 className="title-font font-medium text-2xl my-2 text-white">Imagen</h2>
                                    <p className="leading-relaxed px-5 text-justify"> Las fotografías exquisitamente capturadas transmiten la pasión y el compromiso que nuestros chefs han depositado en cada creación.</p>
                                </div>
                            </Link>

                            <Link to={`/admin/products/editInformation/${id_producto}`} className="p-4 lg:w-1/4 sm:w-1/2 w-full hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg  ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#fff" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>
                                    <h2 className="title-font font-medium text-2xl text-white my-2 px-4">Información</h2>
                                    <p className="leading-relaxed px-2 text-justify">Las categorías variadas de nuestro exclusivo menú se unen para ofrecer a cada uno de nuestros clientes una experiencia culinaria excepcional.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}