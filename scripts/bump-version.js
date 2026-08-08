// Actualiza la versión de caché del sitio. Ejecutar antes de cada despliegue
// (después de editar index.html, antes de "git add"):
//
//   node scripts/bump-version.js
//
// Cambia version.json y reemplaza esa misma cadena en todas partes donde
// aparece dentro de index.html (BUILD_VERSION, meta build-version y los
// "?v=" de los assets), así el chequeo de caché del inicio del <head>
// detecta el nuevo despliegue y fuerza una recarga sin caché en los
// visitantes que tenían la página vieja abierta o guardada en caché.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VERSION_FILE = path.join(ROOT, "version.json");
const HTML_FILE = path.join(ROOT, "index.html");

const current = JSON.parse(fs.readFileSync(VERSION_FILE, "utf8")).version;

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const todayPrefix = today + ".";
let next;
if (current.startsWith(todayPrefix)) {
  const n = parseInt(current.slice(todayPrefix.length), 10) || 1;
  next = todayPrefix + (n + 1);
} else {
  next = todayPrefix + "1";
}

let html = fs.readFileSync(HTML_FILE, "utf8");
const occurrences = html.split(current).length - 1;
if (occurrences === 0) {
  console.error('No se encontró la versión actual ("' + current + '") en index.html. Nada que actualizar.');
  process.exit(1);
}
html = html.split(current).join(next);
fs.writeFileSync(HTML_FILE, html, "utf8");
fs.writeFileSync(VERSION_FILE, JSON.stringify({ version: next }, null, 2) + "\n", "utf8");

console.log("Versión actualizada: " + current + " -> " + next + " (" + occurrences + " referencias en index.html)");
