from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from groq import Groq
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class AnalyzeRequest(BaseModel):
    url: str
    description: str = ""
    tone: str = "founder"
    source_type: str = "website"

@app.post("/analyze")
async def analyze_product(req: AnalyzeRequest):
    try:
        clean_text = ""
        
        # 1. Scrape only if not a raw pitch
        if req.source_type != "pitch":
            response = requests.get(req.url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            for script in soup(["script", "style"]):
                script.decompose()
            text = soup.get_text()
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            clean_text = '\n'.join(chunk for chunk in chunks if chunk)[:3000]

        # 2. Context-aware Prompting
        source_context = {
            "website": "Analyze this landing page to understand the product and value proposition.",
            "social": "Analyze this social media/GitHub content to learn the founder's voice, existing community interactions, and product progress.",
            "pitch": "Analyze this raw founder pitch to extract a vision for a product that hasn't been fully marketed yet."
        }

        prompt = f"""
        Role: World-class GTM Strategist & Behavioral Copywriter.
        Task: {source_context.get(req.source_type, "")}
        
        Input Content: {clean_text if clean_text else "None (Raw Pitch Only)"}
        Input Description: {req.description}
        Target Tone: {req.tone}
        
        Required JSON Structure:
        {{
          "name": "Product Name",
          "tagline": "Punchy tagline",
          "description": "Short description",
          "target_audience": ["audience 1", "audience 2"],
          "pain_points": ["pain point 1", "pain point 2"],
          "usps": ["usp 1", "usp 2"],
          "voice_profile": {{
            "rhythm": "e.g., fast, punchy",
            "vocabulary": "e.g., technical, casual",
            "emotional_bias": "e.g., optimistic, pragmatic"
          }},
          "sample_posts": {{
            "x": "Draft post for X",
            "reddit": "Draft helpful comment for Reddit",
            "linkedin": "Draft story for LinkedIn"
          }}
        }}
        
        Return ONLY valid JSON.
        """
        
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are an expert at extracting product DNA from minimal signals."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        analysis = completion.choices[0].message.content
        return {"status": "success", "data": analysis}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
