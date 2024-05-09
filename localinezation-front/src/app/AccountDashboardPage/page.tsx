"use client";

import { IMedia, IMediaItems } from "@/Interfaces/Interfaces";
import { checkToken, getLoggedInUserData, getMediaItemsByUserId, loggedinData } from "@/utils/Dataservices";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const AccountDashboardPage = () => {
  const [currentUsername, setCurrentUsername] = useState<string | null>("");

  const [mediaUserId, setMediaUserId] = useState<number>(0);
  const [publisherName, setPublisherName] = useState<string>("");
  const [mediaItems, setMediaItems] = useState<IMediaItems[]>();
  


  // useRouter from next/navigation
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };
  
  const getLoggedInData = async () => {
    if (checkToken()) {
      const userData = loggedinData();  // This should retrieve the stored user data
      await getLoggedInUserData(); // no "username" parameter required since we are fetch the usernamen from localstorage..because the function now handles the username internally.
      if (userData) {
        let userMediaItems: IMediaItems[] = await getMediaItemsByUserId(userData.userId);
        let filteredMediaItems = userMediaItems.filter(item => item.isDeleted === false);
        setMediaUserId(userData.userId);
        setPublisherName(userData.publisherName);
        setMediaItems(filteredMediaItems);
      } else {
        console.log("User data is not available.");
      }
    } else {
      router.push('/LoginPage');
    }
  };

  useEffect(() => {
    const init = async () => {
        if (localStorage.getItem("username")) {
            setCurrentUsername(localStorage.getItem("username"));
            await getLoggedInData();  // This function needs to be defined outside useEffect or here within it
        } else {
            setCurrentUsername(null);
            router.push('/LoginPage');
        }
    };
    init();
}, [router]);  // router is a dependency here
  
 





  return (
    <div className="min-w-screen min-h-[110vh]">
      <h1 className="text-center font-bold text-gray-700 text-4xl py-7 w-fit h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg my-8">
        Welcome{currentUsername ? `, ${currentUsername}` : ""}
      </h1>
      <div className="flex flex-row flex-wrap-reverse justify-evenly gap-8">
        <div className="w-fit max-w-[768px] flex flex-col justify-between items-center">
          <div id=""
            className="bg-purple-600 min-w-[542px] min-h-[40%] w-[80%] h-[40%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
          >
            {/* <p>Requested Lines</p> */}
            <p>Coming Soon</p>
          </div>
          <div
            id=""
            className="bg-purple-600 min-w-[542px] min-h-[40%] w-[80%] h-[40%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
          >
            {/* <p>Submitted Translations</p> */}
            <p>Coming Soon</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <div
              id="loginBG"
              className="bg-purple-600 min-w-80 w-[40%] h-full flex flex-col justify-around items-center text-center rounded-3xl p-12"
            >
              <div className="flex flex-col">
                <div className="mb-6">
                  <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                    Change Username
                  </label>

                  <input
                    id="username"
                    required
                    // onChange={(e) => setUsername(e.target.value)}
                    placeholder="New Username..."
                    type="text"
                    className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-lg text-start font-bold text-white  dark:text-white">
                    Change Password
                  </label>

                  <input
                    id="password"
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="New Password..."
                    className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    title="Work in progress"
                  />
                </div>
                <br />
                <button
                  // onClick={handleSubmit}
                  className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold enabled:hover:bg-fuchsia-400 disabled:bg-fuchsia-100 disabled:text-gray-500"
                >
                  Save Changes
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {           
                    localStorage.removeItem("username")
                    localStorage.removeItem("Token")
                    handlePageChange("/LoginPage");
                  }}
                  className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold enabled:hover:bg-fuchsia-400 disabled:bg-fuchsia-100 disabled:text-gray-500"
                >
                  Sign Out
                </button>
              </div>
              <div></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccountDashboardPage;
