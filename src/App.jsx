import { useEffect, useMemo, useState } from "react";

const fallback = {
  title: "Avian SIFT Sentinel",
  subtitle:
    "Real-time bird detection using combined SIFT + HOG features with adaptive ultrasonic actuation.",
  highlights: [
    "Developed a computer vision system using SIFT + HOG feature extraction for real-time bird detection.",
    "Compared live video frames against a labeled dataset of bird species to identify probable matches.",
    "Converted detection density into actuator duty cycles for intelligent ultrasonic response.",
  ],
  sections: [
    {
      title: "Feature Fusion",
      body:
        "SIFT handles scale and rotation invariance while HOG captures shape gradients, creating a robust signal even when motion blur or occlusion appear in the stream.",
    },
    {
      title: "Dataset Matching",
      body:
        "Each frame is matched against a curated species image library, scoring similarity per class to produce confident, explainable detections.",
    },
    {
      title: "Actuation Logic",
      body:
        "Density estimates are converted into PWM duty cycles so the ultrasonic array scales intensity rather than firing static bursts.",
    },
  ],
  metrics: [
    { label: "Pipeline", value: "SIFT + HOG" },
    { label: "Dataset", value: "Species Library" },
    { label: "Output", value: "Conference Paper" },
    { label: "Runtime", value: "Real-Time Feed" },
  ],
};

const particleField = [
  { id: 1, x: 142, delay: "0.2s", drift: "10px" },
  { id: 2, x: 158, delay: "0.8s", drift: "-8px" },
  { id: 3, x: 178, delay: "1.3s", drift: "6px" },
  { id: 4, x: 196, delay: "0.5s", drift: "-12px" },
  { id: 5, x: 214, delay: "1.1s", drift: "14px" },
];

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

  const heroTag = useMemo(
    () => (status === "ready" ? "Live data" : "Local data"),
    [status]
  );

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <nav className="nav">
        <div className="logo">SIFTBIRD</div>
        <div className="nav-links">
          <span>Pipeline</span>
          <span>Dataset</span>
          <span>Actuation</span>
          <span>Publication</span>
        </div>
        <div className="badge">
          Research Snapshot
          <span className={`status ${status}`}>{heroTag}</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <h1>{data.title}</h1>
          <p className="hero-subtitle">{data.subtitle}</p>
          <div className="hero-cta">
            <button className="btn">Open Technical Brief</button>
            <button className="btn secondary">Download Paper</button>
          </div>
        </div>
        <div className="svg-stack">
          <svg
            className="figure is-back float"
            width="320"
            height="360"
            viewBox="0 0 320 360"
            role="img"
            aria-label="Back observer module"
          >
            <ellipse cx="160" cy="330" rx="90" ry="12" fill="#000" opacity="0.5" />
            <g transform="translate(0, 10)">
              <rect x="90" y="110" width="140" height="190" rx="18" fill="#141414" />
              <rect x="115" y="140" width="90" height="70" rx="10" fill="#050505" />
              <rect
                x="140"
                y="168"
                width="40"
                height="6"
                fill="#2dd4bf"
                className="pulse-teal"
              />
              <rect x="110" y="230" width="100" height="40" rx="6" fill="#0b0b0c" />
              {particleField.map((p) => (
                <rect
                  key={p.id}
                  className="particle"
                  x={p.x}
                  y="230"
                  width="2"
                  height="2"
                  style={{ "--drift": p.drift, animationDelay: p.delay }}
                  fill="#2dd4bf"
                />
              ))}
            </g>
          </svg>

          <svg
            className="figure"
            width="320"
            height="360"
            viewBox="0 0 320 360"
            role="img"
            aria-label="Central sentinel"
          >
            <ellipse cx="160" cy="330" rx="90" ry="12" fill="#000" opacity="0.7" />
            <g transform="translate(0, 10)">
              <rect x="80" y="100" width="160" height="210" rx="22" fill="#191919" />
              <rect x="110" y="140" width="100" height="80" rx="12" fill="#0a0a0a" />
              <rect
                x="140"
                y="176"
                width="40"
                height="6"
                fill="#f59e0b"
                className="scan"
              />
              <rect x="105" y="240" width="110" height="50" rx="8" fill="#1f1303" />
              <rect x="115" y="248" width="90" height="34" rx="6" fill="#fef3c7" />
              {particleField.map((p) => (
                <rect
                  key={`center-${p.id}`}
                  className="particle"
                  x={p.x}
                  y="240"
                  width="3"
                  height="3"
                  style={{ "--drift": p.drift, animationDelay: p.delay }}
                  fill="#f59e0b"
                />
              ))}
            </g>
          </svg>

          <svg
            className="figure is-front float"
            width="320"
            height="360"
            viewBox="0 0 320 360"
            role="img"
            aria-label="Forward oracle"
          >
            <ellipse cx="160" cy="330" rx="90" ry="12" fill="#000" opacity="0.45" />
            <g transform="translate(0, 10)">
              <rect x="90" y="110" width="140" height="190" rx="18" fill="#1a1216" />
              <rect x="115" y="140" width="90" height="70" rx="10" fill="#050505" />
              <rect
                x="140"
                y="170"
                width="40"
                height="6"
                fill="#f472b6"
                className="pulse-pink"
              />
              <rect x="110" y="230" width="100" height="40" rx="6" fill="#2a101e" />
              {particleField.map((p) => (
                <rect
                  key={`front-${p.id}`}
                  className="particle"
                  x={p.x}
                  y="230"
                  width="2"
                  height="2"
                  style={{ "--drift": p.drift, animationDelay: p.delay }}
                  fill="#f472b6"
                />
              ))}
            </g>
          </svg>
          <div className="caption">Visualized Detector Nodes</div>
        </div>
      </header>

      <section className="metrics">
        {data.metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="panel-grid">
        {data.highlights.map((item) => (
          <article className="panel" key={item}>
            <h3>Highlight</h3>
            <p>{item}</p>
          </article>
        ))}
        <article className="panel">
          <h3>Field Deployment</h3>
          <p>
            Species density windows drive the ultrasonic array in real time,
            optimizing deterrence while protecting actuator longevity and energy
            budgets.
          </p>
        </article>
      </section>

      <section className="flow">
        {data.sections.map((section, index) => (
          <article className="flow-card" key={section.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <footer className="footer">
        Built with a Python vision core, dataset-first matching, and adaptive
        actuation logic.
      </footer>
    </div>
  );
}
