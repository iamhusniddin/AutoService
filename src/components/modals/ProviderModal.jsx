import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillContainer } from "react-icons/ai";
import useFetch from "../hooks/UseFetch";
import { Provider } from "../../service/provider";

function ProviderModal({ setProviderModal }) {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
  });

  const handleCloseModal = (e) => {
    if (e.target.className.includes("overlay")) {
      setProviderModal(false);
    }
  };

  const closeModal = () => {
    setProviderModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Provider.postProvider(formData);
      setProviderModal(false);
    } catch (error) {}
    setProviderModal(false);
    console.error("Error submitting provider:", error);
  };

  return (
    <div
      onClick={handleCloseModal}
      className="absolute top-0 z-10 left-0 w-full h-screen p-2 sm:p-0 overlay cursor-context-menu flex justify-center items-center bg-black/40"
    >
      <div className="relative rounded-lg shadow p-3 w-full max-w-[500px] bg-white">
        <button
          onClick={closeModal}
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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

        <div className="p-4 md:p-5 text-center mt-2">
          <FormControl
            as="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <FormLabel>Добавить нового поставщика</FormLabel>
            <Input
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
              type="text"
              placeholder="Ismi*"
            />

            <Input
              name="phone_number"
              onChange={handleChange}
              value={formData.phone_number}
              required
              type="number"
              placeholder="Telefon raqam"
            />
            <Button
              onClick={handleSubmit}
              className="self-end flex items-center gap-2"
              width={180}
              colorScheme="gray"
            >
              <AiFillContainer className="text-xl" />
              Jadvalni to'ldirish
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default ProviderModal;
