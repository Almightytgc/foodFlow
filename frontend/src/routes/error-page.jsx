import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div class='flex items-center justify-center w-full min-h-screen text-white px-4 bg-[#272424]'>
            <div class='flex flex-col items-center w-full gap-8'>
                <h1 class='text-9xl md:text-16xl w-full select-none text-center font-black text-white'>
                    404
                </h1>
                <p class='text-3xl font-semibold text-center'>¡Descubriste una página secreta de FoodFlow!</p>
                <p class='text-2xl md:px-12 text-center'>
                    Desafortundamente solo es una página de error 404. Es posible que hayas ingresado mal la URL que buscas.
                </p>
                <div class='flex flex-row justify-center gap-8'>
                    <Link to={"/"} className="flex justiy-center items-center px-5 py-2 text-xl rounded-xl  text-black border bg-[#F47228] hover:text-black hover:bg-white font-bold duration-500">
                    Página de inicio
                    </Link>
                    </div>
            </div>
        </div>
    );
}