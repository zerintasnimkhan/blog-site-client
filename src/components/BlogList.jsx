import React, { useState, useEffect } from "react";

const BlogList = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [filterTag, setFilterTag] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (!Array.isArray(posts)) {
      return;
    }
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterTag) {
      setFilteredPosts(
        filtered.filter((post) => post.tags.includes(filterTag))
      );
    } else {
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm, filterTag]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === "latest") {
      setFilteredPosts(
        [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    } else if (e.target.value === "oldest") {
      setFilteredPosts(
        [...filteredPosts].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by title"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter by tag"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts &&
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <p className="text-sm text-gray-500 mb-2">Date: {post.date}</p>
              <div className="flex flex-wrap">
                {post &&
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;
