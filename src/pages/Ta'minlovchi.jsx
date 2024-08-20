import React, { useEffect, useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Details from "../components/details/Details";
import useFetch from "../components/hooks/UseFetch";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteModal from "../components/modals/DeleteModal";
import { SlEye } from "react-icons/sl";
import { Provider } from "../service/provider";
import ProviderModal from "../components/modals/ProviderModal";
import InformationModal from "../components/modals/InformationModal";
import { useSidebar } from "../context/SidebarContext";

function Taminlovchi() {
  const { isOpen } = useSidebar();
  const { taminlovchi } = Details();
  const { data, loading, error } = useFetch(Provider.getProvider);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [providerModal, setProviderModal] = useState(false);
  const [openInfromModal, setOpenInformModal] = useState(false);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (error) return <div>Xatolik: {error.message}</div>;

  //AddProviderModal
  const handleAddProvider = () => {
    setProviderModal(true);
  };

  const handleAdd = () => {
    setProviderModal(false);
  };

  //deleteModal
  const handleDelete = (item) => {
    setSelectedProductName(item.name);
    setCurrentItem(item.id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Provider.deleteProvider(currentItem);
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
      <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
        <Navbar title="Поставщик" name="Руслан" adminType="Админ" />

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
                  className="block w-[210px] sm:w-auto p-2 ps-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Поиск..."
                />
              </div>
            </div>

            <button
              className="primary-btn flex items-center justify-center gap-2 mt-4 lg:mt-0 w-[220px] lg:w-auto hover:bg-slate-400 hover:text-white"
              type="button"
              onClick={handleAddProvider}
            >
              <IoMdAdd className="text-xl" /> Добавить поставщика
            </button>
            {providerModal && (
              <ProviderModal
                provider={providerModal}
                setProviderModal={setProviderModal}
              ></ProviderModal>
            )}
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead ">
                <tr className="">
                  <th>№</th>
                  {taminlovchi.map((name, index) => {
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
                        <td className="td"> {item.name}</td>
                        <td className="td"> {item.phone_number}</td>
                        <td className="td"> {item.debt}</td>
                        <td className="td">
                          {new Date(item?.created_at).toLocaleDateString(
                            "en-GB"
                          )}
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
                          {/* <button
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
                                  Tovar tavfsilotlari
                                </h1>
                              </div>
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold ">
                                  Ism:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.name}
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Telefon raqam:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.phone_number}
                                  </span>
                                </h2>
                                <h2 className="text-lg font-semibold ">
                                  Qarz:{" "}
                                  <span className="text-base font-normal">
                                    {currentItem?.debt} sum
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
                              </div>
                            </InformationModal>
                          )} */}
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

export default Taminlovchi;
