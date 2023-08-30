import React from 'react';
//imagen
import imgIndex from "../../assets/general/index.jpg";
import ingredientesIndex from "../../assets/general/ingredientesIndex.jpg";
//redirección
import { Link } from 'react-router-dom';


export function Index() {
    return (
        <>
            {/* contenedor principal */}
            <div className='flex flex-col'>
                <div className="mt-15 rounded-2xl w-full max-w-6xl p-5 flex items-center justify-center max-md:flex-wrap">

                    <div className="w-1/2 md:px-16 flex justify-center">
                        <img className='rounded-xl max-sm:w-48 ' width="350" src={imgIndex} />
                    </div>

                    <div className="hidden md:inline-block h-[600px] min-h-[1em] my-4 w-0.5 self-stretch bg-[#fff]">
                    </div>

                    <div className="md:w-1/2 md:px-16">
                        <h1 className="text-[#fff] text-3xl font-bold my-5 text-justify" >
                            ¡Descubre el placer culinario en cada bocado!
                        </h1>

                        <p className="text-lg text-[#fff] text-justify">
                            Desde deliciosas opciones de entrantes hasta platos principales innovadores y postres tentadores, FoodFlow ofrece una amplia variedad de sabores y opciones para satisfacer todos los paladares.
                        </p>


                        <Link to={'/authentication/signup'}>
                            <button className="bg-[#249643] hover:bg-[#fff] hover:text-[#211B16] rounded-xl text-white p-2 duration-500 my-5 font-bold w-full">
                                ¡Regístate!
                            </button>
                        </Link>
                    </div>
                </div>

                {/* descubre los mejores ingredientes */}
                <div className="md:mt-16 rounded-2xl w-full max-w-5xl py-5 mx-auto flex items-center justify-center flex-col">
                    <h1 id="quienesSomos" className="text-[#fff]  text-5xl md:text-6xl font-bold my-10 text-center" >
                        ¡Descubre los mejores ingredientes!
                    </h1>

                    {/* descubre los mejores ingredientes */}
                    <div className='w-full flex flex-row sm:flex-col gap-8 items-center max-sm:flex-wrap max-md:px-2'>

                        <div className='w-full'>
                            <p className="text-xl p-5 text-[#fff] text-justify">
                                Estamos enormemente orgullosos de seleccionar cuidadosamente nuestros ingredientes para garantizar que los sabores de nuestra comida sean los más deliciosos y auténticos posible.
                            </p>
                        </div>

                        <div className="md:block w-full md:mx-auto flex justify-center">
                            <img className='rounded-xl md:mx-auto md:my-3' width="400" src={ingredientesIndex}></img>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

