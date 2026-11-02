import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BlogHeader from "../components/BlogHeader";
import BlogSidebar from "../components/BlogSidebar";
import BlogFooter from "../components/BlogFooter";

export default function BlogLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!sidebarOpen) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="app-shell blog-shell">
      <BlogHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="blog-container">
        <BlogSidebar
          drawerOpen={sidebarOpen}
          onCloseDrawer={() => setSidebarOpen(false)}
        />

        <main className="blog-main page-enter" key={location.pathname}>
          <Outlet />
        </main>
      </div>

      <BlogFooter />
    </div>
  );
}

