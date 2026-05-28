# Coach Diario — Instalación y Puesta en Marcha

Versión: v1  
Fecha: 23/05/2026

---

# Objetivo

Documentar cómo instalar y ejecutar Coach Diario desde cero.

Este documento debe permitir que una persona pueda levantar el proyecto sin ayuda.

---

# Requisitos

Instalar:

- Node.js
- npm
- Visual Studio Code
- Git
- Firebase CLI (opcional)

Verificar:

```bash
node -v
```

Resultado esperado:

```txt
vXX
```

Verificar:

```bash
npm -v
```

Resultado esperado:

```txt
XX
```

---

# Descargar proyecto

Opción 1

Git:

```bash
git clone URL_DEL_PROYECTO
```

Entrar:

```bash
cd CoachDiario
```

---

Opción 2

Descargar ZIP.

Extraer.

Abrir carpeta.

---

# Abrir proyecto

Abrir:

```txt
VS Code
```

Menú:

```txt
Archivo
→ Abrir carpeta
→ CoachDiario
```

---

# Instalar dependencias

Abrir terminal:

```bash
npm install
```

Esperar:

```txt
added XX packages
```

---

# Configurar variables

Crear archivo:

```txt
.env
```

Ejemplo:

```env
PORT=3000

FIREBASE_PROJECT_ID=

FIREBASE_PRIVATE_KEY=

FIREBASE_CLIENT_EMAIL=
```

Regla:

Nunca subir .env.

---

# Firebase

Descargar credenciales.

Guardar:

```txt
src/config/
```

Ejemplo:

```txt
firebase-service-account.json
```

Verificar:

Conexión correcta.

---

# Ejecutar servidor

Iniciar:

```bash
node server.js
```

Resultado esperado:

```txt
Servidor iniciado
```

o

```txt
Listening on port 3000
```

---

# Abrir frontend

Abrir:

```txt
test.html
```

o

```txt
coach.html
```

Probar.

---

# Primera prueba

Enviar:

```txt
Hola me siento cansado
```

Esperar:

JSON válido.

---

# Resultado esperado

Ejemplo:

```json
{
 "ok":true,
 "status":"OK"
}
```

---

# Problemas comunes

## No encuentra módulos

Ejecutar:

```bash
npm install
```

---

## Puerto ocupado

Cambiar:

```env
PORT=
```

---

## Error Firebase

Verificar:

- credenciales
- proyecto
- permisos

---

## Cannot GET

Verificar:

Ruta.

Servidor iniciado.

---

## Error índice Firestore

Crear índice sugerido.

Esperar despliegue.

---

# Reiniciar servidor

Detener:

```txt
CTRL + C
```

Volver:

```bash
node server.js
```

---

# Actualizar dependencias

Ver:

```bash
npm outdated
```

Actualizar:

```bash
npm update
```

---

# Checklist

□ Node instalado

□ Dependencias instaladas

□ Variables cargadas

□ Firebase conectado

□ Servidor iniciado

□ Frontend abierto

□ Primera interacción OK

---

# Estado

Instalación validada:

Sí / No