import { Link } from "react-router-dom";
import { FaGithub, FaBlog } from "react-icons/fa";

function Navbar({ isOpen, toggleSidebar }) {
  return (
    <div style={{ 
      position: "fixed",
      left: isOpen ? "0" : "-250px",
      width: "250px", 
      height: "100vh", 
      backgroundColor: "#222",
      color: "white", 
      padding: "20px",
      transition: "left 0.3s",
      boxSizing: "border-box",
      fontFamily: "'Noto Sans KR', sans-serif",
      display: "flex",
      flexDirection: "column" // ✅ 세로 정렬 유지
    }}>
      {/* 사이드바 토글 버튼 */}
      <button 
        onClick={toggleSidebar} 
        style={{
          position: "absolute",
          top: "10px",
          right: "-50px",
          backgroundColor: "#444",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "0.3s", 
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#666"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#444"}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* 상단 로고 & 이미지 */}
      <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "30px" }}>
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          Seulgae Portfolio
        </a>
      </h2>
        <img 
          src="/giltaehyeong.jpg" 
          alt="Profile"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid white",
            boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
          }}
        />
      </div>

      {/* ✅ 네비게이션 영역 */}
      <nav style={{ flexGrow: 1, marginTop: "10px" }}> 
        <ul style={{ 
          listStyle: "none", 
          padding: 0,
          textAlign: "center",
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
        }}>
          {[
            { to: "/", text: "자기소개서" },
            { to: "/ProjectsList", text: "포트폴리오" },
            { to: "/experience", text: "프로젝트 경험" },
            { to: "/education", text: "교육/학력" },
            { to: "/awards", text: "수상경력" },
            { to: "/contact", text: "연락처" },
          ].map((item, index) => (
            <li key={index} style={{ 
              padding: "10px 0", 
              width: "100%", 
              textAlign: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "0.3s",
            }}>
              <Link 
                to={item.to} 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  fontSize: "18px",
                  fontWeight: "500",
                  display: "block", 
                  padding: "10px",
                  borderRadius: "5px",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 하단 아이콘 */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "15px", 
        paddingBottom: "20px"
      }}>
        <a href="https://github.com/seulgae" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} color="white" />
        </a>
        <a href="https://blog.naver.com/seulgae" target="_blank" rel="noopener noreferrer">
          <FaBlog size={24} color="white" />
        </a>
      </div>
    </div>
  );
}

export default Navbar;