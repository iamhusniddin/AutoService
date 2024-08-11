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
          <div className="">
            <img className="w-[140px]" src={logo} alt="" />
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
                  to="/kirim-tovarlar"
                >
                  — Kirimlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/tovarlar">
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
                  to="/buyurtmalar"
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
                  to="/xizmatlar"
                >
                  — Xizmatlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/mijozlar">
                  — Mijozlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/avtomobillar"
                >
                  — Avtomobillar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/xodimlar">
                  — Xodimlar
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/xarajatlar"
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
