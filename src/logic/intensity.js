function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectIntensity(text = "") {
  const t = normalizeText(text);

  if (
    t.includes("no aguanto") ||
    t.includes("estoy destruido") ||
    t.includes("estoy desesperado") ||
    t.includes("me supera") ||
    t.includes("no doy mas") ||
    t.includes("ataque de panico") ||
    t.includes("me estoy desesperando") ||
    t.includes("no puedo respirar") ||
    t.includes("siento que no puedo respirar") ||
    t.includes("todo me supera") ||
    t.includes("colapse") ||
    t.includes("colapsé") ||
    t.includes("no puedo con todo") ||
    t.includes("me sale todo mal") ||
    t.includes("nada me funciona") ||
    t.includes("estoy harto") ||
    t.includes("estoy harta")
  ) {
    return { intensity: "alta", score: 3 };
  }

  if (
    t.includes("me preocupa") ||
    t.includes("me cuesta") ||
    t.includes("estoy cansado") ||
    t.includes("estoy angustiado") ||
    t.includes("me tiene mal") ||
    t.includes("estoy frustrado") ||
    t.includes("estoy frustrada")||
    t.includes("me sale todo mal") 
  ) {
    return { intensity: "media", score: 2 };
  }

  return { intensity: "baja", score: 1 };
}

module.exports = { detectIntensity };