import { Link, useNavigate } from "react-router-dom";
import tomarOrdenOption from "../../assets/options/tomarOrdenOption.jpg";
import menuOption from "../../assets/options/menuOptionImg.jpg";
import editarPerfilOption from "../../assets/options/editarPerfilOption.jpg";
import sugerenciasOption from "../../assets/options/sugerenciasOption.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

import useSWR, { useSWRConfig } from "swr";

//validar permiso
import { alertaAutenticacion, alertaErrorSolicitudAtencion, alertaAtencionSolicitada } from "../alerts";

//importar io para notificaciones 
import io from "socket.io-client";
console.log("Creando instancia de socket");

const socket = io("http://localhost:5000", { transports: ["websocket", "polling"] });

socket.on("connect", () => {
  console.log("Conexión exitosa a socket desde customer home");
});


export const CustomerIndex = () => {

    const navigate = useNavigate();

    const { mutate } = useSWRConfig();

    //proteger ruta
    const userLoggedStorage = localStorage.getItem("userLogged");

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


    const [id_usuario, setIdUsuario] = useState();
    useEffect(() => {
        //set id de usuario
        const id_usuarioLocal = localStorage.getItem('id_usuario');
        setIdUsuario(id_usuarioLocal);
    }, []);

    const fetcher = async () => { 
        return await axios.get(`http://localhost:5000/users/getTableById/${id_usuario}`)
        .then(response => response.data)
        .catch(error => null);
    };

    const { data, error } = useSWR("mesas", fetcher, {refreshInterval: 1000});

    if (error) {
        console.error('Error al realizar el fetching', error);
    }

    const solicitarAtencion = () => {
        if (data === null || data.fk_usuario === null) {
            alertaErrorSolicitudAtencion();
            return navigate("setTable");
        }else {              
            socket.emit("solicitudAtencion", `Se necesita atención en la mesa ${data.id_mesa}`);
            alertaAtencionSolicitada();
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

                    <p className="text-[#fff] font-bold  my-8 mx-auto max-sm:text-justify text-4xl md:text-6xl">
                        ¡Descubre el placer culinario en cada bocado! 🍽️
                    </p>
                </div>
            </div>
        </>
    );
}