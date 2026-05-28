const admin = require("firebase-admin");
const path = require("path");

// Ruta al JSON (relativa a ESTE archivo)
const serviceAccountPath = path.join(
  __dirname,
  "../../secrets/firebase-service-account.json"
);

const serviceAccount = require(serviceAccountPath);

// Inicializar una sola vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

const db = admin.firestore();

console.log("✅ Firebase Admin inicializado con:");
console.log("project_id:", serviceAccount.project_id);
console.log("client_email:", serviceAccount.client_email);

module.exports = { admin, db };