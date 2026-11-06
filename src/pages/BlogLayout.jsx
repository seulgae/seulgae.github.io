import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BlogHeader from "../components/BlogHeader";
import BlogSidebar from "../components/BlogSidebar";
import BlogFooter from "../components/BlogFooter";

export default function BlogLayout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia?.("(max-width: 960px)").matches ?? false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef(null);
  const sidebarOpen = isMobile ? mobileOpen : desktopOpen;

  useEffect(() => {
    const query = window.matchMedia?.("(max-width: 960px)");
    if (!query) return undefined;
    const update = () => {
      setIsMobile(query.matches);
      setMobileOpen(false);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!sidebarOpen) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isMobile) setMobileOpen(false);
        else setDesktopOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, isMobile]);

  return (
    <div className="app-shell blog-shell">
      <BlogHeader
        sidebarOpen={sidebarOpen}
        toggleRef={toggleRef}
        onToggleSidebar={() => isMobile ? setMobileOpen((prev) => !prev) : setDesktopOpen((prev) => !prev)}
      />

      <div className={`blog-container${!isMobile && !desktopOpen ? " sidebar-collapsed" : ""}`}>
        <BlogSidebar
          hidden={isMobile && !mobileOpen}
          collapsed={!sidebarOpen}
          drawerOpen={isMobile && mobileOpen}
          onCloseDrawer={() => setMobileOpen(false)}
        />

        <main className="blog-main page-enter" key={location.pathname}>
          <Outlet />
        </main>
      </div>

      <BlogFooter />
    </div>
  );
}

