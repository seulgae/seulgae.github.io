import React from "react";
import projects from "./Projects";
import projects2 from "./Projects2";
import projects3 from "./Projects3";
import educationData from "./Education";
import { awards } from "./Awards";
import { licenses } from "./Licenses";
import "../styles/resumePrint.css";

const sourceProjects = [...projects3, ...projects2, ...projects];

const projectEntries = sourceProjects.map((project, index) => {
  const metadata = [
    {
      shortName: "LG U+",
      roleSummary: "통합 빌링 플랫폼 운영, 배치/API/GW 기능 개발 및 장애 대응",
      environment: "Spring Boot, Batch, Kafka, Redis, Oracle, Jenkins, WhaTap",
      contribution: "모니터링과 오류 분석 프로세스를 정리해 반복 장애를 줄이고 운영 처리 시간을 단축했습니다.",
    },
    {
      shortName: "CloudXper",
      roleSummary: "클라우드 통합 관리 플랫폼 백엔드 개발",
      environment: "Spring Boot, REST API, Redis, MySQL, Gradle, React",
      contribution: "대용량 집계 처리와 인증 캐시 구조를 개선해 응답 성능과 유지보수성을 함께 높였습니다.",
    },
    {
      shortName: "국토교통부",
      roleSummary: "전세사기 피해 지원관리 시스템 운영 및 기능 개선",
      environment: "eGovFrame, JSP, jQuery, MyBatis, CUBRID, Linux",
      contribution: "행정 접근성과 운영 자동화 기능을 개선해 품질과 업무 효율을 동시에 올렸습니다.",
    },
  ];

  return {
    ...project,
    ...metadata[index],
  };
});

const strengths = [
  "운영 이슈를 임시 조치로 끝내지 않고 구조 개선으로 연결하는 백엔드 개발",
  "Spring Boot, Batch, REST API 기반 업무 시스템 개발과 유지보수",
  "WhaTap, Kafka, Redis를 활용한 운영 안정화, 성능 개선, 자동화 경험",
  "AI 도구를 활용한 로그 분석과 반복 업무 단축으로 생산성 향상",
];

const summaryItems = [
  { label: "경력", value: "3년+" },
  { label: "역할", value: "SI / SM Backend Developer" },
  { label: "핵심", value: "운영 안정화, 성능 개선, 자동화" },
  { label: "주요 스택", value: "Java, Spring Boot, Batch, MyBatis" },
];

const techStacks = [
  { category: "Back-End", value: "Java, Spring, Spring Boot, Spring Batch, REST API, MyBatis" },
  { category: "Data / Infra", value: "Oracle, MySQL, Redis, Kafka, Linux, Jenkins" },
  { category: "Front / Tools", value: "React, JavaScript, jQuery, Git, Maven, Gradle" },
];

const workStyleItems = [
  {
    title: "장애 대응",
    body: "오류를 개별 건으로 처리하기보다 재발 원인과 대응 흐름까지 정리하는 방식으로 운영합니다.",
  },
  {
    title: "성능 개선",
    body: "집계, 배치, 인증 처리처럼 체감이 큰 병목부터 개선해 수치로 확인 가능한 결과를 만듭니다.",
  },
  {
    title: "협업 방식",
    body: "운영팀과 개발팀이 함께 볼 수 있는 기준과 로그를 남겨 빠르게 공유하고 후속 조치를 연결합니다.",
  },
];

function asText(item) {
  return typeof item === "string" ? item : item.text;
}

function ResumePrint() {
  return (
    <div className="resume-print-page">
      <div className="resume-print-toolbar">
        <div>
          <strong>출력용 이력서</strong>
          <span>Ctrl+P 후 `추가 설정 {" > "} 머리글 및 바닥글`을 끄고, `배경 그래픽`을 켜면 가장 깔끔합니다.</span>
        </div>
        <button type="button" className="resume-print-button" onClick={() => window.print()}>
          인쇄하기
        </button>
      </div>

      <section className="resume-sheet">
        <header className="resume-header">
          <div>
            <span className="resume-eyebrow">Printable Resume</span>
            <h1>길태형</h1>
            <p className="resume-role">Backend Developer</p>
            <p className="resume-intro">
              운영 중 발생하는 문제를 빠르게 수습하는 데서 끝내지 않고, 재발을 줄이는 구조 개선과
              자동화까지 연결해온 SI / SM 중심의 백엔드 개발자입니다.
            </p>
          </div>

          <div className="resume-contact-card">
            <div>
              <span>Phone</span>
              <strong>010-3933-3763</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>r1605866@gmail.com</strong>
            </div>
            <div>
              <span>GitHub</span>
              <strong>github.com/seulgae</strong>
            </div>
            <div>
              <span>Blog</span>
              <strong>doltae.tistory.com</strong>
            </div>
          </div>
        </header>

        <div className="resume-grid resume-top-grid">
          <section className="resume-panel">
            <h2>핵심 역량</h2>
            <ul className="resume-bullet-list">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="resume-panel">
            <h2>요약</h2>
            <div className="resume-summary-grid">
              {summaryItems.map((item) => (
                <div key={item.label} className="resume-summary-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="resume-panel">
          <h2>주요 프로젝트</h2>
          <div className="resume-project-list">
            {projectEntries.map((project) => (
              <article key={project.projectName} className="resume-project-card">
                <div className="resume-project-head">
                  <div>
                    <h3>{project.projectName}</h3>
                    <p>{project.periodAndRole}</p>
                    <p>{project.roleSummary}</p>
                  </div>
                </div>
                <ul className="resume-bullet-list compact">
                  <li>{asText(project.achievements[0])}</li>
                  <li>{project.contribution}</li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-panel">
          <h2>기술 스택</h2>
          <div className="resume-tech-grid">
            {techStacks.map((stack) => (
              <article key={stack.category} className="resume-tech-card">
                <h3>{stack.category}</h3>
                <p>{stack.value}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="resume-sheet">
        <div className="resume-grid resume-bottom-grid">
          <section className="resume-panel">
            <h2>프로젝트별 담당 영역</h2>
            <div className="resume-highlight-list">
              {projectEntries.map((project) => (
                <article key={project.shortName} className="resume-highlight-card">
                  <h3>{project.shortName}</h3>
                  <p>{project.environment}</p>
                  <p>{project.mainTasks[0]}</p>
                </article>
              ))}
            </div>

            <div className="resume-workstyle-list">
              {workStyleItems.map((item) => (
                <article key={item.title} className="resume-highlight-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-side-column">
            <section className="resume-panel">
              <h2>교육</h2>
              <div className="resume-simple-list">
                {educationData.map((item) => (
                  <article key={`${item.school}-${item.period}`}>
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                    <span>{item.period}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-panel">
              <h2>수상 및 자격</h2>
              <div className="resume-simple-list">
                {awards.map((item) => (
                  <article key={`${item.title}-${item.date}`}>
                    <h3>{item.title}</h3>
                    <span>{item.date}</span>
                  </article>
                ))}
                {licenses.map((item) => (
                  <article key={`${item.title}-${item.date}`}>
                    <h3>{item.title}</h3>
                    <span>{item.date}</span>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default ResumePrint;
