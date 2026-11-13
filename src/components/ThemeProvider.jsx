import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={[theme, toggleTheme]}>{children}</ThemeContext.Provider>;
}
