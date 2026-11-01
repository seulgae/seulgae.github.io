import { paths } from "../routes";
import ArchitectureDiagrams from "./ArchitectureDiagrams";
import "../styles/billingArchitecture.css";

/** 블로그에 기록된 논리 구조. Redis는 메시지 큐가 아닌 업무키 매핑 저장소다. */
export default function BillingArchitecture() {
  return (
    <div className="billing-overview">
      <section className="project-block billing-architecture" aria-labelledby="billing-architecture-title">
        <div className="billing-section-heading">
          <h3 id="billing-architecture-title">시스템 한눈에 보기</h3>
          <span className="billing-label">강조 영역: 담당 업무</span>
        </div>
        <p className="billing-intro">달라진 데이터 구조를 연결하고, 청구 데이터의 정합성을 지키다</p>
        <p className="billing-caption">차세대의 UUID 기반 데이터를 기존 업무키 기반 구조로 변환하는 서비스 도메인 GW</p>

        <ArchitectureDiagrams slug="lgu-billing-gw" />

        <details className="billing-details" open>
          <summary>이벤트 순서가 뒤바뀌면 어떻게 처리할까?</summary>
          <div className="billing-columns">
            <div><h4>매핑이 있는 경우</h4><p>변경 이벤트 수신 → Redis에서 업무키 해석 → 대상 DB 반영</p></div>
            <div><h4>매핑이 아직 없는 경우</h4><p>키 해석 실패 → 재처리 대상으로 보관 → 매핑 생성 후 다시 처리</p></div>
          </div>
        </details>
        <details className="billing-details">
          <summary>GW 내부 처리 구조 보기</summary>
          <dl className="billing-steps">
            <div><dt>수신</dt><dd>Dispatcher가 헤더의 MNO/MVNO로 처리 경로를 분기하고, 도메인 이벤트는 domainEventHandler에서 처리합니다.</dd></div>
            <div><dt>변환</dt><dd>단일 DTO는 process, 레벨 2 DTO 리스트는 processWithList를 사용합니다. OneToOne / OneToMany 구현체가 원천 해석과 대상 반영을 수행합니다.</dd></div>
            <div><dt>반영</dt><dd>eventWorkCd에 따라 INS / UPD / MER / DEL을 실행합니다. MER는 join 조건 기준으로 존재하면 UPDATE, 없으면 INSERT합니다.</dd></div>
          </dl>
        </details>
        <details className="billing-details">
          <summary>신규 이벤트 연동을 추가하는 절차</summary>
          <p>토픽 등록 → 이벤트 필드 정의 → 원천·대상 매핑 및 join 조건 등록 → 공통 DTO 수정 → Nexus 배포 및 파트별 pom 의존성 갱신</p>
        </details>

        <div className="billing-operations">
          <h4>운영에서 정합성을 확인하는 방법</h4>
          <div className="billing-columns">
            <div className="billing-dependency"><span className="billing-label">GW 모니터링 · 대사</span><h4>원천과 구독 데이터 비교</h4><p>same · mismatch · 재연동 대기</p><small>발행 누락 / 순서 역전 / 변환 오류 / 수기 변경으로 원인 구분</small></div>
            <div className="billing-dependency"><span className="billing-label">보정 후 재검증</span><h4>불일치가 해소됐는지 확인</h4><p>불일치 키 추출 → DML 작성 → 대상 SELECT 검증 → 반영 → 재대사</p><small>일회성은 엑셀 DML · 반복 유형은 스크립트 정비</small></div>
          </div>
        </div>
        <p className="billing-source">경험을 정리한 논리 구조입니다. 강조 영역은 담당 업무 범위를 나타냅니다.<br />
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
