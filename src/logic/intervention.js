function detectInterventionStrategy({
  category,
  intensity,
  hasRepeatedPattern,
  evolutionTrend
}) {
  if (hasRepeatedPattern && intensity === "alta") {
    return {
      strategy: "corte_de_patron",
      reason: "patrón repetido con intensidad alta"
    };
  }

  if (evolutionTrend === "worse") {
    return {
      strategy: "regulacion",
      reason: "la intensidad subió respecto a la interacción anterior"
    };
  }

  if (evolutionTrend === "better") {
    return {
      strategy: "refuerzo",
      reason: "la intensidad bajó respecto a la interacción anterior"
    };
  }

  if (intensity === "alta") {
    return {
      strategy: "regulacion",
      reason: "intensidad alta detectada"
    };
  }

  return {
    strategy: "accion_minima",
    reason: "estado estable o leve"
  };
}

module.exports = { detectInterventionStrategy };