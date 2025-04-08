import { Link } from "react-router-dom";

function Navbar({ isOpen, toggleSidebar }) {
  return (
    <div style={{ 
      position: "fixed",
      left: isOpen ? "0" : "-250px",
      width: "250px", 
      height: "100vh", 
      backgroundColor: "#222",  // ✅ 좀 더 세련된 색감
      color: "white", 
      padding: "20px",
      transition: "left 0.3s",
      boxSizing: "border-box",
      fontFamily: "'Noto Sans KR', sans-serif" // ✅ 한국어 가독성 좋은 글꼴
    }}>
      <button 
        onClick={toggleSidebar} 
        style={{
          position: "absolute",
          top: "10px",
          right: "-50px",
          backgroundColor: "#444", // ✅ 살짝 다른 색으로 구분
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "0.3s", 
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#666"} // ✅ hover 효과
        onMouseOut={(e) => e.target.style.backgroundColor = "#444"}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <h2 style={{ textAlign: "center", fontSize: "22px", fontWeight: "bold" }}>
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          Seulgae Portfolio
        </a>
      </h2>

      {/* ✅ 동그란 프로필 이미지 */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <img 
          src="/giltaehyeong.jpg" 
          alt="Profile"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid white",
            boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)", // ✅ 약간의 글로우 효과
          }}
        />
      </div>

      <nav>
        <ul style={{ 
          listStyle: "none", 
          padding: 0,
          textAlign: "center" // ✅ 중앙 정렬
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // ✅ 구분선 추가
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
                onMouseOver={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"} // ✅ hover 효과
                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;