import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>홈</Link>
      <Link to="/ProjectsList" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>프로젝트</Link>
      <Link to="/contact" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>연락처</Link>
    </nav>
  );
}

export default Navbar;