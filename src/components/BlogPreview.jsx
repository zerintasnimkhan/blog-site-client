import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const BlogPreview = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`http://localhost:3005/fetch/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error.message);
       
      }
    };

    fetchPostById();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-500 mb-2">Date: {post.date}</p>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="flex flex-wrap">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
