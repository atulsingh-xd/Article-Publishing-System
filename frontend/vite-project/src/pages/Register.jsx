import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "reader",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "0 auto",
          width: "200px",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          style={{ width: "100%", boxSizing: "border-box", height: "30px" }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: "100%", boxSizing: "border-box", height: "30px" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={{ width: "100%", boxSizing: "border-box", height: "30px" }}
          required
        />
        <select
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{ width: "100%", boxSizing: "border-box", height: "30px" }}
        >
          <option value="reader">Reader</option>
          <option value="writer">Writer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          style={{
            width: "100%",
            boxSizing: "border-box",
            height: "35px",
            fontWeight: "bold",
            backgroundColor: "#027a24",
            color: "white",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
