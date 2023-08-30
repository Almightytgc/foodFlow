import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

import { alertaAutenticacion } from "../alerts";


export const EditUserOptions = () => {

    const navigate = useNavigate();

    //proteger ruta
    const userLoggedStorage = localStorage.getItem("userLogged");
    const staffLoggedStorage = localStorage.getItem("staffLogged");
    const adminLoggedStorage = localStorage.getItem("adminLogged");

    const isLogged = localStorage.getItem("isLogged");

    useEffect(() => {
        const loadLoggedValue = () => {
            return isLogged ? JSON.parse(isLogged) : false;
        };

        const LoggedValue = loadLoggedValue();
        // console.log("el admin está ", adminLoggedValue);
        if (!LoggedValue) {
            navigate("/authentication");
            return alertaAutenticacion();
        }
    }, []);

    const { id_usuario } = useParams();

    //rutas para las opciones
    let rutaGeneral = "";
    let rutaContraseña = "";
    let rutaVerificacionPregunta = "";

    const validarGeneral = () => {
        if (userLoggedStorage) {
            rutaGeneral = `/customer/editOptions/general/${id_usuario}`;
        } else if (staffLoggedStorage) {
            rutaGeneral = `/staff/editOptions/general/${id_usuario}`;
        } else if (adminLoggedStorage) {
            rutaGeneral = `/admin/editOptions/general/${id_usuario}`;
        }
        return rutaGeneral;
    }

    const validarContraseña = () => {
        if (userLoggedStorage) {
            rutaContraseña = `/customer/editOptions/password/${id_usuario}`;
        } else if (staffLoggedStorage) {
            rutaContraseña = `/staff/editOptions/password/${id_usuario}`;
        } else if (adminLoggedStorage) {
            rutaContraseña = `/admin/editOptions/password/${id_usuario}`;
        }
        return rutaContraseña;
    }



    //ruta para pregunta seguridad
    const validarRutaPreguntaSeguridad = () => {
        if (userLoggedStorage) {
            rutaVerificacionPregunta = `/customer/editOptions/securityQuestion/${id_usuario}`;
        } else if (staffLoggedStorage) {
            rutaVerificacionPregunta = `/staff/editOptions/securityQuestion/${id_usuario}`;
        } else if (adminLoggedStorage) {
            rutaVerificacionPregunta = `/admin/editOptions/securityQuestion/${id_usuario}`;
        }
        return rutaVerificacionPregunta;
    }

    const rutaGeneralValidada = validarGeneral();
    const rutaContraseñaValidada = validarContraseña();
    const rutaPreguntaValidada = validarRutaPreguntaSeguridad();




    //rutas para regresar
    let rutaRegresar = "";

    const validarRegresar = () => {
        if (userLoggedStorage) {
            rutaRegresar = `/customer/`;
        } else if (staffLoggedStorage) {
            rutaRegresar = `/staff/`;
        } else if (adminLoggedStorage) {
            rutaRegresar = `/admin/`
        }
        return rutaRegresar;
    }

    const rutaRegresarValidada = validarRegresar();





    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center  max-sm:flex-wrap-reverse">
                <section className="text-gray-400">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">Elija la información a editar</h1>
                        </div>

                        {/* boton regresar */}
                        <div className="w-full flex justify-start my-8 mx-auto">
                            <div className="mx-auto">
                                <Link className="bg-[#58764E] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={rutaRegresarValidada}>
                                    <span className="font-bold">
                                    </span>  Regresar</Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap -m-4 text-center">
                            <Link to={rutaGeneralValidada} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg  ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="45"
                                        height="45"
                                        fill="#fff"
                                        className="bi bi-person-circle mx-auto"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path
                                            fill="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                        />
                                    </svg>
                                    <h2 className="title-font font-medium text-2xl text-white my-2">General</h2>
                                    <p className="leading-relaxed px-5">Nombres, Apellidos, correo electrónico, teléfono, usuario</p>
                                </div>
                            </Link>

                            <Link to={rutaContraseñaValidada} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#fff" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                                    <h2 className="title-font font-medium text-2xl text-white my-2">Contraseña</h2>
                                    <p className="leading-relaxed px-5">Reestablecer contraseña del usuario seleccionado</p>
                                </div>
                            </Link>

                            <Link to={rutaPreguntaValidada} className="p-4 lg:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#fff" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" /></svg>
                                    <h2 className="title-font font-medium text-2xl my-2 text-white">Pregunta de seguridad</h2>
                                    <p className="leading-relaxed px-5">Una forma de recuperar tu contraseña en caso que la olvides</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}