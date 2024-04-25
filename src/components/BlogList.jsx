import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const navigate = useNavigate();

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

  const handlePreview = (postId) => {
    navigate(`/preview/${postId}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">All Blog Posts</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">{post.date}</td>
                <td className="border px-4 py-2">{post.description}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handlePreview(post.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostList;
