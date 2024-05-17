"use client";

import { FileInput, TextInput, Button, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { langFormat } from "../components/CustomFunctions";
import {
  checkToken,
  getLoggedInUserData,
  addTranslationRequest,
} from "@/utils/Dataservices";
import imageCompression from "browser-image-compression";

const RequestUploadPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  const [requestName, setRequestName] = useState<string>("");
  const [languageSelect, setLanguageSelect] = useState<string>("");
  const [dialogueRequest, setDialogueRequest] = useState<string>("");
  const [screenshots, setScreenshots] = useState<any>();
  const [videoLink, setVideoLink] = useState<string>();
  const [queryNum, setQueryNum] = useState<number>(-1);
  const [requestObj, setRequestObj] = useState<any>();
  const [mediaUserId, setMediaUserId] = useState<number>(-1);

  const getLoggedInData = async () => {
    if (checkToken()) {
      const userData = await getLoggedInUserData();
      if (userData) {
        setMediaUserId(userData.userId);
      } else {
        console.log("User data is not available.");
      }
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      if (checkToken()) {
        const userData = await getLoggedInUserData();
        if (userData) {
          setMediaUserId(userData.userId);
        } else {
          console.log("User data is not available.");
        }
      }
    };
    getUserId();
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
      let screenshotsEffect;
      let videoEffect;

      if (screenshots) {
        screenshotsEffect = {
          src: screenshots,
          isVideo: false,
        };
      }

      if (videoLink) {
        videoEffect = {
          src: videoLink,
          isVideo: true,
        };
      }

      let referencesEffect = [
        screenshots ? screenshotsEffect : null,
        videoEffect ? videoEffect : null,
      ]

      let requestEffect = {
        requestorUserId: mediaUserId,
        mediaId: queryNum,
        requestLanguage: languageSelect,
        requestName: requestName,
        requestDialogue: dialogueRequest,
        requestReferences: referencesEffect
        // screenshots: screenshots,
        // "videoLink": videoLink,
      };
      setRequestObj(requestEffect);
      console.log(requestEffect);
    }
  }, [requestName, languageSelect, dialogueRequest, screenshots, videoLink, mediaUserId, queryNum]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    console.log(`${file!.size / 1024 / 1024} MB`);

    // Check if a file is selected
    if (!file) {
      alert("Please select a file.");
      return;
    }

    //compress the image - Added by Zach
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 512,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      file = compressedFile;
    } catch (error) {
      console.log(error);
      e.target.value = ""; //Clear the input value
    }

    // Check file type (accept only PNG and JPEG)
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!acceptedTypes.includes(file.type)) {
      alert("Please select a PNG or JPEG file.");
      e.target.value = ""; // Clear the input value
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      setScreenshots(reader.result as string);
      console.log(reader.result);
    };
    console.log(`${file.size / 1024} KB`);
    reader.readAsDataURL(file);
  };

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
                // multiple
                accept="image/png, image/jpeg, image/webp"
                helperText="PNG, JPG or GIF (MAX. ???x???px)."
                onChange={handleImage}
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
                addTranslationRequest(requestObj);
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
