---
title: 10분짜리 API를 1분 15초로 — MyBatis 로직에 계층 구조와 빌더, 병렬 스트림 입히기
date: 2024-11-27
tags: Java, Spring, MyBatis, Performance
summary: 1만 건에서는 멀쩡하던 댓글 API가 100만 건 테스트 데이터 앞에서 10분짜리가 된 사건 — DTO/Model/Service/ServiceImpl/Controller 계층을 다시 세우고 병렬 스트림으로 처리 구조를 바꾼 기록
---

이전에 참여했던 프로젝트에서 겪은 일이다. 사내 요청 게시판의 댓글/답글 API가
있었는데, 개발 단계에서는 아무 문제가 없었다. 테스트 데이터가 **1만 건**이었기
때문이다. 그러다 성능 검증을 위해 **100만 건**의 테스트 데이터를 만들었고,
같은 API의 응답 시간이 **10분**까지 치솟았다. 화면이 아니라 타임아웃과 싸우는
수준이었다.

## 왜 DB 힌트로 못 갔나

이전 운영 경험은 Oracle 기반이었다. Oracle이라면 실행계획을 보고 힌트
주석으로 인덱스를 유도하는 방법을 알고 있었는데, 이 프로젝트는 **MySQL**이었다.
MySQL에도 옵티마이저 힌트가 있지만 당시의 나는 MySQL 튜닝 경험이 없었고,
낯선 DB에서 어설픈 힌트를 거는 것보다 **내가 통제할 수 있는 애플리케이션
계층에서 구조를 바로잡는 것**이 낫다고 판단했다. 돌이켜보면 이 판단에는
잘한 부분과 부족한 부분이 섞여 있는데, 그건 마지막에 정리한다.

## AS-IS — 계층 없이 Map이 컨트롤러까지 올라오는 구조

성능 이야기 전에 구조 이야기를 해야 한다. 기존 코드는 계층이라 부를 것이
없었다. 컨트롤러가 DAO를 직접 부르는 곳도 있었고, DB에서 올라온
`Map<String, Object>`가 **가공 없이 컨트롤러와 화면까지 그대로 올라갔다.**
입출력 전용 객체와 DB 매핑 객체의 구분도 없어서, 요청 파라미터도 Map,
조회 결과도 Map, 응답도 Map이었다.

```java
// AS-IS — Service (계층은 있지만 역할이 없다)
public List<Map<String, Object>> getComments(Long boardId) {
    Map<String, Object> param = new HashMap<>();
    param.put("boardId", boardId);

    // 1. 부모 댓글 전체 조회 (결과도 Map)
    List<Map<String, Object>> parents = commentDAO.selectCommentList(param);

    for (Map<String, Object> parent : parents) {
        // 2. 루프 안에서 답글을 건건이 조회
        Map<String, Object> replyParam = new HashMap<>();
        replyParam.put("parentId", parent.get("ID"));
        List<Map<String, Object>> replies = commentDAO.selectReplyList(replyParam);

        // 3. Map에 Map을 심어서 반환 — 이 구조가 화면까지 그대로 간다
        parent.put("replies", replies);
    }
    return parents;
}
```

이 구조의 문제는 두 겹이다.

**성능 문제** — 부모 댓글을 하나씩 순서대로 처리하는 단일 스레드 루프.
루프 안에서 답글 쿼리가 건건이 나가므로 데이터가 100배면 쿼리도 100배,
그동안 CPU 코어는 하나만 일한다.

**구조 문제** — Map은 어떤 키가 있는지 컴파일러가 모른다. 키 오타는
조용한 null이 되고, 필수값 검증은 필요할 때마다 if문으로 흩어지고,
"이 API가 뭘 받고 뭘 주는지"를 알려면 코드를 끝까지 따라 읽어야 한다.

## TO-BE — 계층부터 다시 세우기

리팩토링은 성능 코드를 고치는 게 아니라 **계층을 세우는 것부터** 시작했다.
역할을 다섯으로 나눴다: **Controller / Service(인터페이스) / ServiceImpl /
DTO / Model(VO)**.

```text
Controller   : HTTP 입출력만. 검증된 DTO를 받고 DTO를 돌려준다
Service      : 비즈니스 기능의 계약(인터페이스)
ServiceImpl  : 계약의 구현. 트랜잭션과 조립 로직이 여기에만 있다
DTO          : API 입출력 전용 객체. 검증 애노테이션을 가진다
Model(VO)    : DB 매핑 전용 객체. MyBatis resultMap이 채운다
```

### DTO — API의 계약을 코드로

```java
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;

    @NotNull(message = "게시글 ID는 필수입니다.")
    private Long boardId;

    private Long parentId;   // null이면 댓글, 값이 있으면 답글

    @NotBlank(message = "댓글 내용은 필수 입력 항목입니다.")
    @Size(max = 1000, message = "댓글은 1000자 이내로 입력해주세요.")
    private String content;

    private String author;
    private LocalDateTime createdAt;
    private List<CommentDTO> replies;
}
```

Map 시절에 흩어져 있던 필수값·길이 검증이 `@NotNull`, `@NotBlank`, `@Size`
선언으로 DTO 한 곳에 모였다. 컨트롤러에서 `@Valid` 한 번이면 끝난다.

### Model(VO) — DB 계층 전용, 빌더로만 생성

```java
@Getter
public class Comment {
    private Long id;
    private Long boardId;
    private Long parentId;
    private String content;
    private String author;
    private LocalDateTime createdAt;

    @Builder
    public Comment(Long boardId, Long parentId, String content, String author) {
        this.boardId = boardId;
        this.parentId = parentId;
        this.content = content;
        this.author = author;
    }

    public void update(String content) { this.content = content; }
}
```

setter를 없앴다. 조회 결과는 MyBatis `resultMap`이 채우고, 저장용 객체는
**빌더로만** 만든다. 빌더에 `id`와 `createdAt`이 없다는 게 포인트다 —
식별자는 DB(auto increment)가, 생성 시각은 INSERT 시점의 DB가 책임지므로
애플리케이션 코드 어디서도 이 값을 지어낼 수 없다. 변경은 `update()`처럼
**의도가 이름에 드러나는 메서드**로만 허용해서, "어디서든 아무 필드나
바꾸는 객체"를 없앴다.

### Service / ServiceImpl — 계약과 구현의 분리

```java
public interface CommentService {
    CommentDTO createComment(CommentDTO dto, String username);
    List<CommentDTO> getComments(Long boardId);
    CommentDTO updateComment(Long id, CommentDTO dto, String username);
    void deleteComment(Long id, String username);
}
```

```java
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentDAO commentDAO;

    @Override
    @Transactional
    public CommentDTO createComment(CommentDTO dto, String username) {
        Comment comment = Comment.builder()
                .boardId(dto.getBoardId())
                .parentId(dto.getParentId())
                .content(dto.getContent())
                .author(username)        // 작성자는 인증 주체에서 — 클라이언트값 불신
                .build();
        commentDAO.insertComment(comment);
        return toDTO(comment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDTO> getComments(Long boardId) {
        List<Comment> parents = commentDAO.selectParentComments(boardId);

        return parents.parallelStream()          // ← 순차 for 루프를 병렬로
                .map(parent -> {
                    List<CommentDTO> replies =
                        commentDAO.selectReplies(parent.getId()).stream()
                            .map(this::toDTO)
                            .collect(Collectors.toList());
                    return toDTO(parent, replies);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CommentDTO updateComment(Long id, CommentDTO dto, String username) {
        Comment comment = commentDAO.selectComment(id);
        if (comment == null) {
            throw new IllegalArgumentException("존재하지 않는 댓글입니다.");
        }
        if (!comment.getAuthor().equals(username)) {
            throw new AccessDeniedException("수정 권한이 없습니다.");
        }
        comment.update(dto.getContent());
        commentDAO.updateComment(comment);
        return toDTO(comment);
    }
    ...
}
```

인터페이스와 구현을 나눈 건 관례 때문만은 아니다. 컨트롤러가 **계약에만
의존**하게 되어 구현 교체·테스트 대역이 쉬워지고, 트랜잭션 경계(`@Transactional`,
조회는 `readOnly = true`)와 권한 검사(작성자 = 인증 사용자)가 전부 ServiceImpl
한 계층에 모인다. AS-IS에서는 이런 검사가 있는 API도 있고 없는 API도 있었다.

### Controller — HTTP만 남기기

```java
@Slf4j
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;   // 인터페이스에 의존

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @Valid @RequestBody CommentDTO dto, Principal principal) {
        CommentDTO created = commentService.createComment(dto, principal.getName());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long boardId) {
        return ResponseEntity.ok(commentService.getComments(boardId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, Principal principal) {
        commentService.deleteComment(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
```

컨트롤러에는 비즈니스 로직이 한 줄도 없다. 검증은 `@Valid`가, 인증 주체는
`Principal`이, 처리는 Service가, HTTP 상태코드 매핑만 컨트롤러가 한다.

## 성능 — 병렬 스트림이 만든 차이

구조를 세운 뒤에야 성능 작업이 안전해졌다. 핵심은 조회 서비스의 순차
루프를 `parallelStream`으로 바꾼 것이다.

- 순차 루프에서는 "부모 1건의 답글 조회와 조립이 끝나야 다음 부모"였지만,
  병렬 스트림에서는 부모별 처리(답글 조회 + DTO 변환)가 **코어 수만큼 동시에**
  진행된다. 100만 건 규모에서 순차로 쌓이던 대기 시간이 병렬로 겹쳐졌다.
- 이 병렬화가 안전했던 건 앞의 구조 작업 덕분이다. 빌더로 생성 후 불변으로
  다루는 객체는 여러 스레드가 동시에 만들어도 서로 간섭하지 않는다.
  **setter로 여기저기서 고치는 Map 덩어리였다면 병렬화는 곧 동시성 버그였다.**

Swagger로 동일 조건을 테스트했을 때 응답 시간이 **10분 → 1분 15초**로
단축됐다.

## 컨벤션 가이드 — 리팩토링을 팀의 표준으로

리팩토링을 하면서 발견한 또 하나의 문제는 **팀원마다 코드가 전부 다르다는
것**이었다. 누구는 Map을 쓰고 누구는 VO를 쓰고, 계층 분리도 네이밍도
제각각이라 리팩토링 범위를 잡는 것부터가 고고학이었다. 그래서 이번 구조를
표준으로 삼아 **코드 컨벤션 가이드 문서**를 만들어 팀에 배포했다.

- 계층 구조: Controller → Service(인터페이스) → ServiceImpl → DAO, 역방향 참조 금지
- DTO와 Model(VO) 분리: API 입출력은 DTO, DB 매핑은 VO — 서로 넘나들지 않기
- 객체 생성은 빌더로만, setter 금지, Map 파라미터 금지
- 검증은 DTO 애노테이션으로, 권한 검사는 ServiceImpl에서
- 로그 포맷과 예외 처리 위치 통일

코드는 언젠가 다시 바뀌지만, "다음 코드가 어떤 모양이어야 하는지"의 합의는
남는다.

## 배운 점

- **성능 문제는 측정 가능한 목표로 다뤄야 한다.** "느리다"가 아니라
  "100만 건에서 10분, 목표는 분 단위"로 잡고 나니 어디를 고칠지가 보였다.
- **구조 없이 성능 없다.** 병렬 스트림은 한 줄이지만, 그 한 줄이 안전하려면
  불변 객체와 계층 분리가 먼저 있어야 했다. 성능 리팩토링의 대부분은 사실
  구조 리팩토링이었다.
- **낯선 DB 앞에서 애플리케이션으로 후퇴한 건 절반만 정답이었다.** 지금
  다시 한다면 MySQL의 `EXPLAIN`으로 실행계획을 확인하고 인덱스 설계를
  병행했을 것이다. 병렬화는 대기를 겹치게 할 뿐, 쿼리 자체가 느리면 근본
  해결이 아니다.
- **다음 단계도 알고 있다.** 부모별 답글 조회는 병렬화했어도 쿼리 수 자체는
  부모 수만큼이다(N+1). 부모 ID 목록으로 IN 절 일괄 조회 후 메모리에서
  그룹핑하면 쿼리를 2번으로 줄일 수 있었다 — 어디까지 갔고 무엇이 남았는지는
  알고 멈추는 것이 중요하다.
- **리팩토링의 산출물은 코드가 아니라 컨벤션이었다.** 혼자 빠른 코드보다
  팀이 같은 모양으로 쓰는 코드가 시스템을 오래 살게 한다.
