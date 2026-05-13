import React from "react";
import "../styles/home.css";

const highlights = [
  {
    label: "운영 안정화",
    value: "주간 오류 93% 감소",
  },
  {
    label: "성능 개선",
    value: "10분 -> 1분 15초",
  },
  {
    label: "업무 효율화",
    value: "AI 기반 로그 분석 및 업무 효율 60% 향상",
  },
];

const principles = [
  "장애 대응보다 재발 방지 중심의 구조 개선",
  "모니터링과 보고 체계를 통한 빠른 운영 피드백",
  "AI 도구를 개발·운영 프로세스에 실용적으로 통합",
];

function Home() {
  return (
    <div className="home-page">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">About Me</span>
          <h1 className="title">안정성은 견고하게, 운영은 스마트하게</h1>
          <p className="subtitle">
            시스템의 잠재적 리스크를 줄이고, 운영 효율을 기술로 개선해온 3년 차 백엔드
            개발자 길태형입니다.
          </p>
          <p className="hero-summary">
            서비스의 가치는 단순한 구축이 아니라 안정적인 운영 과정에서 완성된다고
            생각합니다. 운영 환경에서 반복되는 문제를 구조적으로 줄이고, 팀이 더 빠르게
            인지하고 대응할 수 있는 흐름을 만드는 데 집중해왔습니다.
          </p>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-title">Core Outcomes</div>
          <div className="highlight-list">
            {highlights.map((item) => (
              <div key={item.label} className="highlight-item">
                <span className="highlight-label">{item.label}</span>
                <strong className="highlight-value">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="section-heading">
          <span className="section-index">01</span>
          <h2>운영 관점에서 문제를 해결해왔습니다</h2>
        </div>
        <div className="story-grid">
          <article className="story-card">
            <h3>LG U+ 빌링 및 GW 시스템</h3>
            <p>
              LG U+ 빌링 및 GW 시스템을 운영하면서, 장애가 발생한 뒤 대응하는 방식보다
              문제가 반복되지 않도록 구조적으로 개선하는 것이 더 중요하다고 느꼈습니다.
            </p>
            <p>
              WhaTap 기반 실시간 모니터링을 구축하고, Kafka 연동 오류 발생 내역을 집계해
              일일 단위로 운영자에게 공유하는 보고 체계를 만들었습니다.
            </p>
            <p>
              오류 자체보다도 공유와 조치까지 시간이 오래 걸리는 점이 더 큰 문제였기
              때문에, 각 파트 운영자가 빠르게 인지하고 대응할 수 있도록 프로세스를
              정리했습니다. 그 결과 주간 오류 발생 건수를 약 93% 감소시켰습니다.
            </p>
          </article>

          <article className="story-card accent-card">
            <h3>개선 원칙</h3>
            <ul className="principle-list">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section story-section">
        <div className="section-heading">
          <span className="section-index">02</span>
          <h2>레거시 한계를 그대로 두지 않았습니다</h2>
        </div>
        <div className="story-grid two-column">
          <article className="story-card">
            <h3>CloudXper 플랫폼 고도화</h3>
            <p>
              실제 운영에서 느낀 병목을 그대로 받아들이지 않고, 구조를 바꿔 성능을
              개선하는 데 집중했습니다.
            </p>
            <p>
              CloudXper 플랫폼 고도화 프로젝트에서는 Parallel Stream 기반 병렬 처리
              구조를 적용해 대용량 집계 처리 시간을 10분에서 1분 15초까지 단축했습니다.
            </p>
          </article>

          <article className="story-card">
            <h3>국토교통부 전세사기 지원관리시스템</h3>
            <p>
              AI 개발 도구(Cursor, Claude)를 활용해 구현 및 문제 해결 시간을 단축하고 유지보수 효율을 개선했습니다.
            </p>
            <p>
              AI 도구를 단순 보조가 아니라 개발과 운영 과정에 적극적으로 활용해 공수
              자체를 줄였고, 확보한 시간을 다른 기능 개발과 개선 작업에 재투자할 수
              있었습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section closing-section">
        <div className="section-heading">
          <span className="section-index">03</span>
          <h2>지향점</h2>
        </div>
        <p className="closing-copy">
          운영 환경에서 발생하는 문제를 기술로 해결하는 경험을 쌓아오며, 단순히
          동작하는 코드가 아니라 오랫동안 안정적으로 운영되는 시스템을 만드는 개발자를
          지향하게 되었습니다.
          <br />
          이 경험을 바탕으로 서비스가 더 안정적으로 성장하는 데 기여하고 싶습니다.
        </p>
      </section>

      <section className="section tech-shell">
        <div className="section-heading">
          <span className="section-index">04</span>
          <h2>기술 스택</h2>
        </div>

        <div className="tech-columns">
          <div className="tech-group">
            <h3>Back-End</h3>
            <div className="tech-grid">
              <span className="tech-item">Spring</span>
              <span className="tech-item">Spring Batch</span>
              <span className="tech-item">Kafka</span>
              <span className="tech-item">Thymeleaf</span>
              <span className="tech-item">MyBatis</span>
              <span className="tech-item">Oracle</span>
              <span className="tech-item">MySQL</span>
            </div>
          </div>

          <div className="tech-group">
            <h3>Front-End</h3>
            <div className="tech-grid">
              <span className="tech-item">React</span>
              <span className="tech-item">HTML/CSS</span>
              <span className="tech-item">JS</span>
            </div>
          </div>

          <div className="tech-group">
            <h3>Tools</h3>
            <div className="tech-grid">
              <span className="tech-item">Linux</span>
              <span className="tech-item">Git</span>
              <span className="tech-item">Maven</span>
              <span className="tech-item">Gradle</span>
              <span className="tech-item">WhaTap</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
