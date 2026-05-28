# Coach Diario — Métricas

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Definir qué medir para evaluar si Coach Diario está funcionando.

Regla principal:

Medir mejora del producto.

No perseguir tiempo de pantalla.

---

# Principios

Priorizar:

- utilidad
- claridad
- continuidad saludable

Evitar:

- adicción
- permanencia
- cantidad de mensajes

---

# Indicadores principales

## M-001 — Interacciones por día

Pregunta:

¿Cuántas personas usan Coach Diario?

Fórmula:

```txt
interacciones del día
```

Objetivo inicial:

No definido.

---

# M-002 — Días activos

Pregunta:

¿La gente vuelve?

Fórmula:

```txt
usuarios con interacción
usuarios registrados
```

Medir:

diario

semanal

mensual

---

# M-003 — Cumplimiento de microacción

Pregunta:

¿Las acciones propuestas parecen realizables?

Estado:

No implementado.

Objetivo futuro:

Registrar:

```txt
hecha
no hecha
```

---

# M-004 — Distribución de categorías

Pregunta:

¿Qué aparece más?

Ejemplo:

```txt
saturacion → 40%
economico → 20%
general → 15%
```

Objetivo:

Entender uso.

---

# M-005 — Intensidad promedio

Pregunta:

¿Cómo llegan las personas?

Fórmula:

promedio score.

Valores:

```txt
1 baja
2 media
3 alta
```

---

# M-006 — Patrones repetidos

Pregunta:

¿Cuántas personas repiten categoría?

Fórmula:

```txt
repetidos / total
```

Objetivo:

Detectar mejora del motor.

---

# M-007 — Evolución

Pregunta:

¿Hay cambios entre días?

Valores:

```txt
better
stable
worse
```

Medir:

por semana.

---

# M-008 — Tiempo de respuesta

Pregunta:

¿Es ágil?

Objetivo:

```txt
< 3 segundos
```

---

# M-009 — Errores

Pregunta:

¿El sistema falla?

Medir:

```txt
errores
interacciones
```

Objetivo:

Menos del:

```txt
1%
```

---

# M-010 — Uso saludable

Pregunta:

¿Se mantiene el límite?

Medir:

Intentos bloqueados.

Objetivo:

Confirmar que el límite funciona.

---

# Métricas prohibidas

No optimizar por:

✘ horas de uso

✘ cantidad de mensajes

✘ retención infinita

✘ dependencia

---

# Dashboard futuro

No implementado.

Posibles bloques:

Usuarios

↓

Categorías

↓

Intensidad

↓

Tendencia

---

# Reporte semanal

Preguntas:

1 ¿Se usó?

2 ¿Generó claridad?

3 ¿Fue estable?

4 ¿Hubo errores?

5 ¿Hay que cambiar reglas?

---

# Definición de éxito (v1)

Coach Diario funciona si:

✔ personas vuelven voluntariamente

✔ entienden mejor qué hacer

✔ las microacciones son simples

✔ el sistema es estable

---

# Alertas

Revisar si:

- sube riesgo
- baja retorno
- aumentan errores
- aumentan categorías repetidas

---

# Estado

Métricas automáticas:

No

Métricas manuales:

Sí