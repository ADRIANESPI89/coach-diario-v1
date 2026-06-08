/*
=================================================

COACH DIARIO - PRINCIPIO DE MICROACCIONES

Las microacciones no deben sentirse como tareas.

Su objetivo principal es generar claridad,
observación y reflexión.

Priorizar preguntas humanas y conversacionales
antes que instrucciones directivas.

Evitar:
- "elegí una sola cosa"
- listas de tareas
- lenguaje técnico
- tono de productividad

Objetivo:
Claridad para avanzar.

=================================================
*/

function generateMicroAction(
  category = "general",
  intensity = "baja",
  analysisResult = null
) {
  switch (category) {
    case "economico":
  return {
    type: "claridad",
    action:
      "Cuando pensás en lo económico, ¿qué es lo que más te preocupa hoy?",
    duration: "3 minutos",
  };

    case "ansiedad":
      return {
        type: "claridad",
        action: "¿Qué es lo que más te preocupa en este momento?",
        duration: "3 minutos",
      };

    case "saturacion":
  return {
    type: "claridad",
    action: "Si tuvieras que nombrar una sola preocupación de hoy, ¿cuál sería?",
    duration: "3 minutos",
  };

    case "frustracion":
      return {
        type: "claridad",
        action: "¿Qué te molestó de esa situación?",
        duration: "3 minutos",
      };

    case "desorientacion":
      return {
        type: "claridad",
        action: "Aunque no tengas todo claro, ¿qué sí sabés hoy?",
        duration: "3 minutos",
      };

    case "rumiacion":
      return {
        type: "claridad",
        action: "¿Sobre qué tema sentís que seguís dando vueltas?",
        duration: "3 minutos",
      };

    case "indecision":
      return {
        type: "claridad",
        action: "¿Qué es lo que más te hace dudar?",
        duration: "3 minutos",
      };

    case "agotamiento":
      return {
        type: "claridad",
        action: "¿Qué es lo que más te está costando últimamente?",
        duration: "3 minutos",
      };

    default:
  return {
    type: "claridad",
    action: "¿Qué creés que ayudó a que hoy te sintieras así?",
    duration: "3 minutos",
  };
  }
}

module.exports = { generateMicroAction };