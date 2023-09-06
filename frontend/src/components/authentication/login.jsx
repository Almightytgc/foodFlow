//uso de estado, referencia, contexto y código que se ejecuta en segundo plano
import React, { useState, useRef, useEffect } from 'react';
//comunicación entre react y el backend
import axios from "axios";
//hipervinculos / redireccionar
import { Link, useNavigate } from 'react-router-dom';
import { alertaBienvenida, credencialesIncorrectas, alertaCamposVacios, alertaCamposVaciosEspacios } from '../alerts';

//imágenes
import loginImg from "../../assets/general/loginImg.jpg"

export const LoginForm = () => {

  const navigate = useNavigate();

  const [user, setUsuario] = useState('');
  const [passWord, setContrasenia] = useState('');

  //envío de datos
  const verificarCredenciales = async (e) => {
    e.preventDefault();
    let camposVacios = false;

    if (user == "" || passWord == "") {
      camposVacios = true;
      return alertaCamposVacios();
    }

    if (!user.trim().length || !passWord.trim().length) {
      camposVacios = true;
      return alertaCamposVaciosEspacios();
    }




    if (!camposVacios) {
      try {
        const response = await axios.post("http://localhost:5000/authentication",
          {
            usuario: user,
            contrasenia: passWord
          });
        alertaBienvenida(user);
        // console.log(response.data);

        //obtener el id del usuario
        const id_usuario_storage = response.data.id_usuario;
        // console.log("el id atrapado es ", id_usuario_storage);
        //guardar en localStorage 
        localStorage.setItem("id_usuario", id_usuario_storage);

        //redireccionar
        const message = response.data.msg; // Obtener el mensaje de la respuesta


        if (message === "Inicio de sesión exitoso, bienvenido usuario") {
          let userLogged = true;
          let logged = true;
          const userLoggedStorage = JSON.stringify(userLogged);
          localStorage.setItem("userLogged", userLoggedStorage);

          const isLogged = JSON.stringify(logged);
          localStorage.setItem("isLogged", isLogged);
          navigate("/customer/setTable");

        } else if (message === "Inicio de sesión exitoso, bienvenido mesero / chef") {
          let staffLogged = true;
          let logged = true;
          const staffLoggedStorage = JSON.stringify(staffLogged);
          localStorage.setItem("staffLogged", staffLoggedStorage);

          const isLogged = JSON.stringify(logged);
          localStorage.setItem("isLogged", isLogged);
          navigate("/staff");

        } else if (message === "Inicio de sesión exitoso, bienvenido administrador") {
          let adminLogged = true;
          let logged = true;
          const adminLoggedStorage = JSON.stringify(adminLogged);
          localStorage.setItem("adminLogged", adminLoggedStorage);

          const isLogged = JSON.stringify(logged);
          localStorage.setItem("isLogged", isLogged);
          navigate("/admin");
        }
      } catch (error) {
        console.error(error);
        credencialesIncorrectas();
      }
    }
  }

  //ver contraseña
  const inputRef = useRef(null);

  const verContrasenia = (inputRef) => {
    if (inputRef.current) {
      const passwordInput = inputRef.current;
      if (passwordInput.type === "password") {
        passwordInput.type = "text"
      } else {
        passwordInput.type = "password"
      }
    }
  }

  return (
    <>
      <div className="mt-15 bg-gray-100 rounded-2xl shadow-lg  p-5 flex items-center justify-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-3xl text-center text-[#211B16]">
            Iniciar sesión
          </h2>
          <form onSubmit={verificarCredenciales} className="flex flex-col mt-4 gap-4">

            <h3 className='text-sm text-center my-4 font-bold'>Usuario</h3>

            <input
              className="p-2 rounded-xl  border shadow-xl"
              type="text"
              name="usuario"
              id="usuario"
              placeholder="Usuario"
              onChange={(e) => setUsuario(e.target.value)}
            ></input>

            <h3 className='text-sm text-center my-4 font-bold'>Contraseña</h3>

            <div className="relative">
              <input
                ref={inputRef}
                className="p-2 mt-2 rounded-xl w-full border shadow-lg"
                type="password"
                name="password"
                id="inputPassword"
                placeholder="Contraseña"
                value={passWord}
                onChange={(e) => setContrasenia(e.target.value)}
              ></input>

              <svg onClick={() => verContrasenia(inputRef)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fillRule="currentColor"
                className="bi bi-eye absolute top-1/4 translate-y-1/2 right-3 hover:scale-125 duration-300"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>

            <div className="flex flex-col w-full gap-2">
              <button type='submit' className="bg-[#249643] hover:bg-[#211B16] hover:text-[#fff] rounded-xl text-white p-2 duration-500 m-1 font-bold">
                Iniciar sesión
              </button>
              <Link to={'/authentication/signup'}>
                <h3 className="text-center mt-8 hover:text-[#249643] font-bold duration-500">
                  ¿No tienes una cuenta? ¡Regístrate!
                </h3>
              </Link>

              <hr className='w-[80%] my-2 bg-[#211B16] h-1 rounded-xl m-auto'></hr>

              <Link to={'/authentication/resetPassword'}>
                <h3 className="text-center hover:text-[#249643] font-bold duration-500">
                  ¿Olvidaste tu contraseña?
                </h3>
              </Link>


            </div>
          </form>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-xl mx-auto" src={loginImg} width="300" height="250"></img>
        </div>
      </div>
    </>
  );
}