# Fotos

Poné acá las fotos con estos nombres exactos:

```
hero.jpg
galeria-1.jpg
galeria-2.jpg
galeria-3.jpg
galeria-4.jpg
versiculo.jpg
```

`hero.jpg` es la foto de portada (donde dice "Nos casamos", arriba de todo).
Es estática a propósito: no tiene botón de reemplazo ni se puede ampliar
tocándola, a diferencia de las demás fotos de la página.

`versiculo.jpg` es la foto grande de la sección con el texto de Rut 1:16b
(entre la cuenta regresiva y el itinerario) — usá una foto vertical/horizontal
con buen contraste en la parte de abajo, porque ahí se le pone un degradado
oscuro para que el texto se lea bien.

Para agregar más fotos (o sacar alguna), editá el arreglo `GALLERY_PHOTOS`
dentro de `index.html` (buscá `var GALLERY_PHOTOS = [` cerca del final del
archivo) y agregá/quitá una línea con el nombre de archivo correspondiente
— el carrusel y los puntos de navegación se ajustan solos a la cantidad de
fotos que haya en la lista.

Recomendado: fotos en formato `.jpg` o `.webp`, no más de ~500 KB cada una
para que el sitio cargue rápido (podés comprimirlas en https://squoosh.app
antes de subirlas).
