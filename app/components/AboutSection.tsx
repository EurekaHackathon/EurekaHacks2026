"use client";

export default function AboutSection() {
  return (
    <div className="about-section">
      <div className="about-content">
        <h2 className="section-title">About the Event</h2>
        <p className="section-text">
          Welcome to EurekaHacks 2026! Join us for an exciting hackathon experience at Geotab HQ. 
          Build innovative projects, meet fellow developers, and compete for amazing prizes.
        </p>
        
        <div className="section-block">
          <h2 className="section-title">Schedule</h2>
          <p className="section-text">
            More details coming soon...
          </p>
        </div>

        <div className="section-block">
          <h2 className="section-title">Sponsors</h2>
          <p className="section-text">
            Thank you to our amazing sponsors who make this event possible!
          </p>
        </div>
      </div>
    </div>
  );
}
