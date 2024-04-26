import { useRouter } from "next/navigation";
import React from "react";

const MediaCard = (props: any) => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <div>
      <div
        data-testid="flowbite-card"
        className="h-96 w-80 flex flex-col bg-purple-600 hover:bg-purple-900 text-white text-center rounded-lg border border-gray-200 dark:border-gray-700"
        onClick={() => handlePageChange(`/MediaPage?id=${props.index}`)}
      >
        <div className="flex h-fit min-w-80 flex-col justify-center gap-2 p-6">
          <img
            className="self-center max-h-96"
            style={{maxHeight:"250px"}}
            src={props.mediaObject.coverArt}
            alt={props.mediaObject.title + ' cover'}
          />
        <p className=" mt-3 font-bold">{props.mediaObject.title}</p>
        <p>{props.mediaObject.originalLanguage + " | " + props.mediaObject.type}</p>
        </div>
      </div>
      </div>
  );
};

export default MediaCard;
