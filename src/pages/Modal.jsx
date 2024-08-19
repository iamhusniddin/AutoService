import React from 'react'

function Modal({children, setOpenModal}) {
    
    const handleCloseModal = (e) => {
        if (e.target.className.includes("overlay")) {
            setOpenModal(false)
        }
      };
      const closeModal = () =>{
        setOpenModal(false)
      }

      
  return (
    <div onClick={handleCloseModal} className='absolute top-0 z-10 p-2 sm:p-0 left-0 w-full h-screen overlay cursor-context-menu flex justify-center items-center  overflow-y-auto bg-black/40'>
        <div className='relative rounded-lg shadow p-3 w-full max-h-[525px] overflow-y-scroll max-w-[500px] bg-white'>
            <button onClick={closeModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>

            <div className="p-4 mt-2 md:p-5 text-center">
                {children}
            </div>

        </div>
    </div>
  )
}

export default Modal