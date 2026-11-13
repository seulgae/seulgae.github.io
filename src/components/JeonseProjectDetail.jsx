import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import InlineProjectArchitecture from "./InlineProjectArchitecture";
import PosterHeading from "./posters/PosterHeading";
import ProjectRelatedPosts from "./ProjectRelatedPosts";
import ProjectSummaryTable from "./ProjectSummaryTable";
import ProjectDetailActions from "./ProjectDetailActions";
import { paths } from "../routes";

const cases = [
  {
    title: "보안 취약점과 망간 연계 SQL 개선",
    problem: ["CodeRay 검출 항목과 웹 취약점 점검에 대한 조치가 필요했습니다.", "코드를 수정한 뒤에도 기존 화면 동작과 망간 연계 데이터가 유지되는지 확인해야 했습니다."],
  },
  {
    title: "53초가 걸리던 접수 목록 조회 개선",
    problem: ["운영 행정망의 접수 목록 조회에 53초가 걸렸습니다.", "담당자가 업무 데이터를 확인할 때마다 대기 시간이 발생해 조회 성능 개선이 필요했습니다."],
  },
  {
    title: "수동 서버 점검을 주기 수집 화면으로 전환",
    problem: ["서버마다 접속해 사용량을 확인하고, 월말 보고 자료를 수기로 정리해야 했습니다.", "SSH 수집을 구현하는 과정에서는 JSch와 대상 서버 간 암호화 알고리즘 협상이 실패했습니다."],
  },
];

const securityPostOrder = [
  "claude-assisted-security-remediation", "cwe-79-xss-remediation", "cwe-476-null-dereference",
  "cwe-330-489-dead-code-removal", "cwe-209-error-message-exposure",
  "dynamic-to-static-sync-query", "cwe-615-sensitive-comments",
];

export default function JeonseProjectDetail({ project, showMobileBack = false }) {
  return (
    <article className="project-detail-page project-case-page">
      <Link className="project-detail-back" to={paths.projectAnchor(project.slug)}>← 프로젝트 목록</Link>
      <header className="project-detail-header">
        <p className="project-detail-eyebrow">PUBLIC SERVICE · 운영 및 개선</p>
        <h1>{project.title}</h1>
        <p>피해자 지원 업무가 안정적으로 이어지도록 보안 취약점, 조회 지연과 반복 점검 업무를 개선했습니다.</p>
        <dl className="project-detail-meta">
          <div><dt>소속</dt><dd>{project.affiliation}</dd></div>
          <div><dt>기간</dt><dd>{project.period}</dd></div>
          <div><dt>역할</dt><dd>{project.role}</dd></div>
        </dl>
      </header>

      <ProjectSummaryTable project={project} metrics={[["SAST 검출", "358건 → 4건"], ["목록 조회", "53초 → 1초 미만"], ["서버 점검", "수동 → 4시간 주기 수집"]]} />

      <section className="project-case-section" id="overview" aria-labelledby="overview-title">
        <p className="project-case-kicker">01 · OVERVIEW</p><h2 id="overview-title">프로젝트 소개</h2>
        <p><strong>피해 신청부터 심의·의결, 결정문 발급과 진위확인까지 연결하는 공공 서비스입니다.</strong></p>
        <p>피해자는 온라인으로 신청하고 처리 현황과 결정 결과를 확인합니다.<br />행정기관은 접수된 피해 건을 조사·심의하고, 지원기관은 결정의 진위를 확인해 후속 지원에 활용합니다.</p>
        <p>이 시스템의 운영·유지보수를 담당하며 보안 점검 조치, 목록 조회 성능 개선과 서버 점검 자동화를 수행했습니다.</p>
        <figure className="project-case-preview">
          <a href="https://jeonse.kgeop.go.kr/" target="_blank" rel="noopener noreferrer">
            <img src="/jeonse-service-preview.jpg" alt="전세사기피해자 지원관리시스템 공개 메인 화면 — 결정신청 현황, 결정문 출력, 이의신청 메뉴" width="1265" height="712" loading="lazy" />
          </a>
          <figcaption>대민 서비스 공개 화면 <a href="https://jeonse.kgeop.go.kr/" target="_blank" rel="noopener noreferrer">서비스 바로가기 <FiArrowUpRight aria-hidden="true" /></a></figcaption>
        </figure>
      </section>

      <section className="project-case-section" id="features" aria-labelledby="features-title">
        <p className="project-case-kicker">02 · FEATURES</p><h2 id="features-title">주요 기능</h2>
        <div className="project-case-service-areas">
          <div><h3>대국민망 · 피해 신청과 진행 조회</h3>
            <p>본인인증 후 피해 내용과 임대차계약서 등 첨부 서류를 등록합니다.</p>
            <p>나의민원에서 접수·조사·심의 진행 현황을 확인하고, 이의·경정·철회 신청 등 후속 민원을 처리합니다.</p>
          </div>
          <div><h3>행정망 · 접수·조사와 심의·의결</h3>
            <p>광역시·도에서 피해 건을 접수·조사하고, 국토교통부 위원회의 심의·의결로 이어집니다.</p>
            <p>피해자 결정과 결정문 작성·송달을 거쳐 신청자가 결과를 확인할 수 있도록 관리합니다.</p>
          </div>
          <div><h3>대국민망 · 결정문 조회와 출력</h3>
            <p>결정 통지 후 본인확인을 거쳐 결정문을 조회·출력합니다.</p>
            <p>신청자는 결정문을 관련 지원 정책에 필요한 증빙으로 활용할 수 있습니다.</p>
          </div>
          <div><h3>지원기관 · 피해자 결정 진위확인</h3>
            <p>은행·법원 등 지원기관은 기관사용자 등록과 승인을 거쳐 조회합니다.</p>
            <p>피해자 성명과 결정번호를 대조하고, 경정·철회 등 변경 이력이 반영된 최종 결정 결과를 확인합니다.</p>
          </div>
        </div>
        <ol className="project-case-workflow" aria-label="피해 신청 및 행정 처리 흐름">
          {["피해 신청", "광역시·도 접수·조사", "국토부 위원회 심의·의결", "결정문 조회·출력"].map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="project-case-section" id="architecture" aria-labelledby="architecture-title">
        <p className="project-case-kicker">03 · ARCHITECTURE</p>
        <div className="project-case-section-heading"><PosterHeading titleId="architecture-title" title="시스템 아키텍처" helpText="구성 요소를 누르면 연결된 흐름과 역할을 볼 수 있습니다. 모바일에서는 구성 요소와 연결 흐름을 세로로 확인할 수 있습니다." /></div>
        <p>대민 서비스와 업무망을 구분하고, 망간 데이터 연계 흐름을 나타냈습니다.</p>
        <InlineProjectArchitecture slug={project.slug} label="전체 시스템 구성" figureIds={["public-network"]} showHelp={false} />
      </section>

      <section className="project-case-section" id="cases" aria-labelledby="cases-title">
        <p className="project-case-kicker">04 · PROBLEM SOLVING</p><h2 id="cases-title">주요 문제 해결 사례</h2>
        <div className="project-case-studies">{project.achievements.map((achievement, index) => (
          <article className="project-case-study" key={achievement.title}>
            <header><span>CASE 0{index + 1}</span><h3>{cases[index].title}</h3></header>
            {achievement.architectureSlug && <InlineProjectArchitecture slug={achievement.architectureSlug} label={achievement.architectureLabel} figureIds={achievement.architectureFigures} showHelp={false} />}
            <div className="project-case-step"><h4>발생한 문제</h4>{cases[index].problem.map((line) => <p key={line}>{line}</p>)}</div>
            <div className="project-case-step"><h4>해결 과정</h4>
              <ProjectRelatedPosts layout="actions" featuredFirst={index === 0} posts={index === 0 ? [...achievement.relatedPosts].sort((a, b) => securityPostOrder.indexOf(a.slug) - securityPostOrder.indexOf(b.slug)) : achievement.relatedPosts} />
              {achievement.detail.split("\n").map((line) => <p key={line}>{line}</p>)}
            </div>
            {index === 2 && <p className="project-case-note">서버의 보안 설정을 낮추는 대신, 대상 환경과 호환되는 Apache MINA SSHD로 클라이언트를 교체했습니다.</p>}
            <div className="project-case-outcome"><h4>개선 결과</h4><p>{achievement.result}</p></div>
          </article>
        ))}</div>
      </section>

      <section className="project-case-section" id="results" aria-labelledby="results-title">
        <p className="project-case-kicker">05 · RESULTS</p><h2 id="results-title">결과 및 성과</h2>
        <ul className="project-detail-results">{project.achievements.map((achievement) => <li key={achievement.title}><h3>{achievement.title}</h3><p>{achievement.result}</p></li>)}</ul>
      </section>
      {showMobileBack && <ProjectDetailActions slug={project.slug} />}
    </article>
  );
}
