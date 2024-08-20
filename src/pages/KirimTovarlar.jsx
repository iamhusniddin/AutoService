import React, { useEffect, useMemo } from "react";
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
import { MdOutlineEdit, MdPrint } from "react-icons/md";
import { SlEye } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import DeleteModal from "../components/modals/DeleteModal";
import InformationModal from "../components/modals/InformationModal";
import { Provider } from "../service/provider";
import { Product } from "../service/products";
import ProviderModal from "../components/modals/ProviderModal";
import { useSidebar } from "../context/SidebarContext";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

function KirimTovarlar() {
  const { isOpen } = useSidebar();
  const { data, error, loading } = useFetch(ImportProduct.getProduct);
  const { data: provider } = useFetch(Provider.getProvider);
  const today = new Date().toLocaleDateString("en-GB");
  const [providerModal, setProviderModal] = useState(false);
  const { kirim } = Details();
  const [products, setProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [openInfromModal, setOpenInformModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false)
  console.log(products);

  useEffect(() => {
    setProducts(data);
  }, [data]);
  if (error) return <div>Xatolik: {error.message}</div>;

  // const handleChange = (e) => {

  //   // e.preventDefault();
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  // console.log(formData);

  //mahsulot qo'shish

  const handleAdd = async () => {
    try {
      await ImportProduct.postProduct();
    } catch {}
    setOpenModal(false);
  };

  // addProviderModal
  const handleAddProvider = () => {
    setProviderModal(true);
  };

  const [selectedName, setSelectedName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const providersMap = useMemo(() => {
    return provider?.reduce((map, item) => {
      map[item.name] = item.phone_number;
      return map;
    }, {});
  }, [provider]);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    setSelectedName(selectedName);
    setPhoneNumber(providersMap[selectedName] || "nomer yo'q");
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

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("0");
  const [tempValue, setTempValue] = useState(value); // Yangi qiymatni vaqtincha saqlash uchun

  const handleEditClick = () => {
    setIsEditing(true);
    setTempValue(value); // Tahrirlash uchun mavjud qiymatni vaqtincha saqlaymiz
  };

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleSaveClick = () => {
    setValue(tempValue);
    setIsEditing(false);
  };

  const styles = StyleSheet.create({
    page: {
      padding: 10,
    },
    text: {
      fontSize: 12,
      textAlign: "left",
    },
  });

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.text}>Your PDF Content Here</Text>
      </Page>
    </Document>
  );

  return (
    
        <div
          className={`transition-all duration-300 ${
            !isOpen ? "ml-[235px]" : "ml-0"
          } w-full h-screen`}
        >
          <main className=" flex flex-col grow justify-between gap-7  p-[30px]">
            <Navbar title="Приход товара" name="Руслан" adminType="Админ" />
            {!showContent && (
              <Button
                mx="auto"
                width={190}
                colorScheme="blue"
                onClick={() => setShowContent(true)}
              >
                <IoMdAdd className="text-xl" /> Добавить продукт
              </Button>
            )}
            {showContent && (
              <button
                className="primary-btn self-center bg-slate-500 text-white mt-4 lg:mt-0  lg:w-[200px] hover:bg-slate-700 hover:text-white"
                onClick={() => setShowContent(false)}
              >
                Закрыть таблицу
              </button>
            )}
            {showContent && (
              <section className="main-section">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-semibold">
                    реквизиты поступления товара
                  </h1>
                  <div className="flex items-center gap-3">
                    <Button colorScheme="blue">Сохранять</Button>
                    <PDFDownloadLink
                      document={<MyDocument />}
                      fileName="myDocument.pdf"
                    >
                      {({ loading }) => (
                        <Button
                          gap={1.5}
                          flex
                          alignItems="center"
                          colorScheme="blue"
                          variant="outline"
                        >
                          <MdPrint />{" "}
                          {loading ? "Generating PDF..." : "Распечатать"}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  </div>
                </div>
                <hr className="mb-3 border-[1px]" />
                {/* data */}
                <table className="table overflow-x-auto mb-3">
                  <thead className="thead ">
                    <tr className="throw">
                      <th className="bg-white text-base border text-black">
                        Дата создания:
                      </th>
                      <th className="bg-white ggg text-base border text-black">
                        Оплаченный
                      </th>
                      <th className="bg-white text-base border text-black">
                        Долг
                      </th>
                      <th className="bg-white text-base border text-black">
                        Общий
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    <tr className="">
                      <td className="td">{today}</td>
                      <td className="td ggg flex items-center justify-between">
                        {isEditing ? (
                          <input
                            type="number"
                            value={tempValue}
                            onChange={handleInputChange}
                            className="text-slate-400"
                          />
                        ) : (
                          <span className="">{value}</span>
                        )}
                        <button
                          type="button"
                          className="text-lg text-blue-500 "
                          onClick={
                            isEditing ? handleSaveClick : handleEditClick
                          }
                        >
                          {isEditing ? "сохранить" : "изменить"}
                        </button>
                      </td>
                      <td className="td"> 0</td>
                      <td className="td"> 0</td>
                    </tr>
                  </tbody>
                </table>

                {/* provider malumoti */}
                <div className="flex items-center  gap-10 mb-2">
                  <h1 className="text-xl font-semibold">
                    информация о поставщике
                  </h1>
                  <div className="flex items-center gap-1.5">
                    <Select
                      width={140}
                      height={25}
                      mt={2}
                      defaultValue=""
                      type="text"
                      onChange={handleSelectChange}
                      id="nomi"
                    >
                      <option value="" disabled hidden>
                        Provider
                      </option>
                      {provider?.map((item, index) => (
                        <option value={item.name} key={index}>
                          {item?.name}
                        </option>
                      ))}
                    </Select>

                    <button
                      onClick={handleAddProvider}
                      className="mt-2 border-[2px] rounded-md p-[1px]"
                    >
                      <IoMdAdd className="text-xl" />
                    </button>
                    {providerModal && (
                      <ProviderModal
                        provider={providerModal}
                        setProviderModal={setProviderModal}
                      ></ProviderModal>
                    )}
                  </div>
                </div>

                <hr className="mb-3 border-[1px]" />
                <table className="table overflow-x-auto mb-5">
                  <thead className="thead ">
                    <tr className="">
                      <th className="bg-white text-base border w-[300px] text-black">
                        имя
                      </th>

                      <th className="bg-white text-base border w-[300px] text-black">
                        номер телефона
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tbody">
                    <tr className="trow">
                      <td className="td"> {selectedName}</td>
                      <td className="td">{phoneNumber}</td>
                    </tr>
                  </tbody>
                </table>

                {/* maxsulot qo'shish */}
                <h1 className="text-xl font-semibold mb-4">Добавить продукт</h1>
                <div>
                  <table className="table">
                    <thead className="thead">
                      <tr>
                        <th className="th border">Название продукта</th>
                        <th className="th border">Количество</th>
                        <th className="th border">Сумма поступления</th>
                        <th className="th border">Долг</th>
                        <th className="th border">Общий</th>
                        <th className="th border">Добавить</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      <tr className="">
                        <td className="p-0">
                          {" "}
                          <Select
                            required
                            type="text"
                            id="nomi"
                            defaultValue=""
                            border="none"
                            focusBorderColor="transparent" // Removes border on focus
                            _hover={{ border: "none" }}
                          >
                            <option value="" disabled hidden>
                              Название продукта
                            </option>
                            {products?.map((name, index) => (
                              <option value={name.name} key={index}>
                                {name?.product?.name}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="p-0">
                          <Input
                            placeholder="Количество..."
                            required
                            type="number"
                            id="nomi"
                            border="none"
                            focusBorderColor="transparent" // Removes border on focus
                            _hover={{ border: "none" }}
                          />
                        </td>
                        <td className="p-0">
                          {" "}
                          <Input
                            placeholder="Сумма поступления..."
                            required
                            type="text"
                            id="nomi"
                            border="none"
                            focusBorderColor="transparent" // Removes border on focus
                            _hover={{ border: "none" }}
                          />
                        </td>
                        <td className="p-0">
                          {" "}
                          <Input
                            placeholder="Долг..."
                            required
                            type="number"
                            id="nomi"
                            border="none"
                            focusBorderColor="transparent" // Removes border on focus
                            _hover={{ border: "none" }}
                          />
                        </td>
                        <td className="p-0">
                          {" "}
                          <Input
                            placeholder="Общий..."
                            required
                            type="number"
                            id="nomi"
                            border="none"
                            focusBorderColor="transparent" // Removes border on focus
                            _hover={{ border: "none" }}
                          />
                        </td>
                        <td className="p-0">
                          <Button width={100} height={39} colorScheme="blue">
                            Gotova
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/*qo'shilgan maxsulotlar  */}
                <div className="overflow-x-auto mt-10">
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
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                {showPDFViewer && (
            <PDFViewer style={{ width: '100%', height: '90vh' }}>
              <MyDocument />
            </PDFViewer>
          )}
              </section>    
            )}
          </main>
        </div>
      
  );
}

export default KirimTovarlar;
