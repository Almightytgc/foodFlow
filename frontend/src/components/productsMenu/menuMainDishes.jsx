import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Link } from "react-router-dom";

export const MenuMainDishes = () => {
    const { mutate } = useSWRConfig();

    const fetcher = async () => {
        const response = await axios.get("http://localhost:5000/products/getMainDishes");
        console.log(response.data);
        return response.data;
    }

    const { data } = useSWR("Productos", fetcher);

    // Verificar si data existe antes de usar map
    if (!data) {
        return <h2 className="text-white text-6xl">Cargando...</h2>;
    }
    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-wrap flex-col">
                <div className="mx-1 my-8">
                    <Link className="bg-[#F47228] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/"}>
                        <span className="font-bold">
                        </span>  Regresar
                    </Link>
                </div>

                {data.map((producto, index) => {
                    return (
                        <div className="card w-96 bg-base-100 m-2 p-2 bg-[#1c1c1c] rounded-xl">
                            <div className="card-body">
                                <figure className="my-5"><img className="rounded-xl mx-auto" src={`http://localhost:5000${producto.foto}`} width="150" height="150" alt="imagen producto" /></figure>
                                <p className="text-lg text-center text-white">{producto.nombre} ${producto.precio}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    );
}