import React, { useState } from "react";
import Navbar from "../components/Navbar";
import daromadImg from "..//assets/daromadIcon.png";
import xarajatImg from "..//assets/xarajatIcon.png";
import foydaImg from "..//assets/foydaIcon.png";
import sotuvImg from "..//assets/sotuvIcon.png";
import anvaraka from "..//assets/anvaraka.png";
import tolib from "..//assets/tolip.png";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Select } from "@chakra-ui/react";
import useFetch from "../components/hooks/UseFetch";
import {
  TopCalculate,
  TopCustomer,
  TopExpenses,
  TopMonthlyTotal,
  TopProduct,
} from "../service/Statistics";
import { useSidebar } from "../context/SidebarContext";

function Asosiy() {
  const { isOpen } = useSidebar();
  const { data: calculates } = useFetch(TopCalculate.getCalculate);
  const {
    data: monthly,
    loading,
    error,
  } = useFetch(TopMonthlyTotal.getMonthly);
  const { data: products } = useFetch(TopProduct.getTopProduct);
  const { data: expenses } = useFetch(TopExpenses.getExpenses);
  // const { data: customers } = useFetch(TopCustomer.getTopCustomer);

  // const transformedData = monthly
  // ? [
  //     { name: "дек", доход: monthly.dec },
  //     { name: "нояб", доход: monthly.nov },
  //     { name: "окт", доход: monthly.oct },
  //     { name: "сен", доход: monthly.sep },
  //     { name: "авг", доход: monthly.aug },
  //     { name: "июль", доход: monthly.jul },
  //     { name: "июнь", доход: monthly.jun },
  //     { name: "май", доход: monthly.may },
  //     { name: "апр", доход: monthly.apr },
  //     { name: "март", доход: monthly.mar },
  //     { name: "фев", доход: monthly.feb },
  //     { name: "янв", доход: monthly.jan },
  //   ]
  // : [];
  const months = [
    { name: "янв", key: "jan" },
    { name: "фев", key: "feb" },
    { name: "март", key: "mar" },
    { name: "апр", key: "apr" },
    { name: "май", key: "may" },
    { name: "июнь", key: "jun" },
    { name: "июль", key: "jul" },
    { name: "авг", key: "aug" },
    { name: "сен", key: "sep" },
    { name: "окт", key: "oct" },
    { name: "нояб", key: "nov" },
    { name: "дек", key: "dec" },
  ];
  // Get the current month index
  const currentMonthIndex = new Date().getMonth();

  // Reorder months array so that the current month comes first
  const orderedMonths = [
    ...months.slice(currentMonthIndex),
    ...months.slice(0, currentMonthIndex),
  ];

  // Transform data according to the ordered months
  const transformedData = monthly
    ? orderedMonths.map(({ name, key }) => ({
        name,
        доход: monthly[key],
      }))
    : [];



  //  expenses
  const labels = Object.keys(expenses);
  const values = Object.values(expenses);

  const chartData = labels.map((label, index) => ({
    name: label,
    value: values[index],
  }));

  const data2 = [
    {
      name: "распродажа",
      value: 400,
    },
    {
      name: "техника",
      value: 300,
    },
    {
      name: "мойка",
      value: 300,
    },
    {
      name: "ужин",
      value: 400,
    },
    {
      name: "добавление",
      value: 278,
    },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        !isOpen ? "ml-[235px]" : "ml-0"
      } w-full`}
    >
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Главная" name="Руслан" adminType="Админ" />

        <section className="main-section">
          {/* stats bo'limi */}
          <div className="flex flex-wrap  gap-4 mb-[20px]">
            <div
              data-aos="fade-right"
              data-aos-delay="100"
              className="stats-card w-[240px] h-[50px] sm:h-[60px] p-2"
            >
              <div>
                <h3 className="text-sm text-secondary">Приход</h3>
                <p className="font-semibold text-green-600">
                  Cум {calculates.total_import}
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={xarajatImg} alt="" />
            </div>

            <div
              data-aos="fade-down"
              data-aos-delay="100"
              className="stats-card w-[240px] h-[50px] sm:h-[60px] p-2"
            >
              <div>
                <h3 className="text-sm text-secondary">Расход</h3>
                <p className="font-semibold text-red-600">
                  Cум {calculates.total_export}
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={foydaImg} alt="" />
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="stats-card w-[240px] h-[50px] sm:h-[60px] p-2"
            >
              <div>
                <h3 className="text-sm text-secondary">Доход</h3>
                <p className="font-semibold text-blue-600">
                  Cум {calculates.total_benefit}
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={daromadImg} alt="" />
            </div>
          </div>

          {/* graphics part*/}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-[20px]">
            <div
              data-aos="zoom-in-up"
              data-aos-duration="700"
              className="bg-primary rounded-md shadow w-full sm:w-[70%] p-3 "
            >
              <h3 className="text-lg font-semibold mb-4">
                Общая информация о продаже{" "}
                <span className="text-green-500 font-cursive2">(сум)</span>
              </h3>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={170}>
                  <AreaChart
                    data={transformedData}
                    margin={{ top: 10, right: 20, left: 15, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="доход"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                      isAnimationActive={true} // Explicitly enable animation
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-offset="0"
              className="bg-primary rounded-md shadow w-full sm:w-[28%] flex flex-col p-3 "
            >
              <h3 className="text-lg font-semibold">
                Расход <span className="text-red-500 font-cursive2">(сум)</span>
              </h3>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={chartData}
                    cx="50%" // Adjust for responsiveness
                    cy="50%" // Adjust for responsiveness
                    outerRadius="75%" // Adjust for responsiveness
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* tables part */}
         
            {/* 0 */}
            {/* <div
              data-aos="fade-down"
              data-aos-delay="150"
              data-aos-offset="0"
              className="bg-primary rounded-md shadow w-full lg:w-[33%] flex flex-col p-3 "
            >
              <h3 className="text-lg font-semibold">
                Доход <span className="text-blue-500 font-cursive2">(сум)</span>
              </h3>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data2}
                    cx="50%" // Adjust for responsiveness
                    cy="50%" // Adjust for responsiveness
                    outerRadius="75%" // Adjust for responsiveness
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div> */}
            {/* 1 */}
            <div
             
              className="flex flex-col gap-2 bg-primary p-[10px] shadow rounded-lg w-full overflow-x-auto"
            >
              <h3 className="pl-3 text-lg lg:text-xl">Топ товаров</h3>
              <table className="w-full border-collapse text-xs lg:text-sm overflow-x-auto">
                <thead>
                  <tr>
                    <th className="p-[5px] border-b-[1px] border-white">#</th>
                    <th className="p-[5px] border-b-[1px] border-white">Имя</th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Количество
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Общий
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td className="text-lg border-0">Yuklanmoqda...</td>
                    </tr>
                  ) : (
                    <>
                      {products.map((product, index) => (
                        <tr className="" key={product?.product?.id}>
                          <td className="border-x-0	 border-white">
                            {" "}
                            {index + 1}
                          </td>
                          <td className="border-x-0	 border-white">
                            {" "}
                            {product?.product?.name}
                          </td>
                          <td className="border-x-0	 border-white">
                            {" "}
                            {product?.product?.amount}
                          </td>
                          <td className="border-x-0	 border-white">
                            {" "}
                            {product?.product?.total_benefit}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* 2 */}
            {/* <div className="flex flex-col gap-2 bg-primary p-[10px] shadow rounded-lg">
              <div className="flex justify-between">
                <h3 className="pl-1 text-lg lg:text-xl">Top mijozlar</h3>
                <div className="flex items-center gap-4"></div>
              </div>

              <table className="w-full border-collapse text-xs lg:text-sm">
                <thead>
                  <tr>
                    <th className="p-[5px] border-b-[1px] border-white ">#</th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Ism Familiya
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Tarrtib raqami
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Jami sotuvlar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="text-lg border-0">Yuklanmoqda...</td>
                    </tr>
                  ) : (
                    <>
                      {customers.map((customer, index) => (
                        <tr className="" key={customer?.customer_id}>
                          <td className="border-white"> {index + 1}</td>
                          <td className="border-white">
                            {" "}
                            {customer?.customer_full_name}
                          </td>
                          <td className="border-white">
                            {" "}
                            {customer?.orders_count}
                          </td>
                          <td className="border-white">
                            {" "}
                            {customer?.total_paid}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div> */}
          
        </section>
      </main>
    </div>
  );
}

export default Asosiy;
