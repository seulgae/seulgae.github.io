import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">연락처</h1>
        <p className="contact-text">이메일: <span className="contact-highlight">r1605866@naver.com</span></p>
        <p className="contact-text">휴대폰: <span className="contact-highlight">010-3933-3763</span></p>
      </div>
    </div>
  );
}

export default Contact;
