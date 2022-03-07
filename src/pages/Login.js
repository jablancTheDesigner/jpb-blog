import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  let navigate = useNavigate();
  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      navigate("/");
    });
  };

  return (
    <div className="login">
      <h1>Sign in w/ Google</h1>
      <button onClick={signIn}>Sign in w/ Google</button>
    </div>
  );
}
