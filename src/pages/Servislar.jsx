import React from "react";
import { AiFillContainer } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";
import { LuBookPlus } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";
import DataTable from "../components/dataTable/DataTable";
import Details from "../components/details/Details";
import Navbar from "../components/Navbar";

function Servislar() {
  const { sotuv } = Details();
  return (
    <div className="w-[100%]">
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Servislar" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex items-start gap-[10px] mb-4 p-[15px]">
            <label htmlFor="">
              <input
                className="w-[120px] primary-input bg-white border-[1px] border-blue-400"
                type="text"
                placeholder="Hisobot turi"
              />
            </label>
            <label className="flex items-center gap-3" htmlFor="">
              <input
                className="w-[200px] primary-input"
                type="text"
                placeholder="Xodim..."
              />
              <IoIosAddCircleOutline className="cursor-pointer text-3xl text-secondary" />
            </label>
            <label className="flex items-center gap-3" htmlFor="">
              <input className="primary-input" type="date" />
              <IoIosAddCircleOutline className="cursor-pointer text-3xl text-secondary" />
            </label>
            <label className="flex items-center gap-3" htmlFor="">
              <input
                className="w-[200px] primary-input"
                type="text"
                placeholder="Klient..."
              />
              <IoIosAddCircleOutline className="cursor-pointer text-3xl text-secondary" />
            </label>
            <label htmlFor="">
              <input
                className="w-[180px] primary-input"
                type="text"
                placeholder="Vincode..."
              />
            </label>

            <button
              className="primary-btn flex items-center gap-2"
              type="button"
            >
              <IoBagAddOutline />
              Qo'shish
            </button>
          </form>

          <div className="flex items-center">
            <h1 className="text-2xl font-medium p-[15px]">Tovarlar</h1>
            <form action="" className=" flex gap-[10px] p-[10px]">
            <button
                className="primary-btn flex items-center gap-2"
                type="button"
              >
                <RiDeleteBinLine />
                O'chirish
              </button>
              <button
                className="primary-btn flex items-center gap-2"
                type="button"
              >
                <VscSaveAs />
                Saqlash
              </button>
              <button
                className="primary-btn flex items-center gap-2"
                type="button"
              >
                <FiDelete />
                Tozalash
              </button>
              <label className="relative" htmlFor="">
                 <input placeholder="Izoh qoldirish" className="primary-input relative rounded-lg p-2 pl-9 w-[180px]"
                type="text"/>
                 <BiMessageRoundedDetail className="absolute inset-y-0 start-0 top-3 left-1.5 w-[19px] h-[19px] ml-2  text-secondary" />
              </label>
              
             <label className="relative" htmlFor="">
             <input  placeholder="Savdo chekini yozish" className="primary-input relative rounded-lg p-2 pl-7 w-[182px] " />   
                <LuBookPlus className="absolute inset-y-0 start-0 top-3 left-1.5 w-[18px] h-[18px] ml-2  text-secondary"/>
             </label>

              <button
                className="primary-btn w-[160px] flex items-center gap-2"
                type="button"
              >
                Hisobot qo'shish+1
              </button>
              <button
                className="primary-btn w-[160px] flex items-center gap-2"
                type="button"
              >
                Hisobot qo'shish+5
              </button>
            </form>
          </div>
          {/* <DataTable tableHead={sotuv} /> */}
        </section>
      </main>
    </div>
  );
}

export default Servislar;
