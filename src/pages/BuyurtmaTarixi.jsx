
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
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

function BuyurtmaTarixi() {
  const { isOpen } = useSidebar();
    const {buyurtmalar} = Details()
  const {data, loading, error} = useFetch(Order.getProduct)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  

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
        product.customer.first_name.toLowerCase().includes(query) ||
        product.id.toString().includes(query) || // Assuming 'artikul' is 'code'
        product.paid.toString().includes(query) ||
        product.debt.toString().includes(query) ||
        product.total.toString().includes(query)  // Assuming 'artikul' is 'code'
    );
    setFilteredProducts(filtered);
  };

  const handleEyeClick = (item) => {
    navigate(`/buyurtmatafsilotlari/${item.id}`)
  }

  if (error) return <div>Xatolik: {error.message}</div>;
  return (
    <div className={`transition-all duration-300 ${!isOpen ? 'ml-[235px]' : 'ml-0'} w-full`}>
    <main className="h-screen flex flex-col justify-between gap-7 p-[30px]">
      <Navbar title="История заказов" name="Руслан" adminType="Админ" />

      <section className="main-section">
      <div className="relative w-full sm:w-auto mb-7">
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
                required
              />
            </div>
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
                    {filteredProducts?.map((item, index) => (
                      <tr className="trow" key={item.id}>
                        <td className="td"> {index + 1}</td>
                        <td className="td"> {item?.customer?.first_name + ' ' + item?.customer?.last_name}</td>
                        <td className="td"> {item?.id}</td>
                        <td className="td"> {item?.paid}</td>
                        <td className="td"> {item?.debt}</td>
                        <td className="td"> {item?.total}</td>
                        <td className="td">
                          {" "}
                        
                          <button
                          onClick={()=>handleEyeClick(item)}
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
  )
}

export default BuyurtmaTarixi