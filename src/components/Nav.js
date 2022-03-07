import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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
    <nav className="header">
      <Link to={`/`}>Home</Link>
      {isLoggedIn ? (
        <>
          {" | "}
          <Link to={`/post/create`}>Create</Link>
          {" | "}
          <button onClick={signOutUser}>Logout</button>
        </>
      ) : (
        <>
          {" | "}
          <Link to={`/login`}>Login</Link>
        </>
      )}
    </nav>
  );
}
