import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { alertaCamposVacios } from '../alerts';
import { alertaAutenticacion, alertaMesaRegistrada, alertaErrorMesa } from '../alerts';

export const SetTableForm = () => {

    const navigate = useNavigate();

    //establecer y obtener id de usuario
    const [id_usuario, setIdUsuario] = useState('');

    //proteger ruta
    const userLoggedStorage = localStorage.getItem("userLogged");

    useEffect(() => {
        const loadUserLoggedValue = () => {
            return userLoggedStorage ? JSON.parse(userLoggedStorage) : false;
        };

        const userLoggedValue = loadUserLoggedValue();
        if (!userLoggedValue) {
            alertaAutenticacion();
            return navigate("/authentication");
        }
    }, []);



    useEffect(() => {
        const idUsuario = localStorage.getItem('id_usuario');
        setIdUsuario(idUsuario);
    }, []);

    const [tokenMesa, setToken] = useState("");

    const setMesa = async (e) => {
        e.preventDefault();

        let campoVacio = false;
        if (tokenMesa == "") {
            campoVacio = true;
            return alertaCamposVacios();
        }
        try {
            if (!campoVacio) {
                const response = await axios.post(`http://localhost:5000/customer/setTable/${id_usuario}`,
                    {
                        token: tokenMesa
                    })
                    alertaMesaRegistrada();
                    navigate("/customer");
                    const mesaValidada = true;
                    localStorage.setItem("mesaValidada", mesaValidada);
            }
        } catch (error) {
            console.log(error);
            return alertaErrorMesa();
        }
    }

    return (
        <section className="body-font">
            <div className="container mx-auto flex flex-wrap items-center px-16">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-6xl text-white">¿Qué vas a ordenar el día de hoy?</h1>
                    <p className="leading-relaxed my-8 text-white text-2xl">Ingresa el token / identificador de la mesa en que te encuentras</p>
                </div>

                {/* formulario */}
                <div className="lg:w-2/6 md:w-1/2 rounded-lg px-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-gray-100">
                    <form onSubmit={setMesa} className="flex flex-col gap-2">

                        <div className='flex flex-col max-sm:flex-wrap my-5 justify-center gap-2'>
                            <div className='text-center flex flex-col w-full'>
                                <label htmlFor="nombres" className='text-xl text-black font-bold'>Token de mesa </label>
                                <input
                                    className="p-2 mt-8 rounded-xl border w-full max-sm:w-full mx-1 shadow-lg"
                                    type="text"
                                    placeholder="Token de mesa"
                                    value={tokenMesa}
                                    onChange={(e) => setToken(e.target.value)}
                                ></input>
                            </div>

                            {/* boton registrar */}
                            <button className="w-full bg-[#58764E] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold">
                                Guardar
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
