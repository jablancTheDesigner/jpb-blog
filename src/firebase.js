// require("dotenv").config();
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyA8nEM3fFELtHYhuCQ2wS9P8FLLxLjCPgM",
  authDomain: "jpb-blog.firebaseapp.com",
  databaseURL: "https://jpb-blog-default-rtdb.firebaseio.com",
  projectId: "jpb-blog",
  storageBucket: "jpb-blog.appspot.com",
  messagingSenderId: "571732210603",
  appId: "1:571732210603:web:aefad00c17da0c587858ee",
};

const app = initializeApp(config);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
