import logoFoodFlowNegro from "../../assets/logo/logoFoodFlowNegro.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const NavSu = () => {
    const [open, setOpen] = useState(false);
    const [hora, setHora] = useState(new Date());

    const toggleMenu = () => {
        setOpen(!open);
    }

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

    return (
        <>
            <div className="w-full bg-[#F47228]">
                <div className="md:flex items-center justify-between p-4 md:px-10">
                    <div>
                        <img src={logoFoodFlowNegro} className="max-w-[200px]" alt="logo" />
                    </div>

                    <div>
                        <ul className={`md:flex md:items-center md:pb-0 max-sm:p-9 my-8 absolute md:static bg-[#F47228] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${open ? 'block' : 'hidden'} max-sm:shadow-xl`}>
                            <li className="md:ml-8 text-xl md:my-0 my-7">
                                <Link className=" hover:text-[#fff] duration-500 font-bold">Inicio</Link>
                            </li>

                            <li className="md:ml-8 text-xl md:my-0 my-7">
                                <Link className=" hover:text-[#fff] duration-500 font-bold">Sobre nosotros</Link>
                            </li>

                            <li className="md:ml-8 text-xl md:my-0 my-7">
                                <Link className=" hover:text-[#fff] duration-500 font-bold">Menú</Link>
                            </li>

                            <Link to={'/authentication'} className='bg-[#211B16] hover:bg-[#fff] text-[#fff] hover:text-[#211B16] duration-500 rounded-xl p-2 flex items-center justify-center m-5 block md:hidden lg:hidden my-2 '>

                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        fill="currentColor"
                                        className="bi bi-person-circle mx-auto"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path
                                            fill="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                        />
                                    </svg>
                                </span>
                                <span className="text-center w-full"><p>Iniciar sesión</p></span>

                            </Link>
                        </ul>
                    </div>

                    <div className="flex flex-col max-sm:flex-row items-center">
                        <h4 className="text-center text-lg mx-auto">{parteDia()}</h4>

                        <Link to={'/authentication'} className='bg-[#211B16] hover:bg-[#fff] text-[#fff] hover:text-[#211B16] duration-500 rounded-xl p-2 flex items-center justify-center w-full max-sm:w-1/3 mx-auto max-sm:hidden error-screen:hidden block'>

                            <span className="">
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
                            <span className="text-center mx-auto">Iniciar sesión</span>

                        </Link>
                    </div>



                    <div onClick={toggleMenu} className="text-3xl absolute right-10 top-6 cursor-pointer md:hidden">
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </div>
                </div>
            </div>
        </>
    );
}
