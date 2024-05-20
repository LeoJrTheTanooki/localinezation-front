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
  getTranslationsByRequestId,
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
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${videoSrc}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="bg-slate-600"
          />
        );
      } else {
        return <img src={currentReference.src} className="h-[315px]" alt="" />;
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
    <div className="grid grid-cols-2 m-5 gap-5">
      <div>
        <div className="mb-2 block">
          <p>Submitting as...</p>
          {/* <TextInput
          // onChange={handleTitle}
          id="requestName"
          type="text"
          // placeholder="Enter Title"
          required
        /> */}
          <p className=" font-bold">{currentUsername}</p>
        </div>
        <p>Translating Into...</p>
        <p className="font-bold">{formattedLang}</p>

        <p>References</p>
        <div className="flex justify-between">
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
          >
            Left
          </button>
          {requestsArray && requestsArray.length != 0
            ? srcFormat(requestsArray[requestIndex])
            : "null"}
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
          >
            Right
          </button>
        </div>
      </div>

      <div>
        <div className="bg-purple-600 text-white p-2">
          <p>
            <span className="font-bold">Request: </span>{" "}
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestName
              : "N/A"}
          </p>
          <p>
            <span className="font-bold">Original Dialogue: </span>{" "}
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestDialogue
              : "null"}
          </p>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="userTranslation" value="Your Interpretation" />
        </div>
        <Textarea
          id="userTranslation"
          onChange={(e) => {
            setUserInterpretation(e.target.value);
          }}
          value={userInterpretation}
        />
        <Button
          onClick={() => {
            addTranslation(translationObj);
            handlePageChange(
              `/OpenRequestsPage?id=${queryNum}&language=${langQuery}&index=${requestIndex}&requestId=${requestId}`
            );
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TranslationUploadPage;
