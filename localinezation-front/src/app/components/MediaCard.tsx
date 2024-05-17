import { IMedia } from "@/Interfaces/Interfaces";
import { useRouter } from "next/navigation";
import React from "react";

interface IProp {
  mediaObject: IMedia;
  index: number;
}

const MediaCard = (props: IProp) => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  const mediaObject = props.mediaObject;

  return (
    <div className="flex justify-center cursor-pointer">
      <div
        data-testid="flowbite-card"
        className="h-96 w-80 flex flex-col bg-purple-600 hover:bg-purple-900  text-center rounded-lg border border-gray-200 dark:border-gray-700"
        onClick={() =>
          handlePageChange(`/MediaPage?id=${props.mediaObject.id}`)
        }
      >
        <div className="flex h-fit min-w-80 flex-col justify-between gap-2 p-6">
          <img
            className="self-center max-h-96 bg-fuchsia-300 rounded-lg p-4"
            style={{ maxHeight: "250px" }}
            src={props.mediaObject.coverArt}
            alt={props.mediaObject.title + " cover"}
          />
          <div className="mb-4 bg-fuchsia-300 border border-black">
          <p className=" mt-3 mb-2 font-bold text-wrap">{props.mediaObject.title}</p>
          <p className="bg-fuchsia-200 py-2 border-t border-black">
            {props.mediaObject.originalLanguage +
              " | " +
              props.mediaObject.type}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
