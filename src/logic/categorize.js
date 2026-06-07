function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectCategory(text = "") {
  const t = normalizeText(text);
  console.log("CATEGORIZE ACTIVO:", t);

  // Prioridad alta: económico
  if (
    t.includes("economico") ||
    t.includes("economica") ||
    t.includes("plata") ||
    t.includes("dinero") ||
    t.includes("pagar") ||
    t.includes("alquiler") ||
    t.includes("deuda") ||
    t.includes("deudas") ||
    t.includes("cuentas") ||
    t.includes("factura") ||
    t.includes("facturas") ||
    t.includes("sueldo") ||
    t.includes("cobrar") ||
    t.includes("trabajo") ||
    t.includes("llegar a fin de mes") ||
    t.includes("situacion economica") ||
    t.includes("problemas economicos")
  ) {
    return { category: "economico", matched: true };
  }

  if (
    t.includes("demasiadas cosas en la cabeza") ||
    t.includes("me costo enfocarme") ||
    t.includes("me cuesta enfocarme") ||
    t.includes("estoy saturado") ||
    t.includes("estoy saturada") ||
    t.includes("tengo muchas cosas") ||
    t.includes("muchas cosas en la cabeza") ||
    t.includes("me ocupa mucho la cabeza")
  ) {
    return { category: "saturacion", matched: true };
  }

  if (
    t.includes("no pude dejar de pensar") ||
    t.includes("dejar de pensar en lo mismo") ||
    t.includes("pensar en lo mismo") ||
    t.includes("durante gran parte del dia") ||
    t.includes("pienso mucho") ||
    t.includes("no puedo dejar de pensar") ||
    t.includes("le doy vueltas") ||
    t.includes("me quedo pensando")
  ) {
    return { category: "rumiacion", matched: true };
  }

  if (
    t.includes("no se que hacer") ||
    t.includes("estoy perdido") ||
    t.includes("estoy perdida") ||
    t.includes("no encuentro rumbo")
  ) {
    return { category: "desorientacion", matched: true };
  }

  if (
    t.includes("no puedo decidir") ||
    t.includes("no se que elegir") ||
    t.includes("tengo dudas") ||
    t.includes("no me decido")
  ) {
    return { category: "indecision", matched: true };
  }

  if (
    t.includes("estoy cansado") ||
    t.includes("estoy cansada") ||
    t.includes("estoy agotado") ||
    t.includes("estoy agotada") ||
    t.includes("no doy mas")
  ) {
    return { category: "agotamiento", matched: true };
  }

  if (
    t.includes("mi cabeza no para") ||
    t.includes("no puedo parar de pensar") ||
    t.includes("me cuesta bajar la preocupacion") ||
    t.includes("estoy preocupado") ||
    t.includes("estoy preocupada") ||
    t.includes("me siento inquieto") ||
    t.includes("me siento inquieta") ||
    t.includes("estado de alerta")
  ) {
    return { category: "ansiedad", matched: true };
  }

  return { category: "general", matched: false };
}

module.exports = { detectCategory };