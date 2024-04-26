"use client";

import { ILanguageData, IMediaData } from "@/Interfaces/Interfaces";
import PageData from "@/utils/PageData.json";
import { Button, Dropdown, Rating } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { langFormat } from "../components/CustomFunctions";

const OpenRequestsPage = () => {
  const requestsDefault = Array<{
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

  // <Array<ILanguageData["openRequests"]>
  const [requestsArray, setRequestsArray] =
    useState<ILanguageData["openRequests"]>(requestsDefault);
  const [mediaRequests, setMediaRequests] = useState<any>(PageData);
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

  useEffect(() => {
    const idQueryEffect = new URLSearchParams(window.location.search).get("id");
    const langQueryEffect = new URLSearchParams(window.location.search).get(
      "language"
    );
    if (idQueryEffect) setQueryNum(parseInt(idQueryEffect));
    if (langQueryEffect) setLangQuery(langQueryEffect);
  }, []);

  // Setting data to variables based on set query variables
  useEffect(() => {
    function findLanguage(obj: object) {
      return Object.keys(obj)[0] == langQuery;
    }

    try {
      setCoverArt(mediaRequests[queryNum].coverArt);
      const requestData =
        mediaRequests[queryNum].requestLanguage.find(findLanguage)[
          `${langQuery}`
        ][0];
      setRequestsArray(requestData.openRequests);
      const dropdownJsx = mediaRequests[queryNum].requestLanguage.map(
        (language: object, index: number) => {
          let currentLanguage = Object.keys(language)[0];
          let formattedLang: string = "";
          switch (currentLanguage) {
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

          if (currentLanguage) {
            return (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setLangQuery(currentLanguage);
                  window.history.pushState(
                    null,
                    `Change to ${formattedLang}`,
                    `OpenRequestsPage?id=${queryNum}&language=${currentLanguage}`
                  );
                }}
              >
                {formattedLang}
              </Dropdown.Item>
            );
          }
        }
      );
      setDropdownItems(dropdownJsx);
    } catch (error) {
      console.log(`error caught: ${error}`);
    }
    if (requestsArray && requestsArray.length != 0) {
      const requestListJsx = requestsArray.map(
        (request: any, index: number) => {
          return (
            <li key={index}>
              <button
                className="text-blue-600 italic underline"
                onClick={() => {
                  setReferenceIndex(0);
                  setRequestIndex(index);
                }}
              >
                {request.requestName}
              </button>
            </li>
          );
        }
      );
      setRequestList(requestListJsx);
    }
  }, [queryNum, langQuery, mediaRequests, requestsArray]);

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
            className=" bg-slate-600"
          />
        );
      } else {
        return <img src={currentReference.src} className=" h-[315px]" alt="" />;
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
    <div className=" grid grid-cols-2 2 m-5 gap-5">
      <div className="mb-2 block col-span-2">
        <p>
          Media Type <span className=" text-red-600">*</span>
        </p>
        <div className="border-2 border-black w-max rounded-md p-1 justify-between">
          <Dropdown
            id="type"
            label={langQuery ? langFormat(langQuery) : "null"}
            inline
          >
            {/* <Dropdown.Item
                onClick={() => {
                  setLangQuery("englishUsa");
                  window.history.pushState(null, 'Change to English', `OpenRequestsPage?id=${queryNum}&language=englishUsa`)
                  // OpenRequestsPage?id=0&language=spanishLatAm
                }}
              >
                English (US)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setLangQuery("spanishLatAm");
                  window.history.pushState(null, 'Change to Spanish', `OpenRequestsPage?id=${queryNum}&language=spanishLatAm`)
                }}
              >
                Spanish (Latin American)
              </Dropdown.Item> */}
            {dropdownItems}
          </Dropdown>
        </div>
      </div>
      <div className=" grid grid-cols-2">
        <img src={coverArt} alt="" />
        <div>
          <h2 className=" text-3xl">Open Requests For Title</h2>
          <ul>
            {requestsArray && requestsArray.length != 0 ? (
              <>{requestList}</>
            ) : (
              <li>No Requests</li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <h2 className=" text-3xl">
          {requestsArray && requestsArray.length != 0
            ? requestsArray[requestIndex]?.requestName
            : "null"}
        </h2>

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
      <div className=" grid grid-cols-2">
        <div className="grid border-b-2 border-black col-span-2">
          <div className="bg-purple-600 text-center text-white">
            Current Translators
          </div>
          <div className=" border-2 border-b-0 border-black">
            {requestsArray && requestsArray.length > 0
              ? requestsArray[requestIndex]?.submittedTranslations[
                  translationIndex
                ]?.translatorUserName +
                ": " +
                requestsArray[requestIndex]?.submittedTranslations[
                  translationIndex
                ]?.translatedDialogue
              : ""}

            <div className=" flex">
              <div className=" mr-3 flex">
                User Score:
                <Rating>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                </Rating>
              </div>
              <div className=" flex">
                Your Score:
                <Rating>
                  <Rating.Star
                    filled={
                      yourScoreHover >= 1 ||
                      (yourScore >= 1 && yourScoreHover == 0)
                        ? true
                        : false
                    }
                    onMouseEnter={() => {
                      setYourScoreHover(1);
                    }}
                    onMouseLeave={() => {
                      setYourScoreHover(0);
                    }}
                    onClick={() => {
                      setYourScore(1);
                    }}
                  />
                  <Rating.Star
                    filled={
                      yourScoreHover >= 2 ||
                      (yourScore >= 2 && yourScoreHover == 0)
                        ? true
                        : false
                    }
                    onMouseEnter={() => {
                      setYourScoreHover(2);
                    }}
                    onMouseLeave={() => {
                      setYourScoreHover(0);
                    }}
                    onClick={() => {
                      setYourScore(2);
                    }}
                  />
                  <Rating.Star
                    filled={
                      yourScoreHover >= 3 ||
                      (yourScore >= 3 && yourScoreHover == 0)
                        ? true
                        : false
                    }
                    onMouseEnter={() => {
                      setYourScoreHover(3);
                    }}
                    onMouseLeave={() => {
                      setYourScoreHover(0);
                    }}
                    onClick={() => {
                      setYourScore(3);
                    }}
                  />
                  <Rating.Star
                    filled={
                      yourScoreHover >= 4 ||
                      (yourScore >= 4 && yourScoreHover == 0)
                        ? true
                        : false
                    }
                    onMouseEnter={() => {
                      setYourScoreHover(4);
                    }}
                    onMouseLeave={() => {
                      setYourScoreHover(0);
                    }}
                    onClick={() => {
                      setYourScore(4);
                    }}
                  />
                  <Rating.Star
                    filled={
                      yourScoreHover >= 5 ||
                      (yourScore >= 5 && yourScoreHover == 0)
                        ? true
                        : false
                    }
                    onMouseEnter={() => {
                      setYourScoreHover(5);
                    }}
                    onMouseLeave={() => {
                      setYourScoreHover(0);
                    }}
                    onClick={() => {
                      setYourScore(5);
                    }}
                  />
                </Rating>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button disabled>Report</Button>
        </div>
        <div>
          <Button
            onClick={() => {
              if (requestsArray)
                indexLoop(
                  requestsArray[requestIndex]?.submittedTranslations,
                  translationIndex,
                  setTranslationIndex,
                  true
                );
            }}
          >
            Next User
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              if (requestsArray)
                indexLoop(
                  requestsArray[requestIndex]?.submittedTranslations,
                  translationIndex,
                  setTranslationIndex,
                  true
                );
            }}
          >
            See All Translations{" "}
          </Button>
        </div>
      </div>
      <div>
        <div className="grid border-b-2 border-black">
          <div className="bg-purple-600 text-center text-white">
            Your Translation for “{" "}
            {requestsArray && requestsArray.length != 0
              ? requestsArray[requestIndex]?.requestName
              : "null"}
            ”
          </div>
          <div className=" border-2 border-b-0 border-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            sollicitudin massa non imperdiet suscipit. Vivamus ex urna, egestas
            sit amet mattis et, vestibulum eget metus. Quisque finibus rutrum
            venenatis. Cras et tempus lacus. Nulla quis enim at est cursus
            tempor ac non sapien. Phasellus elit lectus, vehicula eget arcu sed,
            consectetur vulputate metus. Aliquam erat volutpat. Proin molestie
            dui at dolor pulvinar pellentesque. Cras aliquam justo nec dui
            tristique egestas.
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <Button
              className=" bg-indigo-900 enabled:hover:bg-indigo-950"
              onClick={() =>
                handlePageChange(
                  `/TranslationUploadPage?id=${queryNum}&language=${langQuery}&request=${requestIndex}`
                )
              }
            >
              Submit a Translation
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenRequestsPage;
