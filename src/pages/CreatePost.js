import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreatePost({ isLoggedIn }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let navigate = useNavigate();
  const postListRef = collection(database, "posts");

  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(postListRef, {
      title: title,
      content: content,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
      timestamp: serverTimestamp(),
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="create-post">
      <div className="container">
        <form className="create-post__form">
          <div class="form-group">
            <label for="title" class="form-label mt-4">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="create-post__input-group">
            <label className="form-label mt-4">Content</label>
            <CKEditor
              editor={ClassicEditor}
              data="<h1>Blog Post Content</h1>"
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </div>

          <button
            type="submit"
            className="mt-4 btn btn-dark"
            onClick={createPost}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
