/* ==========================================================================
   Configuración de WhatsApp
   --------------------------------------------------------------------------
   Los textos de la web (servicios, proyectos, reseñas y preguntas
   frecuentes) se editan en tools/build_site.py y se regeneran con:
       python3 tools/build_site.py
   ========================================================================== */

window.SITE_CONTENT = {
  whatsapp: {
    // Número laboral en formato internacional, sin "+" ni espacios.
    number: '5493547662066',
    // Mensaje general (CTA principal).
    defaultMessage: 'Hola Nadia, estuve viendo tu página web y quisiera hacerte una consulta sobre un proyecto.',
    // Mensaje de cada servicio. {servicio} se reemplaza por el nombre.
    serviceMessage: 'Hola Nadia, estuve viendo tu página web y quisiera hacerte una consulta sobre el servicio de {servicio}.'
  }
};
