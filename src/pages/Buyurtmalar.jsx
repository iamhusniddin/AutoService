import React, { useEffect, useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Modal from "./Modal";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Details from "../components/details/Details";
import useFetch from "../components/hooks/UseFetch";
import { Order } from "../service/order";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteModal from "../components/modals/DeleteModal";
import { SlEye } from "react-icons/sl";

function Buyurtmalar() {
  const {buyurtmalar} = Details()
  const {data, loading, error} = useFetch(Order.getProduct)
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    setProducts(data);
  }, [data]);
 
  

  if (error) return <div>Xatolik: {error.message}</div>;
 
  const handleDelete = (item) => {
    setSelectedProductName(item.name);
    setCurrentItem(item.id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Order.deleteProduct(currentItem);
      setProducts(products?.filter((product) => product.id !== currentItem));
    } catch (error) {
      throw new Error(error);
    } finally {
      setDeleteModal(false);
    }
  };

  const handleClick = () => {
    setOpenModal(true);
  };
  const handleAdd = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-[100%]">
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Buyurtmalar" name="Руслан" adminType="Админ" />

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
              className="primary-btn flex items-center gap-2 mt-4 lg:mt-0 lg:self-end lg:w-auto hover:bg-slate-400 hover:text-white"
              type="button"
              onClick={handleClick}
            >
              <IoMdAdd className="text-xl" /> Maxsulot qo'shish
            </button>
            {openModal && (
              <Modal openModal={openModal} setOpenModal={setOpenModal}>
                <FormControl className="flex flex-col gap-3">
                  <FormLabel htmlFor="tolangan">
                    To'langan
                    <Input
                      // onChange={handleAddChange}
                      required
                      type="number"
                      id="tolangan"
                    />
                  </FormLabel>

                  <FormLabel htmlFor="qarz">
                    Qarz
                    <Input
                      // onChange={handleAddChange}
                      required
                      type="number"
                      id="qarz"
                    />
                  </FormLabel>

                  <FormLabel htmlFor="xaridor">
                    Xaridor
                    <Input
                      // onChange={handleAddChange}
                      required
                      type="text"
                      id="xaridor"
                    />
                  </FormLabel>

                  <FormLabel htmlFor="umumiy">
                    Umumiy
                    <Input
                      // onChange={handleAddChange}
                      required
                      type="number"
                      id="umumiy"
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
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {buyurtmalar.map((name, index) => {
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
                        <td className="td"> {item?.paid}</td>
                        <td className="td"> {item?.debt}</td>
                        <td className="td"> {item?.customer?.first_name + ' ' + item?.customer?.last_name}</td>
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
                            type="button"
                            className="text-lg  text-blue-700"
                          >
                            <SlEye />
                          </button>
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

export default Buyurtmalar;
