from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from services.risk_analyzer import RiskAnalyzer

app = FastAPI(title="Kini API")
analyzer = RiskAnalyzer()

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Kini API is active"}

@app.post("/scan/text")
async def scan_text(content: str):
    result = analyzer.analyze(content)
    return result

@app.post("/scan/image")
async def scan_image(file: UploadFile = File(...)):
    # In the MVP, we mock the OCR extraction for the demo screenshot
    # but the logic flow is ready for a Tesseract/Cloud integration.
    mock_text = "I accidentally sent 200k more than the price. Please refund the balance to my brother's account ASAP."
    result = analyzer.analyze(mock_text)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
