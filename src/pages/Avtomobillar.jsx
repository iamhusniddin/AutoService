import React, { useEffect, useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import Navbar from "../components/Navbar";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Details from "../components/details/Details";
import useFetch from "../components/hooks/UseFetch";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteModal from "../components/modals/DeleteModal";
import { SlEye } from "react-icons/sl";
import CustomersModal from "../components/modals/CustomersModal";
import { Cars } from "../service/cars";
import InformationModal from "../components/modals/InformationModal";
import { useSidebar } from "../context/SidebarContext";

function Avtomobillar() {
  const { isOpen } = useSidebar();
  const { avtomobillar } = Details();
  const { data, loading, error } = useFetch(Cars.getProduct);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [customerModal, setCustomerModal] = useState(false);
  const [openInfromModal, setOpenInformModal] = useState(false);
  console.log(data);
  

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (error) return <div>Xatolik: {error.message}</div>;
  const handleAddService = () => {
    setCustomerModal(true);
  };

  const handleAdd = () => {
    setCustomerModal(false);
  };

  //deleteModal
  const handleDelete = (item) => {
    setSelectedProductName(item.name);
    setCurrentItem(item.id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Cars.deleteProduct(currentItem);
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
    <div className={`transition-all duration-300 ${!isOpen ? 'ml-[235px]' : 'ml-0'} w-full`}>
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Avtomobillar" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-center p-[15px] mb-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
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
                <Select className="" name="" id="">
                  <option value="nomi">Nomi</option>
                  <option value="miqdor">Miqdori</option>
                  <option value="qarz">Qarz</option>
                </Select>
              </div>
            </div>

            <button
              className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end lg:w-auto hover:bg-slate-400 hover:text-white"
              type="button"
              onClick={handleAddService}
            >
              <IoMdAdd className="text-xl" /> Avtomobil qo'shish
            </button>
            {customerModal && (
              <CustomersModal
                // provider={serviceModal}
                setCustomerModal={setCustomerModal}
              >
                <FormControl className="flex flex-col gap-3">
                  <FormLabel>Avtomobil qo'shish</FormLabel>

                  <Input required type="number" placeholder="Kod*" />

                  <Input required type="text" placeholder="Ism" />

                  <Input required type="text" placeholder="Brand" />


                  <Input type="text" placeholder="Rangi" />

                  <Input type="text" placeholder="Davlat raqami" />

                  <Input type="text" placeholder="Xaridor" />

                  {/* <Select placeholder="Xaridor" className="text-secondary" name="" id="">
                    <option className="text-black" value="ism">Otabek Tursunov</option>
                 </Select> */}

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
              </CustomersModal>
            )}
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {avtomobillar.map((name, index) => {
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
                        <td className="td"> {item?.code}</td>
                        <td className="td">{item?.name}</td>
                        <td className="td">{item?.brand}</td>
                        <td className="td">{item?.color}</td>
                        <td className="td">{item?.state_number}</td>
                        <td className="td">
                          {" "}
                          {item?.customer?.first_name +
                            " " +
                            item?.customer?.last_name}
                        </td>
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
                               <h1 className="text-2xl font-semibold text-white">Mashina tavfsilotlari</h1>
                              </div>
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold ">Artikul: <span className="text-base font-normal">{currentItem?.code}</span></h2>
                                <h2 className="text-lg font-semibold ">Mahsulot nomi: <span className="text-base font-normal">{currentItem?.name}</span></h2>
                                <h2 className="text-lg font-semibold ">Brand: <span className="text-base font-normal">{currentItem?.brand}</span></h2>
                                <h2 className="text-lg font-semibold ">Rangi: <span className="text-base font-normal">{currentItem?.color}</span></h2>
                                <h2 className="text-lg font-semibold ">Davlat raqami: <span className="text-base font-normal">{currentItem?.state_number}</span></h2>
                                <h2 className="text-lg font-semibold "> Sana:{" "}<span className="text-base font-normal">{new Date(currentItem.created_at).toLocaleDateString("en-GB")}</span></h2>

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

export default Avtomobillar;
