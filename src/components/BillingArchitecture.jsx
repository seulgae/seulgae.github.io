import { paths } from "../routes";
import ArchitectureDiagrams from "./ArchitectureDiagrams";
import "../styles/billingArchitecture.css";

/** 블로그에 기록된 논리 구조. Redis는 메시지 큐가 아닌 업무키 매핑 저장소다. */
export default function BillingArchitecture({ expanded = false }) {
  return (
    <div className="billing-overview">
      <section className="project-block billing-architecture" aria-labelledby="billing-architecture-title">
        <div className="billing-section-heading">
          <h3 id="billing-architecture-title">시스템 한눈에 보기</h3>
          <span className="billing-label">강조 영역: 담당 업무</span>
        </div>
        <p className="billing-intro">달라진 데이터 구조를 연결하고, 청구 데이터의 정합성을 지키다</p>
        <p className="billing-caption">원부·응용 파트의 PK와 컬럼을 매핑해 데이터를 연계하는 서비스 도메인 GW</p>

        <ArchitectureDiagrams slug="lgu-billing-gw" expandable={!expanded} />

        <details className="billing-details" open>
          <summary>이벤트의 컬럼을 어떻게 맞춰 연계할까?</summary>
          <div className="billing-columns">
            <div><h4>매핑 조회</h4><p>토픽 이벤트 수신 → Redis에서 매핑 컬럼 key 조회 → 양쪽 PK·컬럼 대응</p></div>
            <div><h4>컬럼이 바로 맞지 않는 경우</h4><p>DTO 임시 필드로 맞춤 → 응용 테이블 적재 → 대사 확인</p></div>
          </div>
        </details>
        <details className="billing-details" open={expanded}>
          <summary>GW 내부 처리 구조 보기</summary>
          <dl className="billing-steps">
            <div><dt>수신</dt><dd>Dispatcher가 헤더의 MNO/MVNO로 처리 경로를 분기하고, 도메인 이벤트는 domainEventHandler에서 처리합니다.</dd></div>
            <div><dt>변환</dt><dd>단일 DTO는 process, 레벨 2 DTO 리스트는 processWithList를 사용합니다. OneToOne / OneToMany 구현체가 원천 해석과 대상 반영을 수행합니다.</dd></div>
            <div><dt>반영</dt><dd>eventWorkCd에 따라 INS / UPD / MER / DEL을 실행합니다. MER는 join 조건 기준으로 존재하면 UPDATE, 없으면 INSERT합니다.</dd></div>
          </dl>
        </details>
        <details className="billing-details" open={expanded}>
          <summary>신규 이벤트 연동을 추가하는 절차</summary>
          <p>토픽 등록 → 이벤트 필드 정의 → 원천·대상 매핑 및 join 조건 등록 → 공통 DTO 수정 → Nexus 배포 및 파트별 pom 의존성 갱신</p>
        </details>

        <div className="billing-operations">
          <h4>운영에서 정합성을 확인하는 방법</h4>
          <div className="billing-columns">
            <div className="billing-dependency"><span className="billing-label">GW 모니터링 · 대사</span><h4>원천과 구독 데이터 비교</h4><p>same · mismatch · 재연동 대기</p><small>발행 누락 / 순서 역전 / 인코딩 초과 / 컬럼·매핑 누락으로 원인 구분</small></div>
            <div className="billing-dependency"><span className="billing-label">일일 보고 체계</span><h4>오류 대응·일일 보고 체계 구축</h4><p>WhaTap 실패 패턴 분석 → 대응 매뉴얼·보정 스크립트 정비 → 파트별 일일 메일 공유</p><small>이상·특이 데이터 등 즉시 해결이 어려운 건은 별도 구분</small></div>
          </div>
        </div>
        <p className="billing-source">관련 기술 블로그<br />
          <a
            href={paths.blogPost("kafka-gw-data-integrity")}
            target="_blank"
            rel="noopener noreferrer"
          >
            데이터 정합성 개선 과정 자세히 읽기 ↗
          </a>
        </p>
      </section>
    </div>
  );
}
