import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <div className="content">
        <div className="icon astronaut"></div>
        <h1 className="title">Seulgae's Dev Universe 🌌</h1>
        <p className="subtitle">"코드를 통해 세상을 바꾸고, 기술을 통해 미래를 만듭니다."</p>
        <p className="skills">
          주요 기술: Spring Boot ⚡ React 🎨 Kafka 🚀 Redis ⚙️ Oracle 📊 MySQL 🔍
        </p>
        <div className="icons">
          <div className="icon code"></div>
          <div className="icon rocket"></div>
          <div className="icon lightbulb"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
