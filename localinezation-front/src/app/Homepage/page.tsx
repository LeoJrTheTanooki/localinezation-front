"use client";

import MediaCard from "@/utils/MediaCard";
import PageData from "@/utils/PageData.json";
import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const sampleTitle = "Sample Title";
  const sampleLanguage = "Gibberish";
  const sampleImage =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fscott-the-woz%2Fimages%2F3%2F30%2FAbove70OnMetacritic.png%2Frevision%2Flatest%3Fcb%3D20190805093408&f=1&nofb=1&ipt=e6b2d9c7ec8fde28a87e20f05ea256c7e024fb05ab47058c7f8e36083bdbc10a&ipo=images";

  const getMedia = async () => {
    const promise = await fetch("../../utils/PageData.json");
    console.log(promise);
    const data = await promise.json();
    return data;
  };

  // Convert any to Array or to Custom Interface without error
  const [mediaList, setMediaList] = useState<any>(PageData);

  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    // setMediaList(getMedia)
    // console.log(mediaList)
  }, []);

  return (
    <>
      <h1 className=" text-center font-bold text-4xl py-7">Recently Added</h1>
      <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 pt-0">
        {mediaList?.map((media: any, mediaIndex: number) => (
          <MediaCard key={mediaIndex} mediaObject={media} index={mediaIndex} />
        ))}
      </div>
    </>
  );
};

export default Homepage;
