import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate()
    
    const awaRefrescar = ()=>{
        navigate("/")
        window.location.reload()
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen text-white px-4 bg-[#272424]'>
            <div className='flex flex-col items-center w-full gap-8'>
                <h1 className='text-9xl md:text-16xl w-full select-none text-center font-black text-white'>
                    404
                </h1>
                <p className='text-3xl font-semibold text-center'>¡Descubriste una página secreta de FoodFlow!</p>
                <p className='text-2xl md:px-12 text-center'>
                    Desafortundamente solo es una página de error 404. Es posible que hayas ingresado mal la URL que buscas.
                </p>
                <div className='flex flex-row justify-center gap-8'>
                    <div onClick={()=>awaRefrescar()} className="flex justiy-center items-center px-5 py-2 text-xl rounded-xl  text-black border bg-[#F47228] hover:text-black hover:bg-white font-bold duration-500">
                    Página de inicio
                    </div>
                    </div>
            </div>
        </div>

        
    );
}