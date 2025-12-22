import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Failed to fetch article", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: "bold" }}>{article.title}</h1>
      <p>
        <strong>By:</strong> {article.author?.username} |{" "}
        <strong>Published:</strong>{" "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <hr />
      <div style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
        {article.content}
      </div>
      <div style={{ marginTop: "20px" }}>
        {article.tags?.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#eee",
              padding: "5px",
              margin: "5px",
              borderRadius: "4px",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetails;
