"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  createAccount,
  getLoggedInUserData,
  login,
} from "@/utils/Dataservices";
import { IToken } from "@/Interfaces/Interfaces";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const LoginPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    const handleModal = () => {
        setIsModalOpen(false)
            setLoginSwitchBool(true)
    }

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center">
        <div
          className="bg-white rounded-md shadow-lg mx-4"
          style={{ minWidth: "300px", maxWidth: "500px" }}
        >
          <div className="text-center p-5">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={switchBool ? "M5 13l4 4L19 7" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}
                />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">
              {message}
            </h3>
            <div className="mt-5">
              <button
                onClick={() => handleModal()}
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [switchBool, setSwitchBool] = useState<boolean>(true);

  const handleSubmit = async () => {
    let userData = {
      username: username,
      password: password,
    };

    if (!loginSwitchBool) {
      try {
        const success = await createAccount(userData);
        if (success) {
            setSwitchBool(true);
          setModalMessage(
            "You have successfully created an account, you can now login."
          );
          setIsModalOpen(true);

        } else {
            setSwitchBool(false);
          setModalMessage("This Username already exists.");
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error(error);
        setModalMessage("An error occurred while creating the account.");
        setIsModalOpen(true);
      }
    } else {
      try {
        //Login logic in here
        let token: IToken = await login(userData);
        //Check to see if logged in
        if (token.token != null) {
          localStorage.setItem("Token", token.token);
          localStorage.setItem("username", username);
          getLoggedInUserData(username);
          router.push("/AccountDashboardPage");
          console.log(token);
        } else {
          alert("Login Failed");
          console.log("Login failed");
        }
      } catch (error) {
        console.error(error);
        console.log("Login failed and bla bla bla");
        setIsModalOpen(true);
        setModalMessage("Incorrect username or password. Please try again.");
        setSwitchBool(false);
          
      }
    }
  };

  const [loginSwitchBool, setLoginSwitchBool] = useState<boolean>(true);
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  // this function is to handle closing the modal and switching to the login form
  const handleCloseModalAndSwitchToLogin = () => {
    console.log("Closing modal and switching to login");
    setLoginSwitchBool(true);
    setIsModalOpen(false);
    //  to switch to the login form after closing the modal
  
  };

  return loginSwitchBool ? (
    <div className="min-w-screen min-h-[89vh] flex justify-center items-center px-24">
        {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={handleCloseModalAndSwitchToLogin}
          
        />
      )}
      <div
        id="heroImg"
        className="bg-flagBG bg-no-repeat bg-cover min-w-80 min-h-[75vh] w-[80%] h-[75vh] flex justify-center items-center rounded-3xl"
      >
        <div
          id="loginBG"
          className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl text-white font-bold mb-2">Login</h1>
            <div className="mb-6">
              <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                Username
              </label>

              <input
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                type="text"
                className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-lg text-start font-bold text-white  dark:text-white">
                Password
              </label>

              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter password"
                className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <a
              href=""
              className="underline italic text-white hover:text-gray-200"
            >
              Having trouble logging in?
            </a>
            <br />
            <button
              onClick={handleSubmit}
              className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400"
            >
              Login
            </button>
          </div>
          <div className="mt-4">
            <p className="text-white">Dont have an account?</p>
            <button
              onClick={() => setLoginSwitchBool(false)}
              className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400"
            >
              Sign Up
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-w-screen min-h-[89vh] flex justify-center items-center px-24">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={handleCloseModalAndSwitchToLogin}
        />
      )}

      <div
        id="heroImg"
        className="bg-flagBG bg-no-repeat bg-cover min-w-80 min-h-[75vh] w-[80%] h-[75vh] flex justify-center items-center rounded-3xl"
      >
        <div
          id="loginBG"
          className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl text-white font-bold mb-2">
              Create Account
            </h1>
            <div id="username" className="mb-6">
              <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                Username
              </label>
              <input
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                type="text"
                className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div id="password" className="mb-6">
              <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter password"
                className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <a href="" className="underline italic text-white">
              Having trouble logging in?
            </a>
            <br />
            <button
              onClick={handleSubmit}
              className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold"
            >
              Create Account
            </button>
          </div>
          <div className="mt-4">
            <p className="text-white">Already have an account?</p>
            <button
              onClick={() => setLoginSwitchBool(true)}
              className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold"
            >
              Log In
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
