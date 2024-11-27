"use client";

import { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function BlogCard() {
  const [posts, setPosts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        console.log(data)
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex flex-col gap-8 lg:mx-0 lg:max-w-none">
          {posts.map((post) => (
            <article
              key={post.id || post.created_at}
              className="relative flex flex-col items-start justify-between p-6 bg-white rounded-lg border border-gray-200 shadow-md"
            >
              <div className="absolute top-4 right-4 text-sm text-gray-500">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                {post.content}
              </p>

              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={user?.imageUrl}
                  alt="Author Avatar"
                  className="size-7 rounded-full bg-gray-50"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    {user?.fullName || "Unknown Author"}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}