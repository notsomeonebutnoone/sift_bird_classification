import { useEffect, useState } from "react";

const fallback = {
  title: "Avian SIFT Sentinel",
  subtitle:
    "Real-time bird detection using combined SIFT + HOG features with adaptive ultrasonic actuation.",
  highlights: [
    "Developed a computer vision system using SIFT + HOG feature extraction for real-time bird detection.",
    "Dynamically controlled ultrasonic actuators based on detection density.",
    "Published a peer-reviewed conference research paper.",
  ],
  sections: [
    {
      title: "System Overview",
      body:
        "A lightweight vision pipeline extracts SIFT keypoints and HOG descriptors per frame, matches them against a labeled species library, and scores detection confidence in real time.",
    },
    {
      title: "Adaptive Actuation",
      body:
        "Detection density is converted into actuator duty cycles, enabling targeted ultrasonic responses that scale with activity rather than raw frame counts.",
    },
    {
      title: "Dataset Matching",
      body:
        "Live frames are compared against a pre-existing dataset of bird species images to compute similarity scores and identify the most likely matches.",
    },
    {
      title: "Publication",
      body:
        "The end-to-end system and field tests were documented in a peer-reviewed conference paper, detailing accuracy, response latency, and energy use.",
    },
  ],
  metrics: [
    { label: "Pipeline", value: "SIFT + HOG" },
    { label: "Actuation", value: "Ultrasonic Array" },
    { label: "Dataset", value: "Species Library" },
    { label: "Output", value: "Conference Paper" },
  ],
};

export default function App() {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    fetch("/api/summary")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((payload) => {
        if (!active) return;
        setData(payload);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("offline");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <header className="hero">
        <div className="hero-badge">
          Research Snapshot
          <span className={`status ${status}`}>
            {status === "ready" ? "Live data" : "Local data"}
          </span>
        </div>
        <h1>{data.title}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
        <div className="hero-cta">
          <button className="primary">View Technical Summary</button>
          <button className="ghost">Download Paper</button>
        </div>
      </header>

      <section className="metrics">
        {data.metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <p className="metric-label">{metric.label}</p>
            <h3>{metric.value}</h3>
          </article>
        ))}
      </section>

      <section className="highlight-grid">
        <div className="highlight-panel">
          <h2>Project Highlights</h2>
          <ul>
            {data.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="highlight-panel accent">
          <div>
            <h2>Field Deployment</h2>
            <p>
              The system prioritizes immediate detections, throttling actuation
              rates to balance avian deterrence with hardware longevity.
            </p>
            <div className="chips">
              <span>Edge Vision</span>
              <span>Adaptive Control</span>
              <span>Energy Aware</span>
            </div>
          </div>
          <div className="stamp">
            <span>Peer Reviewed</span>
            <strong>2025</strong>
          </div>
        </div>
      </section>

      <section className="sections">
        {data.sections.map((section) => (
          <article key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="flow">
        <div>
          <h2>Method Flow</h2>
          <p>
            From frame capture to actuator command, every module is optimized
            for consistency and low-latency response in field conditions.
          </p>
        </div>
        <div className="flow-steps">
          <div>
            <h4>01</h4>
            <p>Capture</p>
          </div>
          <div>
            <h4>02</h4>
            <p>SIFT Match</p>
          </div>
          <div>
            <h4>03</h4>
            <p>Density Score</p>
          </div>
          <div>
            <h4>04</h4>
            <p>Ultrasonic Actuate</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Built with a Python vision core and a research-first interface.</p>
      </footer>
    </div>
  );
}
