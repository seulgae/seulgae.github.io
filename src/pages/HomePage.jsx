import profile from "../data/profile";
import "../styles/pageShell.css";
import "../styles/home.css";

const stories = [
  {
    index: "01",
    heading: "운영 관점에서 문제를 해결해왔습니다",
    cards: [
      {
        title: "LG U+ 빌링 및 GW 시스템",
        paragraphs: [
          "LG U+ 빌링 및 GW 시스템을 운영하면서, 장애가 발생한 뒤 대응하는 방식보다 문제가 반복되지 않도록 구조적으로 개선하는 것이 더 중요하다고 느꼈습니다.",
          "WhaTap 애플리케이션 대시보드의 히트맵에서 slow 쿼리·fail 쿼리 내역을 추출해 분석하고, Kafka 연동 오류 발생 내역을 집계해 일일 단위로 운영자에게 공유하는 보고 체계를 만들었습니다.",
          "오류 자체보다도 공유와 조치까지 시간이 오래 걸리는 점이 더 큰 문제였기 때문에, 각 파트 운영자가 빠르게 인지하고 대응할 수 있도록 프로세스를 정리했습니다. 그 결과 주간 오류 발생 건수를 약 93% 감소시켰습니다.",
        ],
      },
      {
        title: "개선 원칙",
        accent: true,
        list: [
          "장애 대응보다 재발 방지 중심의 구조 개선",
          "모니터링과 보고 체계를 통한 빠른 운영 피드백",
          "AI 도구를 개발·운영 프로세스에 실용적으로 통합",
        ],
      },
    ],
  },
  {
    index: "02",
    heading: "레거시 한계를 그대로 두지 않았습니다",
    twoColumn: true,
    cards: [
      {
        title: "CloudXper 플랫폼 고도화",
        paragraphs: [
          "실제 운영에서 느낀 병목을 그대로 받아들이지 않고, 구조를 바꿔 성능을 개선하는 데 집중했습니다.",
          "100만 건 규모에서 10분까지 늘어지던 대용량 집계 API를 계층 구조(DTO·Service·ServiceImpl) 재정비와 빌더 패턴, Parallel Stream 기반 병렬 처리로 리팩토링해 1분 15초까지 단축했습니다.",
          "리팩토링 과정에서 정리한 구조를 팀 코드 컨벤션 가이드로 문서화해 배포했고, 상세 과정은 블로그에 정리했습니다.",
        ],
      },
      {
        title: "국토교통부 전세사기 지원관리시스템",
        paragraphs: [
          "CodeRay(SAST) 탐지 취약점 358건을 CWE 유형별로 분류·분석해 시큐어코딩을 적용하고, 반복 재검증으로 최종 탐지 0건을 만들었습니다.",
          "코드 수정에 그치지 않고 실행 경로 검증으로 미사용·벤더·테스트 코드를 제거해 공격 표면 자체를 줄였으며, 테이블명을 문자열 치환하던 망간 연계 동적 쿼리는 점검 전에 정적 쿼리로 선제 재설계해 SQL Injection을 원천 차단했습니다.",
          "유형별 조치 기준과 판단 과정은 블로그의 CWE 시리즈로 정리해 두었습니다.",
        ],
      },
    ],
  },
];

function StoryCard({ card }) {
  return (
    <article className={`story-card ${card.accent ? "accent-card" : ""}`}>
      <h3>{card.title}</h3>
      {card.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {card.list?.length ? (
        <ul className="principle-list">
          {card.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function HomePage() {
  return (
    <div className="page-shell home-page">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">About Me</span>
          <h1 className="title">안정성은 견고하게, 운영은 스마트하게</h1>
          <p className="subtitle">
            시스템의 잠재적 리스크를 줄이고, 운영 효율을 기술로 개선해온 3년 차 백엔드
            개발자 {profile.name}입니다.
          </p>
          <p className="hero-summary">
            서비스의 가치는 단순한 구축이 아니라 안정적인 운영 과정에서 완성된다고
            생각합니다. 운영 환경에서 반복되는 문제를 구조적으로 줄이고, 팀이 더 빠르게
            인지하고 대응할 수 있는 흐름을 만드는 데 집중해왔습니다.
          </p>
        </div>
      </section>

      {stories.map((story) => (
        <section key={story.index} className="section story-section">
          <div className="section-heading">
            <span className="section-index">{story.index}</span>
            <h2>{story.heading}</h2>
          </div>
          <div className={`story-grid ${story.twoColumn ? "two-column" : ""}`}>
            {story.cards.map((card) => (
              <StoryCard key={card.title} card={card} />
            ))}
          </div>
        </section>
      ))}

      <section className="section closing-section">
        <div className="section-heading">
          <span className="section-index">03</span>
          <h2>지향점</h2>
        </div>
        <p className="closing-copy">
          운영 환경에서 문제를 해결하는 경험을 쌓으며, 단순히 동작하는 코드가 아니라
          오랫동안 안정적으로 운영되는 시스템을 만드는 개발자를 지향하게 되었습니다.
          장애를 겪으면 대응에서 멈추지 않고 재발하지 않는 구조를 고민했고, 성능 문제는
          구조를 바꿔 풀었으며, 보안은 점검이 오기 전에 먼저 움직였습니다.
        </p>
        <p className="closing-copy">
          그리고 그 과정을 저만 아는 지식으로 두지 않으려 합니다. 코드 컨벤션 가이드,
          운영 매뉴얼, 기술 블로그처럼 팀이 재사용할 수 있는 기록으로 남겨서, 시스템이
          특정 사람에게 의존하지 않고 굴러가게 만드는 것까지가 개발이라고 생각합니다.
        </p>
        <p className="closing-copy">
          이 경험을 바탕으로, 서비스가 더 안정적으로 성장하는 데 기여하고 싶습니다.
        </p>
      </section>

      <section className="section tech-shell">
        <div className="section-heading">
          <span className="section-index">04</span>
          <h2>기술 스택</h2>
        </div>

        <div className="tech-columns">
          {profile.techStack.map((group) => (
            <div key={group.label} className="tech-group">
              <h3>{group.label}</h3>
              <div className="tech-grid">
                {group.items.map((item) => (
                  <span key={item} className="tech-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
