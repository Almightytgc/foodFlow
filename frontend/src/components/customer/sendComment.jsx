//uso de estado y referencia
import React, { useState, useRef, useEffect } from 'react';
// comunicación entre react y backend
import axios from "axios";
//redirección
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
//alerta / notificaciones
import Swal from 'sweetalert2';
//imágenes

import { alertaAutenticacion } from '../alerts';


export const AddCommentForm = () => {

    //redireccionamiento
    const navigate = useNavigate();

    //recepcion del id del usuario
    const id_usuario = localStorage.getItem("id_usuario");
    //recepción de datos del form
    const [mensaje, setMensaje] = useState("");

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


    //envío de datos del formm
    const enviarComentario = async (e) => {
        e.preventDefault();

        //parseo del id del usuario
        const id_parseado = parseInt(id_usuario);
        let mensajeVacio = false;
        let espacios = false;

        if (mensaje.trim().length === 0) {
           return  Swal.fire({
                icon: 'error',
                iconColor: 'red',
                title: 'Campo vacío',
                text: 'Por favor ingresa un mensaje valido',
                confirmButtonColor: '#249643',
                color: '##211B16'
            })
        }

        if (mensaje == "") {
            mensajeVacio = true;
            Swal.fire({
                icon: 'error',
                iconColor: 'red',
                title: 'Campo vacío',
                text: 'Por favor ingresa un mensaje',
                confirmButtonColor: '#249643',
                color: '##211B16'
            })
        }

        if (!mensajeVacio && !espacios) {
            try {
                await axios.post(`http://localhost:5000/customer/addComment`,
                    {
                        comment: mensaje,
                        id_usuario: id_parseado
                    }
                );
                //alerta
                Swal.fire({
                    titleText: `El comentario ha sido enviado exitosamente`,
                    confirmButtonColor: "#F47228"
                });
                //redireccion
                navigate('/customer');

            } catch (error) {
                console.log(error);
                if (error.response && error.response.data && error.response.data.msg) {
                    Swal.fire('Error', error.response.data.msg, 'error');
                } else {
                    Swal.fire('Error', 'Error en el servidor', 'error');
                }
            }
        }
    }
    return (
        <>
            {/* contenedor general */}
            <div className="m-24 max-sm:m-10 bg-gray-100 rounded-2xl shadow-lg md:max-w-3xl p-3 flex items-center justify-center flex-col">
                <div className="md:w-full px-16">
                    <h2 className="font-bold text-3xl text-center text-[#211B16]">
                        Enviar comentario
                    </h2>
                    <p className='text-lg font-bold text-center my-8'>Su opinión es muy importante para nosotros</p>
                    <form onSubmit={enviarComentario} className="flex flex-col gap-2">

                        <div class="relative">
                            <label for="message" class="leading-7 text-sm text-black">Digite su mensaje</label>
                            <textarea onChange={(e) => setMensaje(e.target.value)} id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-black focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>

                        <div className="flex flex-row w-full gap-2 justify-center items-center">

                            {/* boton regresar */}
                            <Link className="text-center w-1/2 bg-[#F47228] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold" to={"/customer"}>
                                <span className="font-bold">
                                </span>Regresar
                            </Link>

                            {/* boton registrar */}
                            <button className="w-1/2 bg-[#58764E] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold">
                                Enviar
                            </button>

                        </div>
                    </form>
                </div >
            </div >

        </>
    );
}







