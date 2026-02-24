// src/logic/microactions.js

const BANK = {
  ECONOMICO: [
    { code: "ECO01", text: "Anotar todos los gastos realizados en las últimas 24 horas." },
    { code: "ECO02", text: "Revisar tu saldo actual sin hacer ningún juicio." },
    { code: "ECO03", text: "Identificar un gasto pequeño que puedas evitar esta semana." },
    { code: "ECO04", text: "Escribir una fuente potencial de ingreso que podrías explorar." },
    { code: "ECO05", text: "Ordenar tus deudas por monto de menor a mayor." }
  ],
  RELACIONES: [
    { code: "REL01", text: "Enviar un mensaje breve y genuino a alguien importante para ti." },
    { code: "REL02", text: "Identificar qué parte del conflicto depende de ti y cuál no." },
    { code: "REL03", text: "Agradecer algo concreto a una persona cercana." },
    { code: "REL04", text: "Escuchar a alguien durante 10 minutos sin interrumpir." },
    { code: "REL05", text: "Escribir lo que realmente quieres comunicar antes de decirlo." }
  ],
  DESORDEN: [
    { code: "DES01", text: "Elegir una sola cosa para ordenar hoy y escribir cuál es." },
    { code: "DES02", text: "Anotar tres pendientes y marcar uno como prioridad." },
    { code: "DES03", text: "Definir el próximo paso en una frase (algo realizable hoy)." },
    { code: "DES04", text: "Identificar qué te interrumpe más hoy (en una frase)." },
    { code: "DES05", text: "Cerrar una tarea mínima de 10 minutos y darla por terminada." }
  ],
  EXISTENCIAL: [
    { code: "EXI01", text: "Escribir qué actividad reciente te dio más energía de la que te quitó." },
    { code: "EXI02", text: "Definir una meta pequeña para esta semana." },
    { code: "EXI03", text: "Identificar algo que te gustaría aprender en los próximos meses." },
    { code: "EXI04", text: "Escribir tres cosas que valoras en tu vida actual." },
    { code: "EXI05", text: "Dedicar 15 minutos a una actividad que te acerque a algo que te importa." }
  ],
  PERDIDA: [
    { code: "PER01", text: "Escribir una frase sobre lo que más extrañás." },
    { code: "PER02", text: "Escribir una frase sobre algo lindo que te dejó." },
    { code: "PER03", text: "Escribir: 'Hoy me permito…' y completar con una sola cosa." },
    { code: "PER04", text: "Nombrar una persona o lugar que te haría bien hoy (en una frase)." },
    { code: "PER05", text: "Escribir una frase de despedida, como salga." }
  ],
  EMOCIONAL: [
    { code: "EMO01", text: "Escribir en una frase qué emoción predomina ahora mismo." },
    { code: "EMO02", text: "Practicar respiración lenta durante 3 minutos (inhalar 4, exhalar 6)." },
    { code: "EMO03", text: "Escribir tres pensamientos que estén ocupando tu mente ahora." },
    { code: "EMO04", text: "Separar en una hoja: hechos vs interpretaciones sobre lo que te preocupa." },
    { code: "EMO05", text: "Identificar una emoción y nombrarla sin intentar cambiarla." }
  ],
};

function pickMicroAction(category, lastCode = null, prevCode = null) {
  const list = BANK[category] || BANK.EMOCIONAL;
  const filtered = list.filter(a => a.code !== lastCode && a.code !== prevCode);
  const pool = filtered.length ? filtered : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = { BANK, pickMicroAction };