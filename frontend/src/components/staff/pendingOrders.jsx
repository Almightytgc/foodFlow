import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertaAutenticacion } from "../alerts";
import { OrdersToDeliver } from "./ordersToDeliver";
import { TablesUsed } from "./tablesUsed";

export const PendingOrders = () => {
  const navigate = useNavigate();
  const staffLoggedStorage = localStorage.getItem("staffLogged");

  useEffect(() => {
    const loadStaffLoggedValue = () => {
      return staffLoggedStorage ? JSON.parse(staffLoggedStorage) : false;
    };

    const staffLoggedValue = loadStaffLoggedValue();
    console.log("el mesero está ", staffLoggedValue);
    if (!staffLoggedValue) {
      navigate("/authentication");
      return alertaAutenticacion();
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
