import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoMdAdd } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import Details from "../components/details/Details";
import Navbar from "../components/Navbar";
import { SlEye } from "react-icons/sl";
import { MdOutlineEdit } from "react-icons/md";
import useFetch from "../components/hooks/UseFetch";
import { Product } from "../service/products";
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
import EditModal from "../components/modals/EditModal";
import InformationModal from "../components/modals/InformationModal";
import { Provider } from "../service/provider";
import { useSidebar } from "../context/SidebarContext";

function Tovarlar() {
  const { isOpen } = useSidebar();
  const { tovar } = Details();
  const { data, error, loading } = useFetch(Product.getProduct);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [providerModal, setProviderModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [openInfromModal, setOpenInformModal] = useState(false);
  const { data: provider } = useFetch(Provider.getProvider);
  const [tovars, setTovars] = useState("");
  const [artikul, setArtikul] = useState("");
  const [miqdor, setMiqdor] = useState("");
  const [birlik, setBirlik] = useState("");
  const [kelishSumma, setKelishSumma] = useState("");
  const [SotishSumma, setSotishSumma] = useState("");
  const [chegirma, setChegirma] = useState("");
  const [minimal, setMinimal] = useState("");
  const [yetkazuvchi, setYetkazuvchi] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("nomi");

  useEffect(() => {
    setProducts(data);
    setFilteredProducts(data);
  }, [data]);

  //search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query) || // Assuming 'artikul' is 'code'
        product.unit.toLowerCase().includes(query) ||
        product.import_price.toString().includes(query) || // Assuming 'artikul' is 'code'
        product.export_price.toString().includes(query) ||
        product.max_discount.toString().includes(query) || // Assuming 'artikul' is 'code'
        product.min_amount.toString().includes(query) ||
        product.provider.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  //sort
  const handleSortChange = (e) => {
    const field = e.target.value;
    setSortField(field);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (field === "nomi") {
        return a.name.localeCompare(b.name);
      } else if (field === "artikul") {
        return a.code.localeCompare(b.code); // Assuming 'artikul' is 'code'
      } else if (field === "miqdor") {
        return a.min_amount - b.min_amount; // Assuming 'miqdor' is 'amount'
      } else if (field === "chegrima") {
        return a.max_discount - b.max_discount; // Assuming 'chegrima' is 'discount'
      }
      
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  if (error) return <div>Xatolik: {error.message}</div>;

  //mahsulot qo'shishModal
  const handleClick = () => {
    setOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1);

    const events = {
      tovars: tovars,
      artikul: artikul,
      miqdor: miqdor,
      birlik: birlik,
      kelishSumma: kelishSumma,
      SotishSumma: SotishSumma,
      chegirma: chegirma,
      minimal: minimal,
      yetkazuvchi: yetkazuvchi,
    };
    console.log(events);
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
      await Product.deleteProduct(currentItem);
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

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  return (
    <div  className={`transition-all duration-300 ${
      !isOpen ? "ml-[235px]" : "ml-0"
    } w-full h-screen`}>
      <main className="h-full flex flex-col justify-between gap-7 p-[30px] ">
        <Navbar title="Товары" name="Руслан" adminType="Админ" />

        <section className="main-section">
          <form className=" flex flex-col lg:flex-row justify-between items-center p-[15px] mb-4">
            <div className="flex gap-4 flex-col sm:flex-row">
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-40 sm:w-56 p-2 ps-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Search..."
                />
              </div>
              <div>
                <Select
                  className="w-24"
                  onChange={handleSortChange}
                  value={sortField}
                >
                  <option value="nomi">Nomi</option>
                  <option value="artikul">Artikul</option>
                  <option value="miqdor">Miqdori</option>
                  <option value="chegrima">Chegirma</option>
                </Select>
              </div>
            </div>

           
          </form>

          <div className="overflow-x-auto">
            <table className="table overflow-x-auto">
              <thead className="thead">
                <tr className="">
                  <th>№</th>
                  {tovar.map((name, index) => {
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
                    <td className=" text-lg border-0">Yuklanmoqda</td>
                  </tr>
                ) : (
                  <>
                    {/* <tr className="trow">
                      <td className="td text-secondary">N!</td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setTovars(e.target.value)}
                          value={tovars}
                          required
                          type="text"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }}
                        />
                      </td>
                      <td className="td ">
                        {" "}
                        <Input
                          border={0}
                          width={100}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setArtikul(e.target.value)}
                          value={artikul}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={50}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setMiqdor(e.target.value)}
                          value={miqdor}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={70}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setBirlik(e.target.value)}
                          value={birlik}
                          required
                          type="text"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          height={30}
                          padding={0}
                          placeholder="_______________"
                          onChange={(e) => setKelishSumma(e.target.value)}
                          value={kelishSumma}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          height={30}
                          padding={0}
                          placeholder="_______________"
                          onChange={(e) => setSotishSumma(e.target.value)}
                          value={SotishSumma}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          height={30}
                          padding={0}
                          placeholder="_______________"
                          onChange={(e) => setChegirma(e.target.value)}
                          value={chegirma}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          padding={0}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setMinimal(e.target.value)}
                          value={minimal}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setYetkazuvchi(e.target.value)}
                          value={yetkazuvchi}
                          required
                          type="text"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td text-lg">
                        <Input
                          border={0}
                          width={100}
                          padding={0}
                          height={30}
                          placeholder="_______________"
                          onChange={(e) => setMinimal(e.target.value)}
                          value={minimal}
                          required
                          type="number"
                          id="nomi"
                          focusBorderColor="transparent" // Removes border on focus
                          _hover={{ border: "none" }} // Removes border on hover
                        />
                      </td>
                      <td className="td p-0">
                        {" "}
                        <Button
                          className=""
                          width={105}
                          height={38}
                          colorScheme="blue"
                          onClick={handleSubmit}
                        >
                          Gotova
                        </Button>
                      </td>
                    </tr> */}

                    {filteredProducts?.map((item, index) => (
                      <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.name}</td>
                        <td className="td"> {item?.code}</td>
                        <td className="td"> {item?.amount}</td>
                        <td className="td"> {item?.unit}</td>
                        <td className="td"> {item?.import_price}</td>
                        <td className="td"> {item?.export_price}</td>
                        <td className="td"> {item?.max_discount}%</td>
                        <td className="td"> {item?.min_amount}</td>
                        <td className="td"> {item?.provider?.name}</td>
                        <td className="td"> {item?.total_benefit}</td>
                        <td className="td">
                          {/* <button
                            onClick={() => handleEditClick(item.id)}
                            type="button"
                            className="text-lg text-yellow-500"
                          >
                            <MdOutlineEdit />
                          </button>
                          {editModal && (
                            <EditModal setEditModal={setEditModal}>
                              <FormControl className="flex flex-col gap-3">
                                <FormLabel htmlFor="nomi">
                                  Tovar nomi
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="text"
                                    id="nomi"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="artikul">
                                  Artikul
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="number"
                                    id="artikul"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="miqdor">
                                  Miqdori
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="number"
                                    id="miqdor"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="birlik">
                                  Birlik
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="text"
                                    id="birlik"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="kelishsummasi">
                                  Kelish summasi
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="number"
                                    id="kelishsummasi"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="sotishsummasi">
                                  Sotish summasi
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="number"
                                    id="sotishsummasi"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="chegirma">
                                  Chegirma
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="number"
                                    id="chegirma"
                                  />
                                </FormLabel>

                                <FormLabel htmlFor="minimalmiqdor">
                                  Minimal miqdor
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="number"
                                    id="minimalmiqdor"
                                  />
                                </FormLabel>
                                <FormLabel htmlFor="yetkazuvchi">
                                  Yetkazib beruvchi
                                  <Input
                                    onChange={handleAddChange}
                                    required
                                    type="text"
                                    id="yetkazuvchi"
                                  />
                                </FormLabel>
                                <Button
                                  className="self-end flex items-center gap-2"
                                  width={180}
                                  colorScheme="gray"
                                >
                                  <AiFillContainer className="text-xl" />
                                  Jadvalni to'ldirish
                                </Button>
                              </FormControl>
                            </EditModal>
                          )}
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
                          )} */}
                          <button
                            onClick={() => handleInform(item)}
                            type="button"
                            className="text-lg text-blue-700"
                          >
                            <SlEye />
                          </button>
                          {openInfromModal && (
                            <InformationModal
                              setOpenInformModal={setOpenInformModal}
                            >
                             
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
      </main>
    </div>
  );
}

export default Tovarlar;
