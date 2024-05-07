"use client";

import React, { useEffect, useState } from "react";

const AccountDashboardPage = () => {
  const [currentUsername, setCurrentUsername] = useState<string | null>("");

  useEffect(() => {
    console.log(localStorage.getItem("username"));
    if (localStorage.getItem("username")) {
      setCurrentUsername(localStorage.getItem("username"));
    } else {
      setCurrentUsername(null);
    }
  }, []);

  return (
    <div className="min-w-screen min-h-[110vh]">
      <h1 className="text-center font-bold text-gray-700 text-4xl py-7 w-fit h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg my-8">
        Welcome{currentUsername ? `, ${currentUsername}` : ""}
      </h1>
      <div className="grid grid-cols-3">
        <div className="col-span-2 flex">
          <div
            id="loginBG"
            className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
          >
            {/* <p>Requested Lines</p> */}
            <p>Coming Soon</p>
          </div>
        </div>
        <div className="flex flex-col">
        <div className="flex justify-center items-center">
            <div
              id="loginBG"
              className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
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
        <div className="col-span-2 flex">
          <div
            id="loginBG"
            className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
          >
            {/* <p>Submitted Translations</p> */}
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboardPage;
