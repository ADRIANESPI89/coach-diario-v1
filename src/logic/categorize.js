// src/logic/categorize.js

const CATEGORIES = ["ECONOMICO", "RELACIONES", "DESORDEN", "EXISTENCIAL", "PERDIDA", "EMOCIONAL"];

// keywords simples para V1 (después se refinan)
const KEYWORDS = {
  ECONOMICO: ["plata", "deuda", "deudas", "alquiler", "sueldo", "ingreso", "ingresos", "gastos", "pago", "pagos"],
  RELACIONES: ["pareja", "relación", "familia", "amigos", "amistad", "distancia", "separación", "conflicto", "discut"],
  DESORDEN: ["desorden", "caos", "rutina", "organizar", "procrast", "colgado", "no llego", "saturado", "saturación"],
  EXISTENCIAL: ["sentido", "vacío", "propósito", "rumbo", "vida", "existencial", "quién soy", "para qué"],
  PERDIDA: ["duelo", "murió", "falleció", "extraño", "pérdida", "se fue", "perro", "mascota"],
  EMOCIONAL: ["ansiedad", "triste", "enojo", "miedo", "culpa", "vergüenza", "estres", "estrés", "autocrítica"],
};

// prioridad si hay empate (podés ajustar)
const PRIORITY = ["PERDIDA", "EMOCIONAL", "ECONOMICO", "RELACIONES", "DESORDEN", "EXISTENCIAL"];

function categorizeText(text = "") {
  const t = String(text).toLowerCase();

  const scores = {};
  for (const c of CATEGORIES) scores[c] = 0;

  for (const [cat, words] of Object.entries(KEYWORDS)) {
    for (const w of words) {
      if (t.includes(w)) scores[cat] += 1;
    }
  }

  let best = PRIORITY[PRIORITY.length - 1];
  for (const cat of PRIORITY) {
    if (scores[cat] > scores[best]) best = cat;
  }

  // si no hay match, por defecto EMOCIONAL
  if (scores[best] === 0) best = "EMOCIONAL";

  return { category: best, scores };
}

module.exports = { categorizeText };