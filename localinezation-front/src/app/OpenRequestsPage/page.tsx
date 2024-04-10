"use client";

import { Button } from "flowbite-react";
import React from "react";

const OpenRequestsPage = () => {
  return (
    <div className=" grid grid-cols-2 gap-5">
      <div className=" grid grid-cols-2">
        <img src="/assets/BoxArts/onePieceGrandBattle2.png" alt="" />
        <div>
          <h2 className=" text-3xl">Open Requests For Title</h2>
          <ul>
            <li>
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
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className=" text-3xl">Opening Movie</h2>
        <iframe
          width="560"
          height="315"
          //   src="https://www.youtube-nocookie.com/embed/Xy0qeXbrDsE?si=qq1qwPb-TjU8ABFb"
          src="https://invidious.privacydev.net/embed/Xy0qeXbrDsE"
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
            G0dU50pp_800: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Cras sollicitudin massa non imperdiet suscipit. Vivamus ex
            urna, egestas sit amet mattis et, vestibulum eget metus. Quisque
            finibus rutrum venenatis. Cras et tempus lacus. Nulla quis enim at
            est cursus tempor ac non sapien. Phasellus elit lectus, vehicula
            eget arcu sed, consectetur vulputate metus. Aliquam erat volutpat.
            Proin molestie dui at dolor pulvinar pellentesque. Cras aliquam
            justo nec dui tristique egestas.
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
