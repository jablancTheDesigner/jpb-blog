import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import "../styles/postDetails.css";
import { useNavigate } from "react-router-dom";

export default function Post({ loading, getPosts, setLoading }) {
  const params = useParams();
  const slug = params.slug;
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPosts().then((data) => {
      const filteredPost = data.find((post) => post.slug === slug);
      setLoading(false);

      if (!filteredPost) {
        navigate("/404");
        return;
      }

      setPost(filteredPost);
    });
  }, [getPosts, navigate, setLoading, slug]);

  return (
    <PageLayout loading={loading} className="post-detail">
      <div className="">
        {post && (
          <>
            <h1 className="post-detail__title">
              {post.title}
              {post.author && (
                <span className="card__author">{`@${post.author.name}`}</span>
              )}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="post-detail__content"
            ></div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
