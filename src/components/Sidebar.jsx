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
  const { isOpen } = useSidebar();

  return (
    <div className={`sidebar top-0 fixed z-auto left-0 min-h-screen ${isOpen ? "closed-sidebar" : "open-sidebar"}`}>
      <div className="flex flex-col justify-between bg-white/100 p-[40px] min-h-screen">
        <div className="flex flex-col gap-[20px]">
          {/* logo section */}
          <div className="flex flex-col relative items-center">
            <img className="max-w-[140px]" src={logo} alt="" />
            <p className="font-cursive2 absolute top-5  ml-1 left-14 text-sm text-blue-500">
              автосервис
            </p>
          </div>

          <div className="flex flex-col w-[150px] gap-1">
            <ul className="list-none">
              <li className="text-base font-medium">
                <NavLink className="flex items-center gap-[8px]" to="/">
                  <FiHome className="text-xl" />
                  Главная
                </NavLink>
              </li>
            </ul>
            <hr className="border-[2px]" />

            <ul>
              <li className="text-base flex gap- items-center font-medium">
                <CiMoneyBill className="text-2xl" />
                Продажа
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/buyurtma">
                  ● Заказы
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/buyurtmatarixi"
                >
                  ● История
                </NavLink>
              </li>
            </ul>
            <hr className="border-[2px]" />

            <ul>
              <li className="flex gap-2 items-center  font-medium">
                <LuWarehouse className="text-xl" />
                Склад
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/kirimtovarlar"
                >
                  ● Приход товара
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/tovarlar">
                  ● Товары
                </NavLink>
              </li>
            </ul>

            <hr className="border-[2px]" />

            <ul>
              <li className="text-base font-medium flex gap-2 items-center">
                <TiUploadOutline className="text-xl" />
                Прочие
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/taminotchi"
                >
                  ● Поставщик
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/xizmatlar">
                  ● Сервисы
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/mijozlar">
                  ● Клиенты
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink
                  className="flex items-center gap-[8px]"
                  to="/avtomobillar"
                >
                  ● Автомобили
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/xodimlar">
                  ● Сотрудники
                </NavLink>
              </li>
              <li className=" font-medium text-secondary">
                <NavLink className="flex items-center gap-[8px]" to="/xarajatlar">
                  ● Расходы
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
