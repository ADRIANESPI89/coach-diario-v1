function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const CATEGORY_PATTERNS = {
  economico: [
    "economico",
    "economica",
    "plata",
    "dinero",
    "guita",
    "sueldo",
    "ingresos",
    "gastos",
    "deuda",
    "deudas",
    "alquiler",
    "cuentas",
    "factura",
    "facturas",
    "prestamo",
    "prestamos",
    "finanzas",
    "cobrar",
    "pagar",
    "no llego a fin de mes",
    "llegar a fin de mes",
    "situacion economica",
    "problemas economicos"
  ],

  ansiedad: [
    "ansiedad",
    "ansioso",
    "ansiosa",
    "angustia",
    "angustiado",
    "angustiada",
    "me siento angustiado",
    "me siento angustiada",
    "preocupado",
    "preocupada",
    "preocupacion",
    "inquieto",
    "inquieta",
    "nervioso",
    "nerviosa",
    "miedo",
    "temor",
    "alerta",
    "mi cabeza no para",
    "no puedo relajarme",
    "no puedo desconectarme",
    "me cuesta calmarme",
    "me cuesta dormir",
    "me cuesta bajar un cambio",
    "sobrepensando",
    "estoy preocupado",
    "estoy preocupada"
  ],

  saturacion: [
    "abrumado",
    "abrumada",
    "saturado",
    "saturada",
    "sobrecargado",
    "sobrecargada",
    "sobrepasado",
    "sobrepasada",
    "muchas cosas",
    "demasiadas cosas",
    "tengo muchas cosas",
    "no doy abasto",
    "no llego con todo",
    "tengo demasiado encima",
    "muchas cosas encima",
    "no me alcanza la cabeza",
    "me cuesta enfocarme",
    "me costo enfocarme",
    "desbordado",
    "desbordada",
    "agotado mentalmente",
    "me ocupa la cabeza"
  ],

  rumiacion: [
    "le doy vueltas",
    "dar vueltas",
    "pienso mucho",
    "pensando demasiado",
    "no puedo dejar de pensar",
    "sigo pensando",
    "vuelvo al mismo tema",
    "me quedo pensando",
    "me quede pensando",
    "no puedo soltarlo",
    "me persigue",
    "pensamiento repetitivo",
    "obsesionado",
    "obsesionada",
    "no sale de mi cabeza",
    "vuelve una y otra vez",
    "siempre termino pensando",
    "me engancho con eso",
    "me quedo trabado",
    "rumiando"
  ],

  frustracion: [
    "frustrado",
    "frustrada",
    "molesto",
    "molesta",
    "enojado",
    "enojada",
    "bronca",
    "enojo",
    "rabia",
    "impotencia",
    "me molesto",
    "me frustro",
    "salio mal",
    "no salio como esperaba",
    "me decepciono",
    "me fastidia",
    "me fastidio",
    "estoy harto",
    "estoy harta"
  ],

  desorientacion: [
    "no se que hacer",
    "estoy perdido",
    "estoy perdida",
    "desorientado",
    "desorientada",
    "sin rumbo",
    "no encuentro rumbo",
    "no encuentro direccion",
    "no tengo claro",
    "estoy confundido",
    "estoy confundida",
    "no se por donde empezar",
    "no veo el camino",
    "no encuentro una salida",
    "no se para donde ir",
    "estoy a la deriva",
    "no tengo direccion",
    "sin orientacion",
    "no encuentro claridad",
    "estoy bloqueado",
    "estoy bloqueada"
  ],

  indecision: [
    "no puedo decidir",
    "no me decido",
    "tengo dudas",
    "duda",
    "dudas",
    "decision",
    "decidir",
    "elegir",
    "eleccion",
    "estoy entre dos opciones",
    "no logro decidirme",
    "no se que elegir",
    "no se que decision tomar",
    "que decision tomar",
    "me cuesta decidir",
    "indeciso",
    "indecisa",
    "cambiar de idea",
    "opciones",
    "alternativas",
    "elegir un camino"
  ],

  agotamiento: [
    "agotado",
    "agotada",
    "cansado",
    "cansada",
    "sin energia",
    "no doy mas",
    "desgastado",
    "desgastada",
    "exhausto",
    "exhausta",
    "me cuesta seguir",
    "sin fuerzas",
    "quemado",
    "quemada",
    "agotamiento",
    "fatigado",
    "fatigada",
    "no puedo mas",
    "estoy destruido",
    "estoy destruida"
  ],

  positivo: [
    "bien",
    "me siento bien",
    "estoy bien",
    "en paz",
    "tranquilo",
    "tranquila",
    "calma",
    "calmado",
    "calmada",
    "contento",
    "contenta",
    "feliz",
    "alegre",
    "agradecido",
    "agradecida",
    "me siento en paz",
    "hoy estoy bien",
    "hoy me siento bien"
  ]
};

const CATEGORY_PRIORITY = [
  "economico",
  "ansiedad",
  "saturacion",
  "rumiacion",
  "frustracion",
  "desorientacion",
  "indecision",
  "agotamiento",
  "positivo"
];

function detectCategory(text = "") {
  const t = normalizeText(text);
  console.log("CATEGORIZE ACTIVO:", t);

  const scores = {};
  const matches = {};

  for (const category of CATEGORY_PRIORITY) {
    scores[category] = 0;
    matches[category] = [];

    for (const pattern of CATEGORY_PATTERNS[category]) {
      const normalizedPattern = normalizeText(pattern);

      if (t.includes(normalizedPattern)) {
        scores[category] += normalizedPattern.split(" ").length > 1 ? 2 : 1;
        matches[category].push(pattern);
      }
    }
  }

  let bestCategory = "general";
  let bestScore = 0;

  for (const category of CATEGORY_PRIORITY) {
    if (scores[category] > bestScore) {
      bestCategory = category;
      bestScore = scores[category];
    }
  }

  if (bestScore === 0) {
    return {
      category: "general",
      matched: false,
      matchedPhrase: null,
      score: 0
    };
  }

  return {
    category: bestCategory,
    matched: true,
    matchedPhrase: matches[bestCategory][0] || null,
    score: bestScore
  };
}

module.exports = { detectCategory };