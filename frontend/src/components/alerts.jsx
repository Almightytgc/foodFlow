import Swal from "sweetalert2";

export const alertaBienvenida = (user) => {
    Swal.fire({
        titleText: `Bienvenido ${user}`,
        confirmButtonColor: "#F47228"
    });
}

// forms

export const alertaRegistroExitoso = () => {
    Swal.fire({
        icon: 'success',
        iconColor: '#249643',
        title: 'Usuario registrado exitosamente',
        text: 'Por favor inicia sesión',
        confirmButtonColor: '#249643',
        color: '##211B16'
    })
}

export const credencialesIncorrectas = () => {
    Swal.fire({
        icon: 'error',
        iconColor: "red",
        title: 'Error en la autenticación',
        confirmButtonColor: "#F47228",
        text: "Usuario o contraseña incorrectos"
    });
}

export const alertaCamposVacios = () => {
    Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Campos vacíos",
        text: "Por favor rellena todos los campos solicitados",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

export const alertaCamposVaciosEspacios = () => {
    Swal.fire({ 
        icon: "error",
        iconColor: "red",
        title: "Campos vacíos",
        text: "Por favor rellena todos los campos solicitados con carácteres válidos",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

export const alertaCifraInvalida = () => {
    Swal.fire({ 
        icon: "error",
        iconColor: "red",
        title: "Cifra invalida",
        text: "Por favor rellena la cifra correctamente",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

export const alertaNoCoincide = () => {
    Swal.fire({
        icon: 'error',
        iconColor: "red",
        title: 'Error en la autenticación',
        confirmButtonColor: "#F47228",
        text: "Usuario o contraseña incorrectos"
    });
}

export const alertaPasswordsNoCoinciden = () =>{
    Swal.fire({
        icon: 'error',
        iconColor: 'red',
        title: 'Las cotraseñas no coinciden',
        text: 'Por favor intenta de nuevo',
        confirmButtonColor: '#249643',
        color: '##211B16'
    })
}

export const alertaNombresApellidosInvalidos = () => {
    Swal.fire({
        icon: 'error',
        iconColor: 'red',
        title: 'Nombres o apellidos inválidos',
        text: 'Por favor ingresa un nombre o apellido real.',
        confirmButtonColor: '#249643',
        color: '##211B16'
    });
}

export const alertaTelefonoInvalido = () => {
    Swal.fire({
        icon: 'error',
        iconColor: 'red',
        title: 'Número de teléfono inválido',
        text: 'Por favor ingresa un número telefónico valido',
        confirmButtonColor: '#249643',
        color: '##211B16'
    })
}

export const alertaContraseniaCambiada = () => {
    Swal.fire({
        icon: 'success',
        iconColor: '#249643',
        title: 'Contraseña cambiada exitosamente',
        text: 'Por favor inicia sesión',
        confirmButtonColor: '#249643',
        color: '##211B16'
    })
}

//permisos de usuario

export const alertaAutenticacion = () => {
    Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Acceso no autorizado",
        text: "Para acceder a la ruta solicitada debes autenticarte",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

//solicitud atención mesero

export const alertAtencion = (data) => {
    Swal.fire({
        icon: "warning",
        iconColor: "green",
        title: "Solicitud de atención",
        text: data,
        confirmButtonColor: "#F47228",
        color: "#211B16",
    });
}

//cliente
export const alertaMesaRegistrada = () => {
    Swal.fire({
        icon: "success",
        iconColor: "green",
        title: "¡Mesa registrada exitosamente!",
        text: "Cuando estés listo para ordenar solicita atención desde el panel de opciones",
        confirmButtonColor: "#F47228"
    });
}

export const alertaErrorMesa = () => {
    Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Error al registrar tu mesa",
        text: "La mesa que ingresaste ya está en uso o no existe, por favor inténtalo de nuevo",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

export const alertaAtencionSolicitada = () => {
    Swal.fire({
        icon: "success",
        iconColor: "green",
        title: "Atención solicitada",
        text: "Tu solicitud ha sido enviada, nuestro staff llegará a tu mesa a atenderte",
        confirmButtonColor: "#F47228"
    });
}

export const alertaErrorSolicitudAtencion = () => {
    Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Error al realizar tu solicitud",
        text: "Aún no has registrado la mesa en que encuentras",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}


//staff

//producto agregado a carrito
export const alertaProductoAgregadoCarrito = (producto) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        iconColor: "green",
        title: producto + " agregado al carrito"
      })
}

export const alertaProductoEliminadoCarrito = (producto) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        iconColor: "red",
        title: producto + " eliminado del carrito"
      })
}

//mesa no seleccionada
export const alertaErrorMesaVacia = () => {
    Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Error al realizar tu pedido",
        text: "Por favor, elige una mesa antes de enviar el pedido.",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

//carrito de compras vacío

  export const alertaErrorCarritoVacio = () => {
    Swal.fire({
        icon: "error",
        iconColor: "red",
        title: "Error al realizar tu pedido",
        text:  "El carrito está vacío. Agrega productos antes de enviar el pedido.",
        confirmButtonColor: "#249643",
        color: "##211B16",
    });
}

//pedido enviado
export const alertaPedidoEnviado = () => {
    Swal.fire({
        icon: "success",
        iconColor: "green",
        text: "El pedido ha sido enviado exitosamente",
        confirmButtonColor: "#F47228"
    });
}

//crud productos

export const alertaProductoCreado = () => {
    Swal.fire({
        titleText: `El producto ha sido registrado exitosamente`,
        confirmButtonColor: "#F47228"
    });
}

export const alertaProductoEditado = () => {
    Swal.fire({
        icon: "success",
        iconColor: "green",
        text: "La información del producto ha sido modificada exitosamente",
        confirmButtonColor: "#F47228"
    });
}

export const alertaProductoEliminado = () => {
    Swal.fire({
        titleText: `El producto ha sido eliminado exitosamente`,
        confirmButtonColor: "#F47228"
    });
}

export const alertaImagenProducto = (nombreProducto, idImagen, precio) => {
    Swal.fire({
        title: nombreProducto,
        imageUrl: `http://localhost:5000${idImagen}`,
        text: `precio $${precio}`,
        imageWidth: 250,
        imageAlt: 'imagen producto',
        confirmButtonColor: "#F47228"
    })
}
