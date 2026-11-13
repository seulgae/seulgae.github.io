import { useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // 저장이 제한된 브라우저에서도 현재 화면의 전환은 유지한다.
    }
  };

  return [theme, toggleTheme];
}
