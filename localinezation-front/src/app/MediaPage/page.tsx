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
    coverArt: "",
    originalLanguage: "Unknown",
    type: "Unknown",
    platform: "No Known Platform",
  };

  interface IMediaData {
    title: string;
    coverArt: string;
    originalLanguage: string;
    type: string;
    platform: string;
    requestLanguage?: Array<{
      englishUsa?: Array<ILanguageData>;
      spanishLatAm?: Array<ILanguageData>;
      spanishEu?: Array<ILanguageData>;
      englishUk?: Array<ILanguageData>;
      french?: Array<ILanguageData>;
      japanese?: Array<ILanguageData>;
      chineseTrad?: Array<ILanguageData>;
      chineseSimple?: Array<ILanguageData>;
      norwegian?: Array<ILanguageData>;
      swedish?: Array<ILanguageData>;
      irish?: Array<ILanguageData>;
    }>;
  }

  interface ILanguageData {
    openRequests?: Array<{
      requestName: string;
      requestDialogue?: string;
      requestReferences?: Array<string>;
      submittedTranslations?: Array<{
        translatorUserName: string;
        isGuest: boolean;
        translatedDialogue: string;
        userScores?: Array<number>;
      }>;
    }>;
  }

  const [queryNum, setQueryNum] = useState<number>(-1);
  // console.log(queryNum);

  const [title, setTitle] = useState<string>("Unknown");

  const [mediaList, setMediaList] = useState<any>(PageData);

  const [currentMedia, setCurrentMedia] = useState<IMediaData>(DataDefault);

  const [listedLanguages, setListedLanguages] = useState<any>();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("id");
    if (query) setQueryNum(parseInt(query));
  }, []);

  useEffect(() => {
    if (queryNum != -1) {
      setCurrentMedia(mediaList[queryNum]);
    }
  }, [queryNum]);

  useEffect(() => {
    console.log(currentMedia);
    if (currentMedia.requestLanguage) {
      const test = currentMedia.requestLanguage.map(
        (media: any, index: number) => {
          let language = Object.keys(media)[0];
          console.log(language);

          switch (language) {
            case "englishUsa":
              language = "English (US)";
              break;
            case "spanishLatAm":
              language = "Spanish (Latin American)";
              break;
            case "french":
              language = "French";
              break;
          }

          if (language) {
            return (
              <li key={index}>
                <button className="text-blue-600 italic underline">
                  {language}
                </button>
              </li>
            );
          } else {
            return <li key={index}>No Available Languages</li>;
          }
        }
      );
      setListedLanguages(test);
    }
  }, [currentMedia]);

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
            {currentMedia.requestLanguage ? (
              <>{listedLanguages}</>
            ) : (
              <li>No Available Languages</li>
            )}
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
        {/* Language should default to language that is stored in localstorage,
            the langauge in local storage should default itself based on geolocation
            and logic for that should be set in the Navbar */}
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
