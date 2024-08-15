import React, { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Navbar from "../components/Navbar";
import Details from "../components/details/Details";
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
import DeleteModal from "../components/modals/DeleteModal";
import InformationModal from "../components/modals/InformationModal";
import { Provider } from "../service/provider";
import { Product } from "../service/products";

function KirimTovarlar() {
  const { data, error, loading } = useFetch(ImportProduct.getProduct);
  const { data: provider } = useFetch(Provider.getProvider);
  const { data: productName } = useFetch(Product.getProduct);

  const { kirim } = Details();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [openInfromModal, setOpenInformModal] = useState(false);
  const [name, setName] = useState("Chexol");

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setProducts(data);
  }, [data]);
  if (error) return <div>Xatolik: {error.message}</div>;

  //mahsulot qo'shishModal
  const handleClick = () => {
    setOpenModal(true);
  };

  const handleChange = (e)=>{
    // e.preventDefault();
    const {name, value} = e.target
    setFormData({...formData,[name] : value})
  }
  console.log(formData);
  
  //mahsulot qo'shish
  const handleAdd = async () => {
    try {
      await ImportProduct.postProduct()
    }
    catch {
      
    }
    setOpenModal(false);
  };

  // deleteModal
  const handleDelete = (item) => {
    setSelectedProductName(item.name);
    setCurrentItem(item.id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await ImportProduct.deleteProduct(currentItem);
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
                    <Select onChange={handleChange}>
                    <option></option>
                      {productName?.map((item, index) => (
                        
                        <option key={index}>{item?.name}</option>
                      ))}
                    </Select>
                  </FormLabel>

                  <FormLabel  htmlFor="miqdor">
                    Miqdori
                    <Input onChange={handleChange} required type="number" id="miqdor" />
                  </FormLabel>

                  <FormLabel htmlFor="summasi">
                    Kelish summasi
                    <Input onChange={handleChange} required type="number" id="summasi" />
                  </FormLabel>

                  <FormLabel htmlFor="qarz">
                    Qarz
                    <Input onChange={handleChange} required type="number" id="qarz" />
                  </FormLabel>

                  <FormLabel htmlFor="yetkazib beruvchi">
                    Yetkazib beruvchi
                    <Select onChange={handleChange} className="w-full" name="" id="">
                      {provider?.map((item, index) => (
                        <option key={index}>{item?.name}</option>
                      ))}
                    </Select>
                  </FormLabel>

                  <FormLabel htmlFor="umumiy">
                    Umumiy
                    <Input onChange={handleChange} required type="number" id="umumiy" />
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
                  {kirim.map((name, index) => {
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
                        <td className="td"> {item?.product?.name}</td>
                        <td className="td"> {item?.amount}</td>
                        <td className="td"> {item?.import_price}</td>
                        <td className="td"> {item?.debt}</td>
                        <td className="td"> {item?.provider?.name}</td>
                        <td className="td"> {item?.total}</td>
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
                            <InformationModal
                              setOpenInformModal={setOpenInformModal}
                            >
                              <div className="bg-blue-600 p-2 w-full mb-5">
                                <h1 className="text-2xl font-semibold text-white">
                                  Kirim tavfsilotlari
                                </h1>
                              </div>
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold ">
                                  Mahsulot nomi:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.product?.name}
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Miqdori:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.amount}
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Import narxi:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.import_price}sum
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Qarz:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.debt} sum
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Ta'minotchi:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.provider?.name}
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Sana:{" "}
                                  <span className="text-base font-normal">
                                    {new Date(
                                      currentItem.created_at
                                    ).toLocaleDateString("en-GB")}
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Umumiy:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.total} sum
                                  </span>
                                </h2>
                              </div>
                            </InformationModal>
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
