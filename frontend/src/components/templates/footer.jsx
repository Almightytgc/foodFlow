import logoFoodFlowBlanco from "../../assets/logo/logoFoodFlow.png";

export const Footer = () => {
  return (
    <>
      <div className="w-full px-8 bg-[#272424] shadow flex flex-col items-center justify-center text-white">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 items-center">
          <hr className="border-[#fff] mx-10"></hr>
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <img className="max-w-[220px] md:mx-auto" src={logoFoodFlowBlanco} width="220" alt="Logo FoodFlow" />
            <p className="text-center font-bold text-lg md:text-xl mt-2">¡Descubre el placer culinario en cada bocado!</p>
          </div>
          <hr className="border-[#fff] mx-10"></hr>
        </div>

        {/* redes sociales */}
        <div className="flex flex-row flex-wrap gap-4 justify-center mt-8">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 448 512" width="50" className="hover:scale-125 duration-300">
              <path fill="#ffffff" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48.V-80zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </span>

          <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="45" viewBox="0 0 448 512" className="hover:scale-125 duration-300">
              <path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
          </span>

          <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="50" width="45" viewBox="0 0 512 512" className="hover:scale-125 duration-300">
              <path fill="#FFF" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
          </span>

        </div>

        {/* informacion */}

        <div className="flex flex-col items-start mt-8 ">
          <div className="flex justify-start">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 384 512">
                <path fill="#fff" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
            </span>

            <div className="ml-2">
              <p className="text-white">Centro comercial La Gran Vía</p>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512"><path fill="#fff" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
            </span>

            <div className="ml-2">
              <p className="text-white">foodflow@gmail.com</p>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512"><path fill="#fff" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
            </span>

            <div className="ml-2">
              <p className="text-white">2597-6382</p>
            </div>
          </div>

          <div className="flex justify-center mt-2 mb-5">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512"><path fill="#fff" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
            </span>

            <div>
              <p className="text-white text-center">Lunes a viernes: 7:00 AM a 9:00 PM <br /> Sábado y domingo: 8:00 AM a 10:00 PM  </p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
