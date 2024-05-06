"use client";
import {
  Label,
  TextInput,
  FileInput,
  Button,
  Radio,
  Dropdown,
} from "flowbite-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { langFormat } from "../components/CustomFunctions";

const SubmitMediaPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  // Media Request Variables
  const [title, setTitle] = useState<string>("");
  const [coverArt, setCoverArt] = useState<string>("");
  const [originalLanguage, setOriginalLanguage] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [displayRequest, setDisplayRequest] = useState<boolean>(false);

  // Translation Request Variables
  const [requestName, setRequestName] = useState<string>("");
  const [languageSelect, setLanguageSelect] = useState<string>("");
  const [dialogueRequest, setDialogueRequest] = useState<string>("");
  const [screenshots, setScreenshots] = useState<Array<any>>([]);
  const [videoLink, setVideoLink] = useState<string>("");

  return (
    <div className="grid grid-flow-dense grid-cols-2 border border-red-600">
      <form className="max-w-md flex flex-col gap-4 border border-blue-600">
        <div>
          <div className="mb-2">
            <p>
              Title of Media <span className="text-red-600">*</span>
            </p>
            <TextInput
              id="title"
              type="text"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-2 block">
            <p>
              Media Type <span className="text-red-600">*</span>
            </p>
            <div className="border w-max rounded-md p-1 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 ">
              <Dropdown
                id="type"
                label={type ? type : "Select Media Type"}
                inline
              >
                <Dropdown.Item
                  onClick={() => {
                    setType("Video Game");
                  }}
                >
                  Video Game
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setType("TV Show/Movie");
                  }}
                >
                  TV Show/Movie
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setType("Comic/Magazine");
                  }}
                >
                  Comic/Magazine
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="mb-2 block">
            <p>
              Platforms Media Is On <span className="text-red-600">*</span>
            </p>
            <TextInput
              id="platform"
              type="text"
              required
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
            />
          </div>
          <div className="mb-2 block">
            <p>
              Original Language(s) of Media{" "}
              <span className="text-red-600">*</span>
            </p>
            <div className="border w-max rounded-md p-1 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 ">
              <Dropdown
                id="type"
                label={
                  originalLanguage
                    ? langFormat(originalLanguage)
                    : "Select Language"
                }
                inline
              >
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("englishUsa");
                  }}
                >
                  English (US)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("spanishLatAm");
                  }}
                >
                  Spanish (Latin American){" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("spanishEu");
                  }}
                >
                  Spanish (European){" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("englishUk");
                  }}
                >
                  English (UK){" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("french");
                  }}
                >
                  French{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("japanese");
                  }}
                >
                  Japanese{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("chineseTrad");
                  }}
                >
                  Traditional Chinese{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("chineseSimple");
                  }}
                >
                  Simplified Chinese{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("norwegian");
                  }}
                >
                  Norwegian{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("swedish");
                  }}
                >
                  Swedish{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setOriginalLanguage("irish");
                  }}
                >
                  Irish{" "}
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="mb-2 block">
            <p>
              Media Cover Art <span className="text-red-600">*</span>
            </p>

            <FileInput
              id="coverArt"
              accept="image/png, image/jpeg, image/webp"
              helperText="PNG or JPG (MAX. ???x???px)."
              onChange={(e) => {
                if (e.target.files) {
                  setCoverArt(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>
          <div className="mb-2">
            <legend className="mb-2">Would you like to request a line?</legend>
            <div className="flex items-center gap-2">
              <Radio
                id="requestYes"
                name="requestRadio"
                value={1}
                onChange={() => {
                  setDisplayRequest(true);
                }}
              />
              <Label htmlFor="requestYes">Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="requestNo"
                name="requestRadio"
                value={0}
                defaultChecked
                onChange={() => {
                  setDisplayRequest(false);
                }}
              />
              <Label htmlFor="requestNo">No</Label>
            </div>
          </div>
          <Button onClick={() => handlePageChange("/")}>Submit Media</Button>
        </div>
      </form>

      {displayRequest ? (
        <form className="max-w-md flex flex-col gap-4 border border-pink-500">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="requestName" value="Request*" />
            </div>
            <TextInput
              id="requestName"
              type="text"
              required
              onChange={(e) => {
                setRequestName(e.target.value);
              }}
              value={requestName}
            />
            <div className="mb-2 block">
              <Label
                htmlFor="languageSelect"
                value="Language to Translate Into*"
              />
            </div>
            <TextInput
              id="languageSelect"
              type="text"
              required
              onChange={(e) => {
                setLanguageSelect(e.target.value);
              }}
              value={languageSelect}
            />
            <div className="mb-2 block">
              <Label htmlFor="dialogueRequest" value="Original Dialogue" />
            </div>
            <TextInput
              id="dialogueRequest"
              type="text"
              onChange={(e) => {
                setDialogueRequest(e.target.value);
              }}
              value={dialogueRequest}
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
              id="videoLink"
              type="text"
              onChange={(e) => {
                setVideoLink(e.target.value);
              }}
              value={videoLink}
            />
            <Button onClick={() => handlePageChange("/OpenRequestsPage")}>
              Submit Request
            </Button>
          </div>
        </form>
      ) : (
        ""
      )}

      <div
        className={`grid ${
          displayRequest ? "md:col-span-2" : "col-span-1"
        } justify-center border border-green-600`}
      >
        <div className="grid grid-cols-2 gap-5 py-7 w-max mx-auto">
          <div className="justify-self-end">
            <img className="h-80" src={coverArt} alt="" />
          </div>
          <div className="font-bold">
            <p>Name: {title}</p>
            <p>Type: {type}</p>
            <p>Platform: {platform}</p>
            <p>Original Language: {originalLanguage}</p>
            <p>Current Translations</p>
            <ul>
              <li>English (US)</li>
              <li>Spanish (Latin American)</li>
              <li>French</li>
            </ul>
          </div>
          <div className="justify-self-center">
            <Button
              className="bg-indigo-900 enabled:hover:bg-indigo-950 justify-self-end"
              onClick={() => handlePageChange("/RequestUploadPage")}
            >
              Request a Line to Translate
            </Button>
          </div>
          <div className="justify-self-center">
            <Button
              className="bg-indigo-900 enabled:hover:bg-indigo-950"
              onClick={() => handlePageChange("/TranslationUploadPage")}
            >
              Submit a Translation
            </Button>
          </div>
        </div>
        <div className="">
          <div className="bg-purple-600 text-center text-white py-3 font-bold border-black border-b-2">
            Current Translators
          </div>
          <div className="border-2 border-t-0 border-black grid grid-cols-2">
            <div className="col-span-2">
              <span className="font-bold italic mr-1">Mango:</span>
              <button className="text-blue-600">Opening</button>
              {" | "}
              <button className="text-blue-600 disabled:text-blue-400">
                Credits
              </button>
            </div>
            <div>User Score:</div>
            <div className="justify-self-end">Report User</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitMediaPage;
