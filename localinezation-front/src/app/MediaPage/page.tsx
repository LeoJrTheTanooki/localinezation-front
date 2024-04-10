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
    <div className=" grid justify-center">
      <div className=" grid grid-cols-2 gap-5 py-7 w-max">
        <div className="justify-self-end">
          <img src="/assets/BoxArts/onePieceGrandBattle2.png" alt="" />
        </div>
        <div className=" font-bold">
          <p>Name: One Piece: Grand Battle 2</p>
          <p>Type: Video Game</p>
          <p>Platform: PSX</p>
          <p>Original Language: Japanese</p>
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
      <div className="grid justify-center">
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
        <div className=" border-2 border-t-0 border-black grid grid-cols-2">
          <div className=" col-span-2">
            <span className=" font-bold italic mr-1">G0dU50pp_800:</span>
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
        <div className=" border-2 border-t-0 border-black grid grid-cols-2">
          <div className=" col-span-2">
            <span className=" font-bold italic mr-1">G0dU50pp_800:</span>
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
      </div>
    </div>
  );
};

export default MediaPage;
