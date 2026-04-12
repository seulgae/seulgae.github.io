import React from "react";
import educationData from "./Education";
import { awards } from "./Awards";
import { licenses } from "./Licenses";
import "../styles/resumePrint.css";

const profileRows = [
  ["이름", "길태형"],
  ["생년월일", "1996년 8월 16일생 (만 29세)"],
  ["직무", "Backend Developer"],
  ["경력", "3년+"],
  ["핵심 키워드", "운영 안정화, 성능 개선, 자동화"],
  ["연락처", "010-3933-3763 / r1605866@gmail.com"],
  ["링크", "github.com/seulgae / doltae.tistory.com"],
];

const strengths = [
  "운영 이슈를 임시 대응으로 끝내지 않고, 재발 방지 구조와 자동화까지 연결합니다.",
  "Spring Boot, Batch, REST API 기반 업무 시스템 개발과 운영 안정화 경험을 보유하고 있습니다.",
  "모니터링, 로그 분석, 배치 자동화, 성능 개선을 통해 수치로 확인되는 결과를 만들어왔습니다.",
];

const projects = [
  {
    name: "전세사기 피해 지원관리시스템 운영·개발",
    period: "2025.09 - 재직중",
    role: "시스템 운영 · 기능 개선",
    tasks: [
      "요청 기반 개선 대응 및 오류 분석, 기능 유지보수·자동화 수행",
      "서버 용량 점검, 파일 관리, 리소스 모니터링 등 인프라 운영",
      "SVN 기반 JAR 패키징 및 SFTP/SSH 활용 운영 환경 배포",
    ],
    achievements: [
      "웹 접근성 전수 개선(31개 화면) 및 WAI-ARIA 적용으로 준수율 99.7% 달성",
      "34건의 결함 개선 조치와 오류 분석·보완으로 월 평균 오류 신고 접수율 3건 미만 유지",
      "민원 처리 시스템 결함 개선과 기능 고도화로 오류 신고·중복 접수 감소",
    ],
  },
  {
    name: "CloudXper 빌링 통합 관리 플랫폼 고도화",
    period: "2024.10 - 2025.02",
    role: "플랫폼 서버 백엔드 개발",
    tasks: [
      "가입, 청구, 상품, 공통 조회 등 주요 REST API 설계·개발",
      "프로젝트 구조 표준 정의 및 코드 리팩토링 후 팀 공유·적용",
      "OAuth 사용자 인증 정보 Redis 캐싱 기반 권한 모듈 개발",
    ],
    achievements: [
      "병렬 처리 구조 적용으로 대용량 집계 처리 성능 87% 개선",
      "Redis 기반 인증·권한 캐싱 구조 설계로 처리 성능과 유지보수성 향상",
      "Builder Pattern 기반 구조 정리로 중복 로직 제거 및 유지보수성 강화",
    ],
  },
  {
    name: "LG U+ 통합 빌링 플랫폼 운영 및 유지보수",
    period: "2022.11 - 2025.04",
    role: "시스템 운영 · 기능 개발",
    tasks: [
      "Kafka Topic 기반 데이터 처리, GW 연동 모니터링, 장애 대응 체계 운영",
      "빌링 요금·위약금 조회 및 전자세금계산서·청구 API 개발",
      "Spring Batch 기반 배치 처리 및 리포팅 자동화 시스템 운영",
    ],
    achievements: [
      "WhaTap 기반 오류 분석 및 재처리 프로세스 구축으로 Kafka 연동 오류 93% 감소",
      "Oracle·MySQL 인코딩 처리 로직 개선으로 데이터 오류 95% 이상 감소",
      "배치·리포팅 자동화로 업무 처리 시간을 80% 이상 단축",
    ],
  },
];

const techRows = [
  ["Back-End", "Java, Spring, Spring Boot, Spring Batch, REST API, MyBatis"],
  ["Data / Infra", "Oracle, MySQL, Redis, Kafka, Linux, Jenkins, WhaTap"],
  ["Front / Tools", "React, JavaScript, jQuery, Git, Maven, Gradle, DBeaver"],
];

const printEducation = [...educationData];
const printAwards = [...awards];
const printLicenses = [...licenses];
const firstPageProjects = projects.slice(0, 2);
const secondPageProjects = projects.slice(2);

function ResumePrint() {
  return (
    <div className="resume-print-page">
      <div className="resume-print-toolbar">
        <div>
          <strong>출력용 이력서</strong>
          <span>Ctrl+P 후 A4, 배율 기본값, 머리글/바닥글 끔 기준으로 2장 출력에 맞춰 구성했습니다.</span>
        </div>
        <button type="button" className="resume-print-button" onClick={() => window.print()}>
          인쇄하기
        </button>
      </div>

      <section className="resume-paper">
        <header className="resume-doc-header">
          <div>
            <p className="resume-doc-eyebrow">Printable Resume</p>
            <h1>길태형</h1>
            <p className="resume-doc-role">Backend Developer</p>
          </div>
          <p className="resume-doc-intro">
            운영 환경에서 발생하는 문제를 빠르게 수습하는 데서 끝내지 않고, 재발을 줄이는 구조 개선과
            자동화까지 연결해온 SI / SM 중심의 백엔드 개발자입니다.
          </p>
        </header>

        <section className="resume-doc-section">
          <h2>기본 정보</h2>
          <table className="resume-table resume-table-profile">
            <tbody>
              {profileRows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resume-doc-section">
          <h2>핵심 요약</h2>
          <ul className="resume-doc-list">
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="resume-doc-section">
          <h2>경력 기술서</h2>
          {firstPageProjects.map((project) => (
            <article key={project.name} className="resume-project-entry">
              <div className="resume-project-title-row">
                <h3>{project.name}</h3>
                <span>
                  {project.period} / {project.role}
                </span>
              </div>
              <table className="resume-table resume-project-table">
                <tbody>
                  <tr>
                    <th scope="row">주요 업무</th>
                    <td>
                      <ul className="resume-doc-list compact">
                        {project.tasks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">주요 성과</th>
                    <td>
                      <ul className="resume-doc-list compact">
                        {project.achievements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          ))}
        </section>
      </section>

      <section className="resume-paper page-break">
        <section className="resume-doc-section">
          <h2>경력 기술서</h2>
          {secondPageProjects.map((project) => (
            <article key={project.name} className="resume-project-entry">
              <div className="resume-project-title-row">
                <h3>{project.name}</h3>
                <span>
                  {project.period} / {project.role}
                </span>
              </div>
              <table className="resume-table resume-project-table">
                <tbody>
                  <tr>
                    <th scope="row">주요 업무</th>
                    <td>
                      <ul className="resume-doc-list compact">
                        {project.tasks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">주요 성과</th>
                    <td>
                      <ul className="resume-doc-list compact">
                        {project.achievements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          ))}
        </section>

        <section className="resume-doc-section">
          <h2>기술 스택</h2>
          <table className="resume-table">
            <tbody>
              {techRows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resume-doc-section">
          <h2>교육</h2>
          <table className="resume-table">
            <thead>
              <tr>
                <th>과정</th>
                <th>기관</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              {printEducation.map((item) => (
                <tr key={`${item.school}-${item.period}`}>
                  <th scope="row">{item.degree}</th>
                  <td>{item.school}</td>
                  <td>{item.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resume-doc-section">
          <h2>수상</h2>
          <table className="resume-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>일자</th>
              </tr>
            </thead>
            <tbody>
              {printAwards.map((item) => (
                <tr key={`${item.title}-${item.date}`}>
                  <th scope="row">{item.title}</th>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resume-doc-section">
          <h2>자격</h2>
          <table className="resume-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>취득일</th>
              </tr>
            </thead>
            <tbody>
              {printLicenses.map((item) => (
                <tr key={`${item.title}-${item.date}`}>
                  <th scope="row">{item.title}</th>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
}

export default ResumePrint;
