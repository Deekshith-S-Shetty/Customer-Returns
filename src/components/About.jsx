import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="mission">
        <div className="mission-image">
          <img src="mission.jpeg" alt="Our Mission" />
        </div>
        <div className="mission-box">
          <h2 className="mission-header">Our Mission</h2>
          <p className="mission-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            maxime tempora nihil dolores amet ea exercitationem placeat hic
            asperiores. Provident temporibus, quas sit velit quisquam unde optio
            ratione? Ducimus, consequatur. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Pariatur necessitatibus, minima
            maiores non mollitia quam, consequuntur eum rem tempore dolores
            magnam accusantium minus alias ratione nulla quas totam, cum
            reprehenderit neque sit adipisci delectus. Necessitatibus sed a
            beatae error minima, in tempora quisquam officia, ipsum,
            reprehenderit modi. Voluptate, enim ut!
          </p>
        </div>
      </div>
      <div className="vision">
        <div className="vision-box">
          <h2 className="vision-header">Our Vision</h2>
          <p className="vision-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            maxime tempora nihil dolores amet ea exercitationem placeat hic
            asperiores. Provident temporibus, quas sit velit quisquam unde optio
            ratione? Ducimus, consequatur. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Pariatur necessitatibus, minima
            maiores non mollitia quam, consequuntur eum rem tempore dolores
            magnam accusantium minus alias ratione nulla quas totam, cum
            reprehenderit neque sit adipisci delectus. Necessitatibus sed a
            beatae error minima, in tempora quisquam officia, ipsum,
            reprehenderit modi. Voluptate, enim ut!
          </p>
        </div>
        <div className="vision-image">
          <img src="vision.jpeg" alt="Our Vision" />
        </div>
      </div>
    </div>
  );
}
