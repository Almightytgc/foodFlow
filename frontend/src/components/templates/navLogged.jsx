//logo
import logoFoodFlowNegro from "../../assets/logo/logoFoodFlowNegro.png";
//redireccion
import { Link, useNavigate } from "react-router-dom";

//código asincrónico
import { useEffect, useState } from "react";
//swr
import useSWR, { useSWRConfig } from "swr";
//axios 
import axios from "axios";
//socket 
import io from "socket.io-client";
import { alertAtencion } from "../alerts";

const socket = io("http://localhost:5000", { transports: ["websocket", "polling"] });


socket.on("connect", () => {
  // console.log("Conexión exitosa a socket desde staff home");
});

//navbar
export function NavBarLogged() {

  const navigate = useNavigate();

  const [id_usuario, setIdUsuario] = useState('');
  const [hora, setHora] = useState(new Date());

  const { mutate } = useSWRConfig();

  //actualizar la hora
  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    //set id de usuario
    const idUsuario = localStorage.getItem('id_usuario');
    setIdUsuario(idUsuario);

    socket.on("connect", () => {
      // console.log("Conexión exitosa a socket desde staff home");
    });
  }, []);

  const fetcher = async () => {
    const response = await axios.get(`http://localhost:5000/users/getUserById/${id_usuario}`);
    // console.log(response.data)
    return response.data;
  };

  const { data, error } = useSWR(id_usuario ? 'user' : null, fetcher, {refreshInterval: 1000});

  if (error) {
    console.error('Error al realizar el fetching', error);
  }

  
  const userFetched = data?.usuario;
  //validar rol de mesero
  const rolMesero = data?.fk_rol;

  //validar que un mesero está logueado para recibir alertas
  if (rolMesero == 2) {
    socket.on("mensajeAtencionStaff", (data) => {
      alertAtencion(data);
    })
  } 




  //validar que parte del día es
  const parteDia = () => {
    const horaActual = hora.getHours();

    if (horaActual >= 5 && horaActual < 12) {
      return 'Buenos días ☀️';
    } else if (horaActual >= 12 && horaActual < 19) {
      return 'Buenas tardes 👋🏻';
    } else {
      return 'Buenas noches 🌛';
    }
  };

  //validacion de redirecciones al dar click en el logo

  let rutaInicio = "";
  const userLoggedValue = localStorage.getItem("userLogged");
  const mesaValidada = localStorage.getItem("mesaValidada");


  const staffLoggedStorage = localStorage.getItem("staffLogged");
  const AdminLoggedStorage = localStorage.getItem("adminLogged");

  const validarRutaInicio = () => {
    if (userLoggedValue && mesaValidada && !staffLoggedStorage && !AdminLoggedStorage) {
      return rutaInicio = "/customer";

    } else if (staffLoggedStorage && !userLoggedValue && !AdminLoggedStorage) {
      return rutaInicio = "/staff";

    } else if (AdminLoggedStorage && !userLoggedValue && !staffLoggedStorage) {
      return rutaInicio = "/admin";
    }

    return rutaInicio;
  }

  const rutaInicioValidada = validarRutaInicio();

  //función de cierre de sesión
  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  }

  /*   //translate
     const googleTranslateElementInit = () => {
       new window.google.translate.TranslateElement(
         {
           pageLanguage: 'en',
           autoDisplay: false,
         },
         'google_translate_element'
       );
     };
   
     useEffect(() => {
       const existingScript = document.getElementById('google-translate-api');
   
       if (!existingScript) {
         const script = document.createElement('script');
         script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
         script.id = 'google-translate-api';
         script.async = true;
         document.body.appendChild(script);
       }
   
       window.googleTranslateElementInit = googleTranslateElementInit;
   
       return () => {
         // Clean up the script when the component unmounts
         if (existingScript) {
           document.body.removeChild(existingScript);
         }
         delete window.googleTranslateElementInit;
       };
     }, []);
 
     */



  return (
    <>

      <nav className="px-8 py-4 bg-[#F47228] shadow flex flex-col lg:flex-row md:justify-between  justify-center items-center w-full max-w-sm:px-4 max-w-sm:py-2 max-lg:flex-wrap">

        {/* logo foodflow */}
        <Link to={rutaInicioValidada} className="flex items-center mb-4 md:mb-0">
          <img className="max-w-[200px]" src={logoFoodFlowNegro} />
        </Link>

        <h4 className="text-center font-bold text-xl"> {parteDia()}</h4>
        {/*<div id="google_translate_element"></div>*/}

        <div className="font-bold text-xl flex items-center gap-10 flex-wrap justify-center">

          <Link to={`/staff/editOptions/${id_usuario}`} className="flex flex-col text-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                fill="currentColor"
                className="bi bi-person-circle mx-auto my-0"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </span>
            <h4>{userFetched}</h4>
          </Link>

          <div className='bg-[#211B16] hover:bg-[#fff] text-[#fff] hover:text-[#211B16] duration-500 rounded-xl p-2 flex items-center' onClick={cerrarSesion}>
            <span  >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="bi bi-person-circle mx-auto my-0" width="45" height="45">
                <path fill="currentColor" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            </span>
            <span className="mx-2">Cerrar sesión</span>
          </div>

        </div>
      </nav>
    </>
  );
}