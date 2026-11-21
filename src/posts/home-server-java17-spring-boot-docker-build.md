---
title: 홈서버 구축 7 — Java 17 Spring Boot를 멀티스테이지 이미지로 배포하기
date: 2026-11-21
createdAt: 2026-11-21T23:25:32+09:00
tags: Java, Spring Boot, Gradle, Docker, Eclipse Temurin, PostgreSQL
summary: InvenCore의 실제 Gradle·Dockerfile을 읽고 실행 JAR·빌드 컨텍스트·환경변수·DB 권한 검증을 분리했다.
category: home-server
---

## 1. 들어가며

[6편](/blog/home-server-postgresql-compose-volumes-roles)에서 DB 저장과 접속 경로를 정리했다. 이제 Java 앱을 이미지로 만든다. 초기 InvenCore는 Gradle이고 이후 슬개기술연구소는 Maven이다. 이 글의 `bootJar`와 Dockerfile은 **InvenCore 소스**를 기준으로 한다. 두 프로젝트의 빌드·DB 초기화 정책을 섞지 않는다.

## 2. 구현 목표

Java 17 실행 JAR을 만들고, 빌드 도구가 없는 실행 이미지에서 앱을 시작한다. 이미지 빌드·컨테이너 실행·HTTP·DB 연결을 각각 확인한다. 빌드가 성공했다고 DB 연결까지 성공한 것으로 보고하지 않는다.

## 3. 사전 지식

JDK는 컴파일 등 개발 도구와 실행 환경을 포함한다. 이 프로젝트는 JDK 이미지로 빌드하고 JRE 이미지로 실행한다. JVM은 실제 Java 바이트코드를 실행하는 가상 머신이다.

Spring Boot Gradle 플러그인의 `bootJar`는 의존성을 포함하는 실행 아카이브를 만든다. 일반 `jar` 결과와 같지 않다. `java -jar`로 실행할 수 있는 산출물을 골라야 한다. [Spring Boot 패키징 문서](https://docs.spring.io/spring-boot/gradle-plugin/packaging.html)가 이 동작을 설명한다.

## 4. 현재 환경과 중요한 차이

확인한 InvenCore의 `backend/build.gradle`에는 Java toolchain 17이 있고 `backend/Dockerfile`에는 Temurin 17 빌드·실행 단계가 있다.

반면 DB 권한은 주의할 차이가 있었다. InvenCore의 `application.yml`은 JPA `ddl-auto: update`를 사용하고 일부 실습 경로에서도 DDL을 수행한다. **6편의 DML 전용 앱 계정을 그대로 넣으면 이 앱의 전체 기능이 동작한다고 보장할 수 없다.**

실제 `docs/POSTGRESQL.md`도 전용 DB·스키마와 필요한 CREATE·TEMP 권한을 안내한다. 이후 연구소의 실행 계정·마이그레이션 계정 분리와는 다른 구현 상태다. 이 글을 쓴다고 운영 설정을 변경하거나 차이를 없애지는 않는다.

## 5. 구축 과정

### 실행 JAR과 테스트를 먼저 확인

InvenCore의 `backend/`에서 실행하는 **재현용 예시**다.

```bash
./gradlew --no-daemon clean test bootJar
```

Windows PowerShell에서는 `./gradlew.bat clean test bootJar`를 사용한다. Wrapper는 저장소가 정한 Gradle 배포판을 사용한다. `test`와 `bootJar`를 명시해 테스트 결과와 패키징 결과를 확인한다. 당시 컨테이너 빌드의 `bootJar`만으로 모든 테스트가 실행된다고 해석하지 않는다.

확인한 프로젝트의 통합 테스트에는 Testcontainers가 있어 Docker 접근도 필요하다. Docker 없는 PC에서 실패한 테스트를 코드 오류나 단순 네트워크 문제로 단정하지 않는다.

### 실제 Dockerfile의 빌드 단계 읽기

아래는 현재 InvenCore의 `backend/Dockerfile`에서 확인한 빌드 단계다.

```dockerfile
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace
COPY . ./
RUN chmod +x gradlew \
    && ./gradlew --no-daemon bootJar \
    && cp "$(find build/libs -maxdepth 1 -name '*.jar' ! -name '*-plain.jar')" /tmp/app.jar
```

`COPY`의 기준은 Dockerfile 위치가 아니라 빌드 컨텍스트다. 여기서는 backend 디렉터리를 컨텍스트로 줘야 `gradlew`와 빌드 파일이 맞게 들어간다. `*-plain.jar`를 제외해 실행 JAR을 고른다. 결과가 하나라는 전제도 실제 산출물 목록과 함께 확인해야 한다.

실행 단계는 `eclipse-temurin:17-jre-jammy`에서 시작한다. 중간에는 curl 설치와 비 root 사용자·업로드 디렉터리 권한 준비가 있으며 마지막 부분은 다음과 같다.

```dockerfile
WORKDIR /app
COPY --from=build /tmp/app.jar /app/app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

`COPY --from`이 빌드 결과만 옮긴다. 위 블록만 복사하면 사용자 생성 단계가 빠지므로 전체 Dockerfile을 사용한다. `EXPOSE`는 호스트 포트를 열지 않는다. [Docker 멀티스테이지 빌드](https://docs.docker.com/build/building/multi-stage/)와 [Temurin 공식 이미지](https://hub.docker.com/_/eclipse-temurin)를 참고했다.

### 이미지를 빌드하고 식별하기

저장소 루트에서 실행하는 **로컬 실습용 명령**이다.

```bash
docker build -f backend/Dockerfile -t home-lab-backend:example backend
docker image inspect --format '{{.Id}}' home-lab-backend:example
```

마지막 `backend`가 컨텍스트다. `.dockerignore`도 이 컨텍스트 기준으로 확인한다. 비밀값 파일과 불필요한 빌드 자료를 이미지에 복사하지 않아야 한다. 태그는 이동할 수 있으므로 운영 검증에는 실제 이미지 ID·digest와 소스 커밋을 연결한다.

### 런타임 설정과 DB 준비를 분리

새 실습 환경의 비공개 환경 파일에는 다음 항목을 준비한다. 아래 값은 **템플릿**이며 실제 비밀값을 채운 파일을 Git에 넣지 않는다.

```dotenv
DB_URL=jdbc:postgresql://postgres:5432/example_dev?currentSchema=app
DB_USERNAME=example_inven_app
DB_PASSWORD=<별도로 준비한 비밀값>
JWT_SECRET=<프로젝트 검증 조건을 충족하는 비밀값>
GW_SYNC_ENABLED=false
FEATURE_SERVER_CAPACITY_ENABLED=false
```

위 DB 사용자와 스키마는 사전에 준비해야 한다. 앱의 DDL 동작을 고려한 **전용 실습 DB**에만 맞는 권한을 준다. 분리 운영 설계로 전환하려면 JPA·MyBatis의 구조 변경 경로를 먼저 정리해야 하며, 단순히 앱 비밀번호를 바꾸는 문제는 아니다.

GW·호스트 조회 기능을 끈 예시는 기본 앱 실행을 설명하기 위한 것으로, Kafka·Redis 전체 기능을 확인한 결과가 아니다. 실제 서비스 실행에는 해당 모드의 의존성·설정도 필요하다.

6편의 네트워크와 전용 DB 준비를 마쳤다는 전제의 실행 예시다.

```bash
docker run -d --name home-lab-backend \
  --network home-lab-db_database \
  --env-file ./secrets/backend.env \
  -p 127.0.0.1:18080:8080 home-lab-backend:example
docker logs --tail 100 home-lab-backend
```

네트워크 이름은 예시 Compose 프로젝트가 생성한 실제 이름과 대조한다. 컨테이너의 `localhost`는 그 컨테이너 자신이다. `.env`와 `--env-file`은 비밀값을 런타임에 전달할 뿐 암호화 보관을 제공하지 않는다.

## 6. 트러블슈팅

| 실패 단계 | 먼저 확인할 것 |
| --- | --- |
| Gradle 실행 실패 | Wrapper·Java 버전·실행 권한·의존성 다운로드 |
| COPY·gradlew 부재 | Docker 빌드 컨텍스트와 ignore 규칙 |
| 실행 JAR 오류 | bootJar 결과와 plain JAR 선택 여부 |
| 필수 설정 누락 | DB_PASSWORD·JWT_SECRET 등 앱의 실제 요구값 |
| DB 접속 실패 | 서비스 이름·네트워크·인증·선택 DB |
| 테이블 생성·조회 실패 | 스키마·DDL 정책·객체 권한·초기화 여부 |

이는 소스에서 확인한 점검 기준이다. 모든 항목이 실제로 발생했던 장애라고 쓰지는 않는다. 원래 운영의 민감한 환경 파일을 공개 예제로 복사하지 않았다.

## 7. 기술적 이해

이미지의 이식성은 DB 자료와 비밀값, 외부 네트워크까지 자동 복제한다는 뜻이 아니다. 멀티스테이지로 빌드 도구를 제외해도 런타임의 사용자 권한·파일 쓰기 위치·의존 서비스는 계속 관리해야 한다.

## 8. 최종 검증

- [ ] Java toolchain과 빌드·실행 이미지가 17 기준으로 맞는다.
- [ ] 테스트 결과와 bootJar 산출물을 확인한다.
- [ ] 이미지 ID와 컨테이너가 실제 사용하는 이미지를 대조한다.
- [ ] 로그·실제 HTTP·DB 인증과 객체 권한을 따로 확인한다.
- [ ] 비 root 사용자의 업로드 경로가 의도대로 동작한다.
- [ ] 재시작 후 데이터와 앱 설정이 보존된다.

이번 작성에서는 소스와 문서만 읽었고 서버 빌드·컨테이너 실행은 하지 않았다. 현재 앱·DB의 실행 결과는 **확인하지 못함**이다.

## 9. 회고

실행 파일 하나보다 그 파일이 의존하는 설정과 권한이 더 많은 문제를 만든다. 특히 두 프로젝트의 DDL 정책이 다르다는 점을 그대로 기록해야 재현 과정에서 불필요하게 운영 권한을 넓히는 일을 피할 수 있었다.

## 10. 다음 편

[8편](/blog/home-server-compose-operations-backup-rollback)에서는 앱과 DB의 수명을 나누고 실제 운영 스크립트·로그·백업·롤백 절차를 비교한다.

---

[전체 목차](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [이전 글](/blog/home-server-postgresql-compose-volumes-roles) · [다음 글](/blog/home-server-compose-operations-backup-rollback)

