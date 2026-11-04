/* ==========================================================================
   Contenido editable del sitio
   --------------------------------------------------------------------------
   Este archivo concentra los datos que Nadia puede actualizar sin tocar el
   diseño. IMPORTANTE: cargar únicamente información real y verificable.
   ========================================================================== */

window.SITE_CONTENT = {
  whatsapp: {
    // Número en formato internacional, sin "+" ni espacios.
    number: '5493547591959',
    // Mensaje general (CTA principal).
    defaultMessage: 'Hola Nadia, estuve viendo tu página web y quisiera hacerte una consulta sobre un proyecto.',
    // Mensaje para los CTA de cada servicio. {servicio} se reemplaza por el nombre.
    serviceMessage: 'Hola Nadia, estuve viendo tu página web y quisiera hacerte una consulta sobre el servicio de {servicio}.'
  },

  /* ------------------------------------------------------------------------
     PROYECTOS — solo obras reales de Nadia, con fotografías propias.
     Mientras la lista esté vacía, la web muestra el bloque "Portfolio en
     preparación". Ejemplo de un elemento:

     {
       image: 'assets/img/proyectos/vivienda-anisacate.webp', // WebP o AVIF
       width: 1600, height: 1200,
       alt: 'Fachada de la vivienda al atardecer',
       name: 'Vivienda en Anisacate',
       type: 'Proyecto arquitectónico',
       description: 'Breve descripción del trabajo realizado.'
     }
     ------------------------------------------------------------------------ */
  projects: [],

  /* ------------------------------------------------------------------------
     RESEÑAS — copiar textualmente reseñas reales publicadas en el perfil de
     Google de Nadia. No editar el contenido ni inventar calificaciones.
     Ejemplo:

     {
       author: 'Nombre tal como figura en Google',
       rating: 5,            // estrellas reales de esa reseña
       date: 'Marzo 2026',   // fecha aproximada indicada por Google
       text: 'Texto completo de la reseña.'
     }
     ------------------------------------------------------------------------ */
  reviews: []
};
