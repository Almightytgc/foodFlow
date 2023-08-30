//logo
import { useEffect, useState } from "react";
import logoFoodFlowNegro from "../../assets/logo/logoFoodFlowNegro.png";
//redireccion
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// import "../../index.css";



//navbar
export function NavBar() {

  const navigate = useNavigate();

  const userLoggedValue = localStorage.getItem("userLogged");
  const staffLoggedStorage = localStorage.getItem("staffLogged");
  const AdminLoggedStorage = localStorage.getItem("adminLogged");

  useEffect(() => {
    if (userLoggedValue && !staffLoggedStorage && !AdminLoggedStorage) {
      return navigate("/customer");
    } else if (staffLoggedStorage && !userLoggedValue && !AdminLoggedStorage) {
      return navigate("/staff");
    } else if (AdminLoggedStorage && !userLoggedValue && !staffLoggedStorage) {
      return navigate("/admin")
    }
  }, [])


  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

    //translate
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

  
  return (
    <>
      
      <nav className="px-8 py-4 bg-[#F47228] shadow flex flex-col lg:flex-row md:justify-between  justify-center items-center w-full max-w-sm:px-4 max-w-sm:py-2 max-lg:flex-wrap">
      
        <Link to={"/"} className="flex items-center mb-4 md:mb-0">
          <img className="max-w-[200px]" src={logoFoodFlowNegro} />
        </Link>
        {/* <div id="google_translate_element"></div> */}
        {/* botones del header */}
        <div className="font-bold text-xl flex flex-row md:flex-row md:items-center gap-4 mb-4 text-center">
          <Link to={"/"} className="mx-0 md:mx-5 hover:text-[#fff] duration-500">Inicio</Link>
          <Link to={"/aboutUs"} className="mx-0 md:mx-5 hover:text-[#fff] duration-500">Sobre nosotros</Link>
          <Link to={"/menu"} className="mx-0 md:mx-5 hover:text-[#fff] duration-500">Menú</Link>
        </div>

        <div className="font-bold text-xl flex items-center flex-col gap-2">
          {/* saludo */}
          <h4 className="text-center text-lg mx-1"> {parteDia()}</h4>
          

          <Link to={'/authentication'} className='bg-[#211B16] hover:bg-[#fff] text-[#fff] hover:text-[#211B16] duration-500 rounded-xl p-2 flex items-center'>

            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </span>
            <span className="mx-2 text-center">Iniciar sesión</span>
            
          </Link>
        </div>
      </nav>
    </>
  );
}