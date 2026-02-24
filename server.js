const express = require("express");
const cors = require("cors");
const { db } = require("./src/config/firebase");
const { categorizeText } = require("./src/logic/categorize");
const { pickMicroAction } = require("./src/logic/microactions");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Coach Diario V1 funcionando");
});

app.get("/test", (req, res) => {
  res.json({ status: "OK", message: "Endpoint /test funcionando" });
});
app.get("/dbtest", async (req, res) => {
  try {
    const ref = db.collection("test").doc("ping");
    await ref.set({
      ok: true,
      createdAt: new Date().toISOString()
    });

    const snap = await ref.get();
    return res.json({ status: "OK", data: snap.data() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});
app.post("/api/interaction", async (req, res) => {
  const { anonUserId, text, locale } = req.body;

  if (!anonUserId || !text) {
    return res.status(400).json({
      status: "ERROR",
      message: "Falta anonUserId o text",
    });
  }

  const today = new Date().toISOString().split("T")[0];

  const existing = await db
    .collection("interactions")
    .where("anonUserId", "==", anonUserId)
    .where("date", "==", today)
    .get();

  if (!existing.empty) {
    return res.json({
      status: "blocked",
      message: "Ya realizaste tu interacción de hoy. Volvé mañana.",
    });
  }
  //Categorizacion Automatica
  const { category, scores } = categorizeText(text);

// Traer las últimas 2 acciones para no repetir (si hay)
const last2 = await db
  .collection("interactions")
  .where("anonUserId", "==", anonUserId)
  .orderBy("createdAt", "desc")
  .limit(2)
  .get();

let lastCode = null;
let prevCode = null;

if (!last2.empty) {
  lastCode = last2.docs[0].data()?.result?.actionCode || null;
  if (last2.docs.length > 1) prevCode = last2.docs[1].data()?.result?.actionCode || null;
}

const micro = pickMicroAction(category, lastCode, prevCode);

  await db.collection("interactions").add({
    anonUserId,
    text,
    locale: locale || "es-AR",
    date: today,
    createdAt: new Date().toISOString(),
 result: {
  category,
  actionCode: micro.code,
  actionText: micro.text,
  scores // interno
},
  });

  return res.json({
  status: "OK",
  microAction: {
    category,
    actionCode: micro.code,
    actionText: micro.text,
  },
});
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});