import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import Details from "../components/details/Details";
import Navbar from "../components/Navbar";
import { SlEye } from "react-icons/sl";
import { MdOutlineEdit } from "react-icons/md";
import useFetch from "../components/hooks/UseFetch";
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
import ProviderModal from "../components/modals/ProviderModal";
import { Expenses } from "../service/expenses";
import InformationModal from "../components/modals/InformationModal";
import { useSidebar } from "../context/SidebarContext";
import XarajatModal from "../components/modals/XarajatModal";

function Xarajatlar() {
  const { isOpen } = useSidebar();
  const { xarajatlar } = Details();
  const { data, error, loading } = useFetch(Expenses.getProduct);
  const [products, setProducts] = useState([]);
  const [providerModal, setProviderModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [openInfromModal, setOpenInformModal] = useState(false);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (error) return <div>Xatolik: {error.message}</div>;

  //mahsulot qo'shishModal
  const handleClick = () => {
    setOpenModal(true);
  };

  // addProviderModal
  const handleAddProvider = () => {
    setProviderModal(true);
  };
  const handleAdd = () => {
    setOpenModal(false);
    setProviderModal(false);
  };

  //editModal
  const handleEditClick = (id) => {
    setEditModal(true);
  };

  // deleteModal
  const handleDelete = (item) => {
    setSelectedProductName(item.name);
    setCurrentItem(item.id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Expenses.deleteProduct(currentItem);
      setProducts(products?.filter((product) => product.id !== currentItem));
    } catch (error) {
      throw new Error(error);
    } finally {
      setDeleteModal(false);
    }
  };

  // informModal
  const handleInform = (item) => {
    setCurrentItem(item);
    setOpenInformModal(true);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        !isOpen ? "ml-[235px]" : "ml-0"
      } w-full`}
    >
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px] ">
        <Navbar title="Расходы" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-center p-[15px] mb-4">
            <div className="">
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
                  className="block  w-[220px] sm:w-auto p-2 ps-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Поиск..."
                  required
                />
              </div>
            </div>

        
              {/* <button
                className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end lg:w-auto hover:bg-slate-400 hover:text-white"
                type="button"
                onClick={handleAddProvider}
              >
                <IoMdAdd className="text-xl m-auto" /> Provider qo'shish
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
              )} */}
              <button
                className="primary-btn w-[220px] md:w-[220px] lg:w-auto flex items-center justify-center gap-2  mt-4 md:mt-4 lg:mt-0 hover:bg-slate-400 hover:text-white"
                type="button"
                onClick={handleClick}
              >
                <IoMdAdd className="text-xl" />
                Добавить расходы
              </button>
              {openModal && (
                <XarajatModal setOpenModal={setOpenModal}>
                </XarajatModal>
              )}
           
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {xarajatlar.map((name, index) => {
                    return (
                      <th className="th" key={index}>
                        {name}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="tbody">
                {loading ? (
                  <tr>
                    <td className="text-lg border-0">Загрузка...</td>
                  </tr>
                ) : (
                  <>
                    {products?.map((item, index) => (
                      <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.type?.name}</td>
                        <td className="td"> {item?.price}</td>
                        <td className="td"> {item?.description}</td>
                        <td className="td">
                          {new Date(item?.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Xarajatlar;
