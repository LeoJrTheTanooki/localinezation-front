"use client";

import { Label, FileInput, TextInput, Button, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { langFormat } from "../components/CustomFunctions";
import {
  checkToken,
  getLoggedInUserData,
  loggedinData,
  submitTranslation,
} from "@/utils/Dataservices";

const RequestUploadPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  const [requestName, setRequestName] = useState<string>("");
  const [languageSelect, setLanguageSelect] = useState<string>("");
  const [dialogueRequest, setDialogueRequest] = useState<string>("");
  const [screenshots, setScreenshots] = useState<Array<any>>([]);
  const [videoLink, setVideoLink] = useState<string>("");
  const [queryNum, setQueryNum] = useState<number>(-1);
  const [requestObj, setRequestObj] = useState<any>();
  const [mediaUserId, setMediaUserId] = useState<number>(-1);

  const getLoggedInData = async () => {
    if (checkToken()) {
      const userData = loggedinData(); // This should retrieve the stored user data
      await getLoggedInUserData(); // no "username" parameter required since we are fetch the usernamen from localstorage..because the function now handles the username internally.
      if (userData) {
        console.log(userData);
        // let userMediaItems: IMediaItems[] = await getMediaItemsByUserId(
        //   userData.userId
        // );
        // let filteredMediaItems = userMediaItems.filter(
        //   (item) => item.isDeleted === false
        // );
        setMediaUserId(userData.userId);
        // setPublisherName(userData.publisherName);
        // setMediaItems(filteredMediaItems);
      } else {
        console.log("User data is not available.");
      }
    } else {
      // router.push("/LoginPage");
    }
  };

  useEffect(() => {
    const lol = async () => {
      if (checkToken()) {
        await getLoggedInUserData(); // no "username" parameter required since we are fetch the usernamen from localstorage..because the function now handles the username internally.
        const userData = loggedinData(); // This should retrieve the stored user data
        console.log(userData);
        if (userData) {
          setMediaUserId(userData.userId);
        } else {
          console.log("User data is not available.");
        }
      }
    };
    lol()
  }, []);

  // useEffect(() => {
  //   const init = async () => {
  //     if (localStorage.getItem("username")) {
  //       // setCurrentUsername(localStorage.getItem("username"));
  //       await getLoggedInData(); // This function needs to be defined outside useEffect or here within it
  //     } else {
  //       // setCurrentUsername(null);
  //       // router.push("/LoginPage");
  //     }
  //   };
  //   init();
  // }, [router]);

/* 
https://localinazationapi.azurewebsites.net/Media/AddTranslationRequest
{
  "requestorUserId": 15,
  "mediaId": 1,
  "requestName": "qwertyuiop",
  "requestLanguage": "englishUsa",
  "requestDialogue": "qwertyuiop"
}
*/

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("id");
    if (query) setQueryNum(parseInt(query));
  }, []);

  useEffect(() => {
    if (requestName && languageSelect) {
      let requestEffect = {
        requestorUserId: mediaUserId,
        mediaId: queryNum,
        requestName: requestName,
        requestLanguage: languageSelect,
        requestDialogue: dialogueRequest,
        // screenshots: screenshots,
        // "videoLink": videoLink,
      };
      setRequestObj(requestEffect);
      console.log(requestEffect);
    }
  }, [requestName, languageSelect, dialogueRequest, videoLink]);

  return (
    <>
      <div>
        <form className="max-w-md flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <p className="text-gray-900">
                Request <span className="text-red-600">*</span>
              </p>
              <TextInput
                id="requestName"
                type="text"
                required
                onChange={(e) => {
                  setRequestName(e.target.value);
                }}
                value={requestName}
              />
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">
                Language <span className="text-red-600">*</span>
              </p>
              <div className="border w-max rounded-md p-1 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 ">
                <Dropdown
                  id="type"
                  label={
                    languageSelect
                      ? langFormat(languageSelect)
                      : "Select a Language"
                  }
                  inline
                >
                  <Dropdown.Item
                    onClick={() => {
                      setLanguageSelect("englishUsa");
                    }}
                  >
                    English (US)
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setLanguageSelect("spanishLatAm");
                    }}
                  >
                    Spanish (Latin American)
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">Original Dialogue</p>
              <TextInput
                id="dialogueRequest"
                type="text"
                onChange={(e) => {
                  setDialogueRequest(e.target.value);
                }}
                value={dialogueRequest}
              />
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">Screenshots</p>
              <FileInput
                id="screenshots"
                multiple
                accept="image/png, image/jpeg, image/webp"
                helperText="PNG, JPG or GIF (MAX. ???x???px)."
              />{" "}
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">Video Link</p>
              <TextInput
                id="videoLink"
                type="text"
                onChange={(e) => {
                  setVideoLink(e.target.value);
                }}
                value={videoLink}
              />
            </div>
            <Button
              onClick={() => {
                submitTranslation(requestObj);
                handlePageChange(`/MediaPage?id=${queryNum}`);
              }}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RequestUploadPage;
