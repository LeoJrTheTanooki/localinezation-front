"use client";

import { IMedia } from "@/Interfaces/Interfaces";
import { fetchMedia } from "@/utils/Dataservices";
import MediaCard from "@/app/components/MediaCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  
  // Convert any to Array or to Custom Interface without error
  const [mediaList, setMediaList] = useState<IMedia[]>([]);

  const [error, setError] = useState<string | null>(null);

  // This effect runs when the component mounts to the DOM
  useEffect(() => {
    // Define an asynchronous function to fetch media from the backend
    const loadMedia = async () => {
      try {
        const media = await fetchMedia(); // Attempt to fetch media
        setMediaList(media); // If successful, update the state with the fetched media
      } catch (error) {
        setError("Failed to fetch media. Please try again later."); // If an error occurs, set an error message
        console.error(error); // Also log the error to the console for debugging
      }
    };

    loadMedia(); // Call the function to load media
  }, []); // The empty dependency array means this effect runs only once after the initial render

  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <div>
      <div className="headerBG flex items-center w-fit h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg my-8">
        <h1 className="text-center font-bold text-gray-700 text-4xl py-7">
          Translation Requests
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 pt-0 mb-10 max-w-8xl">
        {mediaList?.map((media: IMedia, mediaIndex: number) => (
          <MediaCard key={mediaIndex} mediaObject={media} index={mediaIndex} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
