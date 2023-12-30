import React from "react";
import "./Styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="mission">
        <div className="mission-image">
          <img className="about-image" src="mission.jpeg" alt="Our Mission" />
        </div>
        <div className="mission-box">
          <h2 className="mission-header">Our Mission</h2>
          <p className="mission-text">
            Our mission is to streamline and simplify the returns journey for
            both customers and retailers, ensuring a hassle-free and efficient
            process. By leveraging innovative technologies and customer-centric
            strategies, we aim to eliminate the pain points associated with
            returns, turning them into opportunities for positive engagement and
            brand loyalty. We strive to empower businesses with insightful data
            and analytics derived from returns, enabling them to make informed
            decisions that enhance product quality, customer service, and
            overall satisfaction.
          </p>
        </div>
      </div>
      <div className="vision">
        <div className="vision-box">
          <h2 className="vision-header">Our Vision</h2>
          <p className="vision-text">
            Our goal is to implement innovative solutions that streamline the
            entire returns process, from initiation to resolution, ensuring
            efficiency and transparency at every step. By leveraging
            cutting-edge technology, data analytics, and customer feedback, we
            aim to tailor the returns experience to individual preferences,
            providing personalized solutions and enhancing overall satisfaction.
          </p>
        </div>
        <div className="vision-image">
          <img className="about-image" src="vision.jpeg" alt="Our Vision" />
        </div>
      </div>
    </div>
  );
}
