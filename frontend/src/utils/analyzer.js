/**
 * Kini Tech: Scam Detection Logic (JS Port)
 * Ported from the Python RiskAnalyzer for "Out of the Box" functionality.
 */

const RED_FLAGS = {
  FAKE_OVERPAYMENT: [
    /accidentally sent/i,
    /sent more than/i,
    /please refund/i,
    /return the balance/i,
    /reversal/i,
  ],
  FAKE_URGENCY: [
    /hurry/i,
    /asap/i,
    /immediately/i,
    /right now/i,
    /quick/i,
    /emergency/i,
  ],
  OFF_PLATFORM: [
    /whatsapp me/i,
    /contact me outside/i,
    /send on telegram/i,
    /pay via link/i,
    /not on app/i,
  ],
  SUSPICIOUS_PAYMENT: [
    /brother's account/i,
    /friend will pay/i,
    /third party/i,
    /bank issue/i,
    /payment pending/i,
  ]
};

export const analyzeText = (text) => {
  if (!text || !text.trim()) {
    return {
      risk_level: "LOW",
      score: 0,
      flags: [],
      analysis: "No text provided for analysis."
    };
  }

  const detectedFlags = [];
  let riskScore = 0;

  for (const [category, patterns] of Object.entries(RED_FLAGS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        detectedFlags.push(category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
        riskScore += 25;
        break;
      }
    }
  }

  let riskLevel = "LOW";
  if (riskScore >= 75) {
    riskLevel = "HIGH";
  } else if (riskScore >= 25) {
    riskLevel = "MEDIUM";
  }

  return {
    risk_level: riskLevel,
    score: Math.min(riskScore, 100),
    flags: [...new Set(detectedFlags)],
    analysis: generateAnalysis(riskLevel, detectedFlags)
  };
};

const generateAnalysis = (level, flags) => {
  if (level === "HIGH") {
    return `CRITICAL: Multiple scam patterns detected (${flags.join(', ')}). Highly likely to be a fraudulent attempt.`;
  } else if (level === "MEDIUM") {
    return `CAUTION: Indicators of risk found: ${flags.join(', ')}. Verify the buyer's identity before proceeding.`;
  }
  return "No common scam patterns detected. However, always follow safe selling practices.";
};
