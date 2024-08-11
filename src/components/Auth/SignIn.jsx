import React, { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPalette2 } from "react-icons/bs";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import useLoader from "../../store";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

function SignIn() {
  const [branch, setBranch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading, startLoading, endLoading } = useLoader();

  const handleSignIn = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      const response = await api.post("/users/token/", {
        branch,
        username,
        password,
      });
      
      setTimeout(() => {
        endLoading(true);
      }, 1000);
      toast({
        title: "Tizimga muvaffaqiyatli kirdingiz",
        status: "success",
        position: "top",
        variant: "top-accent",
        duration: 2000,
      });

      // Assuming the response contains an accessToken and refreshToke
      // Save tokens in localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Show success toast and navigate to another page

      setTimeout(() => {
        navigate("/");
      }, 1000);
      // or wherever you want to redirect the user after login
    } catch (error) {
      startLoading();
      toast({
        title: "Login failed!",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 2000,
        position: "top",
      });
      setTimeout(() => {
        endLoading(true);
      }, 1000);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-primary flex flex-col justify-center items-center">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-5">
        <h3 className="text-2xl font-semibold text-center">Kirish</h3>
        <p className="font-medium pb-3 text-center">
          Hisob ma'lumotlarini kiritish orqali ilovaga kiring
        </p>
        <form
          onSubmit={(e) => handleSignIn(e)}
          className="w-full max-w-[300px] flex flex-col gap-6"
        >
          <div className="relative">
            <BsPalette2 className="absolute inset-y-0 start-0 top-2.5 left-1.5 w-[19px] h-[19px] ml-[6px]  text-secondary" />
            <select
              className="w-full p-2 rounded-md pl-9 text-secondary border-[2px] hover:border-blue-500"
              placeholder="Salon..."
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option className="text-black" value="jizzakh">
                Jizzax
              </option>
              <option className="text-black" value="tashkent">
                Toshkent
              </option>
              <option className="text-black" value="fergana">
                Farg'ona
              </option>
            </select>
          </div>

          <div className="bg-white rounded-md">
            <InputGroup>
              <InputLeftElement>
                <IoPersonSharp className="absolute inset-y-0 start-0 top-2.5 left-1.5 w-[20px] h-[20px] ml-1  text-secondary" />
              </InputLeftElement>
              <Input
                placeholder="Login..."
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="bg-white rounded-md">
            <InputGroup>
              <InputLeftElement>
                <RiLockPasswordFill className="absolute inset-y-0 start-0 flex items-center left-1.5 w-[22px] h-[22px] ml-1 mt-2 text-secondary" />
              </InputLeftElement>
              <Input
                placeholder="Parol..."
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="blue"
            className="rounded-lg p-2 text-white"
          >
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
