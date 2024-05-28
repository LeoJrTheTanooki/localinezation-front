"use client";

import { IMediaItems, IUserInfo } from "@/Interfaces/Interfaces";
import {
  checkToken,
  getLoggedInUserData,
  getMediaItemsByUserId,
  getTranslationRequestsByUserId,
  getTranslationsByTranslatorUserId,
  updateCredentials,
} from "@/utils/Dataservices";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AccountDashboardPage = () => {
  const [currentUsername, setCurrentUsername] = useState<string | null>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newLogin, setNewLogin] = useState<IUserInfo>();

  const [mediaUserId, setMediaUserId] = useState<number>(0);
  const [publisherName, setPublisherName] = useState<string>("");
  const [mediaItems, setMediaItems] = useState<IMediaItems[]>();
  const [requestedLinesJsx, setRequestedLinesJsx] = useState<any>();
  const [submittedTranslationsJsx, setSubmittedTranslationsJsx] =
    useState<any>();

  useEffect(() => {
    if (newUsername && newPassword) {
      let loginEffect = {
        id: mediaUserId,
        username: newUsername,
        password: newPassword,
      };
      setNewLogin(loginEffect);
    }
  }, [newUsername, newPassword, mediaUserId]);

  // useRouter from next/navigation
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  const getLoggedInData = async () => {
    if (checkToken()) {
      const userData = await getLoggedInUserData(); // no "username" parameter required since we are fetch the usernamen from localstorage..because the function now handles the username internally.
      if (userData) {
        let userMediaItems: IMediaItems[] = await getMediaItemsByUserId(
          userData.userId
        );
        let filteredMediaItems = userMediaItems.filter(
          (item) => item.isDeleted === false
        );
        setMediaUserId(userData.userId);
        setPublisherName(userData.publisherName);
        setMediaItems(filteredMediaItems);
        const userRequests = await getTranslationRequestsByUserId(
          userData.userId
        );
        const userTranslations = await getTranslationsByTranslatorUserId(
          userData.userId
        );
        const requestsMapped = userRequests.map((e: any, index: number) => {
          return (
            <div
              key={index}
              className="border border-t-0 border-black flex flex-col flex-wrap p-3 w-full text-left bg-fuchsia-200 text-gray-700 cursor-pointer hover:bg-fuchsia-50"
              onClick={() => {
                handlePageChange(
                  `/OpenRequestsPage?id=${e.media.id}&language=${e.requestLanguage}&requestId=${e.id}
                  `
                );
              }}
            >
              <p>Title: {e.media.title}</p>
              <p>Request: {e.requestName}</p>
            </div>
          );
        });
        // const translationsMapped = userTranslations.map(
        //   async (e: any, index: number) => {
        //     console.log(e);
        //     console.log(e.translationRequestId);
        //     // getTranslationsByRequestId(e.translationRequestId)
        //   }
        // );
        setRequestedLinesJsx(requestsMapped);
      } else {
        console.log("User data is not available.");
      }
    } else {
      router.push("/LoginPage");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem("username")) {
        setCurrentUsername(localStorage.getItem("username"));
        await getLoggedInData(); // This function needs to be defined outside useEffect or here within it
      } else {
        setCurrentUsername(null);
        router.push("/LoginPage");
      }
    };
    init();
  }, [router]); // router is a dependency here

  return (
    <div className="min-w-screen min-h-[110vh]">
      <h1 className="text-center font-bold text-gray-700 text-4xl py-7 w-fit h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg my-8">
        Welcome{currentUsername ? `, ${currentUsername}` : ""}
      </h1>
      <div className="flex flex-row justify-evenly gap-8">
        <div
          id=""
          className="bg-purple-600 min-w-[542px] min-h-[40%] w-[80%] h-[40%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
        >
          <p>Requested Lines</p>
          {requestedLinesJsx}
        </div>
        {/* <div
          id=""
          className="bg-purple-600 min-w-[542px] min-h-[40%] w-[80%] h-[40%] flex flex-col justify-around items-center text-center rounded-3xl p-12"
        >
          <p>Submitted Translations</p>
          {submittedTranslationsJsx}
        </div> */}
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <div
              id="loginBG"
              className="bg-purple-600 min-w-80 w-[40%] h-full flex flex-col justify-around items-center text-center rounded-3xl p-12"
            >
              <div className="flex flex-col">
                <div className="mb-6">
                  <label className="block mb-2 text-lg text-start font-bold text-white dark:text-white">
                    Update Username
                  </label>

                  <input
                    id="username"
                    required
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="New Username..."
                    type="text"
                    className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-lg text-start font-bold text-white  dark:text-white">
                    Update Password
                  </label>

                  <input
                    id="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="New Password..."
                    className="required bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <br />
                <button
                  onClick={() => {
                    if (newLogin) {
                      updateCredentials(newLogin);
                      alert("User Info Successfully Changed");
                      setCurrentUsername(newUsername);
                      localStorage.setItem("username", newUsername);
                      // handlePageChange('/Homepage')
                    } else if (!newUsername) {
                      alert("Please input a username");
                    } else if (!newPassword) {
                      alert("Please input a password");
                    }
                  }}
                  className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold enabled:hover:bg-fuchsia-400 disabled:bg-fuchsia-100 disabled:text-gray-500"
                >
                  Save Changes
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("username");
                    localStorage.removeItem("Token");
                    handlePageChange("/LoginPage");
                  }}
                  className="w-64 h-12 bg-fuchsia-300 rounded-full font-bold enabled:hover:bg-fuchsia-400 disabled:bg-fuchsia-100 disabled:text-gray-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboardPage;
