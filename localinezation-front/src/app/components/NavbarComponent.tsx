"use client";

import { IMedia } from "@/Interfaces/Interfaces";
import { getPublishedItems } from "@/utils/Dataservices";
import {
  Navbar,
  Button,
} from "flowbite-react";
import { Permanent_Marker } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const NavbarComponent = () => {
  const [currentUsername, setCurrentUsername] = useState<string | null>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchDropdown, setSearchDropdown] = useState<any>();
  const [mediaList, setMediaList] = useState<IMedia[]>([]);
  const [userLanguage, setUserLanguage] = useState<string>("");

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const media = await getPublishedItems();
        setMediaList(media);
      } catch (error) {
        console.error(error);
      }
    };
    loadMedia();
    const languageCheck = localStorage.getItem("userLanguage");
    if (languageCheck) {
      window.addEventListener("storage", () => setUserLanguage(languageCheck));
    } else {
      localStorage.setItem("userLanguage", "englishUsa");
      window.addEventListener("storage", () => setUserLanguage('englishUsa'));
    }
  }, []);

  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };
  const pathname = usePathname();

  useEffect(() => {
    if (
      localStorage.getItem("username") &&
      localStorage.getItem("username") != `""`
    ) {
      setCurrentUsername(localStorage.getItem("username"));
    } else {
      setCurrentUsername("");
    }
  }, [pathname]);

  /*
  
    Check whenever user adds to search input
    When mapping, filter using the userInput as a matching condition
    Give every div an onClick function that leads you to given media page

  */

  useEffect(() => {
    if (searchInput.length > 0) {
      const searchArray = mediaList.filter((e) => {
        return e.title.includes(searchInput);
      });
      const dropdownJsx = searchArray.filter((item, idx) => idx < 12).map((e, index) => {
        return (
          <div
            key={index}
            className="p-2 border-2 border-t-0 border-black hover:cursor-pointer hover:bg-gray-300"
            onClick={() => {
              //
              handlePageChange(`/MediaPage?id=${e.id}`);
              setSearchInput("");
            }}
          >
            {e.title.substring(0, 22)}...
          </div>
        );
      });
      setSearchDropdown(dropdownJsx);
    } else {
      setSearchDropdown("");
    }
  }, [mediaList, searchInput]);

  return (
    <div>
      <Navbar
        fluid
        className=" bg-purple-600 text-white border-purple-800 border-t-4"
      >
        <button className=" self-center">
          <Navbar.Brand onClick={() => localStorage.getItem("Token") ? handlePageChange("/TranslationsPage") : ""}>
            <img
              src="/assets/localinezationLogo.png"
              className="text-center"
              alt="LocalinezationLogo"
            />
          </Navbar.Brand>
        </button>
        <div className="flex w-max px-2 gap-5 justify-end items-end ">
          <div className="relative hidden md:block">
            <div className="flex items-center ps-3 pointer-events-none h-8 w-fit absolute top-6">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <form>
              <label className="invisible">Search for Titles</label>
              <input
                type="text"
                id="search-navbar"
                className={`block w-full p-2 ps-10 ${searchInput ? "rounded-b-none" : ''} text-sm text-gray-900 border-2 border-black focus:ring-0 focus:border-black rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                placeholder="Search..."
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput}
              />
            </form>
            <div className=" absolute bg-white w-full text-gray-700">
              {searchDropdown}
            </div>
          </div>

          <Button
            className="font-bold self-end bg-fuchsia-300 text-black enabled:hover:bg-purple-900 enabled:hover:text-white"
            onClick={() => {
              currentUsername
                ? handlePageChange("/AccountDashboardPage")
                : handlePageChange("/LoginPage");
            }}
          >
            {currentUsername ? currentUsername : "Login"}
          </Button>
        </div>
      </Navbar>

      <Navbar
        fluid
        className="bg-fuchsia-300 text-sm border-fuchsia-400 border-b-4"
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            className="font-bold cursor-pointer"
            onClick={() =>  localStorage.getItem("Token") ? handlePageChange("/TranslationsPage") : ""}
          >
            Translation Requests
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold cursor-pointer"
            onClick={() =>  localStorage.getItem("Token") ? handlePageChange("/SubmitMediaPage") :  ""}
          >
            Submit a Media
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold cursor-pointer"
            onClick={() =>  localStorage.getItem("Token") ? handlePageChange("/AboutPage") :  ""}
          >
            About Us
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
