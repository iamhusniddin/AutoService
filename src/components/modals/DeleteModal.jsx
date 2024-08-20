import React from 'react'

function DeleteModal({handleDeleteConfirm, setDeleteModal, selectedProductName }) {
   
    const handleCloseMOdal = (e) => {
        if (
          e.target.className &&
          e.target.className.toString().includes("overlay")
        ) {
            setDeleteModal(false);
        }
      };


      const closeModal = () =>{
        setDeleteModal(false)
      }
    

  return (
    <div onClick={handleCloseMOdal} className='absolute top-0 z-10 left-0 p-2 sm:p-0 w-full h-full overlay cursor-context-menu flex justify-center items-center   bg-black/20'>
        <div className='relative rounded-lg shadow p-3 bg-white'>
            <button onClick={closeModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>

            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 ">Вы уверены, что хотите удалить {selectedProductName ? selectedProductName : 'этот элемент'}?</h3>
                <div className='flex justify-center gap-10'>
                   <button onClick={handleDeleteConfirm} type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                   Да
                   </button>
                   <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none bg-blue-500 text-white rounded-lg border border-gray-200 hover:bg-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                   Нет
                   </button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default DeleteModal