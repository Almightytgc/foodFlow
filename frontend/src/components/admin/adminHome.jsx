import { Link, useNavigate } from "react-router-dom";
import menuOptionImg from "../../assets/options/menuOptionImg.jpg"
import meseroOptionImg from "../../assets/options/meseroOptionImg.jpg"
import sugerenciasOption from "../../assets/options/sugerenciasOption.jpg"
import editarPerfilOption from "../../assets/options/editarPerfilOption.jpg";
import { useEffect } from "react";
import { alertaAutenticacion } from "../alerts";


export const AdminIndex = () => {

    const navigate = useNavigate();

    //obtener id de usuario
    const id_usuario = localStorage.getItem("id_usuario");


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

    return (
        <>
            <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-wrap-reverse">
                <div className="w-1/2">

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <Link to={"Employees"} className=" my-4 mx-auto  rounded-xl w-3/4 hover:scale-110 duration-500 text-white">
                            <img src={meseroOptionImg} alt="imagen de mesero" width="450" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="sm:text-lg md:text-2xl font-bold text-center">Gestionar personal</h1>
                        </Link>

                        <Link to={"/admin/productsOptions"} className="w-3/4 mx-auto rounded-xl hover:scale-110 duration-500 text-white">
                            <img src={menuOptionImg} alt="imagen de menú" className="rounded-xl my-2 mx-auto" width="450">
                            </img>
                            <h1 className="sm:text-lg  md:text-2xl font-bold text-center">Gestionar menú</h1>
                        </Link>



                        <Link to={"/admin/comments"} className=" my-4 mx-auto rounded-xl w-3/4 hover:scale-110 duration-500 text-white">
                            <img src={sugerenciasOption} width="450" alt="imagen de menú" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="sm:text-lg  md:text-2xl font-bold text-center">Buzón de comentarios</h1>
                        </Link>

                        <Link to={`/admin/editOptions/${id_usuario}`} className=" my-4 mx-auto rounded-xl w-3/4 hover:scale-110 duration-500 text-white">
                            <img src={editarPerfilOption} width="450" alt="imagen de menú" className="rounded-xl my-2 mx-auto" >
                            </img>
                            <h1 className="sm:text-lg  md:text-2xl font-bold text-center">Editar perfil</h1>
                        </Link>

                    </div>

                </div>

                <div className="md:w-1/2 md:px-16 flex flex-col">
                    <h1 className="border-[#58764E] border-b-4 p-2 w-[65%] text-3xl my-8 font-bold text-[#F47228]" >Administradores FoodFlow</h1>

                    <p className="text-5xl text-[#fff] font-bold  my-8 mx-auto">
                        Nuestro Personal Capacitado para servir con la mayor eficiencia. 👌🏻
                    </p>
                </div>
            </div>
        </>
    );
}