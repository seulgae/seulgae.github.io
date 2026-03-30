import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio navigation", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: "About Me" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Project Experience" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Education" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Resume Print" })).toBeInTheDocument();
});
