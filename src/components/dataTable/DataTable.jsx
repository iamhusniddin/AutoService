// import React, { useState } from "react";
// import { MdOutlineEdit } from "react-icons/md";
// import { RiDeleteBinLine } from "react-icons/ri";
// import Modal from "./Modal";

// function DataTable({ tableHead, data, setData }) {
//   const [deleteItem, setDeleteItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   if (!data || data.length === 0) {
//     return tableHead && <p className="text-xl">Ma'lumot mavjud emas</p>;
//   }

//   const handleClick = (id) => {
//     setShowModal(true);
//     setDeleteItem(id)
//   };



//   return (
//     <div>
//       <table className="table">
//         <thead className="thead ">
//           <tr className="">
//             <th>№</th>
//             {tableHead.map((name) => {
//               return (
//                 <th className="th" key={name.name}>
//                   {name}
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>

//         <tbody className="tbody">
//           {data &&
//             data.map((item) => (
//               <tr className="trow" key={item.id}>
//                 <td className="td"> {item.id}</td>
//                 <td className="td">{item.tovarNomi}</td>
//                 <td className="td">{item.artikul}</td>
//                 <td className="td">{item.miqdori}</td>
//                 <td className="td">{item.birlik}</td>
//                 <td className="td">{item.kelishSummasi}</td>
//                 <td className="td">{item.skidkaSummasi}</td>
//                 <td className="td">{item.yetkazibBerish}</td>
//                 <td className="td">{item.jamiSummasi}</td>
//                 <td className=" text-lg cursor-pointer">
//                   <button className="mr-2 text-yellow-500">
//                     <MdOutlineEdit />
//                   </button>
//                   <button
//                     onClick={() => handleClick(item.id)}
//                     type="button"
//                   > 
//                     <RiDeleteBinLine className="text-red-600"/>
//                   </button>
//                   {showModal && <Modal setShowModal={setShowModal} data={data} setData={setData} id={deleteItem}/>}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DataTable;
