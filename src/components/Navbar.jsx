import React from "react";
import { GoBell } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBars } from "react-icons/fa6";
import { useSidebar } from "../context/SidebarContext";


function Navbar({ title, name, adminType }) {

  const { toggleSidebar } = useSidebar()
  return (
    <div className="w-[100%] flex justify-between items-center">
      
      <div className="text-3xl flex items-center gap-2">
        <button onClick={toggleSidebar} className="text-2xl mt-[2px]"><FaBars /></button>

        {title}
        </div>

      <div className="flex items-center gap-[20px]">

        {/* <div className="flex items-center gap-5">
          <p>Dan:</p>
          <input className="primary-input" type="date" />
          <p>Gacha:</p>
          <input className="primary-input" type="date" />
        </div> */}

        <div className="p-2 rounded-full bg-white cursor-pointer hover:scale-105 duration-200">
        <GoBell className="text-xl"/>
        </div>
        <img
          className="w-[36] h-[36px] rounded-full"
          src="https://picsum.photos/104/104"
          alt="user"
        />
        <div>
          <h3 className="text-xl">{name}</h3>
          <p className="text-sm text-gray-500">{adminType}</p>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
