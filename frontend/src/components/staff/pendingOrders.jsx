import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertaAutenticacion } from "../alerts";
import { OrdersToDeliver } from "./ordersToDeliver";
import { TablesUsed } from "./tablesUsed";

export const PendingOrders = () => {
  const navigate = useNavigate();
  const staffLoggedStorage = localStorage.getItem("staffLogged");

  useEffect(() => {
    // Función para cargar el valor de staffLogged desde el almacenamiento local
    const loadStaffLoggedValue = () => {
      return staffLoggedStorage ? JSON.parse(staffLoggedStorage) : false;
    };

    // Obtener el valor de staffLogged y comprobar la autenticación
    const staffLoggedValue = loadStaffLoggedValue();
    console.log("El mesero está ", staffLoggedValue);

    if (!staffLoggedValue) {
      // Redirigir a la página de autenticación si el usuario no está autenticado
      navigate("/authentication");
      alertaAutenticacion(); // ¿Esta función se encarga de mostrar una alerta?
    }
  }, [navigate, staffLoggedStorage]);

  return (
    <>
      <div className="mt-15 rounded-2xl p-5 flex items-center justify-center flex-wrap">
        <OrdersToDeliver />
        <TablesUsed />
      </div>
    </>
  );
};
