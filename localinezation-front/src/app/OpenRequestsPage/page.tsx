"use client";

import { ILanguageData, IMediaData } from "@/Interfaces/Interfaces";
import { Button, Dropdown, Rating } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { langFormat } from "../components/CustomFunctions";
import {
  getPublishedItems,
  getTranslationRequestsByMediaId,
  getMediaItemsByMediaId,
  getTranslationsByRequestId,
  getUserByUserId,
} from "@/utils/Dataservices";

const OpenRequestsPage = () => {
  const requestsDefault = Array<{
    id: -1;
    requestName: "string";
    requestDialogue: "string";
    requestReferences: Array<"string">;
    submittedTranslations: Array<{
      translatorUserName: "string";
      isGuest: true;
      translatedDialogue: "string";
      userScores: [];
    }>;
  }>;

  const DataDefault = {
    title: "Unknown",
    coverArt: "",
    originalLanguage: "Unknown",
    type: "Unknown",
    platform: "No Known Platform",
  };

  const [requestsArray, setRequestsArray] = useState<any>(requestsDefault);
  const [mediaRequests, setMediaRequests] = useState<any>();
  const [queryNum, setQueryNum] = useState<number>(-1);
  const [langQuery, setLangQuery] = useState<string>("");
  const [requestList, setRequestList] = useState<React.JSX.Element[]>();
  const [coverArt, setCoverArt] = useState<string>("");
  const [requestIndex, setRequestIndex] = useState<number>(0);
  const [referenceIndex, setReferenceIndex] = useState<number>(0);
  const [translationIndex, setTranslationIndex] = useState<number>(0);
  const [dropdownItems, setDropdownItems] = useState<React.JSX.Element[]>();
  const [yourScoreHover, setYourScoreHover] = useState<any>();
  const [yourScore, setYourScore] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [currentMedia, setCurrentMedia] = useState<IMediaData>(DataDefault);
  const [translatorUsername, setTranslatorUsername] = useState<string>("");

  const [requestTranslations, setRequestTranslations] = useState<any>();
  const [requestId, setRequestId] = useState<any>();

  useEffect(() => {
    localStorage.getItem("Token") ? "" : router.push("/LoginPage");
    const loadMedia = async () => {
      try {
        const media = await getPublishedItems();
        setMediaRequests(media);
      } catch (error) {
        setError("Failed to fetch media. Please try again later.");
        console.error(error);
      }
    };

    loadMedia();
  }, []);

  useEffect(() => {
    const idQueryEffect = new URLSearchParams(window.location.search).get("id");
    const langQueryEffect = new URLSearchParams(window.location.search).get(
      "language"
    );
    const indexQueryEffect = new URLSearchParams(window.location.search).get(
      "index"
    );
    const requestIdQueryEffect = new URLSearchParams(
      window.location.search
    ).get("requestId");
    if (idQueryEffect) setQueryNum(parseInt(idQueryEffect));
    if (langQueryEffect) setLangQuery(langQueryEffect);
    if (indexQueryEffect) setRequestIndex(parseInt(indexQueryEffect));
    if (requestIdQueryEffect) setRequestId(parseInt(requestIdQueryEffect));
    if(indexQueryEffect){
      // console.log('Index Pass')
    } else {
      // console.log('ID Pass', requestIdQueryEffect)
    }
  }, []);

  useEffect(() => {
    if (queryNum != -1) {
      const loadMedia = async () => {
        const foundMedia = await getMediaItemsByMediaId(queryNum);
        setCurrentMedia(foundMedia);
        const submittedRequests = await getTranslationRequestsByMediaId(
          queryNum
        );
        setRequestsArray(submittedRequests);
        console.log('Current Requests: ', submittedRequests)
        console.log(requestId)
        setRequestIndex(submittedRequests.findIndex((e: any) => {
          return e.id == requestId;
        }))
        // const submittedTranslations = await getTranslationsByRequestId(queryNum)
        // console.log('Submitted Translations', submittedTranslations);
      };
      loadMedia();
    }
  }, [queryNum, requestId]);

  useEffect(() => {
    if (requestsArray && requestsArray.length != 0) {
      setRequestId(requestsArray[requestIndex].id);
      const requestListJsx = requestsArray.map(
        (request: any, index: number) => {
          return (
            <li key={index}>
              <button
                className="text-blue-600 italic underline"
                onClick={() => {
                  setReferenceIndex(0);
                  setLangQuery(request.requestLanguage);
                  setRequestIndex(index);
                  setRequestId(request.id);
                  setTranslationIndex(0);
                  window.history.pushState(
                    null,
                    `Change Queries`,
                    `OpenRequestsPage?id=${queryNum}&language=${request.requestLanguage}&index=${index}&requestId=${request.id}`
                  );
                }}
              >
                {request.requestName}
              </button>
            </li>
          );
        }
      );
      setRequestList(requestListJsx);
      // requestsArray[requestIndex]?.requestName
    }
  }, [queryNum, requestIndex, requestsArray]);

  useEffect(() => {
    const translationLoad = async () => {
      try {
        const translations = await getTranslationsByRequestId(requestId);
        setRequestTranslations(translations);
      } catch (error) {
        setRequestTranslations(null);
      }
    };
    if (requestId) {
      translationLoad();
    }
  }, [requestId, translationIndex]);

  useEffect(() => {
    if (requestTranslations) {
      const translatorId =
        requestTranslations[translationIndex].translatorUserId;
      const translatorLoad = async () => {
        try {
          let translatorInfo = await getUserByUserId(translatorId);
          setTranslatorUsername(translatorInfo.publisherName);
        } catch (error) {
          setTranslatorUsername(`User ${translatorId}`);
        }
      };
      translatorLoad();
    }
  }, [requestTranslations, translationIndex]);

  useEffect(() => {
    setCoverArt(currentMedia.coverArt);
  }, [currentMedia]);

  // Function source: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url#8260383
  // Modified to account for timestamps when applicable
  const youtube_parser = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (match) {
      const timeStart = new URLSearchParams(match[0]).get("t");
      if (timeStart != null) {
        return match && match[7].length == 11
          ? match[7] + `?start=${timeStart}`
          : false;
      } else {
        return match && match[7].length == 11 ? match[7] : false;
      }
    }
  };

  const srcFormat = (param: any) => {
    const currentReference = param.requestReferences[referenceIndex];
    if (currentReference) {
      if (currentReference.isVideo) {
        const videoSrc = youtube_parser(currentReference.src);

        return (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${videoSrc}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className=" bg-fuchsia-300 rounded-lg p-4 w-[100%] h-fit"
          />
        );
      } else {
        return <img src={currentReference.src} className="h-fit bg-fuchsia-300 rounded-lg p-4 w-full" alt={currentReference.src} />;
      }
    }
  };

  const indexLoop = (
    param: any,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    isIncrememting: boolean
  ) => {
    if (isIncrememting) {
      index++;
      if (param.length > index) {
        setIndex(index);
      } else {
        setIndex(0);
      }
    } else {
      index--;
      if (index > -1) {
        setIndex(index);
      } else {
        setIndex(param.length - 1);
      }
    }
  };

  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col m-5 gap-5 bg-purple-600 py-4 sm:p-6 rounded-xl w-fit xl:min-w-[768px] max-w-[1080px] mx-auto font-semibold text-gray-700">
      {/*<div className="justify-self-center">
          <img src={coverArt} alt="" className="bg-fuchsia-300 rounded-lg p-4" />
  </div>*/}
      <div>
        {requestsArray && requestsArray.length != 0 ?
          <h2 className="bg-fuchsia-300 text-center mb-4 p-2 rounded-xl h-20 pt-5">
            <span className="hidden md:visible">Request for</span>
            <span className="text-3xl"> {requestsArray[requestIndex]?.requestName} </span>
            <span  className="hidden md:visible">on {currentMedia.title}</span>
          </h2> : "null"
        }
        <div className="flex justify-between max-w-[768px]">

          {requestsArray &&
            requestsArray.length != 0 &&
            requestsArray[requestIndex].requestReferences?.length != 0 ? (
            <button
              onClick={() => {
                if (requestsArray)
                  indexLoop(
                    requestsArray[requestIndex].requestReferences,
                    referenceIndex,
                    setReferenceIndex,
                    false
                  );
              }}
              className="bg-fuchsia-300 hover:bg-fuchsia-400 h-fit p-4 m-auto rounded-2xl mr-2"
            >
              Prev.
            </button>
          ) : (
            ""
          )}

      
          <div className="lg:w-full flex justify-center">
            {requestsArray &&
              requestsArray.length != 0 &&
              requestsArray[requestIndex].requestReferences?.length != 0
              ? srcFormat(requestsArray[requestIndex])
              : "No Provided References"}
          </div>
          

          {requestsArray && requestsArray.length != 0 &&
          requestsArray[requestIndex].requestReferences?.length != 0 ? (
            <button
              onClick={() => {
                if (requestsArray)
                  indexLoop(
                    requestsArray[requestIndex].requestReferences,
                    referenceIndex,
                    setReferenceIndex,
                    true
                  );
              }}
              className="bg-fuchsia-300 hover:bg-fuchsia-400 h-fit p-4 m-auto rounded-2xl ml-2"

            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="max-w-[650px] mx-auto lg:w-full">
        <div className="flex flex-col border-black mb-2">
          <div className="bg-fuchsia-300 text-center p-2     border border-black border-b-0">
            Original dialogue for “{" "}
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestName
              : "null"}
            ”
          </div>
          <div className="bg-fuchsia-200 border border-black p-1 px-4">
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestDialogue
              : "null"}
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <button
              className="bg-fuchsia-300 hover:bg-fuchsia-400 h-fit rounded-full p-3"
              onClick={() =>
                handlePageChange(
                  `/TranslationUploadPage?id=${queryNum}&language=${langQuery}&index=${requestIndex}&requestId=${requestId}`
                )
              }
            >
              Make a Translation
            </button>{" "}
          </div>
        </div>
      </div>
      <div className="max-w-[650px] mx-auto lg:w-full">
        <div className="flex flex-col col-span-2 mb-2">
          <div className="bg-fuchsia-300 text-center p-2 border border-black border-b-0">
            Other Translations for “
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestName
              : "N/A"}
            ”
          </div>
          <div className="bg-fuchsia-200 border border-black p-1">

            {requestTranslations && requestTranslations.length > 0 ? (
              <>
                <span className="mx-2">{translatorUsername} :</span>{" "}
                {requestTranslations[translationIndex]?.translatedText}
              </>
            ) : (
              <span className=" font-bold">
                No translations submitted... click on Submit a Translation to
                make one!
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-around">
          <div>
            <button
              className="bg-fuchsia-300 hover:bg-fuchsia-400 rounded-full p-3 disabled:bg-slate-700"
              onClick={() => {
                if (requestsArray)
                  indexLoop(
                    requestTranslations,
                    translationIndex,
                    setTranslationIndex,
                    false
                  );
              }}
              disabled={
                requestTranslations && requestTranslations.length > 1
                  ? false
                  : true
              }

            >
              Previous User{" "}
            </button>
          </div>
          <div className="">
            <button
              className="bg-fuchsia-300 hover:bg-fuchsia-400 rounded-full p-3 disabled:bg-fuchsia-700"
              disabled
            >
              Report Translation
            </button>
          </div>{" "}
          <div>
            <button
              className="bg-fuchsia-300 hover:bg-fuchsia-400 rounded-full p-3 disabled:bg-slate-700"
              onClick={() => {
                if (requestsArray)
                  indexLoop(
                    requestTranslations,
                    translationIndex,
                    setTranslationIndex,
                    true
                  );
              }}
              disabled={
                requestTranslations && requestTranslations.length > 1
                  ? false
                  : true
              }
            >
              Next User
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OpenRequestsPage;
