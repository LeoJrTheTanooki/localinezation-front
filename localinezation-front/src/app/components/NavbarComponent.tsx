"use client";

import { IMedia } from "@/Interfaces/Interfaces";
import { getPublishedItems } from "@/utils/Dataservices";
import {
  Navbar,
  Dropdown,
  Avatar,
  NavbarLink,
  TextInput,
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
        return e.title.toLowerCase().includes(searchInput);
      });
      const dropdownJsx = searchArray.map((e, index) => {
        return (
          <div
            key={index}
            className=" border-b-2 border-gray-500 hover:cursor-pointer hover:bg-gray-300"
            onClick={() => {
              //
              handlePageChange(`/MediaPage?id=${e.id}`);
              setSearchInput("");
            }}
          >
            {e.title}
          </div>
        );
      });
      setSearchDropdown(dropdownJsx);
    } else {
      setSearchDropdown("");
    }
  }, [mediaList, searchInput]);

  return (
    <>
      <Navbar
        fluid
        className=" bg-purple-600 text-white border-purple-800 border-t-4"
      >
        <button className=" self-center">
          <Navbar.Brand onClick={() => handlePageChange("/TranslationsPage")}>
            <img
              src="/assets/localinezationLogo.png"
              className="mr-3 text-center"
              alt="Flowbite React Logo"
            />
          </Navbar.Brand>
        </button>
        <div className="flex w-full max-w-[550px] gap-5 justify-between items-center ">
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
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <Dropdown
            arrowIcon={false}
            inline
            className=" font-bold gap-2"
            label={
              <>
                <Avatar
                  alt="User settings"
                  img="/assets/americanFlag.png"
                  rounded
                />
                <span className=" font-bold pl-2">English (US)</span>
              </>
            }
          >
            <Dropdown.Item
              className="gap-2"
              onClick={() => {
                localStorage.setItem("userLanguage", "englishUsa");
              }}
            >
              <Avatar img="/assets/americanFlag.png" rounded />
              <span>English (US)</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="gap-2"
              onClick={() => {
                localStorage.setItem("userLanguage", "spanishLatAm");
              }}
            >
              <Avatar img="/assets/mexicanFlag.png" rounded />
              <span>Spanish (Latin American)</span>
            </Dropdown.Item>
          </Dropdown>

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
            onClick={() => handlePageChange("/TranslationsPage")}
          >
            Translation Requests
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold cursor-pointer"
            onClick={() => handlePageChange("/SubmitMediaPage")}
          >
            Submit a Media
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold cursor-pointer"
            onClick={() => handlePageChange("/AboutPage")}
          >
            About Us
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
