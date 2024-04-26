import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

// Task: Figure out how to populate MediaPage with data based on passed array

// Change 'any' to '[InsertNameHere]Interface' when done
const MediaCard = (props: any) => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <div className=" flex justify-center">
      <div
        data-testid="flowbite-card"
        className="flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col bg-purple-600 text-white text-center h-96 hover:bg-purple-900 w-80"
        onClick={() => handlePageChange(`/MediaPage?id=${props.index}`)}
      >
        <div className="flex h-fit min-w-80 flex-col justify-center gap-2 p-6">
          <img
            className="self-center max-h-96"
            style={{maxHeight:"250px"}}
            src={props.mediaObject.coverArt}
            alt={props.mediaObject.title + ' cover'}
          />
        <p className=" font-bold">{props.mediaObject.title}</p>
        <p>{props.mediaObject.originalLanguage + " | " + props.mediaObject.type}</p>
        <p>{}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
