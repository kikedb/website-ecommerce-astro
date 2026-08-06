<script setup lang="ts">
import { ref } from 'vue';
import BaseAccordion from '@/components/ui/BaseAccordion.vue';
import { HelpCircle, Sparkles, MessageCircle } from 'lucide-vue-next';

const faqItems = [
  {
    title: '¿Cuál es el plazo habitual para despachos de muebles y decoración?',
    content: 'Los productos en stock y piezas decorativas pequeñas se procesan y despachan entre 2 a 5 días hábiles en la Región Metropolitana, y de 4 a 8 días hábiles a regiones a través de Starken y Chilexpress. Para muebles de gran escala artesanales creados sobre pedido (cunas, cómodas, escritorios), el plazo de fabricación es de aproximadamente 15 a 20 días hábiles.',
    defaultOpen: true
  },
  {
    title: '¿Puedo solicitar modificaciones personalizadas en las medidas o colores de un mueble?',
    content: '¡Absolutamente! Gran parte del corazón de Bílbola reside en nuestro servicio artesanal de interiorismo. Podemos ajustar las dimensiones, acabados de madera (roble, abedul, lacados al agua no tóxicos) y paletas de color para adaptarnos exactamente a la habitación de tus hijos. Contáctanos por el formulario eligiendo la opción "Cotización Muebles / Proyecto a Medida" o directo al WhatsApp para evaluarlo.'
  },
  {
    title: '¿Cómo funciona la opción de Retiro en el Showroom en Pueblo del Inglés?',
    content: 'Cuando realizas tu compra en línea o a través de nuestra asesoría directa, puedes seleccionar la opción gratuita de "Retiro en Tienda". Una vez que tu pedido esté revisado, empacado y listo en nuestro showroom (Local 19, Pueblo del Inglés, Vitacura), te notificaremos por correo y WhatsApp para que pases a retirarlo en nuestro horario de atención habitual.'
  },
  {
    title: '¿Qué garantía tienen los productos Bílbola?',
    content: 'Todos nuestros muebles y piezas de decoración infantiles cuentan con la Garantía Legal chilena (6 meses para cambio, reparación o devolución ante defectos de fabricación o fallas en las maderas y herrajes). Además, respaldamos la durabilidad de nuestras creaciones y asesoramos a las familias en la mantención y cuidado a lo largo de los años para que pasen de generación en generación.'
  },
  {
    title: '¿Realizan convenios para jardines infantiles y colegios o proyectos con interioristas?',
    content: 'Sí, trabajamos estrechamente con educadores, jardines Montessori/Waldorf, colegios y arquitectos/interioristas. Ofrecemos precios de lista preferenciales para profesionales del diseño e instituciones educacionales, fabricando espacios seguros con bordes redondeados, maderas nobles y pinturas ecocertificadas al agua con estándar europeo.'
  },
  {
    title: '¿Qué métodos de pago aceptan para compras y pedidos especiales?',
    content: 'Aceptamos pagos seguros a través de Webpay (Tarjetas de Débito, Crédito hasta en 6 cuotas sin interés) vía nuestra pasarela oficial en línea, transferencias bancarias directas para proyectos personalizados y pagos presenciales en nuestro showroom de Vitacura mediante tarjeta o efectivo.'
  }
];
</script>

<template>
  <section class="py-24 bg-gradient-to-b from-white via-bilbola-surface-neutralSoft/40 to-bilbola-mint-light/15 border-t border-bilbola-mint-light/50 font-bilbola relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
      
      <!-- Encabezado FAQ -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-bilbola-pill bg-bilbola-surface-warmSoft text-bilbola-text-primary font-black text-xs tracking-widest uppercase mb-4 shadow-2xs">
          <HelpCircle class="w-4 h-4 text-bilbola-action-focus shrink-0" />
          <span>Preguntas Frecuentes &amp; Asistencia</span>
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-bilbola-text-primary tracking-tight font-bilbola mb-4">
          Resolvemos tus dudas al instante
        </h2>
        <p class="text-base sm:text-lg text-bilbola-text-secondary font-medium leading-relaxed">
          Antes de enviarnos tu consulta, revisa las respuestas a las interrogantes más comunes sobre nuestra artesanía, envíos y tienda física.
        </p>
      </div>

      <!-- Contenedor del Acordeón con Estilo Bílbola -->
      <div class="bg-white p-6 sm:p-10 rounded-bilbola-lg border border-bilbola-mint-depth/25 shadow-lg relative">
        <BaseAccordion :items="faqItems" />
      </div>

      <!-- Ayuda Extra -->
      <div class="mt-12 text-center">
        <p class="text-sm font-semibold text-bilbola-text-secondary">
          ¿No encontraste lo que buscabas? 
          <a href="#formulario-contacto" class="text-bilbola-action-focus font-extrabold underline hover:text-bilbola-text-primary transition-colors ml-1 inline-flex items-center gap-1">
            Escríbenos en el formulario superior <Sparkles class="w-3.5 h-3.5 inline" />
          </a>
        </p>
      </div>

    </div>
  </section>
</template>
