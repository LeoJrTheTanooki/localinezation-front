"use client";

import { Button } from "flowbite-react";
import PageData from "@/utils/PageData.json";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MediaPage = (props: any) => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  const DataDefault = {
    title: "Unknown",
    coverArt:
      "",
    originalLanguage: "Unknown",
    type: "Unknown",
    platform: "No Known Platform",
    openRequests: [
      {
        requestLanguage: [
          {
            hsirebbig: [
              {
                requestName: "",
                requestDialogue: "",
                requestReferences: [""],
                submittedTranslations: [
                  {
                    translatorUserName: "",
                    isGuest: true,
                    translatedDialogue: "",
                    userScores: [0],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  interface IMediaData {
    title: string
    coverArt: string
    originalLanguage: string
    type: string
    platform: string
    openRequests: Array<{
      requestLanguage: Array<{
        hsirebbig: Array<{
          requestName: string
          requestDialogue: string
          requestReferences: Array<string>
          submittedTranslations: Array<{
            translatorUserName: string
            isGuest: boolean
            translatedDialogue: string
            userScores: Array<number>
          }>
        }>
      }>
    }>
  }

  const [queryNum, setQueryNum] = useState<number>(0);
  // console.log(queryNum);

  const [title, setTitle] = useState<string>("Unknown");

  const [mediaList, setMediaList] = useState<any>(PageData);

  const [currentMedia, setCurrentMedia] = useState<IMediaData>(DataDefault);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("id");
    if (query) setQueryNum(parseInt(query));
  }, []);

  useEffect(() => {
    setCurrentMedia(mediaList[queryNum]);
  }, [queryNum]);

  return (
    <div className=" grid justify-center">
      <div className=" grid grid-cols-2 gap-5 py-7 w-max mx-auto">
        <div className="justify-self-end">
          <img className=" h-80" src={currentMedia.coverArt} alt="" />
        </div>
        <div className=" font-bold">
          <p>Name: {currentMedia.title}</p>
          <p>Type: {currentMedia.type}</p>
          <p>Platform: {currentMedia.platform}</p>
          <p>Original Language: {currentMedia.originalLanguage}</p>
          <p>Current Translations</p>
          <ul className=" font-normal">
            <li>
              <button className="text-blue-600 italic underline">
                English
              </button>
            </li>
            <li>
              <button className="text-blue-600 italic underline">
                Spanish (Latin American)
              </button>
            </li>
            <li>
              <button className="text-blue-600 italic underline">French</button>
            </li>
          </ul>
        </div>
        <div className=" justify-self-center">
          <Button
            className=" bg-indigo-900 enabled:hover:bg-indigo-950 justify-self-end"
            onClick={() => handlePageChange("/RequestUploadPage")}
          >
            Request a Line to Translate
          </Button>
        </div>
        <div className=" justify-self-center">
          <Button
            className=" bg-indigo-900 enabled:hover:bg-indigo-950"
            onClick={() => handlePageChange("/TranslationUploadPage")}
          >
            Submit a Translation
          </Button>
        </div>
      </div>
      <div className="w-[1000px]">
        <div className="bg-purple-600 text-center text-white py-3 font-bold border-black border-b-2">
          Current Translators
        </div>
        <div className=" border-2 border-t-0 border-black grid grid-cols-2">
          <div className=" col-span-2">
            <span className=" font-bold italic mr-1">G0dU50pp_800:</span>
            <button
              className=" text-blue-600"
              onClick={() => handlePageChange("/OpenRequestsPage")}
            >
              Opening Movie
            </button>
            {" | "}
            <button disabled className=" text-blue-600 disabled:text-blue-400">
              Main Menu Options
            </button>
            {" | "}
            <button disabled className=" text-blue-600 disabled:text-blue-400">
              Battle Settings
            </button>
            {" | "}
            <button disabled className=" text-blue-600 disabled:text-blue-400">
              Treasure
            </button>
            {" | "}
            <button disabled className=" text-blue-600 disabled:text-blue-400">
              Options
            </button>
            {" | "}
            <button disabled className=" text-blue-600 disabled:text-blue-400">
              Move Names
            </button>
          </div>
          <div>User Score:</div>
          <div className=" justify-self-end">Report User</div>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
