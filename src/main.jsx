import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tokens.css";
import "./index.css";
import App from "./App";
import { recoverModuleLoad } from "./utils/recoverModuleLoad";

/**
 * 포트폴리오와 블로그를 시작하고 배포 후 지연 로딩 파일의 요청 실패를 처리한다.
 * @author seulgae
 * @version 1.0, 지연 로딩 파일 복구 연결
 * @see recoverModuleLoad
 */
window.addEventListener("vite:preloadError", recoverModuleLoad);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
