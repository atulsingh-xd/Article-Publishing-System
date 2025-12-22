import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch only published articles from the public endpoint
        const res = await axios.get("http://localhost:5000/api/articles");
        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading)
    return <div style={{ padding: "20px" }}>Loading articles...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
        Latest Articles
      </h1>

      {articles.length === 0 ? (
        <p>No articles published yet. Check back later!</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
          {/* THE MISSING MAP LOGIC STARTS HERE */}
          {articles.map((article) => (
            <div
              key={article._id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{article.title}</h2>
              <p style={{ color: "#666" }}>
                {article.content.substring(0, 150)}...
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <small>By: {article.author?.username || "Unknown"}</small>
                {/* Link to the dynamic Article Details page */}
                <Link
                  to={`/article/${article._id}`}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
          {/* END OF MAP LOGIC */}
        </div>
      )}
    </div>
  );
};

export default Home;
