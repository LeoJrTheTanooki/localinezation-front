"use client";
import { TextInput, FileInput, Button, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import { langFormat } from "../components/CustomFunctions";
import { addMediaItem, getLoggedInUserData } from "@/utils/Dataservices";

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
  const [submission, setSubmission] = useState<any>();
  const [userId, setUserId] = useState<number>(-1);

  useEffect(()=>{
    localStorage.getItem("Token") ? "" : router.push("/LoginPage");
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getLoggedInUserData();
      setUserId(userData.userId);
    };
    loadUserData();
    let submitEffect = {
      id: 0,
      userId: userId,
      title: title,
      coverArt: coverArt,
      originalLanguage: originalLanguage,
      type: type,
      platform: platform,
      isPublished: true,
    };
    setSubmission(submitEffect);
  }, [title, coverArt, originalLanguage, type, platform]);

  //Thank you Sinatha and Halley from MangaDiction for letting me use this function for out image reader
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    console.log(`${file!.size / 1024 / 1024} MB`);

    // Check if a file is selected
    if (!file) {
      alert("Please select a file.");
      return;
    }

    //compress the image - Added by Zach
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 512,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      file = compressedFile;
    } catch (error) {
      console.log(error);
      e.target.value = ""; //Clear the input value
    }

    // Check file type (accept only PNG and JPEG)
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!acceptedTypes.includes(file.type)) {
      alert("Please select a PNG or JPEG file.");
      e.target.value = ""; // Clear the input value
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      setCoverArt(reader.result as string);
      console.log(reader.result);
    };
    console.log(`${file.size / 1024} KB`);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () =>{
    if(submission.title !== '' && submission.coverArt !== '' && submission.originalLanguage !== '' && submission.type !== '' && submission.platform !== ''){
      addMediaItem(submission),
      handlePageChange("/TranslationsPage");
    }
    else{
      alert('Required Form Items not Added')
    }
  }

  return (
    <div className="flex flex-col items-center flex-wrap p-4 select-none">
      <div className="headerBG flex items-center w-fit h-24 bg-fuchsia-300 p-12 mx-auto rounded-lg my-4">
        <h1 className="text-center font-bold text-gray-700 text-4xl py-7">
          Submit Media
        </h1>
      </div>
      <div className="flex w-3/4 flex-wrap gap-y-4 justify-evenly">
        <form className="max-w-md h-fit flex flex-col items-between bg-purple-600 p-6 rounded-lg">
          <div>
            <div className="mb-6">
              <p className="text-white font-semibold">
                Title of Media <span className="text-red-600">*</span>
              </p>
              <TextInput
                id="title"
                type="text"
                required
                placeholder="Title..."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-6 block">
              <p className="text-white font-semibold">
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
            <div className="mb-6 block">
              <p className="text-white font-semibold">
                Platforms Media Is On <span className="text-red-600">*</span>
              </p>
              <TextInput
                id="platform"
                type="text"
                placeholder="Netflix, Hulu..."
                required
                onChange={(e) => {
                  setPlatform(e.target.value);
                }}
              />
            </div>
            <div className="mb-6 block">
              <p className="text-white font-semibold">
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
            <div className="mb-2 block p-2 rounded-lg">
              <p className="text-white  font-semibold">
                Media Cover Art <span className="text-red-600">*</span>
              </p>
              <FileInput
                id="coverArt"
                accept="image/png, image/jpeg, image/webp"
                helperText=""
                required
                onChange={handleImage}
              />
              <p className="text-white ">PNG or JPG (MAX. 5mb).</p>
            </div>
            <button
              className="w-48 h-12 bg-fuchsia-300 rounded-xl font-semibold hover:bg-fuchsia-400"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit Media
            </button>
          </div>
        </form>
        <div
          className={`flex ${
            displayRequest ? "" : ""
          } justify-between flex-col bg-purple-600 rounded-lg text-gray-200 font-semibold p-4 h-fit my-auto`}
        >
          <div className="flex flex-col md:flex-row gap-5 pb-4 w-max mx-auto">
            <img
              className="max-h-80 max-w-64 min-w-48 bg-fuchsia-300 p-4 rounded-lg text-gray-700"
              src={coverArt}
              alt=" Image"
            />
            <div className=" font-semibold flex gap-4 flex-col">
              <p>Name: {title}</p>
              <p>Type: {type}</p>
              <p>Platform: {platform}</p>
              <p>
                Original Language:{" "}
                {originalLanguage ? langFormat(originalLanguage) : ""}
              </p>
              <p>Current Translations: None</p>
            </div>
          </div>
          <div>
            <div className="flex justify-evenly mb-4">
              <Button className="text-gray-700 bg-fuchsia-300 rounded-xl font-semibold hover:bg-fuchsia-400 mx-2">
                Create Request
              </Button>
            </div>
          </div>
          <div>
            <div className="bg-fuchsia-300 text-center text-gray-700 py-3 font-semibold border-black border">
              Current Translations
            </div>
            <div className="border border-t-0 border-black flex flex-col flex-wrap p-3 bg-fuchsia-200 text-gray-700">
              <div className="col-span-2">
                <span className="font-semibold mr-1">Mango:</span>
                <button className="text-blue-600">Opening</button>
                {" | "}
                <button className="text-blue-600 disabled:text-blue-400">
                  Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitMediaPage;
