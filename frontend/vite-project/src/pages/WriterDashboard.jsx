import { useState, useEffect } from "react";
import axios from "axios";

const WriterDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const token = localStorage.getItem("token");

  const fetchMyArticles = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/articles?view=mine",
      {
        headers: { "x-auth-token": token },
      }
    );
    setArticles(res.data);
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/articles",
      { ...newArticle, tags: newArticle.tags.split(",") },
      { headers: { "x-auth-token": token } }
    );
    setNewArticle({ title: "", content: "", tags: "" });
    fetchMyArticles();
  };

  const handleEdit = async (id) => {
    const title = prompt("New Title:");
    if (title) {
      await axios.put(
        `http://localhost:5000/api/articles/${id}`,
        { title },
        {
          headers: { "x-auth-token": token },
        }
      );
      fetchMyArticles();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Writer Dashboard</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          gap: "10px",
        }}
      >
        <h3>Write new Article</h3>
        <form
          onSubmit={handleCreate}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <input
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
            required
            style={{ width: "100%", height: "40px", boxSizing: "border-box" }}
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
            required
            style={{ width: "100%", height: "300px", boxSizing: "border-box" }}
          />
          <input
            placeholder="Tags (separate using comma)"
            value={newArticle.tags}
            onChange={(e) =>
              setNewArticle({ ...newArticle, tags: e.target.value })
            }
            style={{ width: "100%", height: "40px", boxSizing: "border-box" }}
          />
          <button
            type="submit"
            style={{
              display: "block",
              margin: "10px auto 0 auto",
              fontWeight: "bold",
              backgroundColor: "#027a24",
              color: "white",
            }}
          >
            Create Draft
          </button>
        </form>
      </div>

      <h3>My Articles</h3>
      {articles.map((art) => (
        <div
          key={art._id}
          style={{ border: "1px solid #eee", padding: "5px", margin: "5px 0" }}
        >
          <h4>
            {art.title}{" "}
            <span
              style={{
                fontSize: "0.8em",
                color: art.status === "published" ? "green" : "orange",
              }}
            >
              ({art.status})
            </span>
          </h4>
          {art.status === "draft" && (
            <button onClick={() => handleEdit(art._id)}>Edit Title</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default WriterDashboard;
