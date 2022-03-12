import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/nav.scss";

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
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__logo">
          <h1 className="nav__title">
            YERRP<small>the</small>BLOG
          </h1>
        </div>
        <ul className="nav__list">
          <li className="nav__link">
            <Link to={`/`} className="nav__action">
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav__link">
                <Link to={`/post/create`} className="nav__action">
                  Admin
                </Link>
              </li>
              <li className="nav__link">
                <button onClick={signOutUser} className="nav__action">
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li className="nav__link">
              <Link to={`/login`} className="nav__action">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
