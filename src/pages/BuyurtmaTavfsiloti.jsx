import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import { useParams } from "react-router-dom";
import { OrderService } from "../service/orderService";
import useFetch from "../components/hooks/UseFetch";
import Navbar from "../components/Navbar";
import { Button } from "@chakra-ui/react";
import { MdPrint } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import { Order } from "../service/order";

function BuyurtmaTavfsiloti() {
  const { isOpen } = useSidebar();
  const { id } = useParams();
  console.log(id);
  const { data: order } = useFetch(() => Order.getProductById(id));
  const { orderService, loading, error } = useFetch(() =>
    OrderService.getProduct(id)
  );

  console.log(order);

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
            <PDFDownloadLink
              document={<PDFDocument order={order} />}
              fileName="Детали заказа.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Preparing document..."
                ) : (
                  <Button
                    gap={1.5}
                    flex
                    alignItems="center"
                    colorScheme="blue"
                    variant="outline"
                  >
                    <MdPrint /> Распечатать
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>

          <hr className="mb-4 border-black/20" />
          <div>
            <table className="table">
              <thead className="thead">
                <tr className="">
                  <th className="border text-black font-bold">
                    Время создания:
                  </th>
                  <th className="border text-black font-bold">Оплаченный:</th>
                  <th className="border text-black font-bold">Долг:</th>
                  <th className="border text-black font-bold">Общий:</th>
                  <th className="border text-black font-bold">Описание</th>
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
                  <td className="td">{order?.paid}</td>
                  <td className="td">{order?.debt}</td>
                  <td className="td">{order?.total}</td>
                  <td className="td">{order?.description}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-5  p-3 shadow">
              <h1 className="text-2xl font-semibold p-1 mb-2">
                Информация о клиенте
              </h1>
              <hr />
              <table className="min-w-full">
                <thead className="thead">
                  <tr>
                    <th className="th border text-black font-bold">Имя Фамилия</th>
                    <th className="th border text-black font-bold">Номер телефона</th>
                    <th className="th border text-black font-bold">Машина</th>
                    <th className="th border text-black font-bold">Государственный номер</th>
                    <th className="th border text-black font-bold">Километр</th>
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
                    <td>{order?.car?.state_number}</td>
                    <td>{order?.car_kilometers} км</td>
                  </tr>
                </tbody>
              </table>
            </div>

          
              {/* 1 */}
              <div className=" p-3 shadow mt-5">
                <h2 className="text-2xl font-semibold p-1 mb-1">Продукты</h2>
                <hr />
                <table className="w-full mt-2">
                  <thead className="thead">
                    <tr>
                      <th className="border text-black font-bold">№</th>
                      <th className="border text-black font-bold">Имя продукта</th>
                      <th className="border text-black font-bold">Артикул </th>
                      <th className="border text-black font-bold">Количество</th>
                      <th className="border text-black font-bold">Скидка</th>
                      <th className="border text-black font-bold">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {order?.products?.map((item, index) => (
                      <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.product?.name}</td>
                        <td className="td"> {item?.product?.code}</td>
                        <td className="td"> {item?.amount}</td>
                        <td className="td"> {item?.product?.max_discount}</td>
                        <td className="td"> {item?.product?.total_benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 2 */}
              <div className=" p-3 shadow mt-5 mb-5">
                <h2 className="text-2xl font-semibold p-1 mb-1">Сервисы</h2>
                <hr />
                <table className="w-full mt-2">
                  <thead className="thead">
                    <tr>
                      <th className="border text-black font-bold">№</th>
                      <th className="border text-black font-bold">Сервис</th>
                      <th className="border text-black font-bold">Сотрудник</th>
                      <th className="border text-black font-bold">Доля</th>
                      <th className="border text-black font-bold">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    {order?.services?.map((item, index) => (
                      <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.service?.name}</td>
                        <td className="td"> {item?.staff}</td>
                        <td className="td"> {item?.part}</td>
                        <td className="td"> {item?.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}

export default BuyurtmaTavfsiloti;
