import React from "react";
import { useEffect, useState } from "react";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3005/all");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">All Blog Posts</h2>
      <ul className="divide-y divide-gray-200">
        {posts?.map((post) => (
          <li key={post.id} className="py-4">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-500">Date: {post.date}</p>
                </div>
                <p className="text-gray-500">{post.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostList;
