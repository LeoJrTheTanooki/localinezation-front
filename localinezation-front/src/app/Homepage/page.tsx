"use client";

import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const Homepage = () => {
  const sampleTitle = "Sample Title";
  const sampleLanguage = "Gibberish";
  const sampleImage =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fscott-the-woz%2Fimages%2F3%2F30%2FAbove70OnMetacritic.png%2Frevision%2Flatest%3Fcb%3D20190805093408&f=1&nofb=1&ipt=e6b2d9c7ec8fde28a87e20f05ea256c7e024fb05ab47058c7f8e36083bdbc10a&ipo=images";

  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <h1 className=" text-center font-bold text-4xl py-7">Recently Added</h1>
      <div className=" grid grid-cols-3 gap-14 p-14 pt-0">
        {/* <div className=" flex flex-col"> */}
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            onClick={() => handlePageChange("/MediaPage")}
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/onePieceGrandBattle2.png"
              alt=""
            />
            <p className=" font-bold">One Piece: Grand Battle 2</p>
            <p>Japanese</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/visAVis.png"
              alt=""
            />
            <p className=" font-bold">Vis a Vis</p>
            <p>Spanish (Latin American)</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/motuPatlu.png"
              alt=""
            />
            <p className=" font-bold">Motu Patlu</p>
            <p>Indian</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/pollyanna.png"
              alt=""
            />
            <p className=" font-bold">Pollyanna</p>
            <p>Japanese</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/osuTatakaeOuendan.png"
              alt=""
            />
            <p className=" font-bold">Osu! Tatakae! Ouendan</p>
            <p>Japanese</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/skam.png"
              alt=""
            />
            <p className=" font-bold">Skam</p>
            <p>Norwegian</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/bronBroen.png"
              alt=""
            />
            <p className=" font-bold">Bron/Broen</p>
            <p>Swedish/Danish</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/onePieceGrandAdventure.png"
              alt=""
            />
            <p className=" font-bold">One Piece: Grand Adventure</p>
            <p>English</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src="/assets/BoxArts/magiciansQuest3ds.png"
              alt=""
            />
            <p className=" font-bold">Tongari Boushi to Mahou no Machi</p>
            <p>Japanese</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src={sampleImage}
              alt=""
            />
            <p className=" font-bold">{sampleTitle}</p>
            <p>{sampleLanguage}</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src={sampleImage}
              alt=""
            />
            <p className=" font-bold">{sampleTitle}</p>
            <p>{sampleLanguage}</p>
          </Card>
        </div>
        <div className=" flex justify-center">
          <Card
            className=" bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
            href="#"
          >
            <img
              className=" h-[270px] w-max self-center"
              src={sampleImage}
              alt=""
            />
            <p className=" font-bold">{sampleTitle}</p>
            <p>{sampleLanguage}</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Homepage;
