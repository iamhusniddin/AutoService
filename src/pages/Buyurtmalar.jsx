import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "./Modal";
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import Details from "../components/details/Details";
import useFetch from "../components/hooks/UseFetch";
import { Order } from "../service/order";
import { Provider } from "../service/provider";
import { useSidebar } from "../context/SidebarContext";

function Buyurtmalar() {
  const { isOpen } = useSidebar();
  const {buyurtmalar} = Details()
  const { data: provider } = useFetch(Provider.getProvider);
  const {data, loading, error} = useFetch(Order.getProduct)
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setProducts(data);
  }, [data]);
 
  

  if (error) return <div>Xatolik: {error.message}</div>;
 
  // const handleDelete = (item) => {
  //   setSelectedProductName(item.name);
  //   setCurrentItem(item.id);
  //   setDeleteModal(true);
  // };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     await Order.deleteProduct(currentItem);
  //     setProducts(products?.filter((product) => product.id !== currentItem));
  //   } catch (error) {
  //     throw new Error(error);
  //   } finally {
  //     setDeleteModal(false);
  //   }
  // };

  const handleClick = () => {
    setOpenModal(true);
  };
  const handleAdd = () => {
    setOpenModal(false);
  };

  return (
    <div className={`transition-all duration-300 ${!isOpen ? 'ml-[235px]' : 'ml-0'} w-full h-screen`}>
      <main className="flex flex-col grow justify-between gap-7  p-[30px]">
        <Navbar title="Заказы" name="Руслан" adminType="Админ" />

        {!showContent && (
          <button
            className="primary-btn self-center bg-slate-600 text-white flex items-center gap-2 mt-4 lg:mt-0  lg:w-[200px] hover:bg-slate-800 hover:text-white"
            onClick={() => setShowContent(true)}
          >
            <IoMdAdd className="text-xl" /> Добавить продукт
          </button>
        )}
        {showContent && (
          <button
            className="primary-btn self-center bg-slate-600 text-white mt-4 lg:mt-0  lg:w-[200px] hover:bg-slate-800 hover:text-white"
            onClick={() => setShowContent(false)}
          >
            Закрыть таблицу
          </button>
        )}
        {showContent && (
          <section className="main-section">
            <FormControl>
              <tr className="">
                <td className="td text-secondary">N!</td>
                <td className="td text-lg">
                  <Select
                    border={0}
                    height={30}
                    placeholder="Название продукта..."
                    // onChange={(e)=>setBirlik(e.target.value)}
                    // value={birlik}
                    required
                    type="text"
                    id="nomi"
                    focusBorderColor="transparent" // Removes border on focus
                    _hover={{ border: "none" }}
                  >
                    <option value="">Chexol</option>
                  </Select>
                </td>
                <td className="td ">
                  {" "}
                  <Input
                    border={0}
                    height={30}
                    placeholder="Количество..."
                    // onChange={(e)=>setArtikul(e.target.value)}
                    // value={artikul}
                    required
                    type="number"
                    id="nomi"
                    focusBorderColor="transparent" // Removes border on focus
                    _hover={{ border: "none" }} // Removes border on hover
                  />
                </td>
                <td className="td text-lg">
                  <Input
                  width={100}
                    border={0}
                    height={30}
                    placeholder="Долг..."
                    // onChange={(e)=>setMiqdor(e.target.value)}
                    // value={miqdor}
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
                    height={30}
                    placeholder="Сумма поступления..."
                    // onChange={(e)=>setBirlik(e.target.value)}
                    // value={birlik}
                    required
                    type="text"
                    id="nomi"
                    focusBorderColor="transparent" // Removes border on focus
                    _hover={{ border: "none" }} // Removes border on hover
                  />
                </td>
                <td className="td text-lg">
                  <Select
                    border={0}
                    height={30}
                    required
                    type="text"
                    id="nomi"
                    focusBorderColor="transparent" // Removes border on focus
                    _hover={{ border: "none" }}
                  >
                    
                    {provider?.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="td text-lg">
                  <Input
                    border={0}
                    height={30}
                    placeholder="Общий..."
                    // onChange={(e)=>setSotishSumma(e.target.value)}
                    // value={SotishSumma}
                    required
                    type="number"
                    id="nomi"
                    focusBorderColor="transparent" // Removes border on focus
                    _hover={{ border: "none" }} // Removes border on hover
                  />
                </td>
                <td className="td p-0 flex items-center">
                  {" "}
                  <Button
                    height={41}
                    colorScheme="blue"
                    // oncli={handleSubmit}
                  >
                    Gotova
                  </Button>
                </td>
              </tr>
            </FormControl>
            
          </section>
        )}
      </main>
    </div>
  );
}

export default Buyurtmalar;
