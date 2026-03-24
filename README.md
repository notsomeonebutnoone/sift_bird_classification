# SIFT + HOG Bird Detection & Ultrasonic Actuation

This project builds a real-time bird detection system that combines SIFT feature matching with HOG (Histogram of Oriented Gradients) descriptors. Live video frames are compared against a curated dataset of bird species images to identify likely matches, estimate detection density, and dynamically control an ultrasonic actuator array. The end-to-end system was validated in field conditions and published in a peer-reviewed conference paper.

## Visual Summary (SVG)

<svg width="920" height="190" viewBox="0 0 920 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipeline overview">
  <rect width="920" height="190" rx="18" fill="#f8f2e8"/>
  <rect x="24" y="30" width="160" height="130" rx="14" fill="#fff6e8" stroke="#c76b3c" stroke-width="2"/>
  <text x="44" y="78" font-size="16" font-family="Segoe UI, Arial" fill="#1d1a16">Video Feed</text>
  <text x="44" y="104" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Frames @ 30 FPS</text>

  <rect x="218" y="30" width="180" height="130" rx="14" fill="#fff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="238" y="70" font-size="14" font-family="Segoe UI, Arial" fill="#1d1a16">Feature Extractors</text>
  <text x="238" y="96" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">SIFT Keypoints</text>
  <text x="238" y="116" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">HOG Descriptors</text>

  <rect x="432" y="30" width="190" height="130" rx="14" fill="#fff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="452" y="70" font-size="14" font-family="Segoe UI, Arial" fill="#1d1a16">Dataset Matching</text>
  <text x="452" y="96" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Species Library</text>
  <text x="452" y="116" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Similarity Scores</text>

  <rect x="656" y="30" width="240" height="130" rx="14" fill="#1d1a16"/>
  <text x="676" y="70" font-size="14" font-family="Segoe UI, Arial" fill="#ffffff">Density → Actuation</text>
  <text x="676" y="96" font-size="12" font-family="Segoe UI, Arial" fill="#f2d7c6">Duty Cycle Control</text>
  <text x="676" y="116" font-size="12" font-family="Segoe UI, Arial" fill="#f2d7c6">Ultrasonic Array</text>

  <line x1="184" y1="95" x2="218" y2="95" stroke="#1d1a16" stroke-width="2"/>
  <line x1="398" y1="95" x2="432" y2="95" stroke="#1d1a16" stroke-width="2"/>
  <line x1="622" y1="95" x2="656" y2="95" stroke="#1d1a16" stroke-width="2"/>
</svg>

<svg width="920" height="220" viewBox="0 0 920 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sentinel visualization">
  <rect width="920" height="220" rx="18" fill="#0b0b0c"/>
  <text x="32" y="44" font-size="16" font-family="Segoe UI, Arial" fill="#f7f7f2">Detector Sentinel Stack</text>
  <g transform="translate(60, 70)">
    <rect x="0" y="0" width="200" height="120" rx="16" fill="#151515" stroke="#2dd4bf" stroke-width="1.5"/>
    <rect x="30" y="20" width="140" height="70" rx="10" fill="#050505"/>
    <rect x="80" y="52" width="40" height="6" fill="#2dd4bf"/>
  </g>
  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="220" height="140" rx="18" fill="#1a1a1a" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="40" y="28" width="140" height="80" rx="12" fill="#0a0a0a"/>
    <rect x="90" y="64" width="40" height="6" fill="#f59e0b"/>
  </g>
  <g transform="translate(660, 70)">
    <rect x="0" y="0" width="200" height="120" rx="16" fill="#191218" stroke="#f472b6" stroke-width="1.5"/>
    <rect x="30" y="20" width="140" height="70" rx="10" fill="#050505"/>
    <rect x="80" y="52" width="40" height="6" fill="#f472b6"/>
  </g>
</svg>

<svg width="920" height="200" viewBox="0 0 920 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Detection density to actuator response">
  <rect width="920" height="200" rx="18" fill="#f3efe7"/>
  <text x="32" y="44" font-size="16" font-family="Segoe UI, Arial" fill="#1d1a16">Detection Density → Ultrasonic Response</text>
  <rect x="32" y="70" width="280" height="100" rx="12" fill="#fff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="52" y="102" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Low Density</text>
  <rect x="52" y="118" width="200" height="10" fill="#efe4d4"/>
  <rect x="52" y="118" width="60" height="10" fill="#c76b3c"/>

  <rect x="320" y="70" width="280" height="100" rx="12" fill="#fff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="340" y="102" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Medium Density</text>
  <rect x="340" y="118" width="200" height="10" fill="#efe4d4"/>
  <rect x="340" y="118" width="120" height="10" fill="#c76b3c"/>

  <rect x="608" y="70" width="280" height="100" rx="12" fill="#fff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="628" y="102" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">High Density</text>
  <rect x="628" y="118" width="200" height="10" fill="#efe4d4"/>
  <rect x="628" y="118" width="180" height="10" fill="#c76b3c"/>
</svg>

<svg width="920" height="190" viewBox="0 0 920 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dataset and species matching">
  <rect width="920" height="190" rx="18" fill="#fff6e8"/>
  <text x="32" y="44" font-size="16" font-family="Segoe UI, Arial" fill="#1d1a16">Species Image Dataset</text>
  <rect x="32" y="70" width="130" height="90" rx="12" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <rect x="178" y="70" width="130" height="90" rx="12" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <rect x="324" y="70" width="130" height="90" rx="12" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <rect x="470" y="70" width="130" height="90" rx="12" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="52" y="128" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Sparrow</text>
  <text x="198" y="128" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Pigeon</text>
  <text x="344" y="128" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Myna</text>
  <text x="490" y="128" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Crow</text>
  <rect x="640" y="70" width="248" height="90" rx="12" fill="#1d1a16"/>
  <text x="660" y="110" font-size="12" font-family="Segoe UI, Arial" fill="#f2d7c6">Top Match: 0.92</text>
  <text x="660" y="132" font-size="12" font-family="Segoe UI, Arial" fill="#f2d7c6">Species: Sparrow</text>
</svg>

<svg width="920" height="220" viewBox="0 0 920 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SIFT and HOG fusion">
  <rect width="920" height="220" rx="18" fill="#f8f2e8"/>
  <text x="32" y="44" font-size="16" font-family="Segoe UI, Arial" fill="#1d1a16">SIFT + HOG Fusion</text>
  <rect x="32" y="70" width="260" height="120" rx="14" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="52" y="102" font-size="13" font-family="Segoe UI, Arial" fill="#6b5a4a">SIFT Keypoints</text>
  <circle cx="84" cy="136" r="8" fill="#c76b3c"/>
  <circle cx="120" cy="160" r="6" fill="#c76b3c"/>
  <circle cx="170" cy="130" r="5" fill="#c76b3c"/>
  <circle cx="210" cy="156" r="7" fill="#c76b3c"/>

  <rect x="324" y="70" width="260" height="120" rx="14" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="344" y="102" font-size="13" font-family="Segoe UI, Arial" fill="#6b5a4a">HOG Gradients</text>
  <line x1="350" y1="128" x2="420" y2="168" stroke="#1d1a16" stroke-width="2"/>
  <line x1="430" y1="128" x2="500" y2="168" stroke="#1d1a16" stroke-width="2"/>
  <line x1="510" y1="128" x2="580" y2="168" stroke="#1d1a16" stroke-width="2"/>

  <rect x="624" y="70" width="260" height="120" rx="14" fill="#1d1a16"/>
  <text x="644" y="102" font-size="13" font-family="Segoe UI, Arial" fill="#f2d7c6">Fusion Vector</text>
  <rect x="644" y="128" width="220" height="14" rx="7" fill="#2b2520"/>
  <rect x="644" y="128" width="140" height="14" rx="7" fill="#c76b3c"/>
  <rect x="644" y="148" width="220" height="10" rx="5" fill="#2b2520"/>
  <rect x="644" y="148" width="180" height="10" rx="5" fill="#d7a483"/>

  <line x1="292" y1="130" x2="324" y2="130" stroke="#1d1a16" stroke-width="2"/>
  <line x1="584" y1="130" x2="624" y2="130" stroke="#1d1a16" stroke-width="2"/>
</svg>

<svg width="920" height="220" viewBox="0 0 920 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End-to-end inference loop">
  <rect width="920" height="220" rx="18" fill="#fff6e8"/>
  <text x="32" y="44" font-size="16" font-family="Segoe UI, Arial" fill="#1d1a16">End-to-End Inference Loop</text>
  <rect x="32" y="70" width="180" height="120" rx="14" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="52" y="104" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Frame Capture</text>
  <rect x="234" y="70" width="180" height="120" rx="14" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="254" y="104" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Feature Fusion</text>
  <rect x="436" y="70" width="180" height="120" rx="14" fill="#ffffff" stroke="#1d1a16" stroke-width="1.5"/>
  <text x="456" y="104" font-size="12" font-family="Segoe UI, Arial" fill="#6b5a4a">Species Match</text>
  <rect x="638" y="70" width="250" height="120" rx="14" fill="#1d1a16"/>
  <text x="658" y="104" font-size="12" font-family="Segoe UI, Arial" fill="#f2d7c6">Density → PWM</text>
  <text x="658" y="128" font-size="12" font-family="Segoe UI, Arial" fill="#f2d7c6">Ultrasonic Array</text>
  <line x1="212" y1="130" x2="234" y2="130" stroke="#1d1a16" stroke-width="2"/>
  <line x1="414" y1="130" x2="436" y2="130" stroke="#1d1a16" stroke-width="2"/>
  <line x1="616" y1="130" x2="638" y2="130" stroke="#1d1a16" stroke-width="2"/>
</svg>

## What the System Actually Does

The detection pipeline fuses two complementary feature strategies:
- SIFT (Scale-Invariant Feature Transform) captures distinctive keypoints so the system can recognize birds under changes in scale, angle, and lighting.
- HOG (Histogram of Oriented Gradients) captures edge direction distributions, which strengthens shape-based discrimination when keypoints are sparse or motion blur is present.

Each incoming frame is processed to extract SIFT and HOG descriptors, then compared against a pre-existing dataset of labeled bird species images. The matching step scores similarity across species and aggregates detections over time to produce a density estimate. That density drives an actuator controller that scales ultrasonic output intensity rather than issuing static on/off triggers, improving responsiveness while reducing energy waste and wear on the transducers.

The project’s contributions include a combined SIFT + HOG matching strategy, a dataset-driven species comparison loop, and a density-aware actuation policy tuned for real-time deployment. The results and field evaluations were published in a peer-reviewed conference paper.
