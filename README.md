# Aya-Shield: The Digital Sanctuary for Women Sellers

**Pillar:** Digital Inclusion (3MTT NextGen Knowledge Showcase)

**Live Demo Link:** [https://Braingenius2.github.io/aya-shield/](https://Braingenius2.github.io/aya-shield/)

## The Problem (Challenge)
Women micro-entrepreneurs in Nigeria overwhelmingly use social media for business (WhatsApp, Instagram, Facebook). However, they lack the same security infrastructure and "safety buffers" as formal e-commerce platforms. A single "fake overpayment" scam or "advance-fee" trick can wipe out a week's earnings and cause significant emotional distress.

## The Solution (One-Page Brief)
Aya-Shield is a **Digital Sanctuary** for these sellers. It acts as an "External Second Opinion"—providing a low-friction way to validate suspicious messages before responding. 

### Why Aya Shield?
1. **Vertical Focus**: Optimized specifically for the nuances of Nigerian social-commerce scams.
2. **Cognitive Buffer**: Forces a "pause" in high-pressure chat scenarios.
3. **Structured Reporting**: Turns a chaotic chat into a structured "Evidence Pack" for banks and law enforcement.

## The "Day-in-the-Life" Workflow
1. **Pause**: Receipt of a suspicious "overpayment" screenshot.
2.  **Scan**: Screenshot is uploaded to Aya Shield.
3. **Insight**: Analysis flags `Fake Overpayment` and `Urgent Tone`.
4. **Respond**: Seller is given a polite, firm template to send back, ending the fraud attempt instantly.

## Key Features
- **OCR Scan**: Extract text from WhatsApp/IG screenshots.
- **NLP Risk Analysis**: Detects `Fake Overpayment`, `Fake Urgency`, and `Off-Platform` prompts.
- **Shield Suggestion**: Proposes a non-confrontational safe response to suspicious buyers.
- **Evidence Pack**: Generates a structured log for reporting fraud to banks or authorities.

## Technical Stack
- **Frontend**: React + Vite + Vanilla CSS (Lumina Shield Design System).
- **Backend**: FastAPI (Python).
- **AI/ML**: Rule-based NLP for scam pattern detection and Image-to-Text via OCR.

## AI Disclosure
This project utilizes:
1. **Rule-based NLP**: For identifying linguistic risk patterns.
2. **Codex and Antigravity (Agentic AI)**: Used during the ideation and architectural design phase to research local scam patterns. And also to generate the code for the backend and frontend.
3. **Stitch MCP**: Used to come up with the UI/UX design for the frontend.

## How to Run
### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python main.py`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---
*Built for the 3MTT NextGen Showcase • Empowering Digital Choice.*
