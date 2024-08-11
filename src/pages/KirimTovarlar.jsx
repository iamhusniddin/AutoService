import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";
import { VscSaveAs } from "react-icons/vsc";
import { IoIosAddCircleOutline } from "react-icons/io";
import Navbar from "../components/Navbar";
import DataTable from "../components/dataTable/DataTable";
import Details from "../components/details/Details";
import { IoBagAddOutline } from "react-icons/io5";
import { AiFillContainer } from "react-icons/ai";
import useFetch from "../components/hooks/UseFetch";
import { useState } from "react";
import Modal from "./Modal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { ImportProduct } from "../service/importProduct";
import { MdOutlineEdit } from "react-icons/md";
import { SlEye } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";


function KirimTovarlar() {
  const { data, error, loading } = useFetch(ImportProduct.getProduct);
  const { kirim } = Details();
  const [openModal, setOpenModal] = useState(false);


  if (loading) return <h1 className="text-xl m-auto"> Yuklanmoqda... </h1>;
  if (error) return <div>Xatolik: {error.message}</div>;

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleAdd = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-[100%]">
      <main className="h-screen flex flex-col grow justify-between gap-7  p-[30px]">
        <Navbar title="Kirimlar" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-start p-[15px]">
            <div className="flex gap-5">
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="primary-input w-40 sm:w-56 pl-10 ps-10"
                  placeholder="Search..."
                  required
                />
              </div>

              <Select className="" name="" id="">
                <option value="nomi">Nomi</option>
                <option value="miqdor">Miqdori</option>
                <option value="qarz">Qarz</option>
              </Select>
            </div>

            <button
              className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end lg:w-auto hover:bg-slate-400 hover:text-white"
              type="button"
              onClick={handleClick}
            >
              <IoMdAdd className="text-xl" /> Maxsulot qo'shish
            </button>
            {openModal && (
              <Modal openModal={openModal} setOpenModal={setOpenModal}>
                <FormControl className="flex flex-col gap-3">
                  <FormLabel htmlFor="nomi">
                    Tovar nomi
                    <Input required type="text" id="nomi" />
                  </FormLabel>

                  <FormLabel htmlFor="miqdor">
                    Miqdori
                    <Input required type="number" id="miqdor" />
                  </FormLabel>

                  <FormLabel htmlFor="qarz">
                    Qarz
                    <Input required type="number" id="qarz" />
                  </FormLabel>

                  <FormLabel htmlFor="yetkazib beruvchi">
                    Yetkazib beruvchi
                    <Input required type="text" id="yetkazib beruvch" />
                  </FormLabel>

                  <FormLabel htmlFor="umumiy">
                    Umumiy
                    <Input required type="number" id="umumiy" />
                  </FormLabel>

                  <Button
                    onClick={handleAdd}
                    className="self-end flex items-center gap-2"
                    width={180}
                    colorScheme="gray"
                  >
                    {" "}
                    <AiFillContainer className="text-xl" />
                    Jadvalni to'ldirish
                  </Button>
                </FormControl>
              </Modal>
            )}
          </form>

          
           <div className="overflow-x-auto ">
           <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {kirim.map((name) => {
                    return (
                      <th className="th" key={name.name}>
                        {name}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="tbody">
                {
                  data && data?.map((item)=>(
                    <tr className="trow" key={item.id}>
                      <td className="td"> {item.branch}</td>
                      <td className="td"> {item.product.name}</td> 
                      <td className="td"> {item.amount}</td>
                      <td className="td"> {item.import_price}</td>
                      <td className="td"> {item.debt}</td>
                      <td className="td"> {item.provider.name}</td>
                      <td className="td"> {item.total}</td>
                      <td className="td res"> <button type="button" className="text-lg text-yellow-500"><MdOutlineEdit /></button>
                          <button type="button"><RiDeleteBinLine   className="text-lg mx-2 text-red-600"/></button>
                          <button  type="button" className="text-lg  text-blue-700"><SlEye /></button>
                      </td>
                    </tr>

                  )
                  )
                }
              </tbody>
            </table>
           </div>
          
        </section>
        <div className="self-end flex items-center">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
          >
            <FaArrowLeftLong strokeWidth={2} className="h-4 w-4" />
            Prev
          </Button>
          <div className="flex items-center gap-3">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            // onClick={next}
            // disabled={active === 5}
          >
            Next
            <FaArrowRightLong strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default KirimTovarlar;
