import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderService } from "../service/orderService";
import useFetch from "../components/hooks/UseFetch";
import { Order } from "../service/order";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { MdPrint } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";

function BuyurtmaTavfsiloti() {
  const { isOpen } = useSidebar();
  const { id } = useParams();
  console.log(id);
  const { data: order } = useFetch(() => Order.getProductById(id));
  const { orderService, loading, error } = useFetch(() =>
    OrderService.getProduct(id)
  );
  console.log(order.services);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Xatolik: {error.message}</div>;

  return (
    <div
      className={`transition-all duration-300 ${
        !isOpen ? "ml-[235px]" : "ml-0"
      } w-full`}
    >
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Полная информация" name="Руслан" adminType="Админ" />
        <section className="main-section">
          <div className="flex justify-between px-3 mb-3">
            <h1 className="text-2xl font-semibold">Детали заказа</h1>
            <Button
              gap={1.5}
              flex
              alignItems="center"
              colorScheme="blue"
              variant="outline"
            >
              <MdPrint /> Распечатать
            </Button>
          </div>

          <hr className="mb-4 border-black/20" />
          <div>
            <table className="table">
              <thead className="">
                <tr className="">
                  <th className="border text-black font-bold">
                    Yaratilgan vaqti:
                  </th>
                  <th className="border text-black font-bold">Umumiy:</th>
                  <th className="border text-black font-bold">To'langan:</th>
                  <th className="border text-black font-bold">Qarz:</th>
                </tr>
              </thead>
              <tbody className="tbody">
                <tr>
                  <td className="td">
                    {order?.car?.created_at
                      ? new Date(order.car.created_at).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="td">{order?.total}</td>
                  <td className="td">{order?.paid}</td>
                  <td className="td">{order?.debt}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-5  p-3 shadow">
              <h2 className="text-xl py-1 font-semibold mb-2">
                Информация о клиенте
              </h2>
              <hr />
              <table className="min-w-full">
                <thead className="thead">
                  <tr>
                    <th className="th border">Ismi Familiya</th>
                    <th className="th border">Tel raqam</th>
                    <th className="th border">Mashina</th>
                    <th className="th border">Kilometr</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  <tr>
                    <td>
                      {order?.customer?.first_name +
                        " " +
                        order?.customer?.last_name}
                    </td>
                    <td>{order?.customer?.phone_number}</td>
                    <td>{order?.car?.name}</td>
                    <td>{order?.car_kilometers} km</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex gap-6 px-3">
              {/* 1 */}
              <div className="w-[50%]">
                <h2 className="text-xl py-1 font-semibold mb-1">Продукты</h2>
                <hr />
                <table className="w-full mt-2">
                  <thead className="thead">
                    <tr>
                      <th className="border">№</th>
                      <th className="border">Nomi</th>
                      <th className="border">Artikul</th>
                      <th className="border">Miqdori</th>
                      <th className="border">Chegirma</th>
                      <th className="border">Provider</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {order?.products?.map((item, index) => (
                      <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.product?.name}</td>
                        <td className="td"> {item?.product?.code}</td>
                        <td className="td"> {item?.product?.amount}</td>
                        <td className="td"> {item?.product?.max_discount}</td>
                        <td className="td"> {item?.product?.provider?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 2 */}
              <div className="w-[50%]">
                <h2 className="text-xl py-1 font-semibold mb-1">Сервисы</h2>
                <hr />
                <table className="w-full mt-2">
                  <thead className="thead">
                    <tr>
                      <th className="border">№</th>
                      <th className="border">Mashina</th>
                      <th className="border">Xodim</th>
                      <th className="border">Narxi</th>
                      <th className="border">Tavsif</th>
                      
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {order?.services?.map((item, index) => (
                       <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.service?.name}</td>
                        <td className="td"> {item?.service?.name}</td>
                        <td className="td"> {item?.service?.price}</td>
                        <td className="td"> {item?.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BuyurtmaTavfsiloti;
