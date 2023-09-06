import { Link, useNavigate } from "react-router-dom";
import tomarOrdenOption from "../../assets/options/tomarOrdenOption.jpg";
import menuOption from "../../assets/options/menuOptionImg.jpg";
import editarPerfilOption from "../../assets/options/editarPerfilOption.jpg";
import sugerenciasOption from "../../assets/options/sugerenciasOption.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

import useSWR, { useSWRConfig } from "swr";

//validar permiso
import { alertaAutenticacion, alertaErrorSolicitudAtencion, alertaAtencionSolicitada, alertaErrorMesa } from "../alerts";

//importar io para notificaciones 
import io from "socket.io-client";
// console.log("Creando instancia de socket");

const socket = io("http://localhost:5000", { transports: ["websocket", "polling"] });

socket.on("connect", () => {
    // console.log("Conexión exitosa a socket desde customer home");
});

export const CustomerIndex = () => {
    const [id_usuario, setIdUsuario] = useState();
    const navigate = useNavigate();
    const userLoggedStorage = localStorage.getItem("userLogged");

    const { mutate } = useSWRConfig();

    useEffect(() => {
        //set id de usuario
        const id_usuarioLocal = localStorage.getItem('id_usuario');
        setIdUsuario(id_usuarioLocal);
        // console.log(id_usuario);
    }, []);

    // const {mutate} = useSWRConfig();

    //proteger la ruta
    useEffect(() => {
        const loadUserLoggedValue = () => {
            return userLoggedStorage ? JSON.parse(userLoggedStorage) : false;
        };

        const userLoggedValue = loadUserLoggedValue();
        if (!userLoggedValue) {
            alertaAutenticacion();
            return navigate("/authentication");
        }
    }, []);

    //obtener id del usuario

    const configurarMesa = () => {
        return navigate("setTable");
    }

    const fetcher = async () => {
        const { data } = await axios.get(`http://localhost:5000/users/getTableById/${id_usuario}`);
        // console.log(data);
        return data;
    }

    const { data, error, isLoading} = useSWR("mesas", fetcher, { refreshInterval: 100 });


    if (!data) return <p className="text-3xl text-white mx-auto">Cargando . . . </p>;
    if (isLoading) return <p className="text-3xl text-white mx-auto">Cargando . . . </p>;
    if (!data.fk_usuario) <p className="text-3xl text-white text-center mx-auto">Últimos ajustes . . .</p>

    if (error) {
        return <p className="text-3xl text-white mx-auto text-center">{error.response.data.message} <br /> <span className="text-lg border rounded-xl p-1.5 hover:bg-white hover:text-black duration-300" onClick={() => configurarMesa()}>Configurar mesa</span> </p>;
    }
    if (data.message) return <p className="text-3xl text-white">{data.message}</p>;


    const solicitarAtencion = async () => {
        mutate("mesas");
        // console.log(data.fk_usuario)
        if (data.fk_usuario === null) {
            alertaErrorSolicitudAtencion();
            return navigate("setTable");
        } else {
            // console.log(data.token);
            setTimeout(() => {
                socket.emit("solicitudAtencion", `Se necesita atención en la mesa ${data.token}`);
                return alertaAtencionSolicitada();
            }, 0);
        }
    }

    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-wrap-reverse">
                <div className="w-1/2">

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <Link to={"/customer/menu"} className=" my-4 md:p-4 rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={menuOption} alt="imagen de mesero" width="450" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Ver menú</h1>
                        </Link>

                        <div className="my-4 md:p-4 rounded-xl hover:scale-110 duration-500 text-white" onClick={solicitarAtencion}>
                            <img src={tomarOrdenOption} alt="imagen de menú" width="450" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Solicitar asistencia</h1>
                        </div>


                        <Link to={`/customer/editOptions/${id_usuario}`} className="my-4 md:p-4 rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={editarPerfilOption} alt="imagen de menú" width="300   " className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Editar perfil</h1>
                        </Link>

                        <Link to={`/customer/addComment`} className="my-4 md:p-4 rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={sugerenciasOption} alt="imagen de menú" width="450" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Enviar comentarios</h1>
                        </Link>
                    </div>

                </div>

                <div className="md:w-1/2 md:px-16 flex flex-col">
                    <h1 className="border-[#58764E] border-b-4 p-2 w-[45%] max-sm:w-[60%] max-sm:text-2xl text-3xl my-8 font-bold text-[#F47228]" >Clientes FoodFlow</h1>

                    <p className="text-[#fff] font-bold  my-8 mx-auto max-sm:text-justify text-4xl md:text-4xl">
                        ¡Descubre el placer culinario en cada bocado! 🍽️
                    </p>
                </div>
            </div>
        </>
    );
}