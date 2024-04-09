"use client";

import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
    const router = useRouter()
    const handlePageChange = (route: string) => {
        router.push(route)
    }
  return (
    <div className="min-w-screen min-h-[90vh] flex justify-center items-center p-24">
      <div
        id="heroImg"
        className="bg-flagBG w-[80%] h-[75vh] flex justify-center items-center rounded-3xl"
      >
        <div
          id="loginBG"
          className="bg-purple-600 w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
        >
          <div className="flex flex-col">
            <div id="username" className="mb-6">
              <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="large-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div id="password" className="mb-6">
              <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                Password
              </label>
              <input
                type="text"
                id="large-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <a href="" className="underline italic text-white">
              Having trouble logging in?
            </a>
            <br />
            <button className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold">
              Login
            </button>
          </div>
          <div className=""></div>

          <div>
            <p className="text-white">Dont have an account?</p>
            <button className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold">
              Sign Up
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default page;
