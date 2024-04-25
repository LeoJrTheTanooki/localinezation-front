"use client";

import {
  Navbar,
  Dropdown,
  Avatar,
  NavbarLink,
  TextInput,
  Button,
} from "flowbite-react";
import { Permanent_Marker } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const NavbarComponent = () => {
  useEffect(() => {}, []);

  const router = useRouter();
  const handlePageChange = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <nav className="px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 bg-purple-600 text-white border-purple-800 border-t-4">
        <div className="mx-auto flex flex-wrap items-center justify-center lg:justify-between">
          <button className="flex items-center self-start" onClick={() => handlePageChange("/")}>
              <img
                src="/assets/localinezationLogo.png"
                className="mr-3 text-center"
                alt="LocaLINEzation Logo"
              />
          </button>
          <div className="flex w-full max-w-[550px] gap-5 justify-between">
          <div className="relative block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
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
            <Dropdown.Item className="gap-2">
              <Avatar img="/assets/americanFlag.png" rounded />
              <span>English (US)</span>
            </Dropdown.Item>
          </Dropdown>

          <Button
            className="font-bold self-end bg-fuchsia-300 text-black enabled:hover:bg-purple-900 enabled:hover:text-white"
            onClick={() => handlePageChange("/LoginPage")}
          >
            Login
          </Button>
        </div>
        </div>
      </nav>

      <Navbar
        fluid
        className="bg-fuchsia-300 text-sm border-fuchsia-400 border-b-4"
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            className="font-bold"
            href="#"
            onClick={() => handlePageChange("/SubmitMediaPage")}
          >
            Submit a Media
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold"
            href="#"
            disabled
            title="Work in Progress"
          >
            Favorites
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold"
            href="#"
            onClick={() => handlePageChange("/AboutPage")}
          >
            About Us
          </Navbar.Link>
          <li className=" hidden md:list-item">-</li>
          <Navbar.Link
            className="font-bold"
            href="#"
            onClick={() => handlePageChange("/AccountDashboardPage")}
          >
            Account
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>


    </>
  );
};

export default NavbarComponent;
