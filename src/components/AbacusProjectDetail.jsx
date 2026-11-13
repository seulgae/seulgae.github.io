import { Fragment } from "react";
import { Link } from "react-router-dom";
import InlineProjectArchitecture from "./InlineProjectArchitecture";
import PosterHeading from "./posters/PosterHeading";
import ProjectRelatedPosts from "./ProjectRelatedPosts";
import ProjectSummaryTable from "./ProjectSummaryTable";
import { paths } from "../routes";

const caseContext = {
  "GW 연동 오류 분석 및 대응 체계 개선": {
    title: "남아 있는 연동 오류를 담당 파트의 조치로 연결",
    problem: ["GW 모니터링에 오류가 남아 있어도, 업무 데이터를 판단할 담당 파트의 조치로 이어지지 않는 경우가 있었습니다.", "미처리 오류가 쌓이면 청구·과금의 월초·월중·월말 운영 작업에도 영향을 줄 수 있었습니다."],
    actions: ["WhaTap 히트맵과 오류 내역으로 실패 패턴을 분류하고, 대응 시나리오와 데이터 보정 스크립트를 정비.", "파트별 미처리 건을 표로 정리해 담당 운영자에게 매일 메일로 공유하고, PL·PM이 같은 현황을 검토할 수 있도록 보고 체계 구축.", "원천 데이터의 NULL·특수문자 등은 발행 파트에 수정·재발행 요청. 업무 데이터의 판단과 보정은 담당 파트와 협의해 처리."],
  },
  "GW 연동 데이터 검증 공통화 및 정합성 대응": {
    title: "발행·응용 컬럼의 차이를 공통 변환 규칙으로 처리",
    problem: ["발행 데이터와 응용 DB 컬럼의 매핑이나 바이트 길이가 맞지 않아 적재에 실패하는 경우가 있었습니다.", "유사한 오류에 반복 대응하는 대신, 연동 과정에 공통으로 적용할 변환 규칙이 필요했습니다."],
    actions: ["Redis의 컬럼 매핑과 메타 테이블을 기준으로 발행 값을 응용 테이블에 맞게 변환하고, 필요한 중간 값은 DTO 필드로 조립.", "대상 컬럼의 바이트 길이에 맞추는 Java 함수를 공통 모듈로 만들고, 메타데이터에 함수명을 등록해 해당 컬럼의 연동에 적용.", "데이터 관리 제약으로 모든 컬럼에 일괄 적용하지는 못했으며, 남은 예외는 담당 파트와 확인·조치."],
  },
  "대용량 데이터 조회 병렬화 및 응답 시간 단축": {
    title: "연관 조회의 순차 대기를 병렬 처리로 개선",
    problem: ["1만 건으로 시작한 테스트에서는 드러나지 않던 지연이, DB 전체에 운영 규모의 테스트 데이터 100만 건을 적재한 뒤 발생했습니다.", "API를 호출한 시점부터 응답 완료까지 약 480,000ms가 걸려 조회 흐름을 개선해야 했습니다."],
    actions: ["반복되는 연관 조회와 결과 조립을 서비스 계층으로 모아 처리 흐름을 정리.", "병렬 스트림으로 독립적인 조회의 DB 대기 시간을 중첩하고, API 호출부터 응답 완료까지의 시간을 비교."],
    note: "SQL 호출 수를 줄인 성과가 아니라, 당시 순차 조회를 병렬화한 결과입니다.",
  },
  "로그인 권한 조회 캐시 구현 및 응답 개선": {
    title: "반복되는 권한 API 호출을 Redis 재사용으로 개선",
    problem: ["사용자 권한을 확인하기 위해 같은 권한 API를 반복 호출하면서 화면·목록 조회에 대기 시간이 쌓였습니다."],
    actions: ["로그인·재로그인 시 권한 API에서 가져온 사용자 권한을 Redis에 저장·갱신.", "이후 요청에서는 저장된 권한을 재사용하고, 해당 권한으로 조회 가능한 업무 목록을 반환하도록 처리."],
  },
};

export default function AbacusProjectDetail({ project }) {
  const platformOnly = project.slug === "cloudxper-billing";
  const metrics = platformOnly
    ? [["대용량 조회 API", "480,000ms → 10,000ms 이내"], ["권한 조회", "반복 호출 → Redis 재사용"]]
    : [["주간 연동 오류", "약 70건 → 5건"], ["인코딩 오류", "95% 감소"], ["신규 연동 실패율", "5% 미만 유지"]];

  return (
    <article className="project-detail-page project-case-page">
      <Link className="project-detail-back" to={paths.projectAnchor(project.slug)}>← 프로젝트 목록</Link>
      <header className="project-detail-header">
        <p className="project-detail-eyebrow">BILLING SERVICE · 운영 및 개선</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <dl className="project-detail-meta">
          <div><dt>소속</dt><dd>{project.affiliation}</dd></div>
          <div><dt>기간</dt><dd>{project.period}</dd></div>
          <div><dt>역할</dt><dd>{project.role}</dd></div>
        </dl>
      </header>

      <ProjectSummaryTable project={project} metrics={metrics} />

      <nav className="project-case-nav" aria-label="프로젝트 상세 목차">
        <a href="#overview">프로젝트 소개</a><a href="#features">주요 기능</a><a href="#architecture">아키텍처·개선 사례</a><a href="#results">결과 및 성과</a>
      </nav>

      <section className="project-case-section" id="overview" aria-labelledby="overview-title">
        <p className="project-case-kicker">01 · OVERVIEW</p><h2 id="overview-title">프로젝트 소개</h2>
        {!platformOnly && <p>통신사 빌링 서비스와 GW 연계 시스템을 운영·유지보수하며, 청구·과금 데이터가 정상적으로 전달되도록 오류 분석과 담당 파트의 조치를 연결했습니다.</p>}
        {platformOnly && <p>기업별 클라우드 저장소 대여 내역과 청구 정보를 관리하는 CloudXper 플랫폼 고도화 프로젝트에 참여했습니다.</p>}
        <p>{platformOnly ? "도메인별 API와 청구 산정 결과 조회 SQL을 구현하고, 대용량 조회와 권한 처리의 병목을 개선했습니다." : "발행·응용 파트의 데이터 정합성을 확인하고, 미처리 오류를 담당 파트의 일일 조치로 연결하는 운영 체계를 만들었습니다."}</p>
      </section>

      <section className="project-case-section" id="features" aria-labelledby="features-title">
        <p className="project-case-kicker">02 · FEATURES</p><h2 id="features-title">주요 기능</h2>
        <div className="project-case-service-areas">
          {!platformOnly && <>
            <div><h3>GW · 대내외 데이터 연계</h3><p>Kafka 이벤트를 수신하고, 발행·응용 파트의 PK와 컬럼 매핑을 맞춰 응용 DB에 반영합니다.</p><p>실패 건은 모니터링과 대사로 확인하고 담당 파트의 보정·재발행으로 연결합니다.</p></div>
            <div><h3>빌링 · 청구 서비스와 배치</h3><p>청구 도메인의 업무 기능, Spring 기반 배치와 API 서비스를 개발·유지보수합니다.</p><p>청구·과금 운영 일정에 맞춰 연동 상태를 점검하고 오류에 대응합니다.</p></div>
          </>}
          {platformOnly && <><div><h3>CloudXper 플랫폼 고도화 · 기업별 대여·청구 관리</h3><p>저장소 대여 내역과 기업별 청구 정보를 관리하는 서비스입니다.</p><p>가입·청구·상품·공통 조회 API와 청구 산정 결과를 조회하는 SQL을 구현했습니다.</p></div>
          <div><h3>CloudXper 플랫폼 고도화 · 사용자 권한 기반 조회</h3><p>권한 API에서 가져온 사용자 권한을 기준으로 조회 가능한 목록을 제공합니다.</p><p>로그인·재로그인 시 Redis 권한 정보를 갱신하고 이후 요청에서 재사용합니다.</p></div></>}
        </div>
      </section>

      <section className="project-case-section" id="architecture" aria-labelledby="architecture-title">
        <p className="project-case-kicker">03 · ARCHITECTURE</p>
        <div className="project-case-section-heading"><PosterHeading titleId="architecture-title" title="시스템 아키텍처 및 개선 사례" helpText="구성 요소를 누르면 연결된 흐름과 역할을 볼 수 있습니다. 작은 화면에서는 그림을 좌우로 이동해 확인하세요." /></div>
        <div className="project-case-studies" id="cases">{project.achievements.map((achievement, index) => {
          const context = caseContext[achievement.title];
          return <Fragment key={achievement.title}>
            {!platformOnly && index === 0 && <InlineProjectArchitecture slug="lgu-billing-gw" label="Kafka GW" figureIds={["gw-events"]} showHelp={false} />}
            {platformOnly && index === 0 && <InlineProjectArchitecture slug="cloudxper-billing" label="플랫폼 고도화" figureIds={["cloud-request"]} showHelp={false} />}
            <article className="project-case-study">
            <header><span>CASE 0{index + 1} · {index < 2 && !platformOnly ? "GW 연동" : "CloudXper 플랫폼 고도화"}</span><h3>{context.title}</h3></header>
            {achievement.title === "대용량 데이터 조회 병렬화 및 응답 시간 단축" && <InlineProjectArchitecture slug="cloudxper-billing" label="조회 병렬화" figureIds={["cloud-performance"]} showHelp={false} />}
            <div className="project-case-step"><h4>발생한 문제</h4>{context.problem.map((line) => <p key={line}>{line}</p>)}</div>
            <div className="project-case-step"><h4>해결 과정</h4>
              <ProjectRelatedPosts layout="actions" posts={achievement.relatedPosts} />
              {context.actions.map((line) => <p key={line}>{line}</p>)}
            </div>
            {context.note && <p className="project-case-note">{context.note}</p>}
            <div className="project-case-outcome"><h4>개선 결과</h4><p>{achievement.result}</p></div>
          </article></Fragment>;
        })}</div>
      </section>

      <section className="project-case-section" id="results" aria-labelledby="results-title">
        <p className="project-case-kicker">04 · RESULTS</p><h2 id="results-title">결과 및 성과</h2>
        <ul className="project-detail-results">{project.achievements.map((achievement) => <li key={achievement.title}><h3>{achievement.title}</h3><p>{achievement.result}</p></li>)}</ul>
      </section>
      <Link className="project-detail-back" to={paths.section("projects")}>← 프로젝트 목록으로 돌아가기</Link>
    </article>
  );
}
