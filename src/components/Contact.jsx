import React from "react";
import "./Styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-header">CONTACT US</h1>
      <form className="contact-form" action="/">
        <div className="form-content form-name">
          <label form="name">Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-content form-email">
          <label form="email">Email</label>
          <input
            type="email"
            placeholder="Enter a valid email address"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-content form-message">
          <label form="desc">Message</label>
          <textarea
            placeholder="Enter your Message"
            rows={7}
            cols={50}
            id="desc"
            name="description"
            required
          />
        </div>
        <div className="form-content">
          <button className="submit-btn">Submit Response</button>
        </div>
      </form>
    </div>
  );
}
