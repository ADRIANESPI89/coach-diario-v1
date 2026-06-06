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
  let explanation = "";

  switch (category) {
    case "economico":
      intro = "Parece que la preocupación económica está ocupando bastante espacio hoy.";
      explanation = "Cuando un tema así aparece con fuerza, ayuda bajarlo a algo concreto para que no quede dando vueltas como una carga general.";
      break;

    case "ansiedad":
      intro = "Parece que hoy tu cabeza está en modo alerta.";
      explanation = "En momentos así, no hace falta resolver todo. Primero conviene bajar un poco la intensidad y volver a una acción simple.";
      break;

    case "saturacion":
      intro = "Parece que hoy tenés muchas cosas encima.";
      explanation = "Cuando todo aparece junto, la mente puede sentir que todo es urgente. Separar una sola cosa ayuda a recuperar algo de orden.";
      break;

    case "frustracion":
      intro = "Parece que hoy algo te dejó con molestia, cansancio o exigencia.";
      explanation = "No siempre se puede cambiar todo en el momento, pero sí podés elegir una forma más clara de responder.";
      break;

    case "desorientacion":
      intro = "Parece que hoy no está tan claro por dónde seguir.";
      explanation = "Cuando falta claridad, buscar una decisión grande puede aumentar la presión. Un paso chico suele ser mejor punto de partida.";
      break;

    case "rumiacion":
      intro = "Da la sensación de que algo se quedó girando bastante en tu cabeza.";
      explanation = "Cuando un pensamiento vuelve muchas veces, escribirlo o transformarlo en una acción concreta puede ayudar a cortar el ciclo.";
      break;

    case "indecision":
      intro = "Parece que estás intentando decidir algo sin tener todavía una dirección clara.";
      explanation = "No hace falta resolver todo ahora. A veces alcanza con ordenar las opciones y mirar cuál sería el próximo paso posible.";
      break;

    case "agotamiento":
      intro = "Parece que venís sosteniendo muchas cosas y el cansancio ya se siente.";
      explanation = "Cuando hay agotamiento, exigirte más puede empeorar la sensación. Hoy conviene apuntar a algo pequeño y posible.";
      break;

    default:
      intro = "Parece que hoy te vendría bien bajar un poco el ruido y enfocarte en algo simple.";
      explanation = "No hace falta resolver todo en una sola vez. Una acción pequeña puede ser suficiente para recuperar algo de dirección.";
      break;
  }

  let repeatedText = "";

  if (hasRepeatedPattern) {
    repeatedText =
      "\n\nEste tema ya apareció varias veces estos días. No significa que estés fallando; puede ser una señal de que merece ser mirado con un poco más de atención.";
  }

  let trendText = "";

  if (evolutionTrend === "better") {
    trendText =
      "\n\nHoy parece haber un poco menos de presión que antes. Es una señal pequeña, pero vale registrarla.";
  }

  if (evolutionTrend === "worse") {
    trendText =
      "\n\nHoy se siente un poco más intenso que antes. Por eso conviene no exigirte una solución grande ahora.";
  }

  return {
    text: `${intro}

${explanation}${repeatedText}${trendText}

Para hoy:

${microAction.action}

La interacción de hoy ya terminó.

Con elegir una sola acción y llevarla a la práctica ya es suficiente por hoy. Lo importante ahora es observar qué sucede.`,
    shouldStopInteraction: true,
    hasRepeatedPattern,
    evolutionTrend,
  };
}

module.exports = { buildResponse };