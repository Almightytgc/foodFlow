import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//alertas
import { alertaProductoEditado, alertaCamposVacios, alertaCamposVaciosEspacios, alertaCifraInvalida} from "../../../alerts";

export const EditProductForm = () => {

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
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("")
    const { id_producto } = useParams();

    const fetcher = async () => {
        const response = await axios.get(`http://localhost:5000/products/getProductById/${id_producto}`);
        setNombre(response.data.nombre);
        setPrecio(response.data.precio);
        setCategoria(response.data.categoria);
        return response.data;
    }

    const { data } = useSWR("products", fetcher);



    const editarProducto = async (e) => {
        e.preventDefault();
        let camposVacios = false;

        if (nombre == "" || categoria == "" || precio == "") {
            camposVacios = true;
            return alertaCamposVacios();

        }
        
        if (!nombre.trim().length || !categoria.trim().length) {
            camposVacios = true;
            return alertaCamposVaciosEspacios();
        }

        if(precio<0.01 || precio<9999.00  ){
            return alertaCifraInvalida()
        }
        

        if (!camposVacios) {
            try {
                const response = await axios.patch(`http://localhost:5000/admin/products/editProduct/${id_producto}`,
                    {
                        name: nombre,
                        category: categoria,
                        price: precio
                    })
                console.log(response);
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
                        Actualizar producto
                    </h2>
                    <form onSubmit={editarProducto} className="flex flex-col gap-2">

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
                                    name="price"
                                    placeholder="precio"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                ></input>
                            </div>
                        </div>


                        <div className='flex flex-row max-sm:flex-wrap justify-center gap-2'>
                            <div className='flex flex-col justify-center w-full text-center mx-2 my-7 '>
                                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold pb-3'>Elegir Categoria</label>
                                <select name="category" id="" className="shadow-lg p-2 mt-2 rounded-xl  border w-full mx-1 text-sm" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                    <option value="" disabled>Seleccione una categoría</option>
                                    <option className='text-sm' value="Entradas">  Entradas</option>
                                    <option className='text-sm' value="Bebidas">Bebidas</option>
                                    <option className='text-sm' value="Platillo Principal">Platillo Principal</option>
                                    <option className='text-sm' value="Postre">Postre</option>
                                </select>
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
