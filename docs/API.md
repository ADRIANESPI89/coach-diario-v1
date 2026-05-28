# Coach Diario — API

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Documentar los endpoints disponibles en Coach Diario.

---

# Endpoint principal

```txt
POST /api/interaction
```

---

# Descripción

Recibe el mensaje diario del usuario, ejecuta el motor de Coach Diario y devuelve una respuesta breve con microacción.

---

# Request

```json
{
  "uid": "usuario_test",
  "email": "test@diario.local",
  "message": "Hoy me siento saturado"
}
```

---

# Campos requeridos

## uid

Tipo:

```txt
string
```

Obligatorio:

```txt
sí
```

---

## email

Tipo:

```txt
string
```

Obligatorio:

```txt
sí
```

---

## message

Tipo:

```txt
string
```

Obligatorio:

```txt
sí
```

---

# Response OK

```json
{
  "status": "OK",
  "ok": true,
  "id": "usuario_test_2026-05-23",
  "risk": {
    "hasRisk": false,
    "level": "NONE",
    "matched": null
  },
  "category": {
    "category": "saturacion",
    "matched": true
  },
  "intensity": {
    "intensity": "baja",
    "score": 1
  },
  "microAction": {
    "type": "claridad",
    "duration": "3 minutos"
  },
  "response": {
    "text": "Texto de respuesta",
    "shouldStopInteraction": true
  },
  "hasRepeatedPattern": false,
  "evolutionTrend": "stable"
}
```

---

# Response riesgo

```json
{
  "status": "RISK",
  "ok": true,
  "risk": {
    "hasRisk": true
  },
  "response": {
    "text": "Mensaje de cuidado",
    "shouldStopInteraction": true
  }
}
```

---

# Response ya interactuó hoy

```json
{
  "status": "ALREADY_DONE",
  "ok": false,
  "message": "Ya hiciste tu interacción de hoy."
}
```

---

# Response error de validación

```json
{
  "status": "ERROR",
  "ok": false,
  "message": "Faltan datos requeridos."
}
```

---

# Estados posibles

```txt
OK
RISK
ALREADY_DONE
ERROR
```

---

# Reglas importantes

## Una interacción diaria

El backend debe impedir más de una interacción por usuario por día.

---

## Riesgo primero

Si hay riesgo, el flujo se detiene.

---

## Guardado

Toda interacción válida debe guardarse en Firestore.

---

# Ejemplo con fetch

```js
fetch("http://localhost:3000/api/interaction", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    uid: "usuario_test",
    email: "test@diario.local",
    message: "Hoy me siento saturado"
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

# Próximos endpoints posibles

No implementados:

```txt
GET /api/history
GET /api/summary
GET /api/health
POST /api/feedback
```

---

# Estado

API actual:

```txt
mínima
```

Uso:

```txt
MVP interno
```