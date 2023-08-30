import React from 'react'
//el dom o contenedor donde se renderiza todo
import ReactDOM from 'react-dom/client'
//pagesRouter = router
//router provider es aquel que va a hacer que nuestras rutas funcionen
import { PagesRouter } from './routes/router';
import {RouterProvider} from "react-router-dom";
//utilidades de tailwind
import './index.css';
//contexto para verificar si usuario logueado o no
// import { AuthenticationState } from './context/authenticationState';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthenticationState> */}
      <RouterProvider router={PagesRouter} />
    {/* </AuthenticationState> */}
  </React.StrictMode>
);



