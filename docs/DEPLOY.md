# Coach Diario — Despliegue (Deploy)

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Documentar el proceso para publicar Coach Diario de forma segura.

Este documento define:

- preparación
- despliegue
- verificación
- rollback

---

# Principio

Nada se despliega sin prueba previa.

---

# Entornos

## Desarrollo

Uso:

Construcción.

Origen:

PC local.

Ejemplo:

```txt
localhost:3000
```

---

## Producción

Uso:

Usuarios reales.

Ejemplo:

```txt
coachdiario.com
```

(No implementado)

---

# Checklist previo

Código:

□ compila

□ sin errores

□ pruebas OK

□ documentación actualizada

---

Base:

□ Firestore accesible

□ índices creados

□ reglas revisadas

---

Seguridad:

□ .env fuera

□ credenciales fuera

□ logs revisados

---

# Variables necesarias

Ejemplo:

```env
PORT=

FIREBASE_PROJECT_ID=

FIREBASE_PRIVATE_KEY=

FIREBASE_CLIENT_EMAIL=
```

No subir.

---

# Proceso

## Paso 1

Actualizar rama.

Ejemplo:

```bash
git pull
```

---

## Paso 2

Instalar.

```bash
npm install
```

---

## Paso 3

Probar local.

```bash
node server.js
```

Verificar:

```txt
OK
```

---

## Paso 4

Publicar.

Comando:

(depende plataforma)

Ejemplos:

```bash
firebase deploy
```

o

```bash
deploy proveedor
```

---

## Paso 5

Verificar.

Probar:

POST /api/interaction

---

# Validación posterior

Probar:

✔ interacción

✔ riesgo

✔ Firestore

✔ cierre

✔ errores

---

# Monitoreo inicial

Primeros:

30 minutos.

Controlar:

- errores
- respuestas
- velocidad

---

# Rollback

Si falla:

Paso 1

detener.

Paso 2

volver versión anterior.

Paso 3

probar.

Paso 4

reanudar.

Registrar incidente.

---

# Errores comunes

## Variables faltantes

Resultado:

```txt
500
```

---

## Firestore

Resultado:

```txt
permission denied
```

---

## Índices

Resultado:

```txt
FAILED_PRECONDITION
```

---

## Puerto

Resultado:

```txt
EADDRINUSE
```

---

# Registro

Fecha:

Versión:

Responsable:

Resultado:

Notas:

---

# Estrategia futura

Objetivo:

Automatizar.

Posibles:

- CI
- deploy automático
- rollback automático

(No implementado)

---

# Definición de despliegue exitoso

✔ sistema inicia

✔ responde

✔ guarda

✔ sin errores críticos

---

# Estado

Deploy:

manual

Producción:

pendiente