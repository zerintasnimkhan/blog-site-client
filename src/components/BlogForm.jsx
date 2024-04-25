import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      date,
      tags,
    };

    fetch("http://localhost:3005/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save post");
        }
        console.log("Post saved successfully");
        setTitle("");
        setDescription("");
        setDate("");
        setTags("");
      })
      .catch((error) => {
        console.error("Error saving post:", error.message);
        // Handle error, show user an error message, etc.
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog Post</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <ReactQuill
            id="description"
            value={description}
            onChange={setDescription}
            className="h-32 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-gray-700 font-semibold mb-2"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
