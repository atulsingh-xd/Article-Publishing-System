import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#a03102ae",
        color: "#fbfafaff",
        display: "flex",
        gap: "15px",
        textDecoration: "none",
      }}
    >
      <Link to="/" className="nav-link">
        Home
      </Link>
      {user && user.role === "writer" && (
        <Link to="/writer" className="nav-link">
          Writer Dashboard
        </Link>
      )}
      {user && user.role === "admin" && (
        <Link to="/admin" className="nav-link">
          Admin Dashboard
        </Link>
      )}

      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>Hello, {user.username}</span>
            <button
              onClick={logout}
              style={{ color: "#c40202", fontWeight: "bold" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link"
              style={{ marginRight: "10px" }}
            >
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
