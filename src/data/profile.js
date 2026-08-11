// 인물 정보의 단일 출처. 사이드바 명함, Home, 출력용 이력서가 모두 이 파일을 참조합니다.
// 만 나이는 birthDate에서 계산하므로 해가 바뀌어도 손댈 필요가 없습니다.

const profile = {
  name: "길태형",
  role: "Backend Developer",
  badge: "SI / SM Developer",
  birthDate: "1996-08-16",
  careerSummary: "3년+",
  keywords: "운영 안정화, 성능 개선, 자동화",
  phone: "010-3933-3763",
  email: "r1605866@gmail.com",
  profileImage: "giltaehyeong.jpg",
  links: {
    github: "https://github.com/seulgae",
    blog: "https://doltae.tistory.com/",
  },
  intro:
    "운영 환경에서 발생하는 문제를 빠르게 수습하는 데서 끝내지 않고, 재발을 줄이는 구조 개선과 자동화까지 연결해온 SI / SM 중심의 백엔드 개발자입니다.",
  strengths: [
    "운영 이슈를 임시 대응으로 끝내지 않고, 재발 방지 구조와 자동화까지 연결합니다.",
    "Spring Boot, Batch, REST API 기반 업무 시스템 개발과 운영 안정화 경험을 보유하고 있습니다.",
    "모니터링, 로그 분석, 배치 자동화, 성능 개선을 통해 수치로 확인되는 결과를 만들어왔습니다.",
  ],
  // Home의 기술 스택 섹션과 이력서의 기술 스택 표가 함께 사용합니다.
  techStack: [
    {
      label: "Back-End",
      items: [
        "Java",
        "Spring",
        "Spring Boot",
        "Spring Batch",
        "REST API",
        "MyBatis",
        "Thymeleaf",
        "Jasypt",
      ],
    },
    {
      label: "Data / Infra",
      items: ["Oracle", "MySQL", "Redis", "Kafka", "Linux", "Jenkins", "WhaTap"],
    },
    {
      label: "Front / Tools",
      items: [
        "React",
        "JavaScript",
        "jQuery",
        "HTML/CSS",
        "Git",
        "Maven",
        "Gradle",
        "DBeaver",
      ],
    },
  ],
};

/** birthDate 기준 만 나이. 생일이 지나지 않았으면 1을 뺍니다. */
export function getAge(today = new Date()) {
  const birth = new Date(profile.birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
}

/** "1996년 8월 16일생 (만 29세)" 형태의 표기 */
export function getBirthLabel(today = new Date()) {
  const birth = new Date(profile.birthDate);

  return `${birth.getFullYear()}년 ${birth.getMonth() + 1}월 ${birth.getDate()}일생 (만 ${getAge(today)}세)`;
}

export default profile;
