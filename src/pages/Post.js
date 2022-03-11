import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import "../styles/postDetails.scss";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Post({ loading, setLoading }) {
  const params = useParams();
  const slug = params.slug;
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      const docRef = doc(database, "posts", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        setPost({
          id: slug,
          data: docSnap.data(),
        });
      } else {
        navigate("/404");
      }
    };
    getPost();
  }, [slug, setLoading, navigate]);

  return (
    <PageLayout loading={loading} className="post-detail">
      <div className="">
        {post && (
          <>
            <h1 className="post-detail__title">
              {post.data.title}
              {post.data.author && (
                <span className="card__author">{`@${post.data.author.name}`}</span>
              )}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: post.data.content }}
              className="post-detail__content"
            ></div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
