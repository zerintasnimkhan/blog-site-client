import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import BlogPreview from "./components/BlogPreview";

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<BlogForm/>} />
      <Route path="/list" element={<BlogList/>} />
      <Route path="/preview/:postId" element={<BlogPreview/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
