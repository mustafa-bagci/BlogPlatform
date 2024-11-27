"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { SignInButton } from '@clerk/nextjs';
import Link from "next/link"; 
import clsx from "clsx";  

const navigation = [
  { name: "Write", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MobileMenu({ navigation }) {
  return (
    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            className={clsx("text-gray-700 hover:text-gray-500", "block px-3 py-2 text-base font-medium")}
          >
            {item.name}
          </DisclosureButton>
        ))}
        <SignInButton
          className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2"
        >
          Sign In
        </SignInButton>
      </div>
    </DisclosurePanel>
  );
}

function DesktopMenu({ navigation }) {
  return (
    <div className="hidden sm:ml-4 sm:block">
      <div className="flex items-center space-x-4">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={clsx("text-gray-700 hover:text-gray-500", "px-3 py-2 text-sm font-medium")}>
            {item.name}
          </Link>
        ))}
        <div className="border-l border-gray-300 mx-4"></div>
        <SignInButton
          className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2"
        >
          Sign In
        </SignInButton>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <Disclosure as="nav" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
        <div className="relative flex py-3 items-center justify-center sm:justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div className="flex items-center justify-center">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </Link>
          </div>

          <DesktopMenu navigation={navigation} />
        </div>
      </div>

      <hr className="border-gray-800" />

      <MobileMenu navigation={navigation} />
    </Disclosure>
  );
}
