# Coach Diario — Seguridad y Privacidad

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Definir reglas de seguridad, privacidad y manejo responsable de datos.

Este documento establece:

- qué datos se almacenan
- cómo se protegen
- límites del sistema
- prácticas técnicas

---

# Principios

Coach Diario debe operar con:

- mínima recolección
- acceso limitado
- uso responsable
- reducción de riesgo
- privacidad por defecto

---

# Datos almacenados

Actualmente:

```txt
uid
email
date
text
risk
category
intensity
microAction
response
createdAt
```

No almacenar información innecesaria.

---

# Datos que NO deben almacenarse

No guardar:

- contraseñas
- documentos
- tarjetas
- ubicaciones exactas
- contactos
- archivos privados

---

# Acceso

Acceso permitido:

```txt
Backend autorizado
```

Acceso restringido:

```txt
clientes
usuarios externos
scripts no autorizados
```

---

# Variables sensibles

Nunca guardar en repositorio:

```txt
.env
firebase-service-account.json
```

Agregar:

```txt
.gitignore
```

Ejemplo:

```txt
.env
node_modules
firebase-service-account.json
```

---

# Firestore

Principios:

- mínimo privilegio
- reglas restrictivas
- evitar acceso público

Ejemplo objetivo:

```txt
solo backend escribe
```

---

# Logs

Regla:

No imprimir mensajes completos del usuario innecesariamente.

Evitar:

```js
console.log(message)
```

Preferir:

```js
console.log("interaction received")
```

---

# Manejo de errores

No exponer:

- rutas internas
- credenciales
- stack completos

Evitar:

```json
{
 "error":"stack trace"
}
```

Preferir:

```json
{
 "ok":false,
 "message":"Error interno"
}
```

---

# Retención de datos

Versión actual:

Retención temporal.

Objetivo inicial:

```txt
6 meses
```

Pendiente definir limpieza automática.

---

# Exportación

No implementada.

Objetivo futuro:

Permitir exportación controlada.

---

# Eliminación

Pendiente.

Objetivo futuro:

Eliminar datos bajo solicitud.

---

# Seguridad del desarrollo

Antes de subir cambios:

Checklist:

□ .env fuera

□ credenciales fuera

□ pruebas OK

□ logs limpios

□ variables cargadas

---

# Riesgo

Si se detecta riesgo:

- detener flujo
- devolver respuesta breve
- finalizar interacción

No continuar análisis.

---

# Límites del sistema

Coach Diario:

No diagnostica.

No reemplaza atención profesional.

No garantiza resultados.

No mantiene monitoreo continuo.

---

# Incidentes

Registrar:

Fecha:

Descripción:

Impacto:

Corrección:

Prevención:

---

# Próximas mejoras

- reglas Firestore
- entorno producción
- monitoreo
- backups
- rotación de credenciales

---

# Estado

Seguridad:

básica

Entorno:

desarrollo