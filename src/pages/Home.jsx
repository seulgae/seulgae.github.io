import React from "react";
import "../styles/home.css"

function Home() {
  return (
    <div className="container">
      <div className="content">
        {/* 헤더 아이콘 */}
        <div className="icon astronaut"></div>

        {/* 제목 & 부제 */}
        <h1 className="title">Seulgae's Dev Universe 🌌</h1>
        <p className="subtitle">
          "코드를 통해 세상을 바꾸고, 기술을 통해 미래를 만듭니다."
        </p>

        {/* 자기소개 섹션 */}
        <div className="section">
          <h2>👨‍💼 자기소개</h2>
          <p>
            안녕하세요, 백엔드 중심으로 개발하고 있는 길태형 입니다.<br />
            문제 해결을 즐기며, 사용자와 운영자 모두를 고려한 개발을 추구합니다.<br />
            실용적인 코드, 안정적인 시스템을 지향하며, 협업을 통해 성장하는 개발자가 되고자 합니다.<br />
          </p>
        </div>

        <div className="section">
          <h2>💡 개발자가 되고 싶었던 계기</h2>
          <p>
            어릴 적부터 무언가를 만들고 구현하는 걸 좋아했습니다. <br />
            대학교에서 소프트웨어를 접하면서 무에서 유를 만들어내는 프로그래밍의 매력에 빠지게 되었고, <br />
            그 순간부터 개발자의 길을 걷기 시작했습니다.
          </p>
        </div>

        <div className="section">
          <h2>💪 개발자 성장 과정</h2>
          <p>
            LG CNS 협력 프로젝트를 통해 다양한 운영/개발 업무를 경험하며 실무 역량을 키웠습니다. <br />
            특히 청구 시스템, 요금 시뮬레이션, 클라우드 자원관리 시스템 등 실질적인 문제를 해결하며 탄탄한 백엔드 기반을 다졌습니다. <br />
            실수도 많았지만, 그 과정을 통해 서비스의 안정성과 성능을 동시에 고려하는 마인드를 갖게 되었습니다.
          </p>
        </div>

        <div className="section">
          <h2>🌱 앞으로의 다짐</h2>
          <p>
            이제는 누군가 만든 시스템을 운영하는 수준을 넘어, <strong>설계부터 구현까지 전 과정을 주도하는 개발자</strong>가 되고 싶습니다. <br />
            나만의 구조, 나만의 코드로 문제를 해결하는 프로그램을 만들어가며, <br />
            <strong>명확한 설계와 효율적인 구현을 통해 가치 있는 서비스를 제공</strong>하는 개발자로 성장하겠습니다.
          </p>
        </div>

        <div className="section">
          {/* 기술 스택 */}
          <div className="tech-section">
            <h2>🚀 기술 스택</h2>

            {/* 백엔드 */}
            <h3>🔧 Back-End</h3>
            <div className="tech-grid">
              <span className="tech-item">Spring</span>
              <span className="tech-item">Spring Boot</span>
              <span className="tech-item">Spring Batch</span>
              <span className="tech-item">Rest API</span>
              <span className="tech-item">Redis</span>
              <span className="tech-item">Kafka</span>
              <span className="tech-item">MyBatis</span>
              <span className="tech-item">JPA</span>
              <span className="tech-item">RDBMS</span>
              <span className="tech-item">Oracle</span>
              <span className="tech-item">MySQL</span>
            </div>

            {/* 프론트엔드 */}
            <h3>🎨 Front-End</h3>
            <div className="tech-grid">
              <span className="tech-item">React</span>
              <span className="tech-item">Thymeleaf</span>
              <span className="tech-item">HTML + CSS + JS</span>
              {/*<span className="tech-item">Vue</span>*/}
            </div>

            {/* 기타 / 인프라 */}
            <h3>🛠 기타 / 인프라</h3>
            <div className="tech-grid">
              <span className="tech-item">Linux</span>
              <span className="tech-item">Maven</span>
              <span className="tech-item">Gradle</span>
              <span className="tech-item">Git</span>
            </div>
          </div>
        </div>

        {/* 연락처 및 이메일 섹션 */}
        <div className="section">
          <h2>📞 연락처</h2>
          <p>
            전화번호: <a href="tel:+82-10-3933-3763">010-3933-3763</a>
          </p>
          <h2>📧 이메일</h2>
          <p>
            이메일: <a href="mailto:r1605866@gmail.com">r1605866@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
