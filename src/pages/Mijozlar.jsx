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
import { Customers } from "../service/customers";
import InformationModal from "../components/modals/InformationModal";
import { useSidebar } from "../context/SidebarContext";

function Mijozlar() {
  const { isOpen } = useSidebar();
  const { mijozlar } = Details();
  const { data, loading, error } = useFetch(Customers.getProduct);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [customerModal, setCustomerModal] = useState(false);
  const [openInfromModal, setOpenInformModal] = useState(false);
  
  
  
  

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

  // informModal
  const handleInform = (item) => {
    setCurrentItem(item);
    setOpenInformModal(true)
  };

  const handleDeleteConfirm = async () => {
    try {
      await Customers.deleteProduct(currentItem);
      setProducts(products?.filter((product) => product.id !== currentItem));
    } catch (error) {
      throw new Error(error);
    } finally {
      setDeleteModal(false);
    }
  };

 

  return (
    <div className={`transition-all duration-300 ${
      !isOpen ? "ml-[235px]" : "ml-0"
    } w-full`}>
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Mijozlar" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-center p-[15px] mb-4">
            <div>
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

            <button
              className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end w-[160px] sm:w-auto hover:bg-slate-400 hover:text-white"
              type="button"
              onClick={handleAddService}
            >
              <IoMdAdd className="text-xl" /> Mijoz qo'shish
            </button>
            {customerModal && (
              <CustomersModal
                // provider={serviceModal}
                setCustomerModal={setCustomerModal}
              >
                <FormControl className="flex flex-col gap-3">
                  <FormLabel>Mijoz qo'shish</FormLabel>
                  <Input required type="text" placeholder="Ism" />

                  <Input required type="text" placeholder="Familiya" />

                  <Input required type="number" placeholder="Telefon raqam" />

                  <Input type="text" placeholder="Passport seriya harfi" />

                  <Input type="number" placeholder="Passport seriya raqami" />

                  <Input required type="address" placeholder="Manzil" />

                  <Input required type="number" placeholder="Qarz" />

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
                  {mijozlar.map((name, index) => {
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
                        <td className="td">
                          {" "}
                          {item?.first_name + " " + item?.last_name}
                        </td>
                        <td className="td"> {item?.phone_number}</td>
                        <td className="td">{item?.debt}</td>
                        <td className="td">{item?.address}</td>
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
                              <div className="bg-blue-600 p-2 w-full mb-3">
                               <h1 className="text-2xl font-semibold text-white">Mijoz tavfsilotlari</h1>
                              </div>
                              <h1 className="text-2xl font-semibold mb-2">{currentItem?.first_name + " " + currentItem?.last_name}</h1>
                              <hr className="mb-3"/>
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold ">Telefon raqam: <span className="text-base font-normal">{currentItem?.phone_number}</span></h2>
                                <h2 className="text-lg font-semibold ">Qo'shimcha raqam: <span className="text-base font-normal">{currentItem?.phone_number_extra}</span></h2>
                                <h2 className="text-lg font-semibold ">Passport seriyasi: <span className="text-base font-normal">{currentItem?.passport_serial_letters}</span></h2>
                                <h2 className="text-lg font-semibold ">Seriya raqami: <span className="text-base font-normal">{currentItem?.passport_serial_numbers}</span></h2>
                                <h2 className="text-lg font-semibold ">Manzil: <span className="text-base font-normal">{currentItem?.address}</span></h2>
                                <h2 className="text-lg font-semibold ">Qarz: <span className="text-base font-normal">{currentItem?.debt}</span></h2>
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

export default Mijozlar;
