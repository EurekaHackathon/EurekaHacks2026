"use client";

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
      <img src="/stats/punch.png" alt="" className="stats-char stats-punch" />
      <img src="/stats/mad-boi.png" alt="" className="stats-char stats-mad-boi" />
    </section>
  );
}
