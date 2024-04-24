"use client";
import { Label, TextInput, FileInput, Button, Radio } from "flowbite-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const SubmitMediaPage = () => {
  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };
  const [title, setTitle] = useState<string>("");
  const [coverArt, setCoverArt] = useState<any>("");
  const [originalLanguage, setOriginalLanguage] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [displayRequest, setDisplayRequest] = useState<boolean>(false);

  return (
    <div className="grid grid-flow-dense grid-cols-2 border border-red-600">
      <form className="max-w-md flex flex-col gap-4 border border-blue-600">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title of Media*" />
          </div>
          <TextInput
            id="title"
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="mb-2 block">
            <Label htmlFor="type" value="Media Type*" />
          </div>
          <TextInput
            id="type"
            type="text"
            required
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <div className="mb-2 block">
            <Label htmlFor="platform" value="Platforms Media Is On*" />
          </div>
          <TextInput
            id="platform"
            type="text"
            required
            onChange={(e) => {
              setPlatform(e.target.value);
            }}
          />
          <div className="mb-2 block">
            <Label
              htmlFor="originalLanguage"
              value="Original Language(s) of Media*"
            />
          </div>
          <TextInput
            id="originalLanguage"
            type="text"
            required
            onChange={(e) => {
              setOriginalLanguage(e.target.value);
            }}
          />
          <div className="mb-2 block">
            <Label htmlFor="coverArt" value="Media Cover Art*" />
          </div>
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
          {/* <input type="file" name="" id="" onChange={(e) => {
            console.log(e.target.files)
          }} /> */}
          <Button onClick={() => handlePageChange("/")}>Submit Media</Button>
          <legend className="mb-4">Would you like to request a line?</legend>
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
          {/* Make a radio that asks if the user wants to request a specific line, and if it's checked the request form appears on the botton */}
        </div>
      </form>

      {displayRequest ? (
        <form className="max-w-md flex flex-col gap-4 border border-pink-500">
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
              <Label htmlFor="dialogueRequest" value="Video Link" />
            </div>
            <TextInput
              // onChange={handleTags}
              id="dialogueRequest"
              type="text"
              // placeholder="Enter Tags"
            />
            <Button onClick={() => handlePageChange("/OpenRequestsPage")}>
              Submit Request
            </Button>
          </div>
        </form>
      ) : (
        ""
      )}

      <div className=" grid col-span-2 justify-center border border-green-600">
        <div className=" grid grid-cols-2 gap-5 py-7 w-max mx-auto">
          <div className="justify-self-end">
            <img className=" h-80" src={coverArt} alt="" />
          </div>
          <div className=" font-bold">
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
          <div className=" justify-self-center">
            <Button
              className=" bg-indigo-900 enabled:hover:bg-indigo-950 justify-self-end"
              onClick={() => handlePageChange("/RequestUploadPage")}
            >
              Request a Line to Translate
            </Button>
          </div>
          <div className=" justify-self-center">
            <Button
              className=" bg-indigo-900 enabled:hover:bg-indigo-950"
              onClick={() => handlePageChange("/TranslationUploadPage")}
            >
              Submit a Translation
            </Button>
          </div>
        </div>
        <div className="w-[1000px]">
          <div className="bg-purple-600 text-center text-white py-3 font-bold border-black border-b-2">
            Current Translators
          </div>
          <div className=" border-2 border-t-0 border-black grid grid-cols-2">
            <div className=" col-span-2">
              <span className=" font-bold italic mr-1">Mango:</span>
              <button className=" text-blue-600">Opening</button>
              {" | "}
              <button className=" text-blue-600 disabled:text-blue-400">
                Credits
              </button>
            </div>
            <div>User Score:</div>
            <div className=" justify-self-end">Report User</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Make a preview of the Media Page on the side of the forms

export default SubmitMediaPage;
