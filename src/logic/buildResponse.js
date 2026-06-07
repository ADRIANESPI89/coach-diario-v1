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
      intro = "Gracias por tomarte este momento para registrar cómo estás.";
      break;
  }

  let repeatedText = "";

  if (hasRepeatedPattern) {
    repeatedText =
      "\n\nEste tema ya apareció varias veces estos días. Que vuelva a aparecer no significa que estés retrocediendo. Puede ser una señal de que todavía necesita algo de espacio, claridad o atención.";
  }

  let trendText = "";

  if (evolutionTrend === "better") {
    trendText =
      "\n\nComparado con días anteriores, hoy parece haber un poco menos de presión.";
  }

  if (evolutionTrend === "worse") {
    trendText =
      "\n\nComparado con días anteriores, hoy parece haber un poco más de presión.";
  }

  return {
    text: `${intro}${repeatedText}${trendText}

${microAction.action}

A veces una pregunta alcanza para ver algo que hasta ahora no estaba tan claro.`,
    shouldStopInteraction: true,
    hasRepeatedPattern,
    evolutionTrend,
  };
}

module.exports = { buildResponse };