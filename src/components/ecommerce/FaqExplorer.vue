<script setup lang="ts">
import { ref, computed } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { 
  Search, Sparkles, Truck, Wrench, ShieldCheck, HelpCircle, 
  MessageCircle, Mail, ChevronDown, CheckCircle2, AlertCircle, Smile,
  Droplets, MapPin, Lock, CreditCard, Box, Hammer
} from 'lucide-vue-next';

interface FaqItem {
  id: string;
  category: 'cuidados' | 'montaje' | 'envios' | 'garantias';
  categoryLabel: string;
  icon: any;
  title: string;
  content: string;
  tips?: string[];
  defaultOpen?: boolean;
}

const searchQuery = ref('');
const selectedCategory = ref<string>('all');

const categories = [
  { id: 'all', label: 'Todas las Consultas', icon: Sparkles },
  { id: 'cuidados', label: 'Limpieza y Maderas', icon: Droplets },
  { id: 'montaje', label: 'Montaje Montessori', icon: Wrench },
  { id: 'envios', label: 'Despacho y Retiro', icon: Truck },
  { id: 'garantias', label: 'Garantía y Cambios', icon: ShieldCheck },
];

const faqDatabase: FaqItem[] = [
  // CUIDADOS Y MADERAS
  {
    id: 'c-1',
    category: 'cuidados',
    categoryLabel: 'Limpieza y Maderas',
    icon: Box,
    title: '¿Cómo debo limpiar y conservar el mobiliario de madera natural Bílbola?',
    content: 'Nuestros muebles están fabricados con maderas nobles (roble, abedul y terciado premium pulido) tratadas con aceites naturales y barnices al agua con estándar de seguridad europeo. Para la limpieza diaria, utiliza un paño suave de microfibra levemente humedecido con agua y seca de inmediato con un paño seco.',
    tips: [
      'No utilices aerosoles con silicona, cloro ni detergentes corrosivos o abrasivos.',
      'Una o dos veces al año, puedes aplicar cera de abejas natural para renovar el brillo y nutrir la fibra vegetal.',
      'Evita exponer la madera directamente al sol intenso de un ventanal sin cortina por horas, para prevenir variaciones de tono.'
    ],
    defaultOpen: true
  },
  {
    id: 'c-2',
    category: 'cuidados',
    categoryLabel: 'Limpieza y Maderas',
    icon: Droplets,
    title: '¿Las fundas de cojines de lactancia, cestos y textiles Deco son lavables en lavadora?',
    content: '¡Sí! Toda nuestra línea textil para dormitorios infantiles y cunas está pensada en el dinamismo familiar. Las fundas decorativas de algodón orgánico son desmontables con cierres YKK de seguridad ocultos.',
    tips: [
      'Lavar a máquina en ciclo suave/delicado con agua fría (máxima temperatura de 30°C).',
      'Usar jabón neutro o hipoalergénico especial para pieles de bebés e infancies.',
      'No introducir en secadora térmica de calor fuerte; secar a la sombra en posición horizontal para evitar encogimiento en el algodón orgánico.'
    ]
  },
  // MONTAJE Y SEGURIDAD
  {
    id: 'm-1',
    category: 'montaje',
    categoryLabel: 'Montaje Montessori',
    icon: Wrench,
    title: '¿Qué estándar de seguridad y ergonomía infantil tienen las camas y muebles?',
    content: 'El corazón del sistema Bílbola Deco Kids es la filosofía Montessori y el libre movimiento seguro. Todos nuestros bordes, esquinas y largueros cuentan con un rebaje pulido al tacto sin cantos vivos ni aristas filosas. Usamos herrajes estructurales ocultos que impiden pellizcos en deditos inquietos y pinturas ecocertificadas sin plomo ni componentes volátiles nocivos (VOC free).'
  },
  {
    id: 'm-2',
    category: 'montaje',
    categoryLabel: 'Montaje Montessori',
    icon: Hammer,
    title: '¿Los muebles se entregan armados o incluyen kit y manual de montaje en casa?',
    content: 'Para los despachos a regiones y muebles modulares grandes (camas casita, bibliotecas frontales, torres de aprendizaje), enviamos el producto desarmado en embalaje reforzado con protección antichoque. Cada caja incluye un kit de herrajes de acero inoxidable, llave allen ergonómica y un manual gráfico paso a paso con ilustraciones sencillas. En promedio, el montaje toma menos de 35 minutos sin requerir taladro.'
  },
  // ENVÍOS Y DESPACHO
  {
    id: 'e-1',
    category: 'envios',
    categoryLabel: 'Despacho y Retiro',
    icon: Truck,
    title: '¿Cuánto demoran los despachos y cuál es el monto para optar a Envío Gratis?',
    content: '¡Buenas noticias! Todos los pedidos que sumen o superen los $40.000 obtienen envío completamente gratuito a todo Chile. En el caso de piezas de decoración e inventario disponible en showroom, el despacho en la Región Metropolitana demora entre 2 a 4 días hábiles; a regiones mediante Starken o Chilexpress con seguimiento, entre 4 a 8 días hábiles.'
  },
  {
    id: 'e-2',
    category: 'envios',
    categoryLabel: 'Despacho y Retiro',
    icon: MapPin,
    title: '¿Cómo opera el Retiro gratuito en el Showroom de Pueblo del Inglés (Vitacura)?',
    content: 'Al realizar tu compra en la tienda web, seleccionas la opción "Retiro en Bodega $0" en el Paso 3 del Checkout. Apenas tu pieza Deco o mueble esté auditado, empaquetado y listo en nuestro showroom (Local 19, Pueblo del Inglés, Vitacura, Santiago), te enviaremos una notificación al correo y un mensaje de WhatsApp para que pases a buscarlo.'
  },
  // GARANTÍAS Y CAMBIOS
  {
    id: 'g-1',
    category: 'garantias',
    categoryLabel: 'Garantía y Cambios',
    icon: Lock,
    title: '¿Cuál es la política de garantía de 30 días y la Garantía Legal chilena?',
    content: 'Sabemos que diseñar el dormitorio infantil soñado requiere flexibilidad. Cuentas con 30 días corridos desde la recepción para realizar cambios en piezas decorativas o textiles, siempre que conserven sus etiquetas intactas en embalaje original sin uso. Asimismo, todos nuestros muebles artesanales están protegidos por la Garantía Legal de 6 meses (cambio, reparación o reembolso total ante cualquier falla de manufactura o madera).'
  },
  {
    id: 'g-2',
    category: 'garantias',
    categoryLabel: 'Garantía y Cambios',
    icon: CreditCard,
    title: '¿Qué respaldo bancario y medios de pago están disponibles por Flow?',
    content: 'Nuestra pasarela oficial transaccional opera 100% encriptada a través de Flow Chile y Webpay. Puedes abonar con tarjetas de débito (Redcompra), tarjetas de crédito hasta en 6 cuotas sin interés y transferencias electrónicas directas para proyectos arquitectónicos a medida.'
  }
];

const filteredFaqs = computed(() => {
  return faqDatabase.filter(item => {
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value;
    if (!matchesCategory) return false;
    
    if (!searchQuery.value.trim()) return true;
    
    const query = searchQuery.value.toLowerCase().trim();
    const matchTitle = item.title.toLowerCase().includes(query);
    const matchContent = item.content.toLowerCase().includes(query);
    const matchTips = item.tips?.some(tip => tip.toLowerCase().includes(query));
    
    return matchTitle || matchContent || matchTips;
  });
});
</script>

<template>
  <div class="space-y-12 font-bilbola w-full max-w-5xl mx-auto px-4 sm:px-6">
    
    <!-- BARRA DE BÚSQUEDA INTERACTIVA -->
    <div class="bg-white p-6 sm:p-8 rounded-bilbola-lg border border-bilbola-gray-light/60 shadow-md relative overflow-hidden">
      <div class="absolute right-0 top-0 w-64 h-64 bg-bilbola-mint-light/25 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      
      <div class="max-w-2xl mx-auto space-y-3 relative z-10 text-center">
        <label for="faq-search" class="block text-xs font-black uppercase text-bilbola-text-secondary tracking-wider">
          🔍 Búsqueda Inteligente por Palabra Clave
        </label>
        <div class="relative flex items-center">
          <Search class="w-5 h-5 text-bilbola-text-secondary absolute left-4 pointer-events-none" />
          <input
            id="faq-search"
            v-model="searchQuery"
            type="search"
            placeholder="Ej: limpieza de maderas, envío gratis, camas Montessori, Pueblo del Inglés..."
            class="w-full pl-12 pr-10 py-3.5 bg-bilbola-surface-neutral/50 border-2 border-bilbola-gray-light/60 focus:border-bilbola-action-focus focus:bg-white text-bilbola-text-primary placeholder-bilbola-text-secondary/70 font-semibold text-sm sm:text-base rounded-bilbola-md outline-none transition-all duration-200 shadow-2xs focus:ring-4 focus:ring-bilbola-action-focus/15"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            type="button" 
            class="absolute right-3.5 text-xs bg-bilbola-gray-light hover:bg-bilbola-gray-depth text-bilbola-text-primary font-black px-2.5 py-1 rounded-sm transition-colors"
            title="Limpiar búsqueda"
          >
            Limpiar
          </button>
        </div>
      </div>

      <!-- TABS / SELECTORES DE CATEGORÍA -->
      <div class="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-7 pt-6 border-t border-bilbola-gray-light/30">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          type="button"
          :class="[
            'px-4 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-1.5 shadow-2xs select-none min-h-[44px] sm:min-h-[38px]',
            selectedCategory === cat.id
              ? 'bg-bilbola-action-primary text-white scale-102 shadow-sm'
              : 'bg-bilbola-surface-neutral text-bilbola-text-secondary hover:text-bilbola-text-primary hover:bg-bilbola-surface-warm'
          ]"
        >
          <component :is="cat.icon" class="w-4 h-4 shrink-0" />
          <span>{{ cat.label }}</span>
        </button>
      </div>
    </div>

    <!-- LISTADO DE ACORDEONES REACTIVO -->
    <div class="space-y-4">
      <div v-if="filteredFaqs.length === 0" class="bg-white p-12 text-center rounded-bilbola-md border border-bilbola-gray-light/50 space-y-4 shadow-2xs">
        <Smile class="w-12 h-12 text-bilbola-support-yellow mx-auto animate-bounce" />
        <h3 class="text-xl font-black text-bilbola-text-primary">
          No encontramos respuestas exactas para "{{ searchQuery }}"
        </h3>
        <p class="text-sm text-bilbola-text-secondary max-w-md mx-auto font-medium">
          Pero nuestro equipo de interioristas y especialistas en mobiliario infantil está conectado al otro lado de la pantalla para asesorarte en directo.
        </p>
        <button 
          @click="searchQuery = ''; selectedCategory = 'all'" 
          type="button" 
          class="inline-block px-5 py-2.5 bg-bilbola-surface-neutral hover:bg-bilbola-action-primary hover:text-white text-bilbola-text-primary text-xs font-black rounded-sm transition-all shadow-2xs"
        >
          Ver Todas las Preguntas Frecuentes
        </button>
      </div>

      <Disclosure
        v-for="item in filteredFaqs"
        :key="item.id + '-' + selectedCategory"
        v-slot="{ open }"
        :default-open="item.defaultOpen && !searchQuery"
        as="div"
        class="bg-white rounded-bilbola-md border border-bilbola-gray-light/60 hover:border-bilbola-action-focus transition-all duration-200 shadow-sm overflow-hidden"
      >
        <DisclosureButton class="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:ring-inset group">
          <div class="flex items-start gap-3.5">
            <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-bilbola-surface-neutral group-hover:bg-bilbola-mint-light/40 transition-colors shrink-0">
              <component :is="item.icon" class="w-5 h-5 text-bilbola-action-focus" />
            </span>
            <div class="space-y-1">
              <span class="inline-block px-2.5 py-0.5 rounded-xs bg-bilbola-surface-neutral text-[10px] font-black uppercase text-bilbola-text-secondary tracking-wide border border-bilbola-gray-light/40">
                {{ item.categoryLabel }}
              </span>
              <h3 class="text-base sm:text-lg font-black text-bilbola-text-primary group-hover:text-bilbola-action-focus transition-colors leading-snug">
                {{ item.title }}
              </h3>
            </div>
          </div>
          <span 
            class="flex items-center justify-center w-8 h-8 rounded-full bg-bilbola-surface-neutral text-bilbola-text-primary group-hover:bg-bilbola-action-focus group-hover:text-white transition-all duration-200 shrink-0 mt-1"
            :class="{ 'rotate-180 bg-bilbola-action-focus text-white': open }"
          >
            <ChevronDown class="w-5 h-5 transition-transform" />
          </span>
        </DisclosureButton>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-98 opacity-0 -translate-y-2"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-98 opacity-0 -translate-y-2"
        >
          <DisclosurePanel class="px-5 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pl-16 border-t border-bilbola-gray-light/20 bg-bilbola-surface-neutral/20 space-y-4">
            <p class="text-sm sm:text-base text-bilbola-text-secondary leading-relaxed font-medium">
              {{ item.content }}
            </p>

            <!-- Lista de tips y recomendaciones prácticas (Si existen) -->
            <div v-if="item.tips && item.tips.length > 0" class="p-4 sm:p-5 rounded-bilbola-sm bg-white border border-bilbola-gray-light/50 space-y-2.5 shadow-2xs">
              <span class="text-xs font-black text-bilbola-action-focus uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 class="w-4 h-4 text-green-600" />
                <span>Tips Oficiales del Equipo Bílbola Deco:</span>
              </span>
              <ul class="space-y-2 text-xs sm:text-sm text-bilbola-text-secondary font-semibold">
                <li v-for="(tip, idx) in item.tips" :key="idx" class="flex items-start gap-2">
                  <span class="text-bilbola-support-pink font-bold">•</span>
                  <span>{{ tip }}</span>
                </li>
              </ul>
            </div>
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </div>

    <!-- SECCIÓN DE SOPORTE FAMILIAR EN VIVO (DUAL CTA: CONTACTO + WHATSAPP) -->
    <div class="bg-gradient-to-br from-bilbola-surface-warm via-white to-bilbola-mint-light/25 rounded-bilbola-lg border-2 border-bilbola-support-pink/50 p-8 sm:p-10 text-center shadow-lg relative overflow-hidden mt-16">
      <div class="max-w-2xl mx-auto space-y-6 relative z-10">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-bilbola-support-pink/10 border border-bilbola-support-pink/30 text-bilbola-support-pink shadow-2xs">
          <MessageCircle class="w-7 h-7 animate-pulse" />
        </div>
        <div class="space-y-2">
          <h3 class="text-2xl sm:text-3xl font-black text-bilbola-text-primary tracking-tight">
            ¿Tienes un proyecto especial para el dormitorio de tus infantes?
          </h3>
          <p class="text-sm sm:text-base text-bilbola-text-secondary font-medium leading-relaxed">
            Nuestro equipo en el Showroom de Vitacura te orienta personalmente en cotizaciones a medida, colores lacados sin tóxicos y coordinación de despachos especiales.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <!-- CTA 1: Formulario de Contacto del E-Commerce -->
          <a
            href="/contacto"
            class="w-full sm:w-auto px-7 py-4 bg-bilbola-action-primary hover:bg-bilbola-action-focus text-white text-xs sm:text-sm font-black rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-h-[48px]"
          >
            <Mail class="w-4 h-4" />
            <span>Formulario de Mesa de Ayuda</span>
          </a>

          <!-- CTA 2: WhatsApp Directo de Showroom -->
          <a
            href="https://wa.me/56912345678?text=Hola%20B%C3%ADlbola%20Deco%20Kids!%20Tengo%20una%20consulta%20sobre%20sus%20muebles%20y%20decoraci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-7 py-4 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-black rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-h-[48px]"
          >
            <MessageCircle class="w-4 h-4 fill-current" />
            <span>Hablar en Vivo por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
