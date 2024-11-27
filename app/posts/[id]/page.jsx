"use client";

import { useEffect, useState, useRef } from "react";
import React from "react";
import { UserButton, ClerkProvider, useUser } from "@clerk/nextjs";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { HiOutlineBell, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

export default function Page({ params }) {
  const { id } = React.use(params);
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const textareaRef = useRef(null);
  const { user } = useUser();
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data.post);
        setEditedContent(data.post.content);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [isEditing, editedContent]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!id || !editedContent) {
        console.error("Post ID or content is missing.");
        return;
      }

      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update post:", errorData);
        return;
      }

      const { post } = await response.json();
      setPost(post);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      window.location.href = result.redirectTo || '/';

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete post:", errorData);
        return;
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };

  const date = post ? new Date(post?.created_at) : null;
  const dateDisplay = date ? date.toLocaleString() : null;

  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Disclosure as="nav">
          <div className="mx-auto p-2 px-4 lg:p-2 lg:px-6 max-w-screen-lg container">
            <div className="relative flex py-3 lg:px-0 items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </Link>
              </div>

              <div className="flex lg:gap-12 space-x-4">
                <button
                  className="flex hover:text-gray-500 text-gray-600"
                  onClick={handleEditClick}
                >
                  <HiOutlinePencil className="h-6 w-8" />
                  <p className="md:block hidden">Edit</p>
                </button>
                <button className="flex hover:text-gray-500 text-gray-600" onClick={handleDelete}>
                  <HiOutlineTrash className="h-6 w-8" />
                  <p className="md:block hidden">Delete</p>
                </button>
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
        </Disclosure>

        <hr className="border-gray-200" />

        <main className="container mx-auto flex-grow lg:py-12 py-6 px-6 max-w-5xl">
          <div className="flex items-center mb-6">
            <img
              src={user?.imageUrl}
              alt={user?.fullName}
              className="size-10 rounded-full bg-gray-50"
            />
            <div className="px-2">
              <p className="font-semibold text-gray-900">{user?.fullName}</p>
              <small className="text-xs text-gray-500">{dateDisplay}</small>
            </div>
          </div>

          {post && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>

              {isEditing ? (
                <textarea
                  ref={textareaRef}
                  className="w-full text-lg text-gray-700 focus:outline-none resize-none"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onInput={adjustTextareaHeight}
                />
              ) : (
                <p className="text-lg text-gray-700">{post.content}</p>
              )}
            </div>
          )}

          {isEditing && (
            <div className="mt-6">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <hr className="border-gray-200" />
        <footer className="mt-auto">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-500 text-center lg:text-start">
              © {year} Mustafa BAGCI. All Rights Reserved.
            </p>
            <div className="flex lg:ms-6 sm:ms-0 gap-4 justify-center py-3">
              <a href="#"><FaLinkedin className="h-6 w-6 hover:text-gray-700" /></a>
              <a href="#"><FaGithub className="h-6 w-6 hover:text-gray-700" /></a>
              <a href="#"><FaTwitterSquare className="h-6 w-6 hover:text-gray-700" /></a>
            </div>
          </div>
        </footer>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-8">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md h-38 w-full">
            <h3 className="text-xl font-semibold text-center">Are you sure you want to delete this post?</h3>
            <div className="mt-8 flex justify-around">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </ClerkProvider>
  );
}
