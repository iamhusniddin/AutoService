import React, { useEffect, useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Details from "../components/details/Details";
import useFetch from "../components/hooks/UseFetch";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteModal from "../components/modals/DeleteModal";
import { SlEye } from "react-icons/sl";
import XizmatModal from "../components/modals/XizmatModal";
import { Services } from "../service/services";
import InformationModal from "../components/modals/InformationModal";

function Xizmatlar() {
  const { xizmatlar } = Details();
  const { data, loading, error } = useFetch(Services.getProduct);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [serviceModal, setServiceModal] = useState(false);
  const [openInfromModal, setOpenInformModal] = useState(false);
  

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (error) return <div>Xatolik: {error.message}</div>;


  const handleAddService = () => {
    setServiceModal(true);
  };

  const handleAdd = () => {
    setServiceModal(false);
  };

  //deleteModal
  const handleDelete = (item) => {
    setSelectedProductName(item.name);
    setCurrentItem(item.id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Services.deleteProduct(currentItem);
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
    <div className="w-[100%]">
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Xizmatlar" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-center p-[15px] mb-4">
            <div className="w-[145px] sm:w-auto">
            <Select className="" name="" id="">
                <option value="nomi">Nomi</option>
                <option value="narxi">Narxi</option>
              </Select>
            </div>

            <button
                className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end lg:w-auto hover:bg-slate-400 hover:text-white"
                type="button"
                onClick={handleAddService}
              >
                <IoMdAdd className="text-xl" /> Xizmat qo'shish
              </button>
              {serviceModal && (
                <XizmatModal
                  // provider={serviceModal}
                  setServiceModal={setServiceModal}
                >
                  <FormControl className="flex flex-col gap-3">
                    <FormLabel>Xizmat qo'shish</FormLabel>
                    <Input required type="text" placeholder="Xizmat turi" />

                    <Input required type="number" placeholder="Narxi*" />

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
                </XizmatModal>
              )}
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {xizmatlar.map((name, index) => {
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
                        <td className="td"> {item?.name}</td>
                        <td className="td"> {item?.price}</td>
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
                               <h1 className="text-2xl font-semibold text-white">Xizmat tavfsilotlari</h1>
                              </div>
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold ">Xizmat turi: <span className="text-base font-normal">{currentItem?.name}</span></h2>
                                <h2 className="text-lg font-semibold ">Narx: <span className="text-base font-normal">{currentItem?.price}</span></h2>
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

export default Xizmatlar;
