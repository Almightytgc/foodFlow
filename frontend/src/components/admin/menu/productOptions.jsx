import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { alertaAutenticacion } from "../../alerts";


export const ProductsOptions = () => {

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

    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center  max-sm:flex-wrap-reverse">
                <section className="text-gray-400">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">Elija la categoría de productos que desea consultar</h1>
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

                        <div className="flex flex-wrap -m-4 text-center">

                            <Link to={"appetizers"} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.938.005-.034.016-.134.017-.168a.998.998 0 0 0-1.254-1.006A3.002 3.002 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM8.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm3.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path></svg>
                                    <h2 className="title-font font-medium text-2xl text-white my-2">Entradas</h2>
                                    <p className="leading-relaxed px-5 text-justify">El comienzo perfecto: nuestras entradas añaden un toque de magia a las mesas de nuestros clientes.</p>
                                </div>
                            </Link>


                            <Link to={"mainDishes"} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#fff" d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" /></svg>
                                    <h2 className="title-font font-medium text-2xl my-2 text-white">Platillos principales</h2>
                                    <p className="leading-relaxed px-2 text-justify">Desde la tradición hasta la innovación, nuestros platos principales ofrecen un festín de sabores.</p>
                                </div>
                            </Link>

                            <Link to={"desserts"} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#fff" d="M367.1 160c.6-5.3 .9-10.6 .9-16C368 64.5 303.5 0 224 0S80 64.5 80 144c0 5.4 .3 10.7 .9 16H80c-26.5 0-48 21.5-48 48s21.5 48 48 48h53.5 181H368c26.5 0 48-21.5 48-48s-21.5-48-48-48h-.9zM96 288L200.8 497.7c4.4 8.8 13.3 14.3 23.2 14.3s18.8-5.5 23.2-14.3L352 288H96z" /></svg>
                                    <h2 className="title-font font-medium text-2xl my-2 text-white">Postres</h2>
                                    <p className="leading-relaxed px-5 text-justify">Los finales felices comienzan con nuestros postres exquisitos, creados para deleitar los sentidos.</p>
                                </div>
                            </Link>

                            <Link to={"beverages"} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg  ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path fill="#fff" d="M32.1 29.3C33.5 12.8 47.4 0 64 0H256c16.6 0 30.5 12.8 31.9 29.3l14 168.4c6 72-42.5 135.2-109.9 150.6V448h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H160 80c-17.7 0-32-14.3-32-32s14.3-32 32-32h48V348.4C60.6 333 12.1 269.8 18.1 197.8l14-168.4zm56 98.7H231.9l-5.3-64H93.4l-5.3 64z" /></svg>
                                    <h2 className="title-font font-medium text-2xl text-white my-2">Bebidas</h2>
                                    <p className="leading-relaxed px-2 text-justify"> Armonía entre sabores y texturas: nuestras bebidas son el complemento perfecto para cada plato.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}