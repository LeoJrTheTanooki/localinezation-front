"use client";

import { IMedia } from "@/Interfaces/Interfaces";
import { checkToken, loggedinData } from "@/utils/Dataservices";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const AccountDashboardPage = () => {
  const [currentUsername, setCurrentUsername] = useState<string | null>("");


  // useRiouter from next/navigation
let router = useRouter()

  useEffect(() => {
    console.log(localStorage.getItem("username"));
    if (localStorage.getItem("username")) {
      setCurrentUsername(localStorage.getItem("username"));
    } else {
      setCurrentUsername(null);
    }
  }, []);



  //Ashur- useEffect to check if logged in; else push to login page
  // grab the user's information as well as their blog info
  useEffect(() => {
    //Async function because we are calling getBlogItemsById Fetch
    const getLoggedInData = async () => {
      //Storing our user info in a variable
      const loggedIn = loggedinData();
      let userIMedia: IMedia[] = await getBlogItemsByUserId(loggedIn.userId);
      let filteredBlogItems = userBlogItems.filter(item => item.isDeleted === false);
      //Setting our user info / Fetched data inside of our State Variables
      setBlogUserId(loggedIn.userId);
      setPublisherName(loggedIn.publisherName);
      setBlogItems(filteredBlogItems);
    }


    // Checks if We have a token in local storage if so get user info else go back to login
    if (checkToken()) {
      getLoggedInData()
    } else {
      router.push('/LoginPage');
    }
  }, [])


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
                  // onClick={() => setLoginSwitchBool(false)}
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
