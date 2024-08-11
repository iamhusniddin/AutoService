import React from "react";
import Navbar from "../components/Navbar";
import daromadImg from "..//assets/daromadIcon.png";
import xarajatImg from "..//assets/xarajatIcon.png";
import foydaImg from "..//assets/foydaIcon.png";
import sotuvImg from "..//assets/sotuvIcon.png";
import anvaraka from "..//assets/anvaraka.png";
import tolib from "..//assets/tolip.png";
import Modal from "../components/dataTable/Modal";
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

function Asosiy() {
  const data = [
    { name: "Dush", users: 200, fill: "#8884d8" },
    { name: "Sesh", users: 200, fill: "#82ca9d" },
    { name: "Chor", users: 250, fill: "#423E53" },
    { name: "Pay", users: 300, fill: "#808080" },
    { name: "Juma", users: 300, fill: "#574edb" },
    { name: "Shan", users: 200, fill: "#e2a93e" },
    { name: "Yak", users: 100, fill: "#b20404" },
  ];

  const data2 = [
    { id: 1, name: "Yan", users: 300, users2: 100 },
    { id: 2, name: "Fev", users: 200, users2: 300 },
    { id: 3, name: "Mart", users: 100, users2: 210 },
    { id: 4, name: "Apr", users: 300, users2: 400 },
    { id: 5, name: "May", users: 500, users2: 200 },
    { id: 6, name: "Iyun", users: 400, users2: 100 },
    { id: 7, name: "Iyul", users: 100, users2: 180 },
    { id: 8, name: "Avg", users: 300, users2: 310 },
    { id: 9, name: "Sen", users: 200, users2: 250 },
    { id: 10, name: "Okt", users: 200, users2: 200 },
    { id: 11, name: "Noy", users: 130, users2: 300 },
    { id: 12, name: "Dek", users: 330, users2: 100 },
  ];

  return (
    <div className="w-[100%]">
      <main className="h-full flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Asosiy" name="Руслан" adminType="Админ" />

        <section className="main-section">
          {/* stats bo'limi */}
          <div className="flex flex-wrap justify-between gap-3 mb-[20px]">
            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%] xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Daromad</h3>
                <p className="">
                  UZS 53,000,000{" "}
                  <span className="text-sm font-medium text-green-500">
                    +55%
                  </span>
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={daromadImg} alt="" />
            </div>

            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%] xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Xarajatlar </h3>
                <p className="">
                  UZS 53,000,000{" "}
                  <span className="text-sm font-medium text-red-500">-14%</span>
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={xarajatImg} alt="" />
            </div>

            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%] xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Foyda</h3>
                <p className="">
                  UZS 53,000,000{" "}
                  <span className="text-sm font-medium text-green-500">
                    +24%
                  </span>
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={foydaImg} alt="" />
            </div>

            <div className="stats-card sm:w-[48%] md:w-[30%] lg:w-[24%]  xl:w-[22%]">
              <div>
                <h3 className="text-sm text-secondary">Jami sotuvlar</h3>
                <p className="">
                  UZS 53,000,000{" "}
                  <span className="text-sm font-medium text-green-500">
                    +17%
                  </span>
                </p>
              </div>
              <img className="w-auto max-w-[46px]" src={sotuvImg} alt="" />
            </div>
          </div>

          {/* graphics part*/}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-4 mb-[20px]">
            
            <div className="bg-primary p-4 lg:w-[65%] rounded-lg shadow w-full">
              <h3 className="text-lg">Sotish haqida umumiy ma'lumot</h3>
              <p className="text-secondary text-sm pb-6">
                <span className="text-green-500">(+5)</span> 2024 yilda ko'proq
              </p>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={170}>
                  <AreaChart
                    data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                      dataKey="users"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="users2"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          
            <div className="bg-primary w-full lg:w-[30%] flex p-4 rounded-lg shadow ">
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
            </div>
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
                      Mashhurlik
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Sotish
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-white">01</td>
                    <td className="border-white">Chexol</td>
                    <td className="border-white">34</td>
                    <td className="border-white">
                      <p className="border-[1px] border-blue-600 rounded-lg text-blue-600 bg-white">
                        45%
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-white">02</td>
                    <td className="border-white">Balon</td>
                    <td className="border-white">34</td>
                    <td className="border-white">
                      <p className="border-[1px] border-green-600 rounded-lg text-green-600 bg-white">
                        29%
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-white">03</td>
                    <td className="border-white">Fanar</td>
                    <td className="border-white">34</td>
                    <td className="border-white">
                      <p className="border-[1px] border-red-600 rounded-lg text-red-600 bg-white">
                        18%
                      </p>
                    </td>
                  </tr>
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
                    <th className="p-[5px] border-b-[1px] border-white text-left">
                      Mijozlar
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Xizmatlar
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Foyda
                    </th>
                    <th className="p-[5px] border-b-[1px] border-white">
                      Jami sotuvlar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left gap-2 border-white">Rustam aka</td>
                    <td className="border-white">$500</td>
                    <td className="border-white">$3000</td>
                    <td className="border-white">20</td>
                  </tr>
                  <tr>
                    <td className="text-left flex items-center gap-2 border-white">
                      Tolib tog'o
                    </td>
                    <td className="border-white">$700</td>
                    <td className="border-white">$2000</td>
                    <td className="border-white">17</td>
                  </tr>
                  <tr>
                    <td className="text-left flex items-center gap-2 border-white">
                      Hasan
                    </td>
                    <td className="border-white">$400</td>
                    <td className="border-white">$5000</td>
                    <td className="border-white">15</td>
                  </tr>
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
