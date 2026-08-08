# Invitación de boda — Juan Daniel & Jessica

Invitación web de una sola página, con cuenta regresiva, música de fondo y confirmación de asistencia (RSVP) contra una hoja de Google Sheets.

## Estructura

```
index.html                     página principal (autocontenida)
assets/
  vendor/                      React, ReactDOM y el runtime de la plantilla
  fonts/                       tipografías (Cormorant Garamond, Lora) en woff2
  audio/musica.mp3             música de fondo
```

## Ejecutar en local

Como el sitio carga sus assets con rutas relativas, ábrelo con un servidor local (no funciona bien con doble clic / `file://`):

```bash
npx serve .
```

o

```bash
python -m http.server 5173
```

y entra a `http://localhost:5173`.

## Editar contenido

- **Lista de invitados y hoja de confirmación**: dentro de `index.html`, busca el bloque `<script type="text/x-dc">` al final del archivo. Ahí están `GUEST_LIST` (familias y cupos) y `SHEET_ENDPOINT` (URL del Web App de Google Apps Script que recibe las confirmaciones).
- **Fecha de la boda**: la constante `target` dentro de `renderVals()` en ese mismo script (`new Date(2026, 9, 24, 15, 30, 0)`).
- **Foto de portada** (`hero-field`, la imagen grande de arriba): es un `<image-slot>`, un componente que solo se puede rellenar por drag&drop dentro del editor de Claude — **no funciona en el sitio ya publicado**. Para ponerle una foto real hay que reemplazar ese `<image-slot>` por un `<img src="assets/photos/...">` a mano (avisame y te lo hago).
- **Galería / carrusel**: son `<img>` normales, sí funcionan en cualquier hosting. Instrucciones en [assets/photos/README.md](assets/photos/README.md) — básicamente: subís los archivos con el nombre que pide ese archivo y listo.
- **Textos y estilos**: son HTML/CSS planos dentro del mismo `index.html`.

## Galería con carrusel

La sección "Galería" recorre automáticamente las fotos de `GALLERY_PHOTOS`
(definidas cerca del final de `index.html`, junto a `GUEST_LIST`) cada
`GALLERY_INTERVAL_MS` (4.5s por defecto). Tocar/cliquear una foto la abre en
grande sobre un fondo difuminado (lightbox); se cierra con la X, tocando
afuera, o con Escape.

Las fotos llevan `draggable="false"`, no se pueden seleccionar y el clic
derecho está bloqueado sobre ellas — son trabas básicas contra la descarga
casual, **no protección real**: cualquiera puede sacar una captura de
pantalla o abrir las herramientas de desarrollador del navegador. No subas
fotos que no quieras que alguien pueda llegar a guardar de esa forma.

## Efecto de scroll (reveal on scroll)

Las secciones principales (introducción, fecha/mapa, cuenta regresiva, itinerario, código de vestimenta, foto, RSVP y pie) tienen la clase `reveal`. Un `IntersectionObserver` (al final de `index.html`) les agrega la clase `is-visible` cuando entran en pantalla, disparando una transición de opacidad + desplazamiento definida en el bloque `<style>` del `<head>`.

Para ajustar la animación, modifica en `index.html`:

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s cubic-bezier(.22,.61,.36,1), transform 0.9s cubic-bezier(.22,.61,.36,1);
}
```

Respeta `prefers-reduced-motion` automáticamente.

## Publicar

Cualquier hosting estático sirve (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Por ejemplo, con GitHub Pages:

1. Sube este repositorio a GitHub.
2. En **Settings → Pages**, elige la rama `main` y carpeta raíz (`/`).
3. GitHub publicará el sitio en `https://<usuario>.github.io/<repo>/`.

### Antes de cada despliegue: actualizar la versión de caché

`index.html` incluye, al inicio del `<head>`, un chequeo que compara su propia
versión contra `version.json` (pedido siempre sin caché); si detecta que hay
una versión más nueva en el servidor, recarga la página una sola vez sin
caché. Esto evita que alguien vea una versión vieja de la invitación después
de que publiques cambios.

Para que funcione, hay que avisarle al chequeo que hubo un despliegue nuevo.
Después de editar `index.html` y antes de hacer commit, corré:

```bash
node scripts/bump-version.js
```

Esto actualiza `version.json` y todas las referencias de versión dentro de
`index.html` (el chequeo del `<head>` y los `?v=` de los assets) en un solo
paso.
