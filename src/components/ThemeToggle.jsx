import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ theme, onToggle }) {
  const label = theme === "dark" ? "밝은 화면으로 전환" : "어두운 화면으로 전환";
  return (
    <button type="button" className="site-theme-button" aria-label={label} title={label} onClick={onToggle}>
      {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}
