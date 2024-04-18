"use client";

import { ILanguageData, IMediaData } from "@/Interfaces/Interfaces";
import PageData from "@/utils/PageData.json";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

const OpenRequestsPage = () => {
  const requestsDefault = Array<
    [
      {
        requestName: "string";
        requestDialogue: "string";
        requestReferences: [""];
        submittedTranslations: [
          {
            translatorUserName: "string";
            isGuest: true;
            translatedDialogue: "string";
          }
        ];
      }
    ]
  >;

  const [requestsArray, setRequestsArray] =
    useState<Array<ILanguageData["openRequests"]>>(requestsDefault);
  const [currentRequest, setCurrentRequest] =
    useState<ILanguageData["openRequests"]>();
  const [requestIndex, setRequestIndex] = useState<number>(0);
  const [mediaRequests, setMediaRequests] = useState<any>(PageData);
  const [queryNum, setQueryNum] = useState<number>(-1);
  const [langQuery, setLangQuery] = useState<string>("");
  const [requestList, setRequestList] = useState<any>();

  useEffect(() => {
    if (requestsArray.length != 0) {
      const requestListJsx = requestsArray.map((request: any, index: any) => {
        console.log(request.requestName);
        return (
          <li
            key={index}
            onClick={() => {
              console.log(requestsArray[index]);
              setRequestIndex(index);
            }}
          >
            {request.requestName}
          </li>
        );
      });
      setRequestList(requestListJsx);
    }
  }, [requestsArray]);

  // Getting queries and setting to respective variables on init
  useEffect(() => {
    const idQuery = new URLSearchParams(window.location.search).get("id");
    const langQuery = new URLSearchParams(window.location.search).get(
      "language"
    );
    if (idQuery) setQueryNum(parseInt(idQuery));
    if (langQuery) setLangQuery(langQuery);
  }, []);

  // Setting data to variables based on set query variables
  useEffect(() => {
    function findLanguage(obj: any) {
      return Object.keys(obj)[0] == langQuery;
    }

    if (queryNum >= 0) {
      const requestData =
        mediaRequests[queryNum].requestLanguage.find(findLanguage)[
          `${langQuery}`
        ][0];
      console.log(requestData.openRequests);
      setRequestsArray(requestData.openRequests);
      // if (requestData.length != 0) {
      //   setCurrentRequest(requestData);
      // }
    }
  }, [queryNum, langQuery]);

  // Changing data based on current index
  // useEffect(() => {
  //   console.log(requestsArray)
  //   setCurrentRequest()
  // }, [requestIndex]);

  // useEffect(() => {
  //   if (requestsArray.openRequests)
  //     setRequestName(requestsArray.openRequests[0].requestName);
  // }, [requestsArray]);

  return (
    <div className=" grid grid-cols-2 gap-5">
      <div className=" grid grid-cols-2">
        <img src="/assets/BoxArts/onePieceGrandBattle2.png" alt="" />
        <div>
          <h2 className=" text-3xl">Open Requests For Title</h2>
          <ul>
            {/* <li>
              <button className=" text-blue-600">Main Menu Options</button>
            </li>
            <li>
              <button className=" text-blue-600">Battle Settings</button>
            </li>
            <li>
              <button className=" text-blue-600">Treasure</button>
            </li>
            <li>
              <button className=" text-blue-600">Options</button>
            </li>
            <li>
              <button className=" text-blue-600">Opening Movie</button>
            </li> */}

            {requestsArray.length != 0 ? (
              <>
                {/* <li>Pass</li> */}
                {requestList}
              </>
            ) : (
              <li>Fail</li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <h2 className=" text-3xl">
          {requestsArray.length != 0
            ? // Unsure of how to resolve errors on page, page itself loads fine on local, unsure of Vercel
              requestsArray[requestIndex]?.requestName
            : "null"}
        </h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/Xy0qeXbrDsE?si=qq1qwPb-TjU8ABFb"
          // src="https://invidious.privacydev.net/embed/Xy0qeXbrDsE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className=" bg-slate-600"
        ></iframe>
      </div>
      <div className=" grid grid-cols-2">
        <div className="grid border-b-2 border-black col-span-2">
          <div className="bg-purple-600 text-center text-white">
            Current Translators
          </div>
          <div className=" border-2 border-b-0 border-black">
            {requestsArray.length != 0
              ? // Unsure of how to resolve errors on page, page itself loads fine on local, unsure of Vercel
                requestsArray[requestIndex]?.submittedTranslations[0]
                  ?.translatorUserName +
                ": " +
                requestsArray[requestIndex]?.submittedTranslations[0]
                  ?.translatedDialogue
              : ""}
            <div className=" flex">
              <div className=" mr-3">User Score: </div>
              <div>Your Score: </div>
            </div>
          </div>
        </div>
        <div>
          <Button disabled>Report</Button>
        </div>
        <div>
          <Button disabled>Next User</Button>
        </div>
      </div>
      <div>
        <div className="grid border-b-2 border-black">
          <div className="bg-purple-600 text-center text-white">
            Your Translation for “Opening Movie”
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
            <Button disabled>Next User</Button>
          </div>
        </div>
      </div>
    </div>

    // invidious.privacydev.net
  );
};

export default OpenRequestsPage;
