/**
 * "제목 (부제)" 형태의 문자열을 본문과 괄호 부분으로 나눕니다.
 * 사이드바 메뉴와 프로젝트 제목이 같은 규칙으로 줄바꿈되도록 공용화했습니다.
 */
export function splitBracketTitle(text = "") {
  const bracketIndex = text.indexOf("(");

  if (bracketIndex === -1) {
    return { main: text, sub: "" };
  }

  return {
    main: text.slice(0, bracketIndex).trimEnd(),
    sub: text.slice(bracketIndex).trim(),
  };
}

/**
 * public/ 아래의 정적 파일 경로를 Vite base 경로 기준으로 만들어 줍니다.
 * 배포 base가 바뀌어도 이미지 경로가 깨지지 않습니다.
 */
export function assetUrl(fileName = "") {
  const normalized = fileName.replace(/^\//, "");

  return `${import.meta.env.BASE_URL}${normalized}`;
}
