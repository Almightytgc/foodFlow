import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { useEffect } from 'react';

import { alertaAutenticacion } from '../alerts';

export const Comentarios = () => {

    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

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


    const fetcher = async () => {
        const response = await axios.get("http://localhost:5000/admin/getComments");
        return response.data;
    }

    const { data } = useSWR('sugerencia', fetcher, { refreshInterval: 1000 })


    console.log(data);
    if (!data) {
        return <h2 className="text-white text-6xl">Cargando...</h2>;
    } else if (data == "") {
        return <h2 className="text-white text-6xl">No se encontraron registros
            <br />
            <Link className="flex justify-center w-1/3 mx-auto my-8 bg-[#58764E] text-white hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold" to={"/admin"}>
                Regresar
            </Link>
        </h2>;
    }

    return (
        <>
            <div class="max-w-full flex flex-col overflow-hidden sm:flex-wrap md:flex-row gap-2">
                <div className="md:w-4/3 px-16 flex flex-col justify-start items-start">
                    <h1 className="border-[#58764E] border-b-4 py-2 w-[30%] max-sm:w-[50%] max-sm:text-2xl text-3xl my-8 font-bold text-[#F47228]" >Buzón de comentarios</h1>

                    <p className="text-[#fff] font-bold  my-8 max-sm:text-justify  max-sm:text-2xl text-5xl">
                        Conozca la opinión de los clientes FoodFlow
                    </p>
                </div>

                <div className="overflow-x mx-auto w-3/4">
                    <table className="auto w-full">
                        <thead className="text-center">
                            <tr className="text-center">
                                <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">#</th>
                                <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Comentario</th>
                                <th scope="col" className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4">Autor</th>
                            </tr>
                        </thead>

                        <tbody className="text-center">
                            {data.map((sugerencias, index) => {
                                return (
                                    <tr key={sugerencias.id_comentario} className="text-center">
                                        <td className="py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0]">{index + 1}</td>

                                        <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-6 py-4 whitespace-nowrap flex justify-center items-center gap-4">
                                            {sugerencias.comentario}
                                        </td>

                                        <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-6 py-4 whitespace-nowrap">
                                            {sugerencias.autor.nombres}
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* boton regresar */}
                <div className="w-1/3 flex justify-start my-10 mx-auto">
                    <Link className="bg-[#58764E] text-white text-center hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold w-full" to={"/admin"}>
                        <span className="font-bold">
                        </span>  Regresar</Link>
                </div>
            </div>

        </>

    )
}
