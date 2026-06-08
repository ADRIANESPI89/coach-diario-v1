function buildResponse(
  categoryResult,
  microAction,
  hasRepeatedPattern,
  evolutionTrend,
  analysisResult,
  emotionalContext
) {
  const category = categoryResult.category;

  let intro = "";

  switch (category) {
    case "economico":
      intro = "Parece que la preocupación económica está ocupando bastante espacio hoy.";
      break;

    case "ansiedad":
      intro = "Parece que hoy tu cabeza está en modo alerta.";
      break;

    case "saturacion":
      intro = "Parece que hoy tenés muchas cosas encima.";
      break;

    case "frustracion":
      intro = "Parece que hoy algo te dejó con molestia o exigencia.";
      break;

    case "desorientacion":
      intro = "Parece que hoy no está tan claro por dónde seguir.";
      break;

    case "rumiacion":
      intro = "Da la sensación de que algo se quedó girando bastante en tu cabeza.";
      break;

    case "indecision":
      intro = "Parece que estás intentando decidir algo y todavía no aparece una dirección clara.";
      break;

    case "agotamiento":
      intro = "Parece que venís sosteniendo bastante y el desgaste ya se siente.";
      break;

    default:
      intro = "";
      break;
  }

  return {
    text: [intro, microAction.action]
      .filter((part) => part && part.trim() !== "")
      .join("\n\n"),

    shouldStopInteraction: true,
    hasRepeatedPattern,
    evolutionTrend,
  };
}

module.exports = { buildResponse };