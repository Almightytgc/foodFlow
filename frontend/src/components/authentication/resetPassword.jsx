//uso de estado y referencia
import React, { useState, useRef } from 'react';
//comunicacion entre react y backend
import axios from "axios";
//redirecciones
import { Link, useNavigate } from 'react-router-dom';
//alertas / notificaciones
import Swal from 'sweetalert2';

//imágenes
import loginImg from "../../assets/general/loginImg.jpg"

import { alertaCamposVacios, alertaContraseniaCambiada, alertaNoCoincide, alertaCamposVaciosEspacios } from '../alerts';

export const ResetPasswordForm = () => {

    const navigate = useNavigate();

    //recepción de datos del form
    const [user, setUsuario] = useState("");
    const [securityQuestion, setPregunta] = useState("");
    const [securityAnswer, setRespuesta] = useState("");
    const [newPassword, setContrasenia] = useState("");
    const [confirmPassword, setConfirm] = useState("");


    //envío de datos
    const verificarCredenciales = async (e) => {
        e.preventDefault();

        let camposVacios = false;
        let contraseniaDistinta = false;

        if (user == "" || securityQuestion == "" || securityAnswer == "" || newPassword == "" || confirmPassword == "") {
            camposVacios = true;
            alertaCamposVacios();
        } else if (newPassword != confirmPassword) {
            contraseniaDistinta = true;
            return alertaNoCoincide();
        }

        if(!newPassword.trim().length || !confirmPassword.trim().lenght){
            camposVacios = true;
            return alertaCamposVaciosEspacios();
        }

        if (!camposVacios) {
            try {

                await axios.patch(`http://localhost:5000/authentication/resetPassword`, {
                    usuario: user,
                    preguntaSeguridad: securityQuestion,
                    respuestaSeguridad: securityAnswer,
                    contrasenia: newPassword
                });
                alertaContraseniaCambiada();
                //redireccionar a login después de registro exitoso
                navigate("/authentication");

            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Los datos ingresados no son correctos',
                    text: 'Por favor inténtalo de nuevo',
                })
            }
        }
    }


    //referencia a el input de la contraseña
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    //ver contraseña
    const verContrasenia = (inputRef) => {
        if (inputRef.current) {
            const passwordInput = inputRef.current;
            if (passwordInput.type === "password") {
                passwordInput.type = "text"
            } else {
                passwordInput.type = "password"
            }
        }
    }

    return (
        <>
            <div className="mt-24 bg-gray-100 rounded-2xl shadow-lg max-w-3xl p-5 flex items-center justify-center">
                <div className="md:w-1/2 px-16">
                    <h2 className="font-bold text-3xl text-center text-[#211B16]">
                        Reestablecer contraseña
                    </h2>
                    <form onSubmit={verificarCredenciales} className="flex flex-col mt-4 gap-4">
                        <input
                            className="p-2 mt-8 rounded-xl  border shadow-xl"
                            type="text"
                            name="usuario"
                            placeholder="Usuario"
                            value={user}
                            onChange={(e) => setUsuario(e.target.value)}
                        ></input>

                        <div className='flex flex-col justify-center w-full text-center'>
                            <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Seleccione su pregunta</label>
                            <select name="" id="" className="py-2 mt-2 rounded-xl  border w-full text-sm shadow-xl" value={securityQuestion} onChange={(e) => setPregunta(e.target.value)}>
                                <option value="" disabled>Seleccione una pregunta</option>
                                <option className='text-sm' value="¿En qué hospital naciste?">¿En qué hospital naciste?</option>
                                <option className='text-sm' value="¿Cuál es tu libro favorito?">¿Cuál es tu libro favorito?</option>
                                <option className='text-sm' value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                                <option className='text-sm' value="¿Cuál es tu personaje histórico favorito?">¿Cuál es tu personaje histórico favorito?</option>
                            </select>
                        </div>

                        <input
                            className="p-2 mt-8 rounded-xl  border shadow-xl"
                            type="text"
                            name="usuario"
                            placeholder="Respuesta"
                            value={securityAnswer}
                            onChange={(e) => setRespuesta(e.target.value)}
                        ></input>

                        <div className="relative">
                            <input
                                ref={passwordRef}
                                className="p-2 mt-8 rounded-xl w-full  border shadow-xl"
                                type="password"
                                name="password"
                                id="inputPassword"
                                placeholder="Nueva contraseña"
                                value={newPassword}
                                onChange={(e) => setContrasenia(e.target.value)}
                            ></input>

                            <svg onClick={() => verContrasenia(passwordRef)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fillRule="currentColor"
                                className="bi bi-eye absolute top-1/2 translate-y-1/2 right-3 hover:scale-125 duration-300"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>

                        <h3 className='text-sm text-center my-4 font-bold'>Confirmar contraseña</h3>

                        <div className="relative">
                            <input
                                ref={confirmRef}
                                className="p-2 mt-2 rounded-xl w-full  border shadow-lg"
                                type="password"
                                name="password"
                                id="inputPassword"
                                placeholder="Contraseña"
                                onChange={(e) => setConfirm(e.target.value)}
                            ></input>

                            <svg onClick={() => verContrasenia(confirmRef)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fillRule="currentColor"
                                className="bi bi-eye absolute top-1/4 translate-y-1/2 right-3 hover:scale-125 duration-300"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>

                        <div className="flex flex-col w-full gap-2">
                            <button type='submit' className="bg-[#249643] hover:bg-[#211B16] hover:text-[#fff] rounded-xl text-white p-2 duration-500 m-1 font-bold">
                                Reestablecer contraseña
                            </button>
                            <Link to={'/authentication/signup'}>
                                <h3 className="text-center mt-8 hover:text-[#249643] font-bold duration-500">
                                    ¿No tienes una cuenta? ¡Regístrate!
                                </h3>
                            </Link>

                            <hr className='w-[80%] my-2 bg-[#211B16] h-1 rounded-xl m-auto'></hr>

                            <Link to={'/authentication/'}>
                                <h3 className="text-center hover:text-[#249643] font-bold duration-500">
                                    ¡Recordé mi contraseña!
                                </h3>
                            </Link>


                        </div>
                    </form>
                </div>

                <div className="md:block hidden w-1/2">
                    <img className="rounded-xl mx-auto" src={loginImg} width="300" height="250"></img>
                </div>
            </div>
        </>
    );
}