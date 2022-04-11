import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database, auth } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import PageLayout from "../components/PageLayout";
import Masonry from "react-masonry-css";
import PageHeader from "../components/PageHeader";

export default function Home({ loading, setLoading, isLoggedIn }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1,
  };

  const deletePost = async (id) => {
    const postDoc = doc(database, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    setLoading(true);
    const postsRef = collection(database, "posts");
    onSnapshot(postsRef, (snapshot) => {
      setLoading(false);
      setBlogPosts(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, [setLoading, setBlogPosts]);

  return (
    <>
      <PageHeader subtitle="Get the latest insights of technologies, trends, and market. Learn More and Stay Ahead." />

      <PageLayout className="home" loading={loading}>
        <div className="container">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {blogPosts &&
              blogPosts.map(
                ({ id, data: { title, author, slug, content } }) => (
                  <div key={id} className="card border-primary mb-3">
                    <div className="card-body">
                      <h2 className="card-title fw-bolder">{title}</h2>
                      {author && (
                        <h6 className="card-subtitle mb-2 text-muted">{`@${author.name}`}</h6>
                      )}
                      <Link
                        to={`/${id}`}
                        className="card-link btn btn-dark btn-sm"
                      >
                        Read
                      </Link>
                      {isLoggedIn && author.id === auth.currentUser.uid && (
                        <button
                          onClick={() => deletePost(id)}
                          className="card-link btn btn-outline-danger btn-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
          </Masonry>
        </div>
      </PageLayout>
    </>
  );
}
