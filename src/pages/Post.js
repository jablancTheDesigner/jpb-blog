import Redirect from "../components/Redirect";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import PageLayout from "../components/PageLayout";

export default function Post({ loading, setLoading }) {
  const params = useParams();
  const slug = params.slug;
  const postSlugs = [];

  const [post, setPost] = useState(null);
  const [postDoesNotExist, setExists] = useState(false);

  return (
    <PageLayout loading={loading} className="post-detail">
      <h1>This is a template for blog posts.</h1>
      <p>We'll get to this once we've hooked up Firebase!</p>
    </PageLayout>
  );
}
