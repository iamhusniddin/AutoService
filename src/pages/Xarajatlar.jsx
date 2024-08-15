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

function Xarajatlar() {
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
    setOpenInformModal(true)
  };

 
  

  

  return (
    <div className="w-[100%] h-screen">
      <main className="h-full flex flex-col justify-between gap-7 p-[30px] ">
        <Navbar title="Xarajatlar" name="Руслан" adminType="Админ" />

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
                  className="block w-40 sm:w-56 p-2 ps-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Search..."
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
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
              )}
              <button
                className="primary-btn flex items-center gap-2 lg:mt-0 lg:self-end lg:w-auto sm:mt-4 hover:bg-slate-400 hover:text-white"
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
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="text"
                        id="nomi"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="artikul">
                      Artikul
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="number"
                        id="artikul"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="miqdor">
                      Miqdori
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="number"
                        id="miqdor"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="birlik">
                      Birlik
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="text"
                        id="birlik"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="kelishsummasi">
                      Kelish summasi
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="number"
                        id="kelishsummasi"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="sotishsummasi">
                      Sotish summasi
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="number"
                        id="sotishsummasi"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="chegirma">
                      Chegirma
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="number"
                        id="chegirma"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="minimalmiqdor">
                      Minimal miqdor
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="number"
                        id="minimalmiqdor"
                      />
                    </FormLabel>

                    <FormLabel htmlFor="yetkazib beruvchi">
                      Yetkazib beruvchi
                      <Input
                        // onChange={handleAddChange}
                        required
                        type="text"
                        id="yetkazib beruvch"
                      />
                    </FormLabel>

                    <Button
                      onClick={handleAdd}
                      className="self-end flex items-center gap-2"
                      width={180}
                      colorScheme="gray"
                    >
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
                    <td className="text-lg border-0">Yuklanmoqda...</td>
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
                          {" "}
                          <button
                            type="button"
                            className="text-lg text-yellow-500"
                          >
                            <MdOutlineEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            type="button"
                          >
                            <RiDeleteBinLine className="text-lg mx-2 text-red-600" />
                          </button>
                          {deleteModal && (
                            <DeleteModal
                              selectedProductName={selectedProductName}
                              handleDelete={handleDelete}
                              setDeleteModal={setDeleteModal}
                              handleDeleteConfirm={handleDeleteConfirm}
                            />
                          )}
                          <button
                            onClick={() => handleInform(item)}
                            type="button"
                            className="text-lg  text-blue-700"
                          >
                            <SlEye />
                          </button>
                          {openInfromModal && (
                            <InformationModal  setOpenInformModal={setOpenInformModal}>
                              <div className="bg-blue-600 p-2 w-full mb-5">
                               <h1 className="text-2xl font-semibold text-white">Xarajat tavfsilotlari</h1>
                              </div>
                              <div className="flex flex-col  gap-1">
                                <h2 className="text-lg font-semibold ">Xarajat turi: <span className="text-base font-normal">{currentItem?.type?.name}</span></h2>
                                <h2 className="text-lg font-semibold ">Narxi: <span className="text-base font-normal">{currentItem?.price} sum</span></h2>
                                <h2 className="text-lg font-semibold ">Tavsif: <span className="text-base font-normal">{currentItem?.description}</span></h2>
                                <h2 className="text-lg font-semibold ">Sana: <span className="text-base font-normal">{new Date(currentItem.created_at).toLocaleDateString('en-GB')}</span></h2>
                              </div>
                            </InformationModal>
                          )
                          }
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
