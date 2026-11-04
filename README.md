# Nadia Banegas | Arquitecta — Sitio web

Sitio web estático (HTML + CSS + JS, sin dependencias ni build) para Nadia Banegas, arquitecta en Anisacate, Córdoba.

## Estructura

```
index.html            Página principal (todas las secciones)
404.html              Página de error
css/styles.css        Estilos (mobile first)
js/content.js         Contenido editable: WhatsApp, proyectos y reseñas
js/main.js            Interacciones (menú, acordeón, animaciones, WhatsApp, galería)
assets/img/           Ilustraciones SVG, íconos e imagen para redes (og-image.jpg)
robots.txt · sitemap.xml · site.webmanifest
```

Para verlo en local: `python3 -m http.server` en la carpeta y abrir http://localhost:8000.
Se puede publicar tal cual en Netlify, Vercel, GitHub Pages o cualquier hosting estático.

## Pendientes antes de publicar (datos a confirmar con Nadia)

| Dato | Dónde | Estado |
|---|---|---|
| **Dominio definitivo** | `index.html` (canonical, Open Graph, JSON-LD), `robots.txt`, `sitemap.xml` | Se usa `https://nadiabanegas.com.ar/` como provisional: reemplazar en todos los archivos. |
| **Matrícula profesional** | Sección "Sobre mí" (lista `.facts`) | No se pudo verificar su web actual, así que **no se muestra**. Agregar una fila `<div><dt>Matrícula</dt><dd>…</dd></div>` con el dato verificado. |
| **Fotografía de Nadia** | `index.html` → `.about-media img` | Hoy muestra una ilustración de mesa de trabajo. Reemplazar por una foto profesional en WebP/AVIF (proporción 9:11, unos 1200 × 1467 px). |
| **Foto del hero** | `index.html` → `.hero-image img` | Ilustración original de una vivienda serrana. Si Nadia tiene una fotografía propia de calidad, reemplazarla por un WebP de unos 1600 × 2000 px. |
| **Proyectos** | `js/content.js` → `projects` | Vacío: se muestra "Portfolio en preparación". Cargar solo obras reales con fotos propias; la galería editorial y el visor se activan solos. |
| **Reseñas de Google** | `js/content.js` → `reviews` | Vacío: se muestra el bloque de Google con el enlace "Ver todas las reseñas". Copiar textualmente reseñas reales del perfil. |
| **Correo electrónico** | Sección Contacto (`.contact-list`) | Agregar cuando Nadia lo confirme. |
| **Instagram** | Footer (`.footer-social`) | Agregar solo si hay un enlace real. |

## WhatsApp

- Número y mensajes en `js/content.js` → `whatsapp`.
- Cualquier enlace con `data-wa` recibe el mensaje general precargado.
- Con `data-service="Nombre"` se arma el mensaje personalizado del servicio.
- Con `data-msg="…"` se define un mensaje específico.

## Imágenes

Las ilustraciones (`assets/img/*.svg`) son originales, livianas y vectoriales. No representan obras de Nadia, y así lo aclara el footer. Las fotos reales que se agreguen deben exportarse en **WebP o AVIF** con `width`/`height` y `loading="lazy"` (salvo el hero).

## SEO

- Title, meta description, canonical, Open Graph y Twitter Card.
- JSON-LD `ProfessionalService` + `Person` (sin dirección exacta, horarios ni datos no confirmados).
- `sitemap.xml` y `robots.txt` (actualizar el dominio).
- Una vez publicado: dar de alta el sitio en Google Search Console y agregar la URL de la web en el Perfil de Empresa de Google.
