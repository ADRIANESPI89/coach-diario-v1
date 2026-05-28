function buildEmotionalContext(recentHistory = []) {
  const totalInteractions = recentHistory.length;

  if (totalInteractions === 0) {
    return {
      hasHistory: false,
      dominantCategory: null,
      repeatedDays: 0,
      accumulatedLoad: "baja",
      contextMessage: null,
    };
  }

  const categoryCount = {};

  recentHistory.forEach((item) => {
    const category = item?.category?.category;

    if (category) {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    }
  });

  let dominantCategory = null;
  let repeatedDays = 0;

  Object.entries(categoryCount).forEach(([category, count]) => {
    if (count > repeatedDays) {
      dominantCategory = category;
      repeatedDays = count;
    }
  });

  let accumulatedLoad = "baja";

  if (repeatedDays >= 3) {
    accumulatedLoad = "media";
  }

  if (repeatedDays >= 5) {
    accumulatedLoad = "alta";
  }

  let contextMessage = null;

  if (accumulatedLoad === "media") {
    contextMessage =
      "Este tema viene apareciendo más de una vez en los últimos días.";
  }

  if (accumulatedLoad === "alta") {
    contextMessage =
      "Esto parece venir acumulándose desde hace varios días.";
  }

  return {
    hasHistory: true,
    dominantCategory,
    repeatedDays,
    accumulatedLoad,
    contextMessage,
  };
}

module.exports = { buildEmotionalContext };