import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database, auth } from "../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import PageLayout from "../components/PageLayout";
import Masonry from "react-masonry-css";

export default function Home({ loading, setLoading, isLoggedIn }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const postListRef = collection(database, "posts");
  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1,
  };

  const getPosts = async () => {
    const data = await getDocs(postListRef);
    setBlogPosts(
      data.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          slug: doc.id,
        };
      })
    );
    setLoading(false);
  };

  const deletePost = async (id) => {
    const postDoc = doc(database, "posts", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, []);

  return (
    <>
      <PageLayout className="home" loading={loading}>
        <h1 class="home__title">Yerrrp!</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {blogPosts &&
            blogPosts.map((blogPost) => (
              <div key={blogPost.slug} className="card">
                <div className="card__content">
                  <h1>
                    {blogPost.title}
                    <span className="card__author">{`@${blogPost.author.name}`}</span>
                  </h1>

                  {isLoggedIn && blogPost.author.id == auth.currentUser.uid && (
                    <button
                      onClick={() => deletePost(blogPost.id)}
                      className="remove-post"
                    >
                      &#128465;
                    </button>
                  )}

                  <div
                    className="card__excerpt"
                    dangerouslySetInnerHTML={{
                      __html: `${blogPost.content.substring(0, 200)}
                      ${
                        blogPost.content.length > 200
                          ? `...<small><b>more</b></small>`
                          : ``
                      }`,
                    }}
                  ></div>
                  {blogPost.content.length > 200 && (
                    <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
                  )}
                </div>
              </div>
            ))}
        </Masonry>
      </PageLayout>
    </>
  );
}
