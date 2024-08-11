import React, { useState } from "react";
import { IoIosAddCircleOutline, IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import Details from "../components/details/Details";
import Navbar from "../components/Navbar";
import { SlEye } from "react-icons/sl";
import { MdOutlineEdit } from "react-icons/md";
import useFetch from "../components/hooks/UseFetch";
import { Product } from "../service/products";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import Modal from "./Modal";
import { AiFillContainer } from "react-icons/ai";
import DeleteModal from "../components/modals/DeleteModal";
import axios from "axios";
import ProviderModal from "../components/modals/ProviderModal";

function Tovarlar() {
  const { tovar } = Details();
  const { data, error, loading } = useFetch(Product.getProduct);
  const [providerModal, setProviderModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  if (loading) return <h1 className="text-xl m-auto"> Yuklanmoqda... </h1>;
  if (error) return <div>Xatolik: {error.message}</div>;

  const handleClick = () => {
    setOpenModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedProductId(id); // Mahsulot ID sini belgilash
    setDeleteModal(true); // Modalni ochish
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`main/products/${id}/`);
      refetch(); // Mahsulotlarni qayta yuklash uchun
      setDeleteModal(false); // Modalni yopish
    } catch (error) {
      console.error(error.response || new Error("Unknown error"));
    }
  };

  const handleAddProvider = () => {
    setProviderModal(true);
  };

  const handleAdd = () => {
    setOpenModal(false);
    setProviderModal(false);
  };

  return (
    <div className="w-[100%]">
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px] ">
        <Navbar title="Tovarlar" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-start p-[15px] mb-4">
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
                  className="block w-40 sm:w-56 p-2 ps-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Search..."
                  required
                />
              </div>
              <div>
                <Select className="w-24" name="" id="">
                  <option value="nomi">Nomi</option>
                  <option value="artikul">Artikul</option>
                  <option value="miqdor">Miqdori</option>
                  <option value="chegrima">Chegirma</option>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end lg:w-auto hover:bg-slate-400 hover:text-white"
                type="button"
                onClick={handleAddProvider}
              >
                <IoMdAdd className="text-xl" /> Provider qo'shish
              </button>
              {providerModal && (
                <ProviderModal
                  provider={providerModal}
                  setProviderModal={setProviderModal}
                >
                  <FormControl className="flex flex-col gap-3">
                    <FormLabel>Yangi provider qo'shish</FormLabel>
                    <Input required type="text" placeholder="Ismi*" />

                    <Input required type="number" placeholder="Telefon raqam" />

                    <Input required type="number" placeholder="Qarz*" />

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
                </ProviderModal>
              )}
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

                    <FormLabel htmlFor="artikul">
                      Artikul
                      <Input required type="number" id="artikul" />
                    </FormLabel>

                    <FormLabel htmlFor="miqdor">
                      Miqdori
                      <Input required type="number" id="miqdor" />
                    </FormLabel>

                    <FormLabel htmlFor="birlik">
                      Birlik
                      <Input required type="text" id="birlik" />
                    </FormLabel>

                    <FormLabel htmlFor="kelishsummasi">
                      Kelish summasi
                      <Input required type="number" id="kelishsummasi" />
                    </FormLabel>

                    <FormLabel htmlFor="sotishsummasi">
                      Sotish summasi
                      <Input required type="number" id="sotishsummasi" />
                    </FormLabel>

                    <FormLabel htmlFor="chegirma">
                      Chegirma
                      <Input required type="number" id="chegirma" />
                    </FormLabel>

                    <FormLabel htmlFor="minimalmiqdor">
                      Minimal miqdor
                      <Input required type="number" id="minimalmiqdor" />
                    </FormLabel>

                    <FormLabel htmlFor="yetkazib beruvchi">
                      Yetkazib beruvchi
                      <Input required type="text" id="yetkazib beruvch" />
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
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {tovar.map((name, index) => {
                    return (
                      <th className="th" key={index}>
                        {name}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="tbody">
                {data &&
                  data?.map((item, index) => (
                    <tr className="trow" key={item.id}>
                      <td className="td"> {index + 1}</td>
                      <td className="td"> {item.name}</td>
                      <td className="td"> {item.code}</td>
                      <td className="td"> {item.amount}</td>
                      <td className="td"> {item.unit}</td>
                      <td className="td"> {item.import_price}</td>
                      <td className="td"> {item.export_price}</td>
                      <td className="td"> {item.max_discount}</td>
                      <td className="td"> {item.min_amount}</td>
                      <td className="td"> {item.provider.name}</td>

                      <td className="flex items-center justify-center gap-2 p-[9px]">
                        {" "}
                        <button
                          type="button"
                          className="text-lg text-yellow-500"
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item.id)}
                          type="button"
                        >
                          <RiDeleteBinLine className="text-lg text-red-600" />
                        </button>
                        {deleteModal && (
                          <DeleteModal
                            id={selectedProductId}
                            setDeleteModal={setDeleteModal}
                            deleteProduct={deleteProduct}
                          />
                        )}
                        <button type="button" className="text-lg text-blue-700">
                          <SlEye />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Tovarlar;
