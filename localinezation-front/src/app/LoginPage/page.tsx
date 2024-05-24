"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { addUser, getLoggedInUserData, login } from "@/utils/Dataservices";
import { IToken } from "@/Interfaces/Interfaces";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const LoginPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  3
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
                className="h-6 w-6 text-red-600"
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
                className="w-24 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400"
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
        const success = await addUser(userData);
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
        // Login logic in here
        let token: IToken = await login(userData);
        // Check to see if logged in
        if (token && token.token) {
          localStorage.setItem("Token", token.token);
          localStorage.setItem("username", username); // Ensuring username is correctly set
          await getLoggedInUserData(); // no 'username' parameter required since we are fetch the usernamen from localstorage..because the function now handles the username internally.
          router.push("/AccountDashboardPage");
        } else {
          alert("Login Failed");
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
    <div className="min-w-screen flex justify-center items-center md:p-8">
      {isModalOpen && (
        <Modal isOpen={isModalOpen} message={modalMessage} onClose={handleCloseModalAndSwitchToLogin} />
      )}
      <div id="heroImg" className="bg-flagBG bg-no-repeat bg-cover w-full md:w-2/3 h-full flex justify-center items-center rounded-3xl py-24 my-auto">
        <div id="loginBG" className="bg-purple-600 h-fit flex flex-col justify-around items-center text-center rounded-3xl p-6 lg:p-12">
          <div className="flex flex-col gap-y-4">
            <div>
              <h1 className="text-3xl text-gray-700 font-bold bg-fuchsia-300 p-2 border border-black">Login</h1>
              <form className="bg-fuchsia-200 p-2 pb-4 border border-black border-t-0 text-gray-700">
                <label className="block mt-2 text-lg text-start font-bold">Username</label>
                <input id="username" required onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" type="text" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <label className="block mt-4 text-lg text-start font-bold">Password</label>
                <input id="password" onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Enter password" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </form>
            </div>
            <button onClick={handleSubmit} className="max-w-64 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400 select-none">Login</button>
            <p className="text-white select-none">Trouble logging in?<span className="mx-4 underline hover:text-gray-300 hover:cursor-pointer">Contact Us</span></p>
            <p className="text-white select-none">Dont have an account?<span className="mx-4 underline hover:text-gray-300 hover:cursor-pointer" onClick={() => setLoginSwitchBool(false)}>Sign Up</span></p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-w-screen flex justify-center items-center md:p-8">
      {isModalOpen && (
        <Modal isOpen={isModalOpen} message={modalMessage} onClose={handleCloseModalAndSwitchToLogin} />
      )}
      <div id="heroImg" className="bg-flagBG bg-no-repeat bg-cover w-full md:w-2/3 h-full flex justify-center items-center rounded-3xl py-24 my-auto">
        <div id="loginBG" className="bg-purple-600 h-fit flex flex-col justify-around items-center text-center rounded-3xl p-6 lg:p-12">
          <div className="flex flex-col gap-y-4">
            <div>
              <h1 className="text-3xl text-gray-700 font-bold bg-fuchsia-300 p-2 border border-black">Create Account</h1>
              <form className="bg-fuchsia-200 p-2 pb-4 border border-black border-t-0 text-gray-700">
                <label className="block mt-2 text-lg text-start font-bold">Username</label>
                <input id="username" required onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" type="text" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <label className="block mt-4 text-lg text-start font-bold">Password</label>
                <input id="password" onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Enter password" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </form>
            </div>
            <button onClick={handleSubmit} className="max-w-64 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400 select-none">Create Account</button>
            <p className="text-white select-none">Already have an account?<span className="mx-4 underline hover:text-gray-300 hover:cursor-pointer" onClick={() => setLoginSwitchBool(true)}>Log In</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
