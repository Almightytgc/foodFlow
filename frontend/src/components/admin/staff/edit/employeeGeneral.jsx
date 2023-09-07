//uso de estado y referencia
import React, { useState, useRef, useEffect } from 'react';
// comunicación entre react y backend
import axios from "axios";
//redirección
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
//alerta / notificaciones
import { alertaAutenticacion, alertaTelefonoInvalido, alertaNombresApellidosInvalidos, alertaCamposVaciosEspacios } from '../../../alerts';
import Swal from 'sweetalert2';


export const EmployeeGeneralEditionForm = () => {

    const { id_usuario } = useParams();


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

    //recepción de datos del form
    const [names, setNombres] = useState("");
    const [lastNames, setApellidos] = useState("");
    const [phone, setTelefono] = useState("");
    const [mail, setCorreo] = useState("");
    const [user, setUsuario] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/getUserById/${id_usuario}`);
                // console.log(response);

                setNombres(response.data.nombres);
                setApellidos(response.data.apellidos);
                setTelefono(response.data.telefono);
                setCorreo(response.data.correo);
                setUsuario(response.data.usuario);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos();
    }, [])


    //envío de datos del formm
    const actualizarUsuario = async (e) => {
        e.preventDefault();


        let camposIncorrectos = false
        const telefonoRegex = /^[\d()\s-]+$/;
        const nombreApellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        //validar el input de teléfono
        const validarTelefono = (telefono) => {
            return telefonoRegex.test(telefono);
        }

        //validar los input de nombre y apellido
        const validarNombreApellido = (nombreApellido) => {
            return nombreApellidoRegex.test(nombreApellido);
        };



        if (!names.trim().length || !lastNames.trim().length || !phone.trim().length || !mail.trim().length || !user.trim().length) {
            camposIncorrectos = true;
            return alertaCamposVaciosEspacios();
        }

        if (!validarTelefono(phone)) {
            camposIncorrectos = true;
            return alertaTelefonoInvalido()
        }

        if (!validarNombreApellido(names) || !validarNombreApellido(lastNames)) {
            camposIncorrectos = true;
            return alertaNombresApellidosInvalidos();
        }

        if (!camposIncorrectos) {
            try {
                await axios.patch(`http://localhost:5000/users/editProfile/general/${id_usuario}`,
                    {
                        nombres: names,
                        apellidos: lastNames,
                        telefono: phone,
                        correo: mail,
                        usuario: user,
                    });
                //alerta
                Swal.fire({
                    titleText: `El usuario ha sido actualizado`,
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

                        {/* Nombres y apellidos */}
                        <div className='flex flex-row max-sm:flex-wrap my-5 justify-center gap-2'>
                            <div className='text-center flex flex-col w-full'>
                                <label htmlFor="nombres" className='text-sm text-[#211B16] font-bold'>Nombres</label>
                                <input
                                    className="p-2 mt-8 rounded-xl border w-full max-sm:w-full mx-1 shadow-lg"
                                    type="text"
                                    name="nombres"
                                    placeholder="Nombres"
                                    value={names}
                                    onChange={(e) => setNombres(e.target.value)}
                                ></input>
                            </div>

                            <div className='text-center w-full flex flex-col'>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Apellidos</label>

                                <input
                                    className="p-2 mt-8 rounded-xl border w-full mx-1 shadow-lg"
                                    type="text"
                                    name="nombres"
                                    placeholder="Apellidos"
                                    value={lastNames}
                                    onChange={(e) => setApellidos(e.target.value)}
                                ></input>
                            </div>
                        </div>

                        {/* telefono y correo  */}
                        <div className='flex flex-row max-sm:flex-wrap my-5 justify-center gap-2'>
                            <div className='text-center flex flex-col w-full'>
                                <label htmlFor="telefono" className='text-sm text-[#211B16] font-bold'>Teléfono</label>
                                <input
                                    className="p-2 mt-8 rounded-xl border w-full max-sm:w-full mx-1 shadow-lg"
                                    type="text"
                                    name="nombres"
                                    placeholder="Teléfono"
                                    value={phone}
                                    onChange={(e) => setTelefono(e.target.value)}
                                ></input>
                            </div>

                            <div className='text-center w-full flex flex-col'>
                                <div className='text-center flex flex-col w-full'>
                                    <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Correo</label>
                                    <input
                                        className="p-2 mt-8 rounded-xl border w-full max-sm:w-full mx-1 shadow-lg"
                                        type="text"
                                        name="nombres"
                                        placeholder="Correo"
                                        value={mail}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                        </div>

                        <h3 className='text-sm text-center my-4 font-bold'>Usuario</h3>

                        <input
                            className="p-2 mt-2 rounded-xl w-full border shadow-lg"
                            type="text"
                            name="password"
                            id="inputPassword"
                            placeholder="Usuario"
                            value={user}
                            onChange={(e) => setUsuario(e.target.value)}
                        ></input>

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







