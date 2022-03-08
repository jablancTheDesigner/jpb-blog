import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Post from "./pages/Post";
import NoMatch from "./pages/NoMatch";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";

function App() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const getPosts = () => {
    const postListRef = collection(database, "posts");
    return new Promise(async (res, rej) => {
      const data = await getDocs(postListRef);
      const docs = data.docs;
      const posts = docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          slug: doc.id,
        };
      });
      res(posts);
    });
  };

  return (
    <>
      <Router>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  loading={loading}
                  setLoading={setLoading}
                  isLoggedIn={isLoggedIn}
                  getPosts={getPosts}
                />
              }
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/404" element={<NoMatch />} />
            <Route
              path="/:slug"
              element={
                <Post
                  loading={loading}
                  getPosts={getPosts}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/post/create"
              element={<CreatePost isLoggedIn={isLoggedIn} />}
            />
            <Route path="/404" element={<NoMatch />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
