"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import { HiOutlinePencilSquare, HiOutlineBell } from "react-icons/hi2";
import Link from 'next/link';
import { AiOutlineSearch } from "react-icons/ai";

const navigation = [
  { name: "Write", href: "/write" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BlogNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Disclosure as="nav">
      <div className="mx-auto p-2 px-4 lg:p-0 lg:px-6">
        <div className="relative flex py-3 lg:px-0 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </Link>
          </div>

          <div className="relative lg:block hidden sm:w-[400px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch className="w-6 h-6 text-gray-600 hover:text-gray-500"/>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100"
              placeholder="Search..."
            />
          </div>

          <div className="flex items-center lg:space-x-4">
            <div className="hidden lg:block">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={classNames(
                      "text-gray-600 hover:text-gray-500",
                      "px-6 py-2 text-sm font-medium flex align-center items-center gap-2"
                    )}
                  >
                    <HiOutlinePencilSquare className="w-6 h-6" aria-hidden="true" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              <div className="lg:hidden flex justify-between items-center gap-4">
                {/* Write Button */}
                <Link href="/write">
                  <div>
                    <HiOutlinePencilSquare className="w-6 h-6 text-gray-600 hover:text-gray-500" aria-hidden="true"/>
                  </div>
                </Link>

                <button
                  onClick={toggleSearch}
                  aria-label="Toggle search bar"
                  className="focus:outline-none"
                >
                  <AiOutlineSearch className="w-6 h-6 text-gray-600 hover:text-gray-500"/>
                </button>
              </div>

              {searchOpen && (
                <input
                  type="text"
                  id="search-navbar"
                  className="p-2 pl-10 text-sm text-gray-700 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100"
                  placeholder="Search..."
                />
              )}
          
              <div className="flex items-center ml-4">
                <Link href="#" aria-label="Notifications">
                  <HiOutlineBell className="w-6 h-6 text-gray-600 hover:text-gray-500" aria-hidden="true"/>
                </Link>

                <div className="border-l border-gray-300 mx-4"></div>

                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />
    </Disclosure>
  );
}
