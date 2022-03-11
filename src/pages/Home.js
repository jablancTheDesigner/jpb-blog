import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database, auth } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
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
    const q = query(postsRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
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
      <PageHeader
        title="Yerrrp!"
        subtitle="Get the latest insights of technologies, trends, and market. Learn More and Stay Ahead."
      />

      <PageLayout className="home" loading={loading}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {blogPosts &&
            blogPosts.map(({ id, data: { title, author, slug, content } }) => (
              <div key={id} className="card">
                <div className="card__content">
                  <h1>
                    {title}
                    {author && (
                      <span className="card__author">{`@${author.name}`}</span>
                    )}
                  </h1>

                  {isLoggedIn && author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => deletePost(id)}
                      className="remove-post"
                    >
                      &#128465;
                    </button>
                  )}

                  <div
                    className="card__excerpt"
                    dangerouslySetInnerHTML={{
                      __html: `${content.substring(0, 200)} 
                      ${
                        content.length > 200 && `...<small><b>more</b></small>`
                      }`,
                    }}
                  ></div>
                  {content.length > 200 && (
                    <Link to={`/${id}`}>Continue reading...</Link>
                  )}
                </div>
              </div>
            ))}
        </Masonry>
      </PageLayout>
    </>
  );
}
