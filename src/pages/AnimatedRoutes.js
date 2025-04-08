import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Home";
import ProjectsList from "./ProjectsList";
import EducationList from "./EducationList";
import Contact from "./Contact";
import Awards from "./Awards";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/ProjectsList" element={<PageWrapper><ProjectsList /></PageWrapper>} />
        <Route path="/Awards" element={<PageWrapper><Awards /></PageWrapper>} />
        <Route path="/EducationList" element={<PageWrapper><EducationList /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedRoutes;