from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Avian SIFT Sentinel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/summary")
def summary():
    return {
        "title": "Avian SIFT Sentinel",
        "subtitle": (
            "Real-time bird detection with SIFT feature matching and adaptive ultrasonic actuation."
        ),
        "highlights": [
            "Developed a computer vision system using SIFT feature matching for real-time bird detection.",
            "Dynamically controlled ultrasonic actuators based on detection density.",
            "Published a peer-reviewed conference research paper.",
        ],
        "sections": [
            {
                "title": "System Overview",
                "body": (
                    "A lightweight vision pipeline extracts SIFT keypoints per frame, "
                    "matches them against a reference library, and scores detection "
                    "confidence in real time."
                ),
            },
            {
                "title": "Adaptive Actuation",
                "body": (
                    "Detection density is converted into actuator duty cycles, enabling "
                    "targeted ultrasonic responses that scale with activity rather than raw "
                    "frame counts."
                ),
            },
            {
                "title": "Publication",
                "body": (
                    "The end-to-end system and field tests were documented in a peer-reviewed "
                    "conference paper, detailing accuracy, response latency, and energy use."
                ),
            },
        ],
        "metrics": [
            {"label": "Pipeline", "value": "SIFT + BFMatcher"},
            {"label": "Actuation", "value": "Ultrasonic Array"},
            {"label": "Runtime", "value": "Real-Time Stream"},
            {"label": "Output", "value": "Conference Paper"},
        ],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
