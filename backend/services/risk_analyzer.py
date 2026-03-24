import re

class RiskAnalyzer:
    def __init__(self):
        # Common scam indicators in Nigerian social commerce
        self.red_flags = {
            "FAKE_OVERPAYMENT": [
                r"accidentally sent",
                r"sent more than",
                r"please refund",
                r"return the balance",
                r"reversal",
            ],
            "FAKE_URGENCY": [
                r"hurry",
                r"asap",
                r"immediately",
                r"right now",
                r"quick",
                r"emergency",
            ],
            "OFF_PLATFORM": [
                r"whatsapp me",
                r"contact me outside",
                r"send on telegram",
                r"pay via link",
                r"not on app",
            ],
            "SUSPICIOUS_PAYMENT": [
                r"brother's account",
                r"friend will pay",
                r"third party",
                r"bank issue",
                r"payment pending",
            ]
        }

    def analyze(self, text: str):
        if not text or not text.strip():
            return {
                "risk_level": "LOW",
                "score": 0,
                "flags": [],
                "analysis": "No text provided for analysis."
            }

        detected_flags = []
        risk_score = 0
        
        text = text.lower()
        
        for category, patterns in self.red_flags.items():
            for pattern in patterns:
                if re.search(pattern, text):
                    detected_flags.append(category.replace("_", " ").title())
                    risk_score += 25
                    break
        
        risk_level = "LOW"
        if risk_score >= 75:
            risk_level = "HIGH"
        elif risk_score >= 25:
            risk_level = "MEDIUM"
            
        return {
            "risk_level": risk_level,
            "score": min(risk_score, 100),
            "flags": list(set(detected_flags)),
            "analysis": self._generate_analysis(risk_level, detected_flags)
        }

    def _generate_analysis(self, level, flags):
        if level == "HIGH":
            return f"CRITICAL: Multiple scam patterns detected ({', '.join(flags)}). Highly likely to be a fraudulent attempt."
        elif level == "MEDIUM":
            return f"CAUTION: Indicators of risk found: {', '.join(flags)}. Verify the buyer's identity before proceeding."
        return "No common scam patterns detected. However, always follow safe selling practices."
