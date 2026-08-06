<script setup lang="ts">
import { ref, reactive } from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Send, CheckCircle2, Sparkles, Loader2, RefreshCw, AlertCircle } from 'lucide-vue-next';

// Opciones del selector de Asunto
const subjectOptions = [
  { label: 'Consulta sobre Catálogo de Productos', value: 'productos' },
  { label: 'Cotización Muebles / Proyecto a Medida', value: 'medida' },
  { label: 'Consulta sobre Estado de mi Despacho', value: 'despacho' },
  { label: 'Cambio, Garantía o Devolución', value: 'garantia' },
  { label: 'Alianza / Cotización Institucional (Jardines/Interioristas)', value: 'institucional' }
];

// Estado del formulario
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: 'productos',
  message: ''
});

// Errores reactivos de validación
const errors = reactive({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const isSuccess = ref(false);

// Validar formulario en tiempo real al enviar
function validateForm(): boolean {
  let valid = true;
  errors.name = '';
  errors.email = '';
  errors.message = '';

  if (!form.name.trim()) {
    errors.name = 'El nombre completo es obligatorio para poder atenderte.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Por favor ingresa tu correo para enviarte la respuesta.';
    valid = false;
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'El formato del correo no es válido (ejemplo@correo.cl).';
    valid = false;
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'El mensaje es muy breve. Por favor cuéntanos con más detalle cómo podemos ayudarte (mínimo 10 caracteres).';
    valid = false;
  }

  return valid;
}

function handleSubmit() {
  if (!validateForm()) return;

  isSubmitting.value = true;
  
  // Simulación de envío asíncrono respetando WCAG y feedback UX
  setTimeout(() => {
    isSubmitting.value = false;
    isSuccess.value = true;
  }, 1200);
}

function resetForm() {
  form.name = '';
  form.email = '';
  form.phone = '';
  form.subject = 'productos';
  form.message = '';
  isSuccess.value = false;
}
</script>

<template>
  <div class="bg-white p-8 sm:p-12 rounded-bilbola-lg border border-bilbola-mint-depth/30 shadow-xl relative overflow-hidden font-bilbola">
    <!-- Malla de Fondo Decorativa Sutil -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-bilbola-mint-light/20 rounded-bl-full pointer-events-none -z-0"></div>
    <div class="absolute bottom-0 left-0 w-48 h-48 bg-bilbola-surface-warmSoft/40 rounded-tr-full pointer-events-none -z-0"></div>

    <!-- ESTADO 1: FORMULARIO INTERACTIVO -->
    <div v-if="!isSuccess" class="relative z-10">
      
      <div class="mb-8 border-b border-bilbola-gray-light/30 pb-6">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-bilbola-pill bg-bilbola-mint-light/50 text-bilbola-action-focus text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles class="w-3.5 h-3.5 text-bilbola-action-focus" />
          <span>Escríbenos directamente</span>
        </span>
        <h2 class="text-3xl font-black text-bilbola-text-primary tracking-tight font-bilbola">
          Envíanos un Mensaje
        </h2>
        <p class="text-sm sm:text-base text-bilbola-text-secondary mt-1 font-normal">
          Completa este formulario y una de nuestras especialistas se comunicará contigo lo antes posible.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
        
        <!-- Nombre completo & Teléfono en grid (Mobile First) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BaseInput
            v-model="form.name"
            label="Nombre Completo"
            placeholder="Ej: Sofía Valdés"
            :error="errors.name"
            required
            :disabled="isSubmitting"
            @blur="validateForm"
          />
          <BaseInput
            v-model="form.phone"
            label="Teléfono / WhatsApp"
            placeholder="+56 9 8765 4321"
            hint="Opcional: Para una respuesta más veloz"
            :disabled="isSubmitting"
          />
        </div>

        <!-- Correo Electrónico -->
        <BaseInput
          v-model="form.email"
          type="email"
          label="Correo Electrónico"
          placeholder="sofia.valdes@ejemplo.cl"
          :error="errors.email"
          required
          :disabled="isSubmitting"
          @blur="validateForm"
        />

        <!-- Asunto (Selector) -->
        <BaseSelect
          v-model="form.subject"
          label="¿En qué te podemos asesorar hoy?"
          :options="subjectOptions"
          :disabled="isSubmitting"
        />

        <!-- Mensaje (Textarea con diseño WCAG idéntico a BaseInput) -->
        <div class="flex flex-col gap-1 w-full font-bilbola">
          <label for="contact-message" class="text-sm font-semibold text-bilbola-text-primary flex items-center gap-1">
            Tu Mensaje o Consulta
            <span class="text-bilbola-action-focus">*</span>
          </label>

          <div class="relative">
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              placeholder="Cuéntanos sobre las medidas, colores, la pieza especial que estás buscando o el número de tu pedido..."
              :disabled="isSubmitting"
              :aria-invalid="!!errors.message"
              class="w-full rounded-bilbola-sm border bg-bilbola-surface-page px-3.5 py-3 text-sm text-bilbola-text-primary placeholder:text-bilbola-text-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px]"
              :class="[
                errors.message
                  ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500'
                  : 'border-bilbola-gray-light hover:border-bilbola-gray-depth focus:border-bilbola-action-focus'
              ]"
              @blur="validateForm"
            ></textarea>
          </div>

          <p v-if="errors.message" class="text-xs font-semibold text-red-600 mt-0.5 flex items-center gap-1">
            <AlertCircle class="w-3.5 h-3.5 shrink-0" />
            <span>{{ errors.message }}</span>
          </p>
          <div v-else class="flex justify-between items-center mt-0.5 text-xs text-bilbola-text-secondary">
            <span>Se lo más detallado posible para brindarte la asesoría perfecta.</span>
            <span>{{ form.message.length }} caracteres</span>
          </div>
        </div>

        <!-- Botón de Enviar (WCAG AA Altura mínima y Contraste) -->
        <div class="pt-2">
          <BaseButton
            type="submit"
            size="lg"
            :loading="isSubmitting"
            class="w-full min-h-[50px] shadow-lg group"
            aria-live="polite"
          >
            <Send v-if="!isSubmitting" class="w-5 h-5 shrink-0 mr-2 transition-transform group-hover:translate-x-1" />
            <span>{{ isSubmitting ? 'Enviando Mensaje...' : 'Enviar Mi Consulta' }}</span>
          </BaseButton>
        </div>

      </form>
      
      <p class="text-xs text-center text-bilbola-text-secondary mt-6 font-normal">
        🔒 Al enviar tu mensaje, tus datos estarán protegidos y serán utilizados únicamente para contactarte respecto a tu consulta.
      </p>

    </div>

    <!-- ESTADO 2: ÉXITO DE ENVÍO (FEEDBACK CÁLIDO) -->
    <div v-else class="py-12 px-4 text-center relative z-10 flex flex-col items-center justify-center min-h-[420px]">
      <div class="w-20 h-20 bg-bilbola-mint-light/60 border-2 border-bilbola-mint-depth/40 rounded-full flex items-center justify-center text-bilbola-action-focus mb-6 shadow-md animate-bounce duration-[2000ms]">
        <CheckCircle2 class="w-11 h-11 stroke-[2.5]" />
      </div>
      
      <span class="text-xs font-black uppercase tracking-widest text-bilbola-action-focus bg-white px-3.5 py-1 rounded-full shadow-2xs border border-bilbola-mint-depth/20 mb-3">
        ✨ ¡Consulta Enviada!
      </span>
      
      <h3 class="text-3xl font-black text-bilbola-text-primary tracking-tight font-bilbola mb-4">
        ¡Gracias por comunicarte, {{ form.name }}!
      </h3>
      
      <p class="text-base sm:text-lg text-bilbola-text-secondary max-w-md mx-auto leading-relaxed mb-8">
        Hemos recibido tu mensaje con el asunto <strong class="text-bilbola-text-primary font-bold">"{{ subjectOptions.find(o => o.value === form.subject)?.label }}"</strong>. Nuestro equipo revisará tus detalles y te responderá en un plazo máximo de <strong>24 horas hábiles</strong> al correo <span class="underline decoration-bilbola-action-focus text-bilbola-text-primary font-semibold">{{ form.email }}</span>.
      </p>

      <div class="p-6 rounded-bilbola-md bg-bilbola-surface-neutralSoft/70 border border-bilbola-gray-light/40 max-w-md w-full text-left mb-8">
        <p class="text-xs font-black text-bilbola-text-primary uppercase tracking-wider mb-2">💡 Mientras esperas nuestra respuesta:</p>
        <p class="text-xs text-bilbola-text-secondary leading-normal">
          Te invitamos a visitar nuestro showroom en <strong>Pueblo del Inglés</strong> o seguirnos en nuestras redes oficiales para ver testimonios y ambientaciones inspiradoras de dormitorios reales.
        </p>
      </div>

      <button
        type="button"
        @click="resetForm"
        class="inline-flex items-center gap-2.5 px-6 py-3 rounded-bilbola-sm bg-bilbola-surface-page hover:bg-bilbola-mint-light/40 text-bilbola-text-primary font-extrabold text-sm border border-bilbola-gray-light/60 hover:border-bilbola-action-focus transition-all shadow-xs cursor-pointer"
      >
        <RefreshCw class="w-4 h-4 text-bilbola-action-focus shrink-0" />
        <span>Enviar Otra Consulta</span>
      </button>
    </div>

  </div>
</template>
