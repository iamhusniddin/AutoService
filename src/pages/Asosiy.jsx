import React from "react";
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
  TopMonthlyTotal,
  TopProduct,
} from "../service/Statistics";

function Asosiy() {
  const { data: calculates } = useFetch(TopCalculate.getCalculate);
  const {
    data: monthly,
    loading,
    error,
  } = useFetch(TopMonthlyTotal.getMonthly);
  const { data: products } = useFetch(TopProduct.getTopProduct);
  const { data: customers } = useFetch(TopCustomer.getTopCustomer);

  const transformedData = monthly
        ? [
            { name: "Yan", foyda: monthly.jan },
            { name: "Fev", foyda: monthly.feb },
            { name: "Mart", foyda: monthly.mar },
            { name: "Apr", foyda: monthly.apr },
            { name: "May", foyda: monthly.may },
            { name: "Iyun", foyda: monthly.jun },
            { name: "Iyul", foyda: monthly.jul },
            { name: "Avg", foyda: monthly.aug },
            { name: "Sen", foyda: monthly.sep },
            { name: "Okt", foyda: monthly.oct },
            { name: "Noy", foyda: monthly.nov },
            { name: "Dek", foyda: monthly.dec },
        ]
        : [];
          
        

  return (
    <div className="w-[100%]">
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Asosiy" name="Руслан" adminType="Админ" />

        <section className="main-section">
          {/* stats bo'limi */}
          <div className="flex flex-wrap justify-between gap-3 mb-[20px]">
            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%] xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Import </h3>
                <p className="font-semibold text-green-600">
                  UZS {calculates.total_import}
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={xarajatImg} alt="" />
            </div>

            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%] xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Export</h3>
                <p className="font-semibold text-red-600">
                  UZS {calculates.total_export}
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={foydaImg} alt="" />
            </div>

            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%] xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Daromad</h3>
                <p className="font-semibold text-blue-600">
                  UZS {calculates.total_benefit}
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={daromadImg} alt="" />
            </div>
          </div>

          {/* graphics part*/}
          <div className=" mb-[20px]">
            <div className="bg-primary p-4 rounded-lg shadow w-full">
              <h3 className="text-lg mb-4">Sotish haqida umumiy ma'lumot</h3>
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
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="foyda"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* <div className="bg-primary w-full lg:w-[30%] flex p-4 rounded-lg shadow ">
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie
                    dataKey="users"
                    isAnimationActive={true}
                    data={data}
                    cx="50%" // Adjust for responsiveness
                    cy="50%" // Adjust for responsiveness
                    outerRadius="80%" // Adjust for responsiveness
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div> */}
          </div>

          {/* tables part */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1 */}
            <div className="flex flex-col gap-2 bg-primary p-[10px] shadow rounded-lg w-full">
              <h3 className="pl-3 text-lg lg:text-xl">Top Tovarlar</h3>
              <table className="w-full border-collapse text-xs lg:text-sm">
                <thead>
                  <tr>
                    <th className="p-[5px] border-b-[1px] border-white">#</th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Nomi
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Miqdor
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Umumiy foyda
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
                          <td className="border-white"> {index + 1}</td>
                          <td className="border-white">
                            {" "}
                            {product?.product?.name}
                          </td>
                          <td className="border-white">
                            {" "}
                            {product?.product?.amount}
                          </td>
                          <td className="border-white">
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
            <div className="flex flex-col gap-2 bg-primary p-[10px] shadow rounded-lg">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Asosiy;
