"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
    const [login, setLogin] = useState<boolean>(true)
    const router = useRouter();
    const handlePageChange = (route: string) => {
        router.push(route);
    };

    return (
        login ? 
        (
            <div className="min-w-screen min-h-[89vh] flex justify-center items-center px-24">
                <div id="heroImg" className="bg-flagBG bg-no-repeat bg-cover min-w-80 min-h-[75vh] w-[80%] h-[75vh] flex justify-center items-center rounded-3xl">
                    <div id="loginBG" className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12">
                        <div className="flex flex-col">
                            <h1 className="text-3xl text-white font-bold mb-2">Login</h1>
                            <div id="username" className="mb-6">
                                <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">Email</label>
                                <input type="email" id="large-input" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div id="password" className="mb-6">
                                <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">Password</label>
                                <input type="text" id="large-input" placeholder="" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <a href="" className="underline italic text-white hover:text-gray-200">Having trouble logging in?</a>
                            <br />
                            <button className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400">Login</button>
                        </div>
                        <div className="mt-4">
                            <p className="text-white">Dont have an account?</p>
                            <button onClick={() => setLogin(false)} className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold hover:bg-fuchsia-400">Sign Up</button>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>) 
        : 
        (<div className="min-w-screen min-h-[89vh] flex justify-center items-center px-24">
                <div id="heroImg" className="bg-flagBG bg-no-repeat bg-cover min-w-80 min-h-[75vh] w-[80%] h-[75vh] flex justify-center items-center rounded-3xl">
                    <div id="loginBG" className="bg-purple-600 min-w-80 min-h-[80%] w-[40%] h-[80%] flex flex-col justify-around items-center text-center rounded-3xl p-12">
                        <div className="flex flex-col">
                            <h1 className="text-3xl text-white font-bold mb-2">Create Account</h1>
                            <div id="username" className="mb-6">
                                <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">Email</label>
                                <input type="email" id="large-input" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div id="password" className="mb-6">
                                <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">Password</label>
                                <input type="text" id="large-input" className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <a href="" className="underline italic text-white">Having trouble logging in?</a>
                            <br />
                            <button className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold">Create Account</button>
                        </div>
                        <div className="mt-4">
                            <p className="text-white">Already have an account?</p>
                            <button onClick={() => setLogin(true)} className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold">Log In</button>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default LoginPage
