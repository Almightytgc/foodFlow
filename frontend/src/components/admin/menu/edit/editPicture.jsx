import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//alertas
import { alertaProductoEditado, alertaCamposVacios } from "../../../alerts";


export const EditProductPictureForm = () => {

    const navigate = useNavigate();


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

    const [foto, setFoto] = useState("")
    const { id_producto } = useParams();

    const fetcher = async () => {
        const response = await axios.get(`http://localhost:5000/products/getProductById/${id_producto}`);
        return response.data;
    }

    const { data } = useSWR("products", fetcher);
    const fotografia = data?.foto;


    const editarProducto = async (e) => {
        e.preventDefault();
        let camposVacios = false;

        const formData = new FormData();
        formData.append("file", foto);

        if (foto == "") {
            camposVacios = true;
            return alertaCamposVacios();
        }

        if (!camposVacios) {
            try {
                const response = await axios.patch(`http://localhost:5000/admin/products/editProductPicture/${id_producto}`, formData);

                // console.log(response);

                alertaProductoEditado();
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
                        Actualizar fotografía
                    </h2>
                    <form onSubmit={editarProducto} enctype="multipart/form-data" className="flex flex-col gap-2">

                        {/* Nombres y apellidos */}

                        <h3 className="text-xl mx-auto my-5 font-bold">Fotografía actual</h3>

                        <div className="w-full">
                            <img className="rounded-xl mx-auto w-96" src={`http://localhost:5000${fotografia}`} />
                        </div>

                        <h3 className="text-xl mx-auto my-5 font-bold">Fotografía nueva</h3>


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
