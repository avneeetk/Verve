from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS: Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class JournalEntry(BaseModel):
    date: str
    text: str

@app.post("/analyze-week")
def analyze_week(entries: List[JournalEntry]):
    # Here, you'd do NLP, ML analysis, etc. For now, fake it.
    print("Received entries:", entries)

    return {
        "mood": "Positive",
        "stressLevel": "Low",
        "emotions": ["Happy", "Motivated", "Focused"],
        "extractedTasks": [
            "Complete project presentation",
            "Schedule meeting with design team",
            "Review quarterly results"
        ],
        "extractedGoals": [
            "Finish the report by Friday",
            "Start new exercise routine"
        ],
        "scheduleRecommendations": [
            "Take a break at 3PM to avoid afternoon slump",
            "Schedule deep work from 10AM–12PM"
        ]
    }
