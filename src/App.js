import { useState } from "react";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
              element={<Post loading={loading} setLoading={setLoading} />}
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
