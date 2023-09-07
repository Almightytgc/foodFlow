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

import { alertaAutenticacion, alertaCamposVaciosEspacios, alertaCifraInvalida} from '../../../alerts';

export const EmploymentDataEditionForm = () => {

    //recepción de datos del form
    const [salario, setSalario] = useState("");
    const salarioFloat = parseFloat(salario);
    const [cargo, setCargo] = useState("");
    const cargoInt = parseInt(cargo);
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

    useEffect(() => {
        const obtenerID = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/getUserById/${id_usuario}`);
                // console.log(response);

                setSalario(response.data.salario);
                setCargo(response.data.fk_rol);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerID();
    }, [id_usuario])

    //envío de datos del formm
    const actualizarUsuario = async (e) => {
        e.preventDefault();

        let camposVacios = false;

        if(!salario.trim().length){
            camposVacios = true;
            return alertaCamposVaciosEspacios()
        }

        if(salario<1){
            camposVacios = true;
            return alertaCifraInvalida()
             
        }

        if(!camposVacios){
            
        try {
            await axios.patch(`http://localhost:5000/admin/Employees/editOptions/employmentData/${id_usuario}`,
                {
                    salario: salarioFloat,
                    rol: cargoInt
                });
            //alerta
            Swal.fire({
                titleText: `Los datos han sido actualizados`,
                confirmButtonColor: "#F47228"
            });
            //redireccion
            navigate('/admin/Employees');

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

                        <div className='flex flex-col gap-4'>

                        <h3 className='text-sm text-center my-4 font-bold'>Salario</h3>

                            <input
                                className="p-2 rounded-xl border w-full mx-1 shadow-lg"
                                type="number"
                                step='any'
                                name="nombres"
                                placeholder="Salario"
                                value={salario}
                                onChange={(e) => setSalario(e.target.value)}
                            ></input>


                            <div className='flex flex-col justify-center w-full text-center mx-2'>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Elegir Rol</label>
                                <select name="" id="" className="shadow-lg p-2 mt-2 rounded-xl  border w-full mx-1 text-sm" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                                    <option value="" disabled>Seleccione un rol</option>
                                    <option className='text-sm' value="2">Mesero</option>
                                    <option className='text-sm' value="3">Chef</option>
                                    <option className='text-sm' value="4">Admin</option>
                                </select>
                            </div>
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







