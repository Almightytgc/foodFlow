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


export const SecurityQuestionForm = () => {

    const { id_usuario } = useParams();


    const userLoggedStorage = localStorage.getItem("userLogged");
    const staffLoggedStorage = localStorage.getItem("staffLogged");
    const adminLoggedStorage = localStorage.getItem("adminLogged");


    //rutas para regresar
    let rutaGeneral = "";

    const validarRegresar = () => {
        if (userLoggedStorage) {
            rutaGeneral = `/customer/editOptions/${id_usuario}`;
        } else if (staffLoggedStorage) {
            rutaGeneral = `/staff/editOptions/${id_usuario}`;
        } else if (adminLoggedStorage) {
            rutaGeneral = `/admin/editOptions/${id_usuario}`;
        }
        return rutaGeneral;
    }

    const rutaRegresarValidada = validarRegresar();

    //recepción de datos del form
    const [passWord, setContrasenia] = useState("");
    const [securityQuestion, setPregunta] = useState("");
    const [securityAnswer, setRespuesta] = useState("");
    const navigate = useNavigate();

    //envío de datos del formm
    const actualizarUsuario = async (e) => {
        e.preventDefault();

        let camposVacios = false;

        if (passWord == "" || securityQuestion == "" || securityAnswer == "") {
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

        if (!camposVacios) {
            try {
                await axios.patch(`http://localhost:5000/users/editProfile/securityQuestion/${id_usuario}`,
                    {
                        contrasenia: passWord,
                        securityQuestion: securityQuestion,
                        securityAnswer: securityAnswer
                    });
                //alerta
                Swal.fire({
                    titleText: `Tus datos han sido actualizados`,
                    confirmButtonColor: "#F47228"
                });
                //redireccion
                navigate(rutaRegresarValidada);

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

                        <h3 className='text-sm text-center my-4 font-bold'>Digite su Contraseña</h3>

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

                        <h3 className='text-sm text-center my-4 font-bold'>Pregunta de seguridad para recuperación de contraseña</h3>

                        <div className='flex flex-col'>
                            <div className='flex flex-col justify-center w-full text-center mx-2 max-sm:w-full'>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Pregunta</label>
                                <select name="" id="" className="p-2 mt-2 rounded-xl shadow-lg border w-full mx-1 text-sm" value={securityQuestion} onChange={(e) => setPregunta(e.target.value)}>
                                    <option value="" disabled>Seleccione la pregunta a guardar</option>
                                    <option className='text-sm' value="¿En qué hospital naciste?">¿En qué hospital naciste?</option>
                                    <option className='text-sm' value="¿Cuál es tu libro favorito?">¿Cuál es tu libro favorito?</option>
                                    <option className='text-sm' value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                                    <option className='text-sm' value="¿Cuál es tu personaje histórico favorito?">¿Cuál es tu personaje histórico favorito?</option>
                                </select>
                            </div>


                            <div className='flex flex-col justify-center w-full text-center max-sm:w-full my-2'>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Respuesta</label>
                                <input className="p-2 mt-2 rounded-xl  border w-full mx-1 placeholder:text-sm shadow-lg"
                                    type="text"
                                    name="apellidos"
                                    placeholder="Respuesta"
                                    value={securityAnswer}
                                    onChange={(e) => setRespuesta(e.target.value)}
                                ></input>
                            </div>





                            <div className="flex flex-row w-full gap-2 justify-center items-center">

                                {/* boton regresar */}
                                <Link className="text-center w-1/2 bg-[#F47228] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold" to={rutaRegresarValidada}>
                                    <span className="font-bold">
                                    </span>Regresar
                                </Link>

                                {/* boton registrar */}
                                <button className="w-1/2 bg-[#58764E] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold">
                                    Guardar cambios
                                </button>

                            </div>
                        </div>
                    </form>
                </div >
            </div >

        </>
    );
}







