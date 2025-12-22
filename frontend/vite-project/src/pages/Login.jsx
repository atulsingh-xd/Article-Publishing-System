import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
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
        <button
          type="submit"
          style={{
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "#027a24",
            color: "white",
            height: "35px",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
