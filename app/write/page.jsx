'use client';

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { UserButton, ClerkProvider } from '@clerk/nextjs';
import { HiOutlineBell } from "react-icons/hi2";
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { useToast } from "../../hooks/use-toast.ts";

export default function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const sendPostRequest = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      toast({
        description: "The post is not published. Please fill in both the title and content.",
        variant: "destructive",
      });
      return;
    }

    let response = await fetch('/api/newPost', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    const result = await response.json();

    if (response.ok) {
      toast({
        description: "The post is published!",
        variant: "outline",
      });

      window.location.href = result.redirectTo || '/';
    } else {
      console.error(result.error || 'An error occurred while publishing your post.');
    }
  };

  return (
    <ClerkProvider>
      <Disclosure as="nav">
        <div className="mx-auto p-2 px-4 lg:p-2 lg:px-6 max-w-screen-lg container">
          <div className="relative flex py-3 lg:px-0 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
              </Link>
            </div>

            <div className="flex items-center">
              <Link href="#">
                <HiOutlineBell className="w-6 h-6 text-gray-600 hover:text-gray-500" />
              </Link>
              <div className="border-l border-gray-300 mx-4"></div>
              <UserButton />
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <form className="max-w-4xl mx-auto px-8 py-12" onSubmit={sendPostRequest}>
          <div className="grid md:grid-cols-1 gap-6">
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                name="floating_title"
                id="floating_title"
                className="h-12 block w-full placeholder:text-4xl text-4xl text-gray-900 bg-transparent appearance-none focus:outline-none"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea
                name="floating_content"
                id="floating_content"
                ref={textareaRef}
                className="block w-full text-xl text-gray-900 bg-transparent appearance-none focus:outline-none"
                placeholder="Tell your story..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

          </div>

          <button
            type="submit"
            className={`text-white ${title && content ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 hover:bg-gray-500'} focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-24 px-5 py-2 text-center`}
            onClick={() => {
              if (!title || !content) {
                toast({
                  description: "The post is not published. Please fill in both the title and content.",
                  variant: "destructive",
                });
              } else {
                toast({
                  description: "The post is published!",
                  variant: "outline",
                });
              }
            }}
          >
            Publish
          </button>
        </form>
      </Disclosure>
    </ClerkProvider>
  );
}