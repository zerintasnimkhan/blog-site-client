import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3005/all");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      let data = await response.json();
      // Sort posts by date in descending order
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const handlePreview = (postId) => {
    navigate(`/preview/${postId}`);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-semibold mb-6">All Blog Posts</h2>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600" onClick={() => handlePreview(post.id)}>
                {post.title}
              </h3>
              <p className="text-gray-600 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-gray-800">
                  {post.description}
                  </p>
            </div>
            <div className="p-4 bg-gray-100">
              <button
                onClick={() => handlePreview(post.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;
