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

import { alertaAutenticacion } from '../../../alerts';


export const PasswordEditionForm = () => {

    //recepción de datos del form
    const [passWord, setContrasenia] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const { id_usuario } = useParams();
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

    //envío de datos del formm
    const actualizarUsuario = async (e) => {
        e.preventDefault();

        let contraseniaDistinta = false;
        let camposVacios = false;

        if (passWord != confirmPassword) {
            contraseniaDistinta = true;
            Swal.fire({
                icon: 'error',
                iconColor: 'red',
                title: 'Las cotraseñas no coinciden',
                text: 'Por favor intenta de nuevo',
                confirmButtonColor: '#249643',
                color: '##211B16'
            })
        } else if (passWord == "" || confirmPassword == "") {
            camposVacios = true;
            return Swal.fire({
              icon: 'error',
              iconColor: 'red',
              title: 'Campos vacíos',
              text: 'Por favor rellena todos los campos',
              confirmButtonColor: '#249643',
              color: '##211B16'
            })
          } 

        if (!contraseniaDistinta && !camposVacios) {
            try {
                await axios.patch(`http://localhost:5000/admin/Employees/editOptions/password/${id_usuario}`,
                    {
                        contrasenia: passWord
                    });
                //alerta
                Swal.fire({
                    titleText: `Tus datos han sido actualizados`,
                    confirmButtonColor: "#F47228"
                });
                //redireccion
                navigate(`/admin/Employees/editOptions/${id_usuario}`);

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
            {/* contenedor general */}
            <div className="m-24 max-sm:m-10 bg-gray-100 rounded-2xl shadow-lg md:max-w-3xl p-3 flex items-center justify-center flex-col">
                {/* contenedor izquierdo */}
                <div className="md:w-full px-16">
                    <h2 className="font-bold text-3xl text-center text-[#211B16]">
                        Editar perfil
                    </h2>
                    <form onSubmit={actualizarUsuario} className="flex flex-col gap-2">

                        <h3 className='text-sm text-center my-4 font-bold'>Contraseña nueva</h3>

                        <div className="relative">
                            <input
                                ref={passwordRef}
                                className="p-2 mt-2 rounded-xl w-full border shadow-lg"
                                type="password"
                                name="password"
                                id="inputPassword"
                                placeholder="Contraseña"
                                value={passWord}
                                onChange={(e) => setContrasenia(e.target.value)}
                            ></input>

                            <svg onClick={() => verContrasenia(passwordRef)}
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

                        <div className="flex flex-row w-full gap-2 justify-center items-center">

                            {/* boton regresar */}
                            <Link className="text-center w-1/2 bg-[#F47228] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold" to={`/admin/Employees/editOptions/${id_usuario}`}>
                                <span className="font-bold">
                                </span>Regresar
                            </Link>

                            {/* boton registrar */}
                            <button className="w-1/2 bg-[#58764E] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold">
                                Guardar cambios
                            </button>

                        </div>
                    </form>
                </div >
            </div >

        </>
    );
}







