# 소스·배포 용량 및 정리 후보

검토일: 2026-11-03. 기준 커밋: c0297af. 이번 작업은 분석이며 실행 코드·이미지 삭제 및 배포는 하지 않았다.

## 측정 결과

단위는 1 MB = 1,000,000 bytes이다. 로컬 디스크 크기·배포 총량·첫 접속 전송량은 서로 다르다.

| 대상 | 파일 수 | 실제 바이트 | 의미 |
| --- | ---: | ---: | --- |
| src 전체 | 98 | 522,998 | 게시글·테스트·구 코드 포함 |
| src/old | 15 | 62,535 | 현재 런타임 import 그래프에 연결되지 않은 구 코드 |
| src/posts | 24 | 221,767 | 모든 글의 Markdown 원문 |
| public | 42 | 5,957,067 | 참조 여부와 무관하게 배포 폴더에 복사되는 정적 파일 |
| build | 45 | 6,703,937 | 직전 프로덕션 빌드 산출물 전체 |
| node_modules | 6,418 | 189,194,095 | 로컬 개발 의존성. 이 폴더 전체가 배포되는 것은 아님 |
| .git | 152 | 25,524,983 | 로컬 Git 이력. 배포 파일과 별개 |

프로덕션 JS: 688.98 kB, gzip 229.95 kB. CSS: 55.29 kB, gzip 10.67 kB. gzip 수치는 빌드가 계산한 값이며 실제 HTTP 전송량 측정은 아니다. build 총 6.7 MB가 첫 방문에 전부 내려온다는 뜻도 아니다.

Vite JavaScript API로 write:false 분석 빌드를 수행했다. 모듈별 renderedLength는 축소 전 출력 코드의 문자 길이이므로 최종 gzip 바이트 기여도로 해석하지 않는다. 여기서 확인한 사실은 React DOM·라우터·블로그 Markdown 파서·24편 본문·모든 페이지·구성도 코드가 단일 JS 청크에 함께 들어간다는 것이다. src/old는 이 출력 모듈 목록에 없다. react-icons도 사용된 코드가 포함되며 현재 근거만으로 패키지 전체가 번들에 실린다고 볼 수 없다.

## 1. 배포 총량 감소 효과가 가장 확실한 후보: 미참조 이미지 8개

현재 앱에서 도달 가능한 JS/JSX/CSS, 게시글, index.html 및 저장소 전체 파일명 검색에서 사용처를 찾지 못했다.

| public 파일 | bytes |
| --- | ---: |
| BillNestLogo.png | 398,679 |
| ex.png | 259,609 |
| EZEN.png | 5,819 |
| FastCampusEdu.png | 318,938 |
| FMLogo.png | 425,498 |
| godo.png | 33,026 |
| OneDayClass.png | 371,771 |
| SpringBatchLogo.png | 75,303 |
| **합계** | **1,888,643** |

이 8개를 배포 대상에서 제외하면 다른 조건이 같을 때 build 총량은 약 6.70 MB → 4.82 MB(약 28.2% 감소)다. 현재 화면이 요청하지 않는 자산이므로 첫 화면 속도의 동일 비율 개선을 뜻하지 않는다. 과거 외부 직링크로 공유했는지는 소스만으로 확인할 수 없다.

`public/tech-logos`의 SVG는 파일명 전체가 소스에 직접 나오지 않더라도 데이터의 logo 값으로 조립된다. 실제 diagrams 데이터의 노드·도구·클라우드 제공자 참조를 대조한 결과 **SVG 20개 모두 사용된다.** 단순 문자열 검색으로 이 폴더를 지우면 안 된다. LICENSE.txt는 라이선스 보존을 위해 유지한다. robots.txt·404.html·OG 이미지도 JS 참조 유무로 삭제하지 않는다.

## 2. 첫 화면 로딩 개선의 핵심: 페이지별 로딩 분리

`src/App.jsx`가 블로그 페이지·레이아웃과 이력서를 정적으로 import하고, 블로그 사이드바가 posts 로더를 참조한다. `src/lib/posts.js`는 eager glob으로 모든 Markdown 본문을 import한다. 따라서 포트폴리오만 열어도 글 본문과 react-markdown/remark-gfm 처리 코드가 포함된 단일 청크를 받는다.

권장 순서:

1. 블로그 셸과 하위 페이지를 lazy import 경계로 옮긴다. App에서 BlogHeader/Sidebar/Footer를 계속 정적 import하면 본문 데이터가 다시 첫 청크로 연결될 수 있으므로 **셸 전체의 import 연결**을 분리해야 한다.
2. 이력서는 `/resume` 진입 시 로딩한다.
3. ArchitectureModal과 그 아래 구성도 코드는 팝업을 처음 열 때 로딩한다. 현재는 모달이 닫혀 있어도 코드가 초기 청크에 포함된다.
4. 글 수가 더 늘면 목록용 메타데이터/검색 색인과 본문 로딩을 분리한다. 단, 현재 **본문 검색** 기능이 있으므로 glob의 eager만 제거해서는 기능을 그대로 유지할 수 없다. 빌드 시 검색 색인을 생성하거나 검색 시 로딩 정책을 함께 설계해야 한다.

이 방식은 기능을 유지하면서 필요한 코드를 늦게 받는 개선이다. 총 배포 크기가 반드시 줄어드는 것은 아니며, 개선된 첫 청크 크기는 실제 변경 후 재측정해야 한다.

## 3. 큰 사용 중 이미지 최적화

| 파일 | 크기 | 판단 |
| --- | ---: | --- |
| HYSCORE.jpg | 1.83 MB | 성적증명서 버튼 클릭 시 확대 로딩. 첫 화면에서 자동 로딩되는 자산으로 분류하지 않음. 글자 가독성 보존 필요 |
| UCAMP.jpg | 442 kB | 수상 썸네일. 화면용 축소본과 확대 원본 분리 후보 |
| Ezen2.png | 420 kB | 교육 썸네일. 동일 |
| giltaehyeong.jpg | 385 kB | 상단 작은 프로필 및 블로그 프로필에 사용. 작은 전용 썸네일을 만들면 초기 로딩 개선 여지가 큼 |
| tech-logos/linux.svg | 194 kB | 사용 중 로고. SVG 최적화 후보, 삭제 대상 아님 |
| favicon.ico | 183 kB | 실제 아이콘 용도에 맞게 크기/내장 해상도 정리 후보 |

`ZoomableImage`의 img에는 loading="lazy" 및 width/height가 없다. 화면 아래 교육·수상·자격 썸네일의 지연 로딩과 고정 비율 지정도 검토할 수 있다. 프로필 등 첫 화면 핵심 이미지는 일괄 lazy 처리하지 않는다.

## 4. 관리용 소스 정리: 구 페이지 15개

`src/main.jsx`에서 상대 import를 따라가는 그래프와 빌드 출력 모듈 목록을 대조했다. `src/old`의 다음 파일은 현재 런타임에 연결되지 않는다.

- components: CredentialList.jsx, ProjectDetail.jsx
- pages: ArchitecturePage.jsx, AwardsPage.jsx, EducationPage.jsx, LicensesPage.jsx, ProjectDetailPage.jsx, ProjectsIndexPage.jsx
- data: commitHistory.js
- styles: architecture.css, credentials.css, education.css, home.css, projectDetail.css, projectsIndex.css

합계 약 62.5 kB다. Git에 이전 버전이 있으므로 현재 코드 트리에서 제거하는 정리 후보다. **배포 JS 감소 효과는 없다.** 과거 URL 호환성은 현재 `src/routes.js`와 App의 리다이렉트가 담당하므로 이 파일들을 보관해야만 옛 링크가 유지되는 것은 아니다. 구 파일의 상대 import 일부는 이동 후 현재 경로와 맞지 않아 그대로 되살릴 수 있는 독립 패키지도 아니다.

`scripts/generate-commit-history.mjs`와 `sync:history` 스크립트는 함께 정리할 수 있다. 현재 명령은 src/data/commitHistory.js를 생성하지만 이를 사용하는 활성 페이지가 없고 과거 ArchitecturePage만 소비한다. 새 미사용 파일을 만드는 명령으로 남아 있다. 기존 리다이렉트까지 지우지는 않는다.

## 5. 작은 잔여 코드·CSS

- `src/utils/text.js`의 splitBracketTitle: 현재 활성 코드에서는 사용하지 않고 src/old만 참조한다. old 제거 시 함께 정리 가능.
- `pageShell.css`: page-lead, page-back-link, surface-card는 활성 JSX에서 사용처가 없다. page-shell과 image 관련 스타일은 실제 사용하므로 파일 전체 삭제 대상이 아니다.
- `bottomNav.css`: bottom-sheet, bottom-sheet-backdrop는 이전 더보기 메뉴의 잔여 스타일이다.
- `posters.css`: project-arch-drawer는 현재 모달 전환 후 잔여 스타일 후보다.
- `billingArchitecture.css`: billing-dependencies 사용처 없음.
- `resume.css`: resume-table-profile 사용처 없음.
- `architectureDiagrams.css`의 arch-theme-*, arch-data/lookup/retry는 동적 클래스이며 **유지 대상**이다.
- `projects.js`, profile.js, education.js의 긴 주석 처리된 이전 콘텐츠는 소스 가독성 정리 후보지만, 공개 범위를 바꾸지 않도록 구분해야 한다. 일반 주석은 최종 JS 용량의 주요 원인이 아니다.
- public/manifest.json은 index.html에서 연결하지 않고 CRA 샘플 값 및 존재하지 않는 logo192.png/logo512.png 참조를 가진다. PWA를 사용하지 않는 현재 구조에서는 정리 후보다.
- package.json의 직접 dependencies는 현재 소스에서 사용된다. 크다는 이유만으로 제거할 명백한 미사용 런타임 패키지는 확인되지 않았다.

CSS 후보는 정적 참조 검사 결과다. 실제 정리 시에는 반응형·인쇄·동적 클래스를 확인하면서 제거한다. regex 결과 전체를 자동 삭제 목록으로 쓰지 않는다.

## 6. 페이지·컴포넌트 통합 판단

현재 활성 페이지는 HomePage, ResumePage, BlogListPage, BlogPostPage, NotFoundPage의 5개다. 각각 역할이 달라 삭제/통합으로 얻는 이득이 작다. 포트폴리오와 블로그 분리 자체는 유지하는 것이 현재 사용자 의도에 맞다.

- BillingArchitecture와 ProjectArchitecture는 외곽 레이아웃·헤더·출처 링크·설명 블록이 비슷하다. 공통 ArchitectureOverview를 만들고 빌링 전용 블록을 주입하는 방식으로 중복을 줄일 수 있다. 다만 빌링에만 있는 운영 설명을 억지로 데이터 모델에 끼워 넣을 필요는 없다.
- Header와 BottomNav는 useScrollSpy를 각각 호출해 같은 스크롤/리사이즈 리스너와 DOM 위치 계산을 수행한다. PortfolioLayout에서 한 번 계산해 공유하면 중복 작업을 줄일 수 있다. CSS로 숨겨도 훅은 실행된다.
- ArchitectureModal과 Lightbox는 열기/닫기·Escape·포커스 처리의 공통점을 묶는 후보다. 내부 SVG 확대용 네이티브 dialog와의 중첩 동작을 보존해야 한다.
- 작고 역할이 명확한 About/Skills/Credentials 포스터는 파일 수를 줄이려고 합칠 필요가 없다.

## 적용 우선순위

1. 미참조 이미지 8개 + CRA manifest + src/old 및 죽은 sync:history 흐름 정리.
2. 블로그 셸·이력서·아키텍처 팝업 코드 분리로 첫 청크 축소.
3. 프로필/썸네일 이미지 최적화와 화면 아래 이미지 lazy 로딩.
4. 잔여 CSS·미사용 유틸·주석 정리, 중복 스크롤 계산 공유.
5. 구성도 공통 레이아웃은 후순위로 통합.

삭제 전에 파일 직링크 보존 필요 여부를 검토하고, 실제 구현 후 기존 테스트·프로덕션 빌드·페이지/모달/검색·모바일·인쇄 동작을 확인한다. 이번 분석 빌드는 write:false로 실행했으며 새 패키지는 설치하지 않았다.

공식 근거:
- Vite public 자산 복사 규칙: https://vite.dev/guide/assets.html#the-public-directory
- Vite glob의 eager/lazy 차이: https://vite.dev/guide/features.html#glob-import

## 2026-11-03 적용 결과

- 사용자 승인 후 미참조 이미지 8개만 삭제했다. src/old 및 모든 의도적 주석/참고 코드는 보존했다.
- 블로그 셸/목록/본문, 이력서, 아키텍처 팝업을 lazy import로 분리했다. 블로그 본문 검색은 유지했다.
- Header/BottomNav는 PortfolioLayout에서 계산한 스크롤 상태를 공유한다.
- 교육·수상·자격 이미지에 lazy 로딩/비동기 디코딩을 적용했다.
- 프로필 원본은 유지하고 160px 폭, 9,114 bytes 썸네일을 추가하여 헤더/블로그에서 사용한다.
- 최종 build 전체: 4,828,370 bytes (기존 6,703,937 bytes).
- 홈 초기 JS는 메인 및 modulepreload 합계 256,626 bytes, gzip 합계 85,146 bytes. 기존 단일 JS 688.98 kB / gzip 229.95 kB와 비교하면 된다. 실제 네트워크 시간 측정치는 아니다.
- 기존 5개 테스트 파일, 32개 테스트 통과. 프로덕션 빌드 통과, 500 kB 청크 경고 해소. lazy 로딩에 맞춰 기존 화면 테스트의 대기 방식을 수정했다.
- 로컬 브라우저에서 홈, 팝업 열기/닫기, Redis 본문 검색, 글 직접 진입, 이력서 인쇄 버튼 표시를 확인했다. 인쇄 실행/배포는 하지 않았다.
- 잔여 CSS/manifest/sync:history 및 구 페이지는 삭제하지 않았다. 공통 아키텍처/모달 통합은 용량 효과가 작고 중첩 팝업 동작을 변경하므로 이번에는 유지했다.
