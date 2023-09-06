import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

import { alertaAutenticacion } from "../../../alerts";

export const EditOptions = () => {

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

    const { id_usuario } = useParams();
    return (
        <>
            <div classNameName="mt-15 rounded-2xl p-5 flex items-center justify-center  max-sm:flex-wrap-reverse">
                <section className="text-gray-400">
                    <div className="container px-5 py-24 mx-auto">

                        <div className="flex flex-col text-center w-full">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-[#F47228] border-[#58764E] border-b-4 p-2 max-sm:w-full mx-auto">Elija la información a editar</h1>
                        </div>

                        {/* boton regresar */}
                        <div className="my-4 w-full flex justify-start mx-auto">
                            <div className="p-5 mx-auto">
                                <Link className="bg-[#58764E] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/admin/Employees"}>
                                    <span className="font-bold">
                                    </span>  Regresar</Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap -m-4 text-center">
                            <Link to={`/admin/Employees/editOptions/general/${id_usuario}`} className="p-4 md:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
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

                            <Link to={`/admin/Employees/editOptions/password/${id_usuario}`} className="p-4 md:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#fff" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                                    <h2 className="title-font font-medium text-2xl text-white my-2">Contraseña</h2>
                                    <p className="leading-relaxed px-5">Reestablecer contraseña del usuario seleccionado</p>
                                </div>
                            </Link>

                            <Link to={`/admin/Employees/editOptions/employmentData/${id_usuario}`} className="p-4 md:w-1/4 sm:w-1/2 w-full mx-auto hover:scale-110 duration-300">
                                <div className="border-2 border-white px-4 py-6 rounded-lg ">
                                    <svg className="w-12 h-12 mb-3 mx-auto" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#fff" d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                                    <h2 className="title-font font-medium text-2xl my-2 text-white">Datos laborales</h2>
                                    <p className="leading-relaxed px-5">Cargo a desempeñar o el salario</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}