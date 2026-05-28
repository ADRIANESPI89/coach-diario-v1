function generateMicroAction(
  category = "general",
  intensity = "baja",
  analysisResult = null
) {
  const cognitiveLoad = analysisResult?.cognitiveLoad || "media";

  const interventionStrategy =
    analysisResult?.interventionStrategy || "accion simple";

  if (interventionStrategy === "cortar ciclo mental") {
    return {
      type: "descarga",
      action:
        "Escribí una sola idea que esté dando vueltas en tu cabeza y dejala ahí por hoy.",
      duration: "3 minutos",
    };
  }

  if (
    cognitiveLoad === "alta" &&
    category !== "rumiacion"
  ) {
    return {
      type: "regulacion",
      action:
        "No intentes resolver todo ahora. Elegí una sola cosa chica para hacer.",
      duration: "5 minutos",
    };
  }

  if (interventionStrategy === "reducir estimulos") {
    return {
      type: "regulacion",
      action:
        "Intentá alejarte unos minutos del ruido y darte un poco de espacio.",
      duration: "10 minutos",
    };
  }

  switch (category) {
    case "economico":
      if (intensity === "alta") {
        return {
          type: "regulacion",
          action:
            "No intentes resolver toda tu economía hoy. Elegí un solo tema económico para mirar con calma.",
          duration: "3 minutos",
        };
      }

      return {
        type: "claridad",
        action:
          "Anotá qué tema económico te preocupa más hoy y una acción chica que puedas hacer.",
        duration: "5 minutos",
      };

    case "ansiedad":
      if (intensity === "alta") {
        return {
          type: "regulacion",
          action:
            "No hace falta resolver todo ahora. Mirá alrededor y nombrá tres cosas que veas.",
          duration: "2 minutos",
        };
      }

      return {
        type: "descarga",
        action:
          "Escribí qué es lo que más te preocupa hoy. Solo una cosa.",
        duration: "3 minutos",
      };

    case "saturacion":
      if (intensity === "alta") {
        return {
          type: "reduccion",
          action:
            "No intentes ordenar todo. Elegí una sola cosa para hacer hoy.",
          duration: "2 minutos",
        };
      }

      return {
        type: "claridad",
        action:
          "Pensá qué es lo que más espacio ocupa en tu cabeza y elegí una sola prioridad.",
        duration: "3 minutos",
      };

    case "frustracion":
      if (intensity === "alta") {
        return {
          type: "regulacion",
          action:
            "Por hoy no hace falta demostrar nada. Soltá una exigencia aunque sea por un rato.",
          duration: "3 minutos",
        };
      }

      return {
        type: "descarga",
        action:
          "Escribí qué fue lo que más te molestó hoy.",
        duration: "3 minutos",
      };

    case "desorientacion":
      return {
        type: "claridad",
        action:
          "Elegí una sola cosa que sí tengas clara hoy y empezá por ahí.",
        duration: "2 minutos",
      };

    case "rumiacion":
      return {
        type: "descarga_mental",
        action:
          "Escribí una idea que se esté repitiendo mucho y dejala ahí por hoy.",
        duration: "2 minutos",
      };

    case "indecision":
      return {
        type: "decision_minima",
        action:
          "Elegí una opción posible y permitite avanzar un poco.",
        duration: "1 minuto",
      };

    case "agotamiento":
      return {
        type: "pausa",
        action:
          "Intentá bajar el ritmo unos minutos sin intentar resolver nada.",
        duration: "5 minutos",
      };

    default:
      return {
        type: "micro_paso",
        action:
          "Elegí una sola cosa chica para hacer hoy y dejá el resto para después.",
        duration: "3 minutos",
      };
  }
}

module.exports = { generateMicroAction };