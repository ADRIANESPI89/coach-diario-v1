// src/logic/risk.js

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const RISK_PATTERNS = [
  {
    level: "CRITICAL",
    phrases: [
      "no quiero vivir",
      "me quiero morir",
      "quiero morirme",
      "terminar con todo",
      "no quiero seguir viviendo"
    ]
  },
  {
    level: "HIGH",
    phrases: [
      "no quiero seguir",
      "quiero desaparecer",
      "hacerme dano",
      "lastimarme",
      "no aguanto mas",
      "no puedo mas"
    ]
  },
  {
    level: "MEDIUM",
    phrases: [
      "estoy al limite",
      "me siento sin salida",
      "no veo salida",
      "me siento desesperado",
      "me siento desesperada"
    ]
  },
  {
    level: "LOW",
    phrases: [
      "me siento muy mal",
      "estoy muy triste",
      "estoy desbordado",
      "estoy desbordada",
    ]
  }
];

function detectRisk(text = "") {
  const t = normalizeText(text);

  for (const group of RISK_PATTERNS) {
    const matched = group.phrases.find((phrase) =>
      t.includes(normalizeText(phrase))
    );

    if (matched) {
      return {
        hasRisk: true,
        level: group.level,
        matched
      };
    }
  }

  return {
    hasRisk: false,
    level: "NONE",
    matched: null
  };
}

module.exports = { detectRisk };