import { Link } from "react-router-dom";
import profile, { getBirthLabel } from "../data/profile";
import projects from "../data/projects";
import education from "../data/education";
import awards from "../data/awards";
import licenses from "../data/licenses";
import { paths } from "../routes";
import "../styles/pageShell.css";
import "../styles/home.css";

const kpiMetrics = [
  {
    value: "384만 건",
    label: "무중단 개인정보 암호화",
    detail: "csql · nohup 분할 커밋 패치",
    postSlug: "csql-nohup-mass-patch",
  },
  {
    value: "53초 → 1초 미만",
    label: "Slow Query 인덱스 튜닝",
    detail: "실행계획 분석 · 복합 인덱스 설계",
    postSlug: "cubrid-query-plan-index-tuning",
  },
  {
    value: "358건 → 4건",
    label: "SAST 보안 취약점 감축",
    detail: "CWE 유형별 구조 개선 · 데드코드 제거",
    postSlug: "cwe-476-null-dereference",
  },
  {
    value: "87% · 93%",
    label: "100만 건 응답 단축 · Kafka 오류 감소",
    detail: "10분→1분 15초 / 주간 70건→5건 미만",
    postSlug: "kafka-gw-data-integrity",
  },
];

const projectBlogMappings = {
  "jeonse-support-system": {
    achievementPosts: {
      "CodeRay 기반 SAST 취약점 전수 분석 및 시큐어코딩 개선": [
        { slug: "cwe-79-xss-remediation", label: "CWE-79 XSS 200건 조치" },
        { slug: "cwe-476-null-dereference", label: "CWE-476 NPE 공통 유틸 해결" },
        { slug: "cwe-330-489-dead-code-removal", label: "CWE-330·489 미사용 코드 제거" },
        { slug: "cwe-209-error-message-exposure", label: "CWE-209 오류 메시지 노출 방지" },
      ],
      "국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화": [
        { slug: "dynamic-to-static-sync-query", label: "망간 동기화 정적 쿼리 전환기" },
        { slug: "cwe-615-sensitive-comments", label: "주석 민감정보 제거 & 암호화" },
      ],
      "개인정보 대량 암호화 패치 및 CI값 보안 강화": [
        { slug: "csql-nohup-mass-patch", label: "csql·nohup 수백만 건 무중단 패치" },
      ],
      "운영 행정망 Slow Query 분석 및 인덱스 튜닝": [
        { slug: "cubrid-query-plan-index-tuning", label: "53초 조회 CUBRID 복합 인덱스 설계" },
      ],
      "인프라 용량 관리 모니터링 자동화 및 점검 프로세스 표준화": [
        { slug: "jsch-to-mina-sshd", label: "JSch 협상 실패와 MINA SSHD 전환" },
      ],
    },
  },
  "cloudxper-billing": {
    achievementPosts: {
      "대용량 데이터 조회 성능 최적화": [
        { slug: "mybatis-builder-parallel-refactoring", label: "100만 건 N+1 병렬화와 한계 회고" },
      ],
      "Redis 기반 인증 아키텍처 최적화": [
        { slug: "redis-permission-cache-ttl", label: "Redis 권한 캐시와 세션 TTL 동기화" },
      ],
      "코드 리팩토링 및 개발 컨벤션 표준화": [
        { slug: "mybatis-builder-parallel-refactoring", label: "Map 제거 · DTO/Model 계층 분리" },
      ],
    },
  },
  "lgu-billing-gw": {
    achievementPosts: {
      "Kafka 연동 오류 모니터링 체계 구축 및 대응 시나리오 표준화": [
        { slug: "kafka-gw-data-integrity", label: "Kafka 도메인 GW 데이터 정합성 지키기" },
      ],
      "이기종 DB 연동 유지보수 및 데이터 정합성 자동 검증": [
        { slug: "kafka-gw-data-integrity", label: "원천 분할·PK 변환 및 대사 보정" },
      ],
      "청구 도메인 기반 요금·위약금 조회 API 신규 개발": [
        { slug: "oracle-hint-subquery-fullscan", label: "Oracle 묵시적 형변환 & 실행계획 튜닝" },
        { slug: "sxssf-vs-xssf-excel-download", label: "XSSF vs SXSSF 대용량 엑셀 기준" },
      ],
    },
  },
};

const skillHighlights = [
  {
    category: "Backend & Architecture",
    summary: "엔터프라이즈 비즈니스 로직 구현, 계층 분리 리팩토링 및 배치·비동기 연동",
    tags: ["Java", "Spring Boot", "eGovFrame 4.1", "Spring Batch", "MyBatis", "REST API", "JSP/JSTL", "Apache MINA SSHD"],
    evidence: "Map 기반 레거시 계층화(DTO/Model/Builder), SSH 비동기 타임아웃 제어 및 도메인 GW 변환 설계",
  },
  {
    category: "Database & Performance",
    summary: "실행계획(EXPLAIN) 기반 슬로우 쿼리 튜닝, 복합 인덱스 설계 및 무중단 대량 DML",
    tags: ["Oracle", "MySQL", "CUBRID", "Redis", "SQLD"],
    evidence: "CUBRID 53초→1초 미만 복합 인덱스, Oracle 묵시적 형변환 튜닝, Redis 세션 TTL 동기화 캐싱(10초→0.1초)",
  },
  {
    category: "Messaging · Infra · Security",
    summary: "이벤트 기반 데이터 정합성(DI) 관리, SAST 시큐어코딩 및 리눅스 운영 자동화",
    tags: ["Apache Kafka", "Linux", "WhaTap", "Damo", "Jasypt", "CodeRay SAST", "Jenkins", "Git / SVN"],
    evidence: "Kafka 주간 오류 93% 감소, 384만 건 무중단 암호화 패치, SAST 취약점 358건→4건 감축",
  },
];

function splitSkillTokens(skills) {
  return skills.flatMap((group) =>
    group.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function ExperienceItem({ project }) {
  const mapping = projectBlogMappings[project.slug] || {};
  const skillTokens = splitSkillTokens(project.skills);

  return (
    <article className="resume-timeline-item" id={`project-${project.slug}`}>
      <aside className="resume-timeline-meta">
        <span className="resume-period">{project.period}</span>
        <h3 className="resume-project-title">
          <Link to={paths.project(project.slug)}>{project.title}</Link>
        </h3>
        <span className="resume-role-badge">{project.role}</span>
        <p className="resume-project-desc">{project.description}</p>
      </aside>

      <div className="resume-timeline-content">
        <div className="resume-skill-pills" aria-label="사용 기술">
          {skillTokens.map((token) => (
            <span key={token} className="resume-skill-pill">
              {token}
            </span>
          ))}
        </div>

        <div className="resume-content-block">
          <h4 className="resume-block-label">주요 담당 업무</h4>
          <ul className="resume-task-list">
            {project.mainTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>

        <div className="resume-content-block">
          <h4 className="resume-block-label">핵심 기술 성과 및 트러블슈팅</h4>
          <ul className="resume-achievement-list">
            {project.achievements.map((ach) => {
              const relatedPosts = mapping.achievementPosts?.[ach.title] || [];

              return (
                <li key={ach.title} className="resume-achievement-card">
                  <div className="resume-achievement-header">
                    <strong className="resume-achievement-title">{ach.title}</strong>
                    {ach.result ? (
                      <span className="resume-achievement-result">{ach.result}</span>
                    ) : null}
                  </div>
                  {ach.detail ? (
                    <p className="resume-achievement-detail">{ach.detail}</p>
                  ) : null}

                  {(relatedPosts.length > 0 || ach.references?.length > 0) ? (
                    <div className="resume-evidence-links">
                      {relatedPosts.map((post) => (
                        <Link
                          key={post.slug}
                          to={paths.blogPost(post.slug)}
                          className="evidence-chip blog-chip"
                        >
                          📝 기술 블로그: {post.label} →
                        </Link>
                      ))}
                      {ach.references?.map((ref) => (
                        <a
                          key={ref.href}
                          href={ref.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="evidence-chip news-chip"
                        >
                          📰 관련 보도: {ref.text} ↗
                        </a>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="resume-arch-toggle-wrap">
          <Link
            to={paths.project(project.slug)}
            className="resume-arch-toggle-btn"
          >
            <span>📊 시스템 아키텍처 & 데이터 흐름 다이어그램 자세히 보기</span>
            <span className="toggle-hint">상세 페이지 이동 →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function HomePage() {
  return (
    <div className="page-shell home-page portfolio-stream">
      {/* 1. HERO PROFILE & KPI SUMMARY */}
      <section className="hero-card stream-hero">
        <div className="stream-hero-top">
          <div className="stream-hero-identity">
            <span className="eyebrow">
              {profile.role} · {profile.badge} ({profile.careerSummary})
            </span>
            <h1 className="title">
              복잡한 운영 이슈를 구조적으로 해결하는
              <br />
              백엔드 개발자 {profile.name}입니다.
            </h1>
            <p className="subtitle">{profile.intro}</p>

            <ul className="stream-strength-list">
              {profile.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="stream-contact-bar">
              <a href={`mailto:${profile.email}`} className="contact-pill">
                ✉️ {profile.email}
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill"
              >
                💻 GitHub (@seulgae) ↗
              </a>
              <Link to={paths.blog} className="contact-pill primary">
                📚 기술 블로그 →
              </Link>
              <Link to={paths.resume} className="contact-pill">
                🖨️ 출력용 이력서 (A4)
              </Link>
              <span className="contact-meta">{getBirthLabel()}</span>
            </div>
          </div>
        </div>

        <div className="stream-kpi-grid" aria-label="핵심 성과 지표">
          {kpiMetrics.map((kpi) => (
            <Link
              key={kpi.label}
              to={paths.blogPost(kpi.postSlug)}
              className="stream-kpi-card"
            >
              <strong className="kpi-value">{kpi.value}</strong>
              <span className="kpi-label">{kpi.label}</span>
              <span className="kpi-detail">{kpi.detail} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. SKILL & COMPETENCY MATRIX */}
      <section className="section stream-section" id="skills">
        <div className="section-heading">
          <span className="section-index">01</span>
          <div>
            <h2>Core Skills & Competency</h2>
            <p className="section-sub">
              실무 프로젝트에서 직접 문제를 진단하고 수치로 개선을 증명한 핵심 기술 역량입니다.
            </p>
          </div>
        </div>

        <div className="skill-matrix-grid">
          {skillHighlights.map((group) => (
            <article key={group.category} className="skill-matrix-card">
              <h3>{group.category}</h3>
              <p className="skill-matrix-summary">{group.summary}</p>
              <div className="tech-grid">
                {group.tags.map((tag) => (
                  <span key={tag} className="tech-item">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="skill-matrix-evidence">
                <strong>실무 적용:</strong> {group.evidence}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. PROJECT EXPERIENCE TIMELINE (yowu.dev style 2-column stream) */}
      <section className="section stream-section" id="experience">
        <div className="section-heading">
          <span className="section-index">02</span>
          <div>
            <h2>Project Experience</h2>
            <p className="section-sub">
              각 성과의 기술 블로그 버튼을 누르면 문제 원인·코드·실행계획이 담긴 상세 회고로 이동합니다.
            </p>
          </div>
        </div>

        <div className="resume-timeline">
          {projects.map((project) => (
            <ExperienceItem key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* 4. EDUCATION, AWARDS & LICENSES */}
      <section className="section stream-section" id="credentials">
        <div className="section-heading">
          <span className="section-index">03</span>
          <div>
            <h2>Education · Awards · Licenses</h2>
            <p className="section-sub">학력 및 교육 이수, 수상 내역, 보유 자격증입니다.</p>
          </div>
        </div>

        <div className="credentials-stream-grid">
          <div className="credential-stream-col">
            <h3 className="credential-col-title">🎓 Education</h3>
            <ul className="credential-compact-list">
              {education.map((edu) => (
                <li key={edu.id} className="credential-compact-item">
                  <span className="credential-period">{edu.period}</span>
                  <strong>{edu.degree}</strong>
                  <span className="credential-org">
                    {edu.school} · {edu.summary}
                  </span>
                  {edu.curriculum?.length ? (
                    <span className="credential-extra">{edu.curriculum.join(", ")}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="credential-stream-col">
            <h3 className="credential-col-title">🏆 Awards & 📜 Licenses</h3>
            <ul className="credential-compact-list">
              {awards.map((award) => (
                <li key={award.id} className="credential-compact-item">
                  <span className="credential-period">{award.date} · 수상</span>
                  <strong>{award.title}</strong>
                  <span className="credential-org">{award.description}</span>
                </li>
              ))}
              {licenses.map((lic) => (
                <li key={lic.id} className="credential-compact-item">
                  <span className="credential-period">{lic.date} · 자격증</span>
                  <strong>{lic.title}</strong>
                  <span className="credential-org">{lic.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
