"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const MediaPage = (props: any) => {
  console.log(props);
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <div className=" grid grid-cols-2">
        <div>
          <img src="/assets/BoxArts/onePieceGrandBattle2.png" alt="" />
        </div>
        <div>
          <p>Name: One Piece: Grand Battle 2</p>
          <p>Type: Video Game</p>
          <p>Platform: PSX</p>
          <p>Original Language: Japanese</p>
          <p>Current Translations</p>
          <ul>
            <li>
              <button className=" text-blue-600">English</button>
            </li>
            <li>
              <button className=" text-blue-600">
                Spanish (Latin American)
              </button>
            </li>
            <li>
              <button className=" text-blue-600">French</button>
            </li>
          </ul>
        </div>
        <div>
          <Button onClick={() => handlePageChange("/RequestUploadPage")}>
            Request a Line to Translate
          </Button>
        </div>
        <div>
          <Button onClick={() => handlePageChange("/TranslationUploadPage")}>
            Submit a Translation
          </Button>
        </div>
      </div>
      <div className="grid border-b-2 border-black">
        <div className="bg-purple-600 text-center text-white">
          Current Translators
        </div>
        <div className=" border-2 border-b-0 border-black grid grid-cols-2">
          <div className=" col-span-2">
            G0dU50pp_800:{" "}
            <button
              className=" text-blue-600"
              onClick={() => handlePageChange("/OpenRequestsPage")}
            >
              Main Menu Options
            </button>{" "}
            | <button className=" text-blue-600">Battle Settings</button> |{" "}
            <button className=" text-blue-600">Treasure</button> |{" "}
            <button className=" text-blue-600">Options</button> |{" "}
            <button className=" text-blue-600">Move Names</button>
          </div>
          <div>User Score:</div>
          <div className=" justify-self-end">Report User</div>
        </div>
        <div className=" border-2 border-b-0 border-black">
          <div>
            G0dU50pp_800:{" "}
            <button className=" text-blue-600">Main Menu Options</button> |{" "}
            <button className=" text-blue-600">Battle Settings</button> |{" "}
            <button className=" text-blue-600">Treasure</button> |{" "}
            <button className=" text-blue-600">Options</button> |{" "}
            <button className=" text-blue-600">Move Names</button>
          </div>
        </div>
        <div className=" border-2 border-b-0 border-black">
          <div>
            G0dU50pp_800:{" "}
            <button className=" text-blue-600">Main Menu Options</button> |{" "}
            <button className=" text-blue-600">Battle Settings</button> |{" "}
            <button className=" text-blue-600">Treasure</button> |{" "}
            <button className=" text-blue-600">Options</button> |{" "}
            <button className=" text-blue-600">Move Names</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaPage;
