//uso de estado y referencia
import React, { useState, useRef } from 'react';
// comunicación entre react y backend
import axios from "axios";
//redirección
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//alerta / notificaciones
import Swal from 'sweetalert2';
//imágenes
import signupImg from "../../assets/general/signupImg.jpg"

import { alertaNoCoincide, alertaCamposVacios, alertaTelefonoInvalido, alertaNombresApellidosInvalidos, alertaCamposVaciosEspacios, alertaRegistroExitoso } from '../alerts';



export const SignUpForm = () => {

  const navigate = useNavigate();

  //recepción de datos del form
  const [names, setNombres] = useState("");
  const [lastNames, setApellidos] = useState("");
  //validar que se escriba un nombre / apellido sin números
  const nombreApellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const [phone, setTelefono] = useState("");
  //verificar que solo se pongan números
  const telefonoRegex = /^[\d()\s-]+$/;
  const [mail, setCorreo] = useState("");
  const [user, setUsuario] = useState("");
  const [passWord, setContrasenia] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [securityQuestion, setPregunta] = useState("");
  const [securityAnswer, setRespuesta] = useState("");

  //envío de datos del formm
  const registrarUsuario = async (e) => {
    e.preventDefault();

    //validar el input de teléfono
    const validarTelefono = (telefono) => {
      return telefonoRegex.test(telefono);
    }

    //validar los input de nombre y apellido
    const validarNombreApellido = (nombreApellido) => {
      return nombreApellidoRegex.test(nombreApellido);
    };

    let camposVacios = false;
    let contraseniaDistinta = false;

    if (names == "" || lastNames == "" || phone == "" || mail == "" || user == "" || passWord == "" || confirmPassword == "") {
      camposVacios = true;
      return alertaCamposVacios();

    } else if (passWord != confirmPassword) {
      contraseniaDistinta = true;
      return alertaNoCoincide();

    } else if (!validarTelefono(phone)) {
      return alertaTelefonoInvalido();

    } else if (!validarNombreApellido(names) || !validarNombreApellido(lastNames)) {
      return alertaNombresApellidosInvalidos();
    } else if(!names.trim().length|| !lastNames.trim().length || !user.trim().length || !passWord.trim().length || !confirmPassword.trim().length ){
      camposVacios = true;
      return alertaCamposVaciosEspacios();
    }

    if (!camposVacios && !contraseniaDistinta) {
      try {
        await axios.post("http://localhost:5000/authentication/signup",
          {
            nombres: names,
            apellidos: lastNames,
            telefono: phone,
            correo: mail,
            usuario: user,
            contrasenia: passWord,
            preguntaSeguridad: securityQuestion,
            respuesta: securityAnswer
          });

        alertaRegistroExitoso();

        //redireccionar a login después de registro exitoso
        navigate("/authentication");

      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.msg) {
          Swal.fire('Error', error.response.data.msg, 'error');
        } else {
          Swal.fire('Error', 'Error en el servidor', 'error');
        }
      }
    }


  }


  //referencia a el input de la contraseña
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  //ver contraseña
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
      {/* contenedor general */}
      <div className="m-24 max-sm:m-10 bg-gray-100 rounded-2xl shadow-lg md:max-w-4xl h-auto p-3 flex items-center justify-center">
        {/* contenedor izquierdo */}
        <div className="md:w-1/2 px-16 max-sm:px-4">
          <h2 className="font-bold text-3xl text-center text-[#211B16]">
            Registro
          </h2>
          <form onSubmit={registrarUsuario} className="flex flex-col gap-4">

            {/* Nombres y apellidos */}
            <div className='flex flex-row max-sm:flex-wrap'>
              <input
                className="p-2 mt-8 rounded-xl border w-1/2 max-sm:w-full mx-1"
                type="text"
                name="nombres"
                placeholder="Nombres"
                value={names}
                onChange={(e) => setNombres(e.target.value)}
              ></input>

              <input
                className="p-2 mt-8 rounded-xl  border w-1/2 mx-1 max-sm:w-full "
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={lastNames}
                onChange={(e) => setApellidos(e.target.value)}
              ></input>
            </div>

            {/* telefono y fecha de nacimiento  */}
            <div className='flex flex-row max-sm:flex-wrap'>
              <div className='flex flex-col justify-center w-1/2 text-center mx-2 max-sm:w-full'>
                <input className="p-2 rounded-xl mt-8 border w-full placeholder:text-sm"
                  type="text"
                  name="apellidos"
                  placeholder="Telefono"
                  value={phone}
                  onChange={(e) => setTelefono(e.target.value)}
                ></input>
              </div>


              <input
                className="p-2 mt-8 rounded-xl  border w-1/2 mx-1 max-sm:w-full"
                type="email"
                name="nombres"
                placeholder="correo"
                value={mail}
                onChange={(e) => setCorreo(e.target.value)}
              ></input>
            </div>

            {/* correo y usuario */}
            <input
              className="p-2 my-4 rounded-xl  border w-full mx-1"
              type="text"
              name="apellidos"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUsuario(e.target.value)}
            ></input>

            <h3 className='text-sm text-center my-2 font-bold'>Contraseña</h3>

            <div className="relative">
              <input
                ref={passwordRef}
                className="p-2 mt-2 rounded-xl w-full border shadow-lg"
                type="password"
                name="password"
                id="inputPassword"
                placeholder="Contraseña"
                value={passWord}
                onChange={(e) => setContrasenia(e.target.value)}
              ></input>

              <svg onClick={() => verContrasenia(passwordRef)}
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


            <h3 className='text-sm text-center my-4 font-bold'>Confirmar contraseña</h3>

            <div className="relative">
              <input
                ref={confirmRef}
                className="p-2 mt-2 rounded-xl w-full  border shadow-lg"
                type="password"
                name="password"
                id="inputPassword"
                placeholder="Contraseña"
                onChange={(e) => setConfirm(e.target.value)}
              ></input>

              <svg onClick={() => verContrasenia(confirmRef)}
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

            {/* pregunta de seguridad */}

            <h3 className='text-sm text-center my-4'>Pregunta de seguridad para recuperación de contraseña (opcional)</h3>

            <div className='flex flex-col'>
              <div className='flex flex-col justify-center w-full text-center mx-2 max-sm:w-full'>
                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Pregunta</label>
                <select name="" id="" className="p-2 mt-2 rounded-xl  border w-full mx-1 text-sm" value={securityQuestion} onChange={(e) => setPregunta(e.target.value)}>
                  <option value="" disabled>Seleccione una pregunta</option>
                  <option className='text-sm' value="¿En qué hospital naciste?">¿En qué hospital naciste?</option>
                  <option className='text-sm' value="¿Cuál es tu libro favorito?">¿Cuál es tu libro favorito?</option>
                  <option className='text-sm' value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                  <option className='text-sm' value="¿Cuál es tu personaje histórico favorito?">¿Cuál es tu personaje histórico favorito?</option>
                </select>
              </div>


              <div className='flex flex-col justify-center w-full text-center max-sm:w-full my-2'>
                <label htmlFor="fechaNacimiento" className='text-sm text-[#211B16] font-bold'>Respuesta</label>
                <input className="p-2 mt-2 rounded-xl  border w-full mx-1 placeholder:text-sm"
                  type="text"
                  name="apellidos"
                  placeholder="Respuesta"
                  value={securityAnswer}
                  onChange={(e) => setRespuesta(e.target.value)}
                ></input>
              </div>

            </div>

            <div className="flex flex-col w-full gap-2 my-8">
              <button className="bg-[#249643] hover:bg-[#211B16] hover:text-[#fff] rounded-xl text-white p-2 duration-500 m-1 font-bold">
                Registrarse
              </button>
              <Link to={'/authentication'}>
                <h3 className="text-center mt-2 hover:text-[#249643] font-bold duration-500">
                  ¿Ya tienes una cuenta? ¡Inicia sesión!
                </h3>
              </Link>

            </div>
          </form>
        </div>

        {/* contenedor derecho  */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-xl" width="450" height="350" src={signupImg}></img>
        </div>
      </div>
    </>
  );
}






























