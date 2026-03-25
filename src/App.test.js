import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders portfolio navigation", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: "About Me" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Project Experience" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Inventory" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "안정성은 견고하게, 운영은 스마트하게" }),
  ).toBeInTheDocument();
});
