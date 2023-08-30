import React from 'react';
import burgerIndex from "../../assets/general/burgerIndex.jpg";

export const AboutUs = () => {
    return (
        <div className="rounded-2xl w-full max-w-6xl p-5 flex items-center justify-center flex-col">
            <h1 id="quienesSomos" className="text-[#fff] text-6xl font-bold my-10 text-center " >
                ¿Quiénes somos?
            </h1>

            <div className='w-full flex flex-row gap-8 items-center max-sm:flex-wrap'>
                <div className='w-full'>
                    <p className="text-2xl p-5 text-[#fff] text-justify max-sm:p-1 max-sm:text-lg">
                        FoodFlow es la mejor decisión para colmar tu apetito. La calidad, el orden, los sabores de FoodFlow son unos de los tantos puntos importantes que nos han llevado a destacar sobre los demás restaurantes. Cada visita a nuestro restaurante es una celebración de la gastronomía, donde la calidad es nuestro ingrediente principal.
                    </p>
                </div>

                <div className="md:block w-full md:mx-auto flex justify-center">
                    <img className='rounded-xl md:mx-auto' width="300" src={burgerIndex}></img>
                </div>

            </div>

            <div className="mt-16 rounded-2xl w-full max-w-5xl py-5 mx-auto flex items-center justify-center flex-col">
                <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" fill="currentColor" className="inline-block text-white mb-8" viewBox="0 0 975.036 975.036">
                        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p className="leading-relaxed text-2xl text-white text-justify max-sm:p-1 max-sm:text-lg">La gestión de un restaurante exitoso requiere una combinación de pasión por la comida, atención al detalle y habilidades empresariales. Es como dirigir una orquesta, donde cada elemento debe estar en armonía para crear una experiencia excepcional para los comensales.</p>
                    <span className="inline-block h-2 w-1/2 rounded bg-[#F47228] mt-8 mb-6"></span>
                    <h2 className="text-white font-medium title-font tracking-wider text-xl">Wolfgang Puck</h2>
                </div>
            </div>
        </div>
    );
}