import React from 'react'
import { FiDelete } from 'react-icons/fi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IoBagAddOutline } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { VscSaveAs } from 'react-icons/vsc'
import DataTable from '../components/dataTable/DataTable'
import Details from '../components/details/Details'
import Navbar from '../components/Navbar'
import { BiMessageRoundedDetail } from "react-icons/bi";


function Mahsulotlar() {
  const {xarajatlar} = Details()
  return (
    <div className="w-[100%]">
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Mahsulotlar" name="Руслан" adminType="Админ" />

      <section className='main-section'>
      <form className=" flex flex-col gap-[15px] mb-4 p-[15px]">
            <div className='flex gap-[15px]'>
            <label className="flex items-center gap-3 mr-2" htmlFor="">
              <input
                className="w-[200px] primary-input"
                type="text"
                placeholder="Turi..."
              />
              <IoIosAddCircleOutline className="cursor-pointer text-3xl text-secondary" />
            </label>
            <label className="flex items-center gap-3" htmlFor="">
              <input className="primary-input" type="date" />
              <IoIosAddCircleOutline className="cursor-pointer text-3xl text-secondary" />
            </label>
            <input
                className="w-[200px] primary-input"
                type="text"
                placeholder="Summa..."  
              />
            <button
              className="primary-btn flex items-center gap-2"
              type="button"
            >
              <FiDelete />
              Tozalash
            </button>
            <button
              className="primary-btn flex items-center gap-2"
              type="button"
            >
              <IoBagAddOutline />
              Qo'shish
            </button>
            <button
              className="primary-btn flex items-center gap-2"
              type="button"
            >
              <BiMessageRoundedDetail className='mt-[2px] text-lg'/>
              Izoh qoldirish
            </button>
            </div>

            <div className='flex gap-[15px]'>
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
            </div>

          </form>



        {/* <DataTable tableHead={xarajatlar}/> */}
      </section>
      </main>
    </div>
  )
}

export default Mahsulotlar