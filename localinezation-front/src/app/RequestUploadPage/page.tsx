"use client";

import { Label, FileInput, TextInput, Button, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { langFormat } from "../components/CustomFunctions";

const RequestUploadPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  const [requestName, setRequestName] = useState<string>("");
  const [languageSelect, setLanguageSelect] = useState<string>("");
  const [dialogueRequest, setDialogueRequest] = useState<string>("");
  const [screenshots, setScreenshots] = useState<Array<any>>([]);
  const [videoLink, setVideoLink] = useState<string>("");

  return (
    <>
      <div>
        <form className="max-w-md flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <p className="text-gray-900">
                Request <span className="text-red-600">*</span>
              </p>
              <TextInput
                id="requestName"
                type="text"
                required
                onChange={(e) => {
                  setRequestName(e.target.value);
                }}
                value={requestName}
              />
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">
                Language <span className="text-red-600">*</span>
              </p>
              <div className="border w-max rounded-md p-1 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 ">
                <Dropdown
                  id="type"
                  label={
                    languageSelect
                      ? langFormat(languageSelect)
                      : "Select a Language"
                  }
                  inline
                >
                  <Dropdown.Item
                    onClick={() => {
                      setLanguageSelect("englishUsa");
                    }}
                  >
                    English (US)
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setLanguageSelect("spanishLatAm");
                    }}
                  >
                    Spanish (Latin American)
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">Original Dialogue</p>
              <TextInput
                id="dialogueRequest"
                type="text"
                onChange={(e) => {
                  setDialogueRequest(e.target.value);
                }}
                value={dialogueRequest}
              />
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">Screenshots</p>
              <FileInput
                id="screenshots"
                multiple
                accept="image/png, image/jpeg, image/webp"
                helperText="PNG, JPG or GIF (MAX. ???x???px)."
              />{" "}
            </div>
            <div className="mb-2 block">
              <p className="text-gray-900">Video Link</p>
              <TextInput
                id="videoLink"
                type="text"
                onChange={(e) => {
                  setVideoLink(e.target.value);
                }}
                value={videoLink}
              />
            </div>
            <Button onClick={() => handlePageChange("/OpenRequestsPage")}>
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RequestUploadPage;
