import React from "react";
import { MdOutlineEdit } from "react-icons/md";

function InformationModal({ children, setOpenInformModal }) {
  const handleCloseModal = (e) => {
    if (
      e.target.className &&
      e.target.className.toString().includes("overlay")
    ) {
      setOpenInformModal(false);
    }
  };
  const closeModal = () => {
    setOpenInformModal(false);
  };

  return (
    <div
      onClick={handleCloseModal}
      className="absolute top-0 z-100 left-0 w-full p-2 sm:p-0 h-screen overlay cursor-context-menu flex justify-center items-center bg-black/10"
    >
      <div className="relative rounded-lg shadow max-w-auto w-[400px] pb-6 bg-white">
        <button
          onClick={closeModal}
          type="button"
          className="absolute top-2 end-2.5 text-white bg-transparent hover:bg-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        <div className=" text-center">{children}</div>

        <div className="flex pt-3 justify-around">
          <button
            type="button"
            className="text-xl text-yellow-500"
          >
            <MdOutlineEdit />
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="text-base font-semibold text-blue-600"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

export default InformationModal;
