import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    // 1. Get the token from storage
    const token = localStorage.getItem("token");

    // 2. Defensive check: If there is no token locally, don't even try the request
    if (!token) {
      console.error("User is not authenticated locally.");
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/articles?view=all",
        {
          headers: {
            // 3. THIS MUST MATCH THE KEY IN YOUR MIDDLEWARE: 'x-auth-token'
            "x-auth-token": token,
          },
        }
      );
      setArticles(res.data);
    } catch (err) {
      console.error("Server rejected request:", err.response?.data?.msg);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const togglePublish = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:5000/api/articles/${id}/publish`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      fetchAll(); // Refresh list after change
    } catch (err) {
      alert("Publishing failed: " + err.response.data.msg);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this article?")) {
      await axios.delete(`http://localhost:5000/api/articles/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchAll();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art) => (
            <tr key={art._id}>
              <td>{art.title}</td>
              <td>{art.author.username}</td>
              <td
                style={{
                  color: art.status === "published" ? "green" : "inherit",
                  fontWeight: "bold",
                }}
              >
                {art.status.charAt(0).toUpperCase() + art.status.slice(1)}
              </td>
              <td>
                <button onClick={() => togglePublish(art._id)}>
                  {art.status === "draft" ? "Publish" : "Unpublish"}
                </button>
                <button
                  onClick={() => handleDelete(art._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
