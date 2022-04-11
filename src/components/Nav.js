import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "bootstrap";

export default function Nav({ isLoggedIn, setIsLoggedIn }) {
  let navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/login");
    });
  };

  return (
    <>
      <form class="d-flex">
        <input
          class="form-control form-control-sm"
          type="text"
          placeholder="Search"
        />
        <button class="btn btn-primary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <Link to={`/`} className="navbar-brand">
            YERRP<small>the</small>BLOG
          </Link>

          <button
            class="navbar-toggler mx-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link to={`/`} className="nav-link">
                  Home
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li class="nav-item">
                    <Link to={`/post/create`} className="nav-link">
                      Admin
                    </Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <li class="nav-item">
                  <Link to={`/login`} className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
            {isLoggedIn && (
              <button
                class="btn btn-primary my-2 my-sm-0 ms-auto"
                type="button"
                onClick={signOutUser}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
