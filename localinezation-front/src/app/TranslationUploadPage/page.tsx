"use client";

import { Label, TextInput, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ILanguageData } from "@/Interfaces/Interfaces";
import { langFormat } from "../components/CustomFunctions";
import {
  addTranslation,
  getLoggedInUserData,
  getTranslationRequestsByMediaId,
} from "@/utils/Dataservices";

const TranslationUploadPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

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

  const [requestsArray, setRequestsArray] =
    useState<ILanguageData["openRequests"]>(requestsDefault);
  const [queryNum, setQueryNum] = useState<number>(-1);
  const [langQuery, setLangQuery] = useState<string>("");
  const [requestIndex, setRequestIndex] = useState<number>(0);
  const [referenceIndex, setReferenceIndex] = useState<number>(0);
  const [formattedLang, setFormattedLang] = useState<string>("");
  const [requestId, setRequestId] = useState<any>();
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [userInterpretation, setUserInterpretation] = useState<string>("");
  const [translationObj, setTranslationObj] = useState<any>();
  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    const idQueryEffect = new URLSearchParams(window.location.search).get("id");
    const requestIndexEffect = new URLSearchParams(window.location.search).get(
      "index"
    );
    const langQueryEffect = new URLSearchParams(window.location.search).get(
      "language"
    );
    const requestIdQueryEffect = new URLSearchParams(
      window.location.search
    ).get("requestId");

    if (idQueryEffect) setQueryNum(parseInt(idQueryEffect));
    if (requestIndexEffect) {
      setRequestIndex(parseInt(requestIndexEffect));
    }
    if (langQueryEffect) setLangQuery(langQueryEffect);
    if (requestIdQueryEffect) setRequestId(parseInt(requestIdQueryEffect));

    setFormattedLang(langFormat(langQueryEffect));
  }, []);

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem("username")) {
        setCurrentUsername(localStorage.getItem("username"));
      }
      else{
        handlePageChange("/LoginPage")
      }
    };
    init();
  }, [router]);

  useEffect(() => {
    let guestCheck;
    currentUsername ? (guestCheck = false) : (guestCheck = true);
    // getLoggedInUserData
    const loadUserData = async () => {
      const userData = await getLoggedInUserData();
      setUserId(userData.userId);
    };
    loadUserData();

    let translationEffect = {
      translationRequestId: requestId,
      translatorUserId: userId,
      translatedText: userInterpretation,
      language: langQuery,
      isApproved: true,
      isGuest: guestCheck,
    };
    console.log(translationEffect);
    setTranslationObj(translationEffect);
  }, [userInterpretation]);

  useEffect(() => {
    if (queryNum != -1) {
      const loadMedia = async () => {
        const submittedRequests = await getTranslationRequestsByMediaId(
          queryNum
        );
        setRequestsArray(submittedRequests);
        console.log("Current Request: ", submittedRequests[requestIndex]);
      };
      loadMedia();
    }
  }, [queryNum, requestIndex]);

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
            max-width="300"
            max-height="150"
            src={`https://www.youtube-nocookie.com/embed/${videoSrc}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="bg-slate-600"
          />
        );
      } else {
        return <img src={currentReference.src} className="max-w-[300px] max-h-[150px]" alt={currentReference} />;
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

  return (
    <div className="flex flex-col bg-purple-600 m-5 gap-5 text-xl text-gray-700 font-semibold w-fit mx-auto rounded-xl p-4">
      <div className="flex flex-col lg:flex-row gap-2 lg:max-h-56">
        <div className="w-full flex justify-between lg:w-60  lg:flex-col gap-x-2">
          <div className="w-full">
            <div className="block p-2 bg-fuchsia-300 border border-black">
              <p>Submitting as...</p>
            </div>
            <div className=" block p-2 bg-fuchsia-200 border border-black border-t-0">
              <p className=" font-bold ">{currentUsername ? currentUsername : 'Guest'}</p>
            </div>
          </div>

          <div className="w-full">
            <div className="block p-2 bg-fuchsia-300 border border-black">
              <p>Translating Into...</p>
            </div>
            <div className=" block p-2 bg-fuchsia-200 border border-black border-t-0">
              <p className="font-bold">{formattedLang}</p>
            </div>
          </div>
        </div>


        <div className="text-center hidden md:flex flex-col justify-center items-center lg:w-2/3 max-w-[550px] lg:min-w-[550px]">
          <p className="bg-fuchsia-300 p-2 w-full border border-black">References</p>
          <div className="flex justify-center w-full bg-fuchsia-200 border border-black border-t-0 p-1 h-full lg:min-h-44">
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
              className="w-20 bg-fuchsia-300 hover:bg-fuchsia-400 h-fit p-4 m-auto rounded-2xl"
            >
              Left
            </button>

            <div className="w-fit flex justify-center min-w-[50%] mx-2">
              {requestsArray &&
                requestsArray.length != 0 &&
                requestsArray[requestIndex].requestReferences?.length != 0
                ? srcFormat(requestsArray[requestIndex])
                : "No Provided References"}
            </div>

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
              className="w-20 bg-fuchsia-300 hover:bg-fuchsia-400 h-fit p-4 m-auto rounded-2xl"

            >
              Right
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-fuchsia-300 p-2 border border-black">
          <p>
            <span className="font-bold">Request: </span>{" "}
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestName
              : "N/A"}
          </p>
        </div>
        <div className="bg-fuchsia-200 p-2 border text-lg border-black border-t-0 text-md">
          <p>
            <span className="font-bold">Original Dialogue: </span>{" "}
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestDialogue
              : "null"}
          </p>
        </div>

        <div className="block bg-fuchsia-300 mt-4 h-12 border border-black">
          <Label className="p-2 text-xl font-semibold flex items-center" htmlFor="userTranslation" value="Your Interpretation" />
        </div>
        <Textarea
          id="userTranslation"
          required
          onChange={(e) => {
            setUserInterpretation(e.target.value);
          }}
          value={userInterpretation}
          className="rounded-t-none border border-black border-t-0"
        />
        <button
          onClick={() => { 
            addTranslation(translationObj);
            handlePageChange(
              `/OpenRequestsPage?id=${queryNum}&language=${langQuery}&index=${requestIndex}&requestId=${requestId}`
            );
          }}
          className="w-48 bg-fuchsia-300 hover:bg-fuchsia-400 h-fit p-4 rounded-2xl my-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TranslationUploadPage;
