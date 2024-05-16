"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IMediaData } from "@/Interfaces/Interfaces";
import { langFormat } from "../components/CustomFunctions";
import {
  fetchMedia,
  fetchTranslationRequests,
  getMediaItemsByMediaId,
} from "@/utils/Dataservices";

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
  const [mediaList, setMediaList] = useState<any>();
  const [currentMedia, setCurrentMedia] = useState<IMediaData>(DataDefault);
  const [listedLanguages, setListedLanguages] = useState<React.JSX.Element[]>();
  const [error, setError] = useState<string | null>(null);
  const [translationsMappedJsx, setTranslationsMappedJsx] = useState<any>();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("id");
    if (query) setQueryNum(parseInt(query));
  }, []);

  useEffect(() => {
    const fetchTransFunction = async () => {
      let translations = await fetchTranslationRequests(queryNum);
      const translationsMapped = translations.map((e: any, index: number) => {
        return (
          <div
            className="border border-t-0 border-black flex flex-col flex-wrap p-3 bg-fuchsia-200 text-gray-700 cursor-pointer hover:bg-fuchsia-50"
            key={index}
            onClick={() => {
              handlePageChange(
                `/OpenRequestsPage?id=${queryNum}&language=${e.requestLanguage}&index=${index}`
              );
            }}
          >
            <p>Request: {e.requestName}</p>
            <p>Dialogue: {e.requestDialogue}</p>
            <p>Language: {e.requestLanguage}</p>
          </div>
        );
      });
      setTranslationsMappedJsx(translationsMapped);
    };

    if (queryNum != -1) {
      const loadMedia = async () => {
        const foundMedia = await getMediaItemsByMediaId(queryNum);
        setCurrentMedia(foundMedia);
      };
      loadMedia();
      fetchTransFunction();
    }
  }, [queryNum]);

  useEffect(() => {
    if (currentMedia.requestLanguage) {
      const languageListJsx = currentMedia.requestLanguage.map(
        (media: object, index: number) => {
          let language = Object.keys(media)[0];
          let formattedLang = langFormat(language);
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
            console.log("fail");
            return <li key={index}>No Available Languages</li>;
          }
        }
      );
      setListedLanguages(languageListJsx);
    }
  }, [currentMedia]);

  return (
    <div
      className={`flex justify-between flex-col bg-purple-600 rounded-lg text-gray-200 font-semibold p-4 max-w-2xl mx-auto mt-12`}
    >
      <div className="flex flex-col md:flex-row gap-5 pb-4 w-max mx-auto">
        <img
          className="max-h-80 max-w-64 min-w-48 bg-fuchsia-300 p-4 rounded-lg text-gray-700"
          src={currentMedia.coverArt}
          alt=" Image"
        />
        <div className=" font-semibold flex gap-4 flex-col">
          <p>Name: {currentMedia.title}</p>
          <p>Type: {currentMedia.type}</p>
          <p>Platform: {currentMedia.platform}</p>
          <p>Original Language: {currentMedia.originalLanguage}</p>
          <p>Current Translations</p>
          <ul className="font-normal">
            {currentMedia.requestLanguage ? (
              <>{listedLanguages}</>
            ) : (
              <li>No Available Languages</li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <div className="flex justify-evenly mb-4">
          <button
            className="text-gray-700 bg-fuchsia-300 rounded-xl font-semibold hover:bg-fuchsia-400 mx-2 p-3"
            onClick={() =>
              handlePageChange(`/RequestUploadPage?id=${queryNum}`)
            }
          >
            Create a Request
          </button>
          {/* <button
            className="text-gray-700 bg-fuchsia-300 rounded-xl font-semibold hover:bg-fuchsia-400 mx-2 p-3"
            onClick={() => handlePageChange("/TranslationUploadPage")}
          >
            Submit a Translation
          </button> */}
        </div>
      </div>
      <div className="">
        <div className="bg-fuchsia-300 text-center text-gray-700 py-3 font-semibold border-black border">
          Current Translation Requests
        </div>

        {translationsMappedJsx}
      </div>
    </div>
  );
};

export default MediaPage;
// <div className="grid justify-center">
//   <div className="grid grid-cols-2 gap-5 py-7 w-max mx-auto">
//     <div className="justify-self-end">
//       <img className="h-80" src={currentMedia.coverArt} alt="" />
//     </div>
//     <div className="font-bold">
//       <p>Name: {currentMedia.title}</p>
//       <p>Type: {currentMedia.type}</p>
//       <p>Platform: {currentMedia.platform}</p>
//       <p>Original Language: {currentMedia.originalLanguage}</p>
//       <p>Current Translations</p>
//       <ul className="font-normal">
//         {currentMedia.requestLanguage ? (
//           <>{listedLanguages}</>
//         ) : (
//           <li>No Available Languages</li>
//         )}
//       </ul>
//     </div>
//     {/* <div className="justify-self-center">
//       <Button
//         className="bg-indigo-900 enabled:hover:bg-indigo-950 justify-self-end"
//         onClick={() => handlePageChange("/RequestUploadPage")}
//       >
//         Request a Line to Translate
//       </Button>
//     </div> */}
//     <div className="justify-self-center">
//       <Button
//         className="bg-indigo-900 enabled:hover:bg-indigo-950"
//         onClick={() => handlePageChange(`/TranslationUploadPage?id=${queryNum}`)}
//         // onClick={() => handlePageChange( `/TranslationUploadPage?id=${queryNum}&language=${langQuery}&request=${requestIndex}`)}

//       >
//         Submit a Translation
//       </Button>
//     </div>
//   </div>

//   {/* <div className="w-[1000px]">
//     <div className="bg-purple-600 text-center text-white py-3 font-bold border-black border-b-2">
//       Current Translators
//     </div>
//     Language should default to language that is stored in localstorage,
//         the langauge in local storage should default itself based on geolocation
//         and logic for that should be set in the Navbar
//     <div className="border-2 border-t-0 border-black grid grid-cols-2">
//       <div className="col-span-2">
//         <span className="font-bold italic mr-1">G0dU50pp_800:</span>
//         <button
//           className="text-blue-600"
//           onClick={() =>
//             handlePageChange("/OpenRequestsPage?id=0&language=englishUsa")
//           }
//         >
//           Opening Movie
//         </button>
//         {" | "}
//         <button disabled className="text-blue-600 disabled:text-blue-400">
//           Main Menu Options
//         </button>
//         {" | "}
//         <button disabled className="text-blue-600 disabled:text-blue-400">
//           Battle Settings
//         </button>
//         {" | "}
//         <button disabled className="text-blue-600 disabled:text-blue-400">
//           Treasure
//         </button>
//         {" | "}
//         <button disabled className="text-blue-600 disabled:text-blue-400">
//           Options
//         </button>
//         {" | "}
//         <button disabled className="text-blue-600 disabled:text-blue-400">
//           Move Names
//         </button>
//       </div>
//       <div>User Score:</div>
//       <div className="justify-self-end">Report User</div>
//     </div>
//   </div> */}
// </div>
