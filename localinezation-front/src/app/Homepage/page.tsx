"use client";

import { IMedia } from "@/Interfaces/Interfaces";
import { fetchMedia } from "@/utils/Dataservices";
import MediaCard from "@/app/components/MediaCard";
import PageData from "@/utils/PageData.json";
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
  // const [mediaList, setMediaList] = useState<any>(PageData);
  const [mediaList, setMediaList] = useState<IMedia[]>([]);

  const [error, setError] = useState<string | null>(null);

  // This effect runs when the component mounts to the DOM
  useEffect(() => {
      // Define an asynchronous function to fetch media from the backend
      const loadMedia = async () => {
          try {
              const media = await fetchMedia();  // Attempt to fetch media
              console.log(media)
              setMediaList(media);               // If successful, update the state with the fetched media
          } catch (error) {
              setError('Failed to fetch media. Please try again later.');  // If an error occurs, set an error message
              console.error(error);  // Also log the error to the console for debugging
          }
      };

      loadMedia();  // Call the function to load media
  }, []);  // The empty dependency array means this effect runs only once after the initial render
  
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    // setMediaList(getMedia)
    // console.log(mediaList)
  }, []);



  return (
    <div>
      <div className="headerBG flex items-center w-fit h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg my-8">
        <h1 className="text-center font-bold text-gray-700 text-4xl py-7">Translation Requests</h1>
      </div>
      <div className="flex flex-wrap gap-10 pt-0 mb-10 max-w-[1440px] justify-center mx-auto">
        {mediaList?.map((media: IMedia, mediaIndex: number) => (
          <MediaCard key={mediaIndex} mediaObject={media} index={mediaIndex} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
