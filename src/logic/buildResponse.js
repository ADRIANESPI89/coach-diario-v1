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
      intro = "Se nota que el tema económico te está preocupando bastante hoy.";
      break;

    case "ansiedad":
      intro = "Parece que hoy tu cabeza está en modo alerta.";
      break;

    case "saturacion":
      intro = "Parece que hoy tenés demasiadas cosas en la cabeza.";
      break;

    case "frustracion":
      intro = "Parece que hoy algo te dejó con bastante molestia o exigencia encima.";
      break;

    case "desorientacion":
      intro = "Parece que hoy no está tan claro por dónde seguir.";
      break;

    case "rumiacion":
      intro = "Da la sensación de que algo se quedó girando mucho en tu cabeza.";
      break;

    case "indecision":
      intro = "No hace falta resolver todo ahora. Probá mirar solo el siguiente paso.";
      break;

    case "agotamiento":
      intro = "Parece que venís sosteniendo muchas cosas y el cansancio ya se siente.";
      break;

    default:
      intro = "Parece que hoy te vendría bien bajar un poco el ruido y enfocarte en algo simple.";
      break;
  }

  let repeatedText = "";

  if (hasRepeatedPattern) {
    repeatedText =
      "\n\nVeo que este tema apareció varias veces estos días. No hace falta resolverlo todo hoy, pero quizá valga la pena prestarle un poco más de atención.";
  }

  let trendText = "";

  if (evolutionTrend === "better") {
    trendText =
      "\n\nHoy parece haber un poco menos de presión que antes. Tomalo como una señal pequeña.";
  }

  if (evolutionTrend === "worse") {
    trendText =
      "\n\nHoy se siente un poco más intenso que antes. No hace falta resolver todo ahora.";
  }

  return {
    text: `${intro}${repeatedText}${trendText}\n\n${microAction.action}\n\nEsto termina acá por hoy.`,
    shouldStopInteraction: true,
    hasRepeatedPattern,
    evolutionTrend,
  };
}

module.exports = { buildResponse };