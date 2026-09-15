import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, test } from "vitest";
import ProjectArchitecture from "./ProjectArchitecture";
import architectureBySlug from "../data/projectArchitecture";
import { findPostBySlug } from "../lib/posts";

test.each(Object.keys(architectureBySlug))("%s의 상세 설명과 원문 링크가 동작한다", (slug) => {
  const data = architectureBySlug[slug];
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<ProjectArchitecture slug={slug} />} />
        <Route path="/blog/:slug" element={<h1>기술 글 도착</h1>} />
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByRole("heading", { name: "시스템 한눈에 보기" })).toBeInTheDocument();
  const summary = screen.getByText(data.details[1].title);
  expect(summary.closest("details")).not.toHaveAttribute("open");
  fireEvent.click(summary);
  expect(summary.closest("details")).toHaveAttribute("open");
  data.sources.forEach((source) => {
    expect(findPostBySlug(source.slug)).toBeTruthy();
    expect(screen.getByRole("link", { name: `${source.label} →` })).toHaveAttribute("href", `/blog/${source.slug}`);
  });
  fireEvent.click(screen.getByRole("link", { name: `${data.sources[0].label} →` }));
  expect(screen.getByRole("heading", { name: "기술 글 도착" })).toBeInTheDocument();
});
