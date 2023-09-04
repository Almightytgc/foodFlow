//uso de estado y referencia
import React, { useState, useRef, useEffect } from 'react';
// comunicación entre react y backend
import axios from "axios";
//redirección
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//alerta / notificaciones
import Swal from 'sweetalert2';
//imágenes

import { alertaAutenticacion, alertaCamposVaciosEspacios, alertaProductoCreado, alertaCamposVacios} from '../../alerts';

export const AddProductForm = () => {

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

    //recepción de datos del form
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("")
    const [foto, setFoto] = useState("")

    const navigate = useNavigate();

    const agregarProducto = async (e) => {
        e.preventDefault();
        let camposVacios = false;

        const dataForm = new FormData()
        dataForm.append("name", nombre)
        dataForm.append("category", categoria)
        dataForm.append("price", precio);
        dataForm.append("file", foto)

        if (!nombre == "" || !categoria == "" || !precio == "" || !foto == "") {
            camposVacios = true;
            return alertaCamposVacios();
        }

        
        if (!nombre.trim().length || !categoria.trim().length || !precio.trim().length) {
            camposVacios = true;
            return alertaCamposVaciosEspacios();
        }

        

        if (!camposVacios) {
            try {
                const response = await axios.post("http://localhost:5000/admin/products/upload", dataForm)
                // console.log(response);
                alertaProductoCreado();
                navigate("/admin/productsOptions")
            } catch (error) {
                console.error(error);
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
                        Registrar producto
                    </h2>
                    <form onSubmit={agregarProducto} enctype="multipart/form-data" className="flex flex-col gap-2">

                        {/* Nombres y apellidos */}
                        <div className='flex flex-row max-sm:flex-wrap my-5 justify-center gap-2'>
                            <div className='text-center flex flex-col w-full'>
                                <label htmlFor="nombres" className='text-sm text-[#211B16] font-bold'>Nombre</label>
                                <input
                                    className="p-2 mt-8 rounded-xl border w-full max-sm:w-full mx-1 shadow-lg"
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                ></input>
                            </div>

                            <div className='text-center w-full flex flex-col'>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>precio</label>

                                <input
                                    className="p-2 mt-8 rounded-xl border w-full mx-1 shadow-lg"
                                    type="number"
                                    name="nombres"
                                    placeholder="precio"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                ></input>
                            </div>
                        </div>


                        <div className='flex flex-row max-sm:flex-wrap justify-center gap-2'>
                            <div className='flex flex-col justify-center w-full text-center mx-2 my-7 '>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold pb-3'>Elegir Categoria</label>
                                <select name="" id="" className="shadow-lg p-2 mt-2 rounded-xl  border w-full mx-1 text-sm" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                    <option value="" disabled>Seleccione una categoría</option>
                                    <option className='text-sm' value="Entradas">  Entradas</option>
                                    <option className='text-sm' value="Bebidas">Bebidas</option>
                                    <option className='text-sm' value="Platillo Principal">Platillo Principal</option>
                                    <option className='text-sm' value="Postre">Postre</option>
                                </select>
                            </div>
                        </div>

                        <h3 className='text-sm text-center my-1 font-bold'>Fotografía</h3>


                        <div class="flex items-center justify-center w-full">

                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-16 h-16 mb-4 text-[#F47228]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-[#F47228]">Nombre del archivo: {foto ? foto.name : ''}</p>
                                    </div>
                                    <input name="file" onChange={(e) => setFoto(e.target.files[0])} id="dropzone-file" type="file" className='hidden' />
                                </label>
                            </div>

                        </div>


                        <div className="flex flex-row w-full gap-2 justify-center items-center">

                            {/* boton regresar */}
                            <Link className="text-center w-1/2 bg-[#F47228] hover:bg-[#272424] hover:text-[#fff] rounded-xl text-white p-2 duration-500 my-5 font-bold" to={"/admin/productsOptions"}>
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







