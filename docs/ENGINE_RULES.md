# Coach Diario — Reglas del Motor

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Documentar las reglas que utiliza Coach Diario para transformar una interacción en una respuesta.

Este documento describe:

- condiciones
- decisiones
- límites
- prioridades
- comportamiento esperado

---

# Filosofía del motor

El motor no busca interpretar toda la vida del usuario.

Busca generar:

claridad → microacción → avance

---

# Orden de ejecución

```txt
1 Detectar riesgo
2 Clasificar categoría
3 Analizar intensidad
4 Detectar repetición
5 Elegir estrategia
6 Generar microacción
7 Construir respuesta
8 Guardar
```

---

# Regla 1 — Riesgo tiene prioridad absoluta

Módulo:

```txt
detectRisk()
```

Condición:

```txt
hasRisk = true
```

Acción:

- detener flujo
- guardar interacción
- devolver mensaje de cuidado

No ejecutar:

❌ categoría  
❌ microacción  
❌ respuesta normal

Resultado:

```json
{
 "shouldStopInteraction":true
}
```

---

# Regla 2 — Una interacción por día

Objetivo:

Evitar dependencia.

Condición:

Existe documento del día.

Acción:

Bloquear nueva interacción.

Resultado:

```json
{
 "alreadyDoneToday":true
}
```

---

# Regla 3 — Siempre clasificar

Módulo:

```txt
detectCategory()
```

Si ninguna coincide:

Asignar:

```txt
general
```

Nunca dejar vacío.

---

# Regla 4 — Intensidad simplificada

Módulo:

```txt
analyzeIntensity()
```

Valores permitidos:

```txt
baja
media
alta
```

Score:

```txt
1
2
3
```

No usar decimales.

---

# Regla 5 — Detectar repetición

Módulo:

```txt
detectRepeatedPattern()
```

Ventana:

```txt
últimas 5 interacciones
```

Condición:

misma categoría ≥3

Resultado:

```json
{
 "hasRepeatedPattern":true
}
```

Objetivo:

Detectar acumulación.

---

# Regla 6 — Elegir estrategia

Módulo:

```txt
analyzeUserState()
```

Entradas:

- categoría
- intensidad
- repetición

Salida:

Una estrategia.

Ejemplos:

```txt
claridad
regulacion
micro_paso
```

---

# Regla 7 — Microacción corta

Módulo:

```txt
generateMicroAction()
```

Condiciones:

Debe:

✔ durar pocos minutos  
✔ ser realizable  
✔ no exigir preparación  
✔ ser concreta

No debe:

❌ depender de otra persona  
❌ durar horas  
❌ generar culpa

Duración objetivo:

```txt
2–5 minutos
```

---

# Regla 8 — Respuesta breve

Módulo:

```txt
buildResponse()
```

La respuesta debe:

- validar sin exagerar
- orientar
- cerrar

Evitar:

❌ discursos largos  
❌ explicaciones clínicas  
❌ dependencia

---

# Regla 9 — Siempre cerrar

Toda interacción termina.

Frase:

```txt
Esto termina acá por hoy.
```

Objetivo:

Crear límite saludable.

---

# Regla 10 — El usuario produce el cambio

Coach Diario:

NO cambia personas.

Coach Diario:

facilita claridad.

---

# Tabla de decisión (v1)

| Riesgo | Intensidad | Repetición | Acción |
|--------|-----------|-----------|--------|
| Sí | cualquiera | cualquiera | detener |
| No | baja | no | claridad |
| No | media | no | regulación |
| No | alta | sí | micro paso |

---

# Restricciones del motor

No:

- diagnosticar
- interpretar personalidad
- prometer resultados
- mantener conversaciones infinitas

---

# Métricas futuras

Evaluar:

- microacciones completadas
- claridad percibida
- retorno al día siguiente
- evolución semanal

(No implementado)

---

# Estado actual

Versión:

v1

Estado:

experimental