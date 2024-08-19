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
import InformationModal from "../components/modals/InformationModal";
import { Staff } from "../service/staff";
import StaffModal from "../components/modals/StaffModal";
import { useSidebar } from "../context/SidebarContext";

function Xodimlar() {
  const { isOpen } = useSidebar();
  const { xodimlar } = Details();
  const { data, loading, error } = useFetch(Staff.getProduct);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [staffModal, setStaffModal] = useState(false);
  const [openInfromModal, setOpenInformModal] = useState(false);
  
  console.log(data);
  
  

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (error) return <div>Xatolik: {error.message}</div>;

  const handleAddService = () => {
    setStaffModal(true);
  };

  const handleAdd = () => {
    setStaffModal(false);
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
      await Staff.deleteProduct(currentItem);
      setProducts(products?.filter((product) => product.id !== currentItem));
    } catch (error) {
      throw new Error(error);
    } finally {
      setDeleteModal(false);
    }
  };

 

  return (
    <div  className={`transition-all duration-300 ${
      !isOpen ? "ml-[235px]" : "ml-0"
    } w-full`}>
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Xodimlar" name="Руслан" adminType="Админ" />

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
              <IoMdAdd className="text-xl" /> Xodim qo'shish
            </button>
            {staffModal && (
              <StaffModal
                // provider={serviceModal}
                setStaffModal={setStaffModal}
              >
                <FormControl className="flex flex-col gap-3">
                  <FormLabel>Xodim qo'shish</FormLabel>
                  <Input required type="text" placeholder="Username" />

                  <Input required type="text" placeholder="Ism" />

                  <Input required type="text" placeholder="Familiya" />

                  <Input required type="number" placeholder="Telefon raqam" />

                  <Input type="text" placeholder="Kasbi" />

                  <Input type="number" placeholder="Maosh" />

                  <Input required type="number" placeholder="Ish vaqti" />

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
              </StaffModal>
            )}
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {xodimlar.map((name, index) => {
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
                        <td className="td">{item?.username}</td>
                        <td className="td">{item?.first_name}</td>
                        <td className="td">{item?.last_name}</td>
                        <td className="td">{item?.phone_number}</td>
                        <td className="td"> {item?.position}</td>
                        <td className="td">{item?.salary}</td>
                        <td className="td">{item?.part}</td>
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
                               <h1 className="text-2xl font-semibold text-white">Xodim tavfsilotlari</h1>
                              </div>
                              <h1 className="text-2xl font-semibold mb-2">{currentItem?.first_name + " " + currentItem?.last_name}</h1>
                              <hr className="mb-3"/>
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold ">Username: <span className="text-base font-normal">{currentItem?.username}</span></h2>
                                <h2 className="text-lg font-semibold ">Telefon raqam: <span className="text-base font-normal">{currentItem?.phone_number}</span></h2>
                                <h2 className="text-lg font-semibold ">Kasbi: <span className="text-base font-normal">{currentItem?.position}</span></h2>
                                <h2 className="text-lg font-semibold ">Maosh: <span className="text-base font-normal">{currentItem?.salary}</span></h2>
                                <h2 className="text-lg font-semibold ">Ish vaqti: <span className="text-base font-normal">{currentItem?.part}</span></h2>
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

export default Xodimlar;
