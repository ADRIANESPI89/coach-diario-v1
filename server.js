console.log("🔥🔥🔥 SERVER NUEVO CARGADO 🔥🔥🔥");

const express = require("express");
const cors = require("cors");
const path = require("path");

const { db, admin } = require("./src/config/firebase");
const { FieldValue } = require("firebase-admin/firestore");

const { detectRisk } = require("./src/logic/risk");
const { detectCategory } = require("./src/logic/categorize");
const { detectIntensity } = require("./src/logic/intensity");
const { generateMicroAction } = require("./src/logic/microactions");
const { analyzeUserState } = require("./src/logic/analyzeUserState");
const { buildEmotionalContext } = require("./src/logic/buildEmotionalContext");
const { buildResponse } = require("./src/logic/buildResponse");
const { detectInterventionStrategy } = require("./src/logic/intervention");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

function getToday() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        status: "ERROR",
        message: "Falta token",
      });
    }

    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("TOKEN START:", token.substring(0, 20));
    console.log("TOKEN LENGTH:", token.length);

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;
    return next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({
      status: "ERROR",
      message: "Token inválido",
    });
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "coach.html"));
});

app.get("/test", (req, res) => {
  res.json({
    status: "OK",
    message: "Endpoint /test funcionando",
  });
});

app.get("/api/today", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;
    const today = getToday();
    const interactionId = `${uid}_${today}`;

    const snap = await db.collection("interactions").doc(interactionId).get();

    return res.json({
      status: "OK",
      today,
      canInteract: !snap.exists,
    });
  } catch (err) {
    console.error("TODAY ERROR:", err);
    return res.status(500).json({
      status: "ERROR",
      message: err.message,
    });
  }
});

app.post("/api/interaction", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;
    const email = req.user.email || null;
    const name = req.user.name || null;
    const photoURL = req.user.picture || null;

    const message = req.body.text || req.body.message;

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        status: "ERROR",
        message: "El campo text o message es obligatorio",
      });
    }

    const today = getToday();
    const interactionId = `${uid}_${today}`;

    const interactionRef = db.collection("interactions").doc(interactionId);
    const existing = await interactionRef.get();

if (existing.exists) {
  const previousData = existing.data();
  const previousAction =
    previousData?.microAction?.action ||
    "Elegí una acción pequeña y concreta para poner en práctica hoy.";

  return res.json({
    status: "blocked",
    message:
  `La interacción de hoy ya terminó.\n\nAcción sugerida para hoy:\n"${previousAction}"\n\nCon una sola acción es suficiente por hoy. Lo importante ahora es ponerla en práctica y observar qué sucede.`,
  });
}

    const userRef = db.collection("users").doc(uid);
    const snapUser = await userRef.get();

    const userBase = {
      uid,
      email,
      name,
      photoURL,
      lastLoginAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (!snapUser.exists) {
      userBase.createdAt = FieldValue.serverTimestamp();
    }

    await userRef.set(userBase, { merge: true });

    const riskResult = detectRisk(message);

    if (riskResult.hasRisk) {
      await interactionRef.set({
        uid,
        email,
        date: today,
        text: String(message).trim(),
        risk: riskResult,
        createdAt: FieldValue.serverTimestamp(),
      });

      return res.json({
        status: "RISK",
        ok: true,
        risk: riskResult,
        response: {
          text:
            "Lo que escribiste suena importante y no conviene que lo atravieses en soledad. Hablá con una persona de confianza o con un profesional de salud mental. Si sentís que podés estar en peligro inmediato, contactá a emergencias de tu zona ahora.",
          shouldStopInteraction: true,
        },
      });
    }

    const categoryResult = detectCategory(message);
    const intensityResult = detectIntensity(message);

    const evolutionSnapshot = await db
      .collection("interactions")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const recentHistory = [];

    evolutionSnapshot.forEach((doc) => {
      recentHistory.push(doc.data());
    });

    const repeatedCategoryCount = recentHistory.filter(
      (item) => item.category?.category === categoryResult.category
    ).length;

    const hasRepeatedPattern = repeatedCategoryCount >= 3;
    const lastInteraction = recentHistory[0];

    let evolutionTrend = "stable";

    if (lastInteraction?.intensity?.score) {
      const previousScore = lastInteraction.intensity.score;
      const currentScore = intensityResult.score;

      if (currentScore > previousScore) evolutionTrend = "worse";
      if (currentScore < previousScore) evolutionTrend = "better";
    }

    const emotionalContext = buildEmotionalContext(recentHistory);

    const interventionStrategy = detectInterventionStrategy({
      category: categoryResult.category,
      intensity: intensityResult.intensity,
      hasRepeatedPattern,
      evolutionTrend,
    });

    const analysisResult = analyzeUserState({
      message,
      categoryResult,
      intensityResult,
      hasRepeatedPattern,
      evolutionTrend,
    });

    const microAction = generateMicroAction(
      categoryResult.category,
      intensityResult.intensity,
      analysisResult
    );

    const finalResponse = buildResponse(
      categoryResult,
      microAction,
      hasRepeatedPattern,
      evolutionTrend,
      analysisResult,
      emotionalContext
    );

    await interactionRef.set({
      uid,
      email,
      date: today,
      pilotVersion: "personal-30d-v1",
      feedback: {
        useful: null,
        note: null,
      },
      text: String(message).trim(),
      risk: riskResult,
      category: categoryResult,
      intensity: intensityResult,
      microAction,
      response: finalResponse,
      hasRepeatedPattern,
      evolutionTrend,
      interventionStrategy,
      analysis: analysisResult,
      emotionalContext,
      createdAt: FieldValue.serverTimestamp(),
    });

    return res.json({
      status: "OK",
      ok: true,
      id: interactionId,
      risk: riskResult,
      category: categoryResult,
      intensity: intensityResult,
      microAction,
      response: finalResponse,
      hasRepeatedPattern,
      evolutionTrend,
      interventionStrategy,
      analysis: analysisResult,
      emotionalContext,
    });
  } catch (err) {
    console.error("INTERACTION ERROR:", err);
    return res.status(500).json({
      status: "ERROR",
      message: err.message,
    });
  }
});

app.get("/api/summary", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("interactions")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(30)
      .get();

    const interactions = [];

    snapshot.forEach((doc) => {
      interactions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const categoryCount = {};
    let totalIntensity = 0;
    let intensityItems = 0;

    interactions.forEach((item) => {
      const category = item?.category?.category || "general";
      categoryCount[category] = (categoryCount[category] || 0) + 1;

      if (item?.intensity?.score) {
        totalIntensity += item.intensity.score;
        intensityItems++;
      }
    });

    const averageIntensity =
      intensityItems > 0 ? totalIntensity / intensityItems : 0;

    return res.json({
      ok: true,
      totalInteractions: interactions.length,
      categoryCount,
      averageIntensity,
      latestInteraction: interactions[0] || null,
      interactions,
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error);
    return res.status(500).json({
      ok: false,
      error: "No se pudo generar el resumen.",
    });
  }
});

app.get("/api/last", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;

    const snap = await db
      .collection("interactions")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snap.empty) {
      return res.json({
        status: "OK",
        last: null,
      });
    }

    return res.json({
      status: "OK",
      last: {
        id: snap.docs[0].id,
        ...snap.docs[0].data(),
      },
    });
  } catch (err) {
    console.error("LAST ERROR:", err);
    return res.status(500).json({
      status: "ERROR",
      message: err.message,
    });
  }
});

app.get("/api/history", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("interactions")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    const history = [];

    snapshot.forEach((doc) => {
      history.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return res.json({
      ok: true,
      total: history.length,
      history,
    });
  } catch (error) {
    console.error("HISTORY ERROR:", error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.get("/api/stats", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("interactions")
      .where("uid", "==", uid)
      .get();

    const stats = {
      total: 0,
      categories: {},
      intensities: {},
    };

    snapshot.forEach((doc) => {
      const data = doc.data();

      stats.total += 1;

      const category = data.category?.category || "unknown";
      const intensity = data.intensity?.intensity || "unknown";

      stats.categories[category] = (stats.categories[category] || 0) + 1;
      stats.intensities[intensity] = (stats.intensities[intensity] || 0) + 1;
    });

    return res.json({
      ok: true,
      uid,
      stats,
    });
  } catch (error) {
    console.error("STATS ERROR:", error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.get("/api/evolution", requireAuth, async (req, res) => {
  try {
    const uid = req.user.uid;

    const snapshot = await db
      .collection("interactions")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(7)
      .get();

    const history = [];

    snapshot.forEach((doc) => {
      history.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const categories = {};
    const intensities = {};

    history.forEach((item) => {
      const category = item.category?.category || "unknown";
      const intensity = item.intensity?.intensity || "unknown";

      categories[category] = (categories[category] || 0) + 1;
      intensities[intensity] = (intensities[intensity] || 0) + 1;
    });

    const mostRepeatedCategory =
      Object.entries(categories).sort((a, b) => b[1] - a[1])[0] || null;

    const mostRepeatedIntensity =
      Object.entries(intensities).sort((a, b) => b[1] - a[1])[0] || null;

    const last = history[0] || null;

    return res.json({
      ok: true,
      uid,
      totalAnalyzed: history.length,
      lastCategory: last?.category?.category || null,
      lastIntensity: last?.intensity?.intensity || null,
      mostRepeatedCategory: mostRepeatedCategory
        ? {
            category: mostRepeatedCategory[0],
            count: mostRepeatedCategory[1],
          }
        : null,
      mostRepeatedIntensity: mostRepeatedIntensity
        ? {
            intensity: mostRepeatedIntensity[0],
            count: mostRepeatedIntensity[1],
          }
        : null,
    });
  } catch (error) {
    console.error("EVOLUTION ERROR:", error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});