import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { FiHome } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { LuWarehouse } from "react-icons/lu";
import { CiMoneyBill } from "react-icons/ci";
import { TiUploadOutline } from "react-icons/ti";
import logo from "../assets/fasscoLogo.png";
import { useSidebar } from "../context/SidebarContext";

function Sidebar() {
  
  const { isOpen } = useSidebar()

  return (
    
      <div className={`sidebar ${isOpen ? 'closed-sidebar' : 'open-sidebar'} `}>
        <div className="flex flex-col justify-between h-full bg-white/100 p-[40px] ">
        <div className="flex flex-col gap-[20px]">
          {/* logo section */}
          <div className="flex flex-col relative items-center">
            <img className="max-w-[140px]" src={logo} alt="" />
            <p className="font-cursive2 absolute top-5  ml-1 left-14 text-sm text-blue-500">автосервис</p>
          </div>

         
          <div className="flex flex-col w-[150px] gap-2">
            <ul className="list-none">
              <li className="text-base font-medium">
                <NavLink className="flex items-center gap-[8px]" to="/">
                  <FiHome className="text-xl" />
                  Asosiy
                </NavLink>
              </li>
            </ul>
            <hr className="border-[2px]" />

            <ul>
              <li className="flex gap-2 items-center  font-medium">
                <LuWarehouse className="text-xl" />
                Ombor
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/импортные товары"
                >
                  — Kirimlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/товары">
                  — Tovarlar
                </NavLink>
              </li>
            </ul>
            <hr className="border-[2px]" />

            <ul>
              <li className="text-base flex gap-2 items-center font-medium">
                <CiMoneyBill className="text-2xl" />
                Sotuv bo'limi
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/заказы"
                >
                  — Buyurtmalar
                </NavLink>
              </li>
            </ul>
            <hr className="border-[2px]" />

            <ul>
              <li className="text-base font-medium flex gap-2 items-center">
                <TiUploadOutline className="text-xl" />
                Umumiy
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/поставщик"
                >
                  — Ta'minlovchi
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/услуги"
                >
                  — Xizmatlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/клиенты">
                  — Mijozlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/автомобили"
                >
                  — Avtomobillar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/рабочий">
                  — Xodimlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/расходы"
                >
                  — Xarajatlar
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <button className="w-[30px]">
          <IoIosLogOut className="text-2xl" />
        </button>
      </div>
      </div>
    
  );
}

export default Sidebar;
