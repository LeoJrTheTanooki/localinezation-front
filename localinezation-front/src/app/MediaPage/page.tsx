"use client";

import { Button } from "flowbite-react";
import PageData from "@/utils/PageData.json";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IMediaData } from "@/Interfaces/Interfaces";

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



  const [queryNum, setQueryNum] = useState<number>(-1);

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
    if (currentMedia.requestLanguage) {
      const languageListJsx = currentMedia.requestLanguage.map(
        (media: any, index: number) => {
          let language = Object.keys(media)[0];
          let formattedLang;
          switch (language) {
            case "englishUsa":
              formattedLang = "English (US)";
              break;
            case "spanishLatAm":
              formattedLang = "Spanish (Latin American)";
              break;
            case "french":
              formattedLang = "French";
              break;
          }

          if (language) {
            return (
              <li key={index}>
                <button
                  className="text-blue-600 italic underline"
                  onClick={() =>
                    handlePageChange(
                      `/OpenRequestsPage?id=${queryNum}&language=${language}`
                    )
                  }
                >
                  {formattedLang}
                </button>
              </li>
            );
          } else {
            return <li key={index}>No Available Languages</li>;
          }
        }
      );
      setListedLanguages(languageListJsx);
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
              onClick={() =>
                handlePageChange("/OpenRequestsPage?id=0&language=englishUsa")
              }
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
