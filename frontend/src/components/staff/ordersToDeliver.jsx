import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Link } from "react-router-dom";

export const OrdersToDeliver = () => {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get(
      "http://localhost:5000/staff/getPendingOrders"
    );
    // console.log(response.data);
    return response.data;
  };

  const { data, isLoading } = useSWR("ordenesPendientes", fetcher, {
    refreshInterval: 1000,
  });

  const ordenEntregada = async (idOrden) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/staff/orderDelivered/${idOrden}`
      );
      mutate("ordenesPendientes");
      // if (response) {
      //   return console.log("Orden marcada como entregada exitosamente");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <h2 className="text-white text-6xl text-center mx-auto">Cargando...</h2>;


  return (
    <>
      <div className="w-1/3 flex justify-start my-10 mx-auto">
        <Link
          className="bg-[#58764E] text-white text-center hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 text-lg font-bold w-full"
          to={"/staff/"}
        >
          <span className="font-bold">Regresar</span>
        </Link>
      </div>

      <div className="md:w-4/3 px-16 flex flex-col justify-start items-start">
        <h1 className="border-[#58764E] border-b-4 py-2 w-[30%] max-sm:w-[50%] max-sm:text-2xl text-3xl my-8 font-bold text-[#F47228]" >Pedidos a entregar</h1>

        <p className="text-[#fff] font-bold  my-8 max-sm:text-justify  max-sm:text-2xl text-3xl">
          Controle y Administre el estado en que se encuentran los pedidos.
        </p>
      </div>

      <div className="overflow-x mx-auto w-full">
        <div className="overflow-x mx-auto w-3/4">
          <table className="auto w-full">
            <thead className="text-center">
              <tr className="text-center">
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4"
                >
                  Token de mesa
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4"
                >
                  Pedido
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0] px-6 py-4"
                >
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              { data && typeof data == 'object' && data.length ? data.map((orden, index) => 
              {
                return (
                  <tr key={orden.id_orden} className="text-center">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0]">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0]">
                      {orden.mesa.token}
                    </td>
                    <td className="px-6 py-4  text-sm font-medium text-left w-1/3 bg-[#1C1C1C] text-[#F0F0F0]">
                      {orden.productos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-[#1C1C1C] text-[#F0F0F0]">
                      {orden.total.toFixed(2)}
                    </td>
                    <td className="text-sm bg-[#1C1C1C] text-[#F0F0F0] font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => ordenEntregada(orden.id_orden)}
                        className="bg-[#F47228] text-white text-center hover:text-[#000] hover:bg-[#fff] duration-300 rounded-lg p-2 font-bold w-full"
                      >
                        <span className="font-bold">Marcar como entregado</span>
                      </button>
                    </td>
                  </tr>
                );
              }): (<h2 className="text-white text-3xl text-center"></h2>)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
