import { Link, useNavigate } from "react-router-dom";
import tomarOrdenOption from "../../assets/options/tomarOrdenOption.jpg";
import ordenesPendientesOption from "../../assets/options/ordenesPendientes.jpg";
import editarPerfilOption from "../../assets/options/editarPerfilOption.jpg";
import { useEffect } from "react";
import { alertAtencion } from "../alerts";
import { alertaAutenticacion } from "../alerts";

//socket 
import io from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket", "polling"] });

socket.on("connect", () => {
    // console.log("Conexión exitosa a socket desde staff home");
});


export const StaffIndex = () => {

    const navigate = useNavigate();

    const staffLoggedStorage = localStorage.getItem("staffLogged");

    // //validar que un mesero se ha logueado
    const isLoggedMesero = localStorage.getItem("meseroLogueado");

    useEffect(() => {

        const loadStaffLoggedValue = () => {
            return staffLoggedStorage ? JSON.parse(staffLoggedStorage) : false;
        };

        const staffLoggedValue = loadStaffLoggedValue();
        // console.log("el mesero está ", staffLoggedValue);
        if (!staffLoggedValue) {
            // Verificar si protegerStaff es false (no autorizado)
            navigate("/authentication");
            return alertaAutenticacion();
        }
    }, []);


    //traer el id del usuario logueado
    const id_usuario = localStorage.getItem("id_usuario");


    if (isLoggedMesero == "2" ) {
        socket.on("mensajeAtencionStaff", (data) => {
            setTimeout(() => {
                alertAtencion(data);
            },0)
        })
    }


    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-wrap-reverse">
                <div className="w-1/2">

                    <div class="grid grid-cols-1 gap-8 justify-center">
                        <Link to={"/staff/menuOptions"} className="mx-auto max-w-1/3 my-4 rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={tomarOrdenOption} alt="imagen de mesero" width="300" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Tomar orden</h1>
                        </Link>

                        <Link to={"/staff/pendingOrders"} className="mx-auto max-w-1/3 rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={ordenesPendientesOption} alt="imagen de menú" width="300" className="rounded-xl mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Ordenes pendientes</h1>
                        </Link>

                        <Link to={`/staff/editOptions/${id_usuario}`} className="mx-auto max-w-1/3 rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={editarPerfilOption} alt="imagen de menú" width="300" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="text-2xl font-bold text-center">Editar perfil</h1>
                        </Link>
                    </div>
                </div>

                <div className="md:w-1/2 md:px-16 flex flex-col">
                    <h1 className="border-[#58764E] border-b-4 p-2 w-[45%] max-sm:w-[60%] max-sm:text-2xl text-3xl my-8 font-bold text-[#F47228]" >Staff FoodFlow</h1>

                    <p className="text-[#fff] font-bold  my-8 mx-auto text-justify max-sm:text-justify sm:text-2xl md:text-4xl">
                        Cada plato que servimos es una oportunidad para hacer sonreír a nuestros clientes. 😄
                    </p>
                </div>
            </div>
        </>
    );
}