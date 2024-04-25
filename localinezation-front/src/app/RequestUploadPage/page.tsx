'use client';

import { Label, FileInput, TextInput, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

const RequestUploadPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
    
  };
  return (
    <>
      <div>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="requestName" value="Request*" />
            </div>
            <TextInput
              // onChange={handleTitle}
              id="requestName"
              type="text"
              // placeholder="Enter Title"
              required
            />
            {/* 
Screenshots
Video Link
            */}
            <div className="mb-2 block">
              <Label
                htmlFor="languageSelect"
                value="Language to Translate Into*"
              />
            </div>
            <TextInput
              // onChange={handleDescription}
              id="languageSelect"
              type="text"
              // placeholder="Enter Title"
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="dialogueRequest" value="Original Dialogue" />
            </div>
            <TextInput
              // onChange={handleTags}
              id="dialogueRequest"
              type="text"
              // placeholder="Enter Tags"
            />
            <div className="mb-2 block">
              <Label htmlFor="screenshots" value="Screenshots" />
            </div>
            <FileInput
              id="screenshots"
              multiple
              accept="image/png, image/jpeg, image/webp"
              helperText="PNG, JPG or GIF (MAX. ???x???px)."
            />{" "}
            <div className="mb-2 block">
              <Label htmlFor="videoLink" value="Video Link" />
            </div>
            <TextInput
              // onChange={handleTags}
              id="videoLink"
              type="text"
              // placeholder="Enter Tags"
            />
            <Button onClick={() => handlePageChange('/OpenRequestsPage')}>Submit Translation</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RequestUploadPage;
