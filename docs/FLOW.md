# Coach Diario — Flujo de Interacción

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Describir exactamente qué ocurre desde que el usuario envía un mensaje hasta que recibe una respuesta.

---

# Flujo completo

Usuario envía mensaje
↓

Validación inicial
↓

Detección de riesgo
↓

Clasificación emocional
↓

Análisis de intensidad
↓

Detección de patrones
↓

Definir estrategia
↓

Generar microacción
↓

Construir respuesta
↓

Guardar interacción
↓

Cerrar interacción

---

# Paso 1 — Usuario envía mensaje

Entrada:

```json
{
  "uid": "usuario_test",
  "email": "test@diario.local",
  "message": "Hoy me siento saturado"
}
```

Acción:

El sistema recibe el texto.

Salida:

Mensaje listo para análisis.

---

# Paso 2 — Validación inicial

Objetivo:

Verificar que:

- exista uid
- exista mensaje
- no esté vacío

Acción:

Normalizar texto.

Ejemplo:

ANTES:

"Estoy MUY cansado."

DESPUÉS:

"estoy muy cansado"

---

# Paso 3 — Detección de riesgo

Módulo:

detectRisk()

Objetivo:

Buscar señales que indiquen detener la interacción.

Entrada:

Texto del usuario.

Salida:

```json
{
 "hasRisk": false
}
```

Si:

```json
{
 "hasRisk": true
}
```

Entonces:

- guardar interacción
- devolver mensaje de cuidado
- finalizar

No continuar.

---

# Paso 4 — Clasificación emocional

Módulo:

detectCategory()

Objetivo:

Detectar estado principal.

Ejemplos:

"saturado"
→ saturacion

"no sé qué hacer"
→ desorientacion

"me preocupa la plata"
→ economico

Salida:

```json
{
 "category":"saturacion"
}
```

---

# Paso 5 — Intensidad

Módulo:

analyzeIntensity()

Objetivo:

Estimar carga emocional.

Salida:

```json
{
 "intensity":"baja",
 "score":1
}
```

Posibles:

- baja
- media
- alta

---

# Paso 6 — Patrones

Módulo:

detectRepeatedPattern()

Objetivo:

Comparar últimas interacciones.

Regla actual:

últimas 5.

Si misma categoría ≥3:

```json
{
 "hasRepeatedPattern":true
}
```

---

# Paso 7 — Estrategia

Módulo:

analyzeUserState()

Objetivo:

Elegir tipo de intervención.

Ejemplos:

- claridad
- regulación
- micro paso

Salida:

```json
{
 "strategy":"claridad"
}
```

---

# Paso 8 — Microacción

Módulo:

generateMicroAction()

Objetivo:

Crear acción breve.

Ejemplo:

```json
{
 "type":"claridad",
 "duration":"3 minutos"
}
```

---

# Paso 9 — Respuesta

Módulo:

buildResponse()

Objetivo:

Construir respuesta final.

Incluye:

- devolución breve
- microacción
- cierre

---

# Paso 10 — Guardado

Colección:

interactions

Guardar:

- mensaje
- riesgo
- categoría
- intensidad
- microacción
- respuesta

---

# Paso 11 — Cierre

Objetivo:

Finalizar interacción.

Regla:

1 interacción por día.

Mensaje esperado:

"Esto termina acá por hoy."

---

# Estado actual del flujo

Versión funcional:
v1

Estado:
En prueba interna

Próxima revisión:
Luego de 7 días de prueba.