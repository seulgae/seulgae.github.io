import { Link } from "react-router-dom";

function Navbar({ isOpen, toggleSidebar }) {
  return (
    <div style={{ 
      position: "fixed",
      left: isOpen ? "0" : "-250px", // ✅ isOpen 값에 따라 숨김/표시
      width: "250px", 
      height: "100vh", 
      backgroundColor: "#333", 
      color: "white", 
      padding: "20px",
      transition: "left 0.3s",
      boxSizing: "border-box"
    }}>
      {/* ✅ 버튼을 사이드바 내부 상단에 배치 */}
      <button 
        onClick={toggleSidebar} 
        style={{
          position: "absolute",
          top: "10px",
          right: "-50px", // 사이드바 바깥쪽에 배치
          backgroundColor: "#333",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <h2>Seulgae Portfollo</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
          <li><Link to="/ProjectsList" style={{ color: "white", textDecoration: "none" }}>Projects</Link></li>
          <li><Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;