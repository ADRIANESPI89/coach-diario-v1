function analyzeUserState({
  message,
  categoryResult,
  intensityResult,
  hasRepeatedPattern,
  evolutionTrend,
}) {
  const category = categoryResult?.category || "general";
  const intensity = intensityResult?.intensity || "media";

  let mentalState = "estado general";
  let urgency = "baja";
  let interventionStrategy = "accion simple";
  let cognitiveLoad = "media";
  let emotionalDirection = evolutionTrend || "estable";

  if (intensity === "alta") {
    urgency = "media";
    cognitiveLoad = "alta";
  }

    switch (category) {
    case "rumiacion":
      mentalState = "pensamiento repetitivo";
      interventionStrategy = "cortar ciclo mental";
      cognitiveLoad = "alta";
      break;

    case "saturacion":
      mentalState = "sobrecarga mental";
      interventionStrategy = "reducir estimulos";
      cognitiveLoad = "alta";
      break;

    case "desorden":
      mentalState = "desorganizacion externa o interna";
      interventionStrategy = "orden minimo";
      cognitiveLoad = "media";
      break;

    case "indecision":
      mentalState = "bloqueo por exceso de opciones";
      interventionStrategy = "reducir decision";
      cognitiveLoad = "media";
      break;

    case "autocritica intensa":
      mentalState = "exigencia interna elevada";
      interventionStrategy = "bajar juicio personal";
      cognitiveLoad = "alta";
      break;

    case "problema existencial":
      mentalState = "busqueda de sentido";
      interventionStrategy = "anclaje concreto";
      cognitiveLoad = "alta";
      break;

    case "economico":
  mentalState = "preocupacion economica";
  interventionStrategy = "orden financiero minimo";
  cognitiveLoad = "media";
  break;

    case "falta de felicidad":
      mentalState = "desconexion emocional";
      interventionStrategy = "reconexion simple";
      cognitiveLoad = "media";
      break;

    case "desorientacion":
      mentalState = "falta de direccion";
      interventionStrategy = "primer paso visible";
      cognitiveLoad = "media";
      break;

    default:
      mentalState = "estado general";
      interventionStrategy = "accion simple";
      cognitiveLoad = "media";
      break;
  }

  return {
  mentalState,
  urgency,
  interventionStrategy,
  cognitiveLoad,
  emotionalDirection,
};
}

module.exports = { analyzeUserState };