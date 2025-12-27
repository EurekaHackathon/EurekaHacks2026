"use client";
import './stats-box-styles.css';

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-bg-container">
        <img src="/stats/bg1.png" alt="" className="stats-bg" />
        <img src="/stats/side-eye.png" alt="" className="stats-char stats-side-eye w-100" />
        <img src="/stats/smol-boi.png" alt="" className="stats-char stats-smol-boi" />
      </div>
      <div className="stats-bg-container">
        <img src="/stats/bg2.png" alt="" className="stats-bg" />
        <img src="/stats/flying-boi.png" alt="" className="stats-char stats-flying-boi" />
      </div>
      <div className="stats-bg-container">
        <img src="/stats/bg3.png" alt="" className="stats-bg" />
      </div>
      {/* High z-index characters */}
      <img src="/stats/mad-boi.png" alt="" className="stats-char stats-mad-boi" />
      {/* Text boxes on top layer */}
      <div className="stats-box-wrapper stats-box-1">
        <img src="/stats/text-box.png" alt="" className="stats-box-bg" />
        <div className="stats-text">
          <h3>500+</h3>
          <p>HACKERS</p>
        </div>
      </div>
      <div className="stats-box-wrapper stats-box-2">
        <img src="/stats/text-box2.png" alt="" className="stats-box-bg" />
        <div className="stats-text">
          <h3>$10k+</h3>
          <p>IN PRIZES</p>
        </div>
      </div>
      <div className="stats-box-wrapper stats-box-3">
        <img src="/stats/text-box3.png" alt="" className="stats-box-bg" />
        <div className="stats-text">
          <h3>24H</h3>
          <p>OF HACKING</p>
        </div>
      </div>
      <img src="/stats/punch.png" alt="" className="stats-char stats-punch" />
    </section>
  );
}
