import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database, auth, fetchPosts } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import PageLayout from "../components/PageLayout";
import Masonry from "react-masonry-css";

export default function Home({ loading, setLoading, isLoggedIn }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const breakpointColumnsObj = {
    default: 3,
    800: 2,
    500: 1,
  };

  const getPosts = async () => {
    const posts = await fetchPosts();

    setBlogPosts(posts);
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
      <h1 className="home__title">Yerrrp!</h1>
      <PageLayout className="home" loading={loading}>
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
                    {blogPost.author && (
                      <span className="card__author">{`@${blogPost.author.name}`}</span>
                    )}
                  </h1>

                  {isLoggedIn && blogPost.author.id === auth.currentUser.uid && (
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
                        blogPost.content.length > 200 &&
                        `...<small><b>more</b></small>`
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
