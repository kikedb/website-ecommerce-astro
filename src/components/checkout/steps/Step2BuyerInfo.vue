<script setup lang="ts">
import { reactive, computed, onMounted, ref, watch } from 'vue';
import { 
  User, 
  Mail, 
  Phone, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Smile,
  Info
} from 'lucide-vue-next';

export interface BuyerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isGift: boolean;
  giftNote: string;
}

export interface Emits {
  (e: 'prev-step'): void;
  (e: 'next-step', payload: BuyerData): void;
  (e: 'save-buyer', payload: BuyerData): void;
}

const emit = defineEmits<Emits>();

const form = reactive<BuyerData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isGift: false,
  giftNote: ''
});

const touched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  phone: false
});

const isSubmitted = ref(false);
const isHydrating = ref(false);

// Hydrate from sessionStorage on mount
onMounted(() => {
  const saved = sessionStorage.getItem('bilbola_checkout_buyer');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(form, parsed);
    } catch (e) {
      console.error('Error hydrating buyer info from session:', e);
    }
  }
});

// Auto-save to sessionStorage when form changes
watch(form, (newVal) => {
  sessionStorage.setItem('bilbola_checkout_buyer', JSON.stringify(newVal));
  emit('save-buyer', newVal);
}, { deep: true });

// Validation logic
const errors = computed(() => {
  const e: Record<string, string> = {};
  if (!form.firstName.trim() || form.firstName.trim().length < 2) {
    e.firstName = 'Ingresa tu nombre (mínimo 2 caracteres).';
  }
  if (!form.lastName.trim() || form.lastName.trim().length < 2) {
    e.lastName = 'Ingresa tus apellidos.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
    e.email = 'Ingresa un correo electrónico válido.';
  }
  const phoneRegex = /^[+\d\s-]{8,15}$/;
  if (!form.phone.trim() || !phoneRegex.test(form.phone.trim())) {
    e.phone = 'Ingresa un teléfono válido (ej: +56 9 1234 5678).';
  }
  return e;
});

const isValid = computed(() => Object.keys(errors.value).length === 0);

function simulateAuthHydrate() {
  isHydrating.value = true;
  setTimeout(() => {
    form.firstName = 'Valentina';
    form.lastName = 'Morales del Valle';
    form.email = 'valentina.morales@gmail.com';
    form.phone = '+56 9 8765 4321';
    touched.firstName = true;
    touched.lastName = true;
    touched.email = true;
    touched.phone = true;
    isHydrating.value = false;
  }, 400);
}

function handleNext() {
  isSubmitted.value = true;
  touched.firstName = true;
  touched.lastName = true;
  touched.email = true;
  touched.phone = true;

  if (isValid.value) {
    sessionStorage.setItem('bilbola_checkout_buyer', JSON.stringify(form));
    emit('save-buyer', form);
    emit('next-step', form);
  }
}
</script>

<template>
  <div class="font-bilbola space-y-6 animate-fadeIn">
    
    <!-- Banner opcional: Simulación de Cuenta o Autocompletar -->
    <div class="p-4 sm:p-5 rounded-bilbola-md bg-bilbola-mint-light/30 border border-bilbola-mint-depth/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-bilbola-action-focus text-white flex items-center justify-center shrink-0 shadow-xs">
          <Smile class="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h4 class="text-xs sm:text-sm font-black text-bilbola-text-primary uppercase tracking-wide">
            ¿Ya eres miembro de Bílbola?
          </h4>
          <p class="text-xs text-bilbola-text-secondary mt-0.5">
            Puedes simular el inicio de sesión con una cuenta frecuente para completar todo al instante.
          </p>
        </div>
      </div>
      <button
        type="button"
        :disabled="isHydrating"
        class="w-full sm:w-auto px-4 py-2.5 bg-white border border-bilbola-action-focus text-bilbola-action-focus hover:bg-bilbola-action-focus hover:text-white font-bold text-xs rounded-bilbola-sm transition-all shadow-2xs disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
        @click="simulateAuthHydrate"
      >
        <Sparkles class="w-4 h-4 text-bilbola-action-focus shrink-0 group-hover:text-white" />
        <span v-if="isHydrating">Autocompletando...</span>
        <span v-else>Autocompletar de prueba</span>
      </button>
    </div>

    <!-- FORMULARIO PRINCIPAL DE DATOS DEL COMPRADOR -->
    <div class="bg-white rounded-bilbola-lg border border-bilbola-gray-light/30 p-5 sm:p-8 shadow-sm space-y-7">
      
      <!-- Cabecera de la sección -->
      <div class="border-b border-bilbola-gray-light/30 pb-4">
        <h2 class="text-xl font-extrabold text-bilbola-text-primary flex items-center gap-2">
          <span>2. Datos de Contacto del Comprador</span>
        </h2>
        <p class="text-xs text-bilbola-text-secondary mt-0.5">
          Ingresa tus antecedentes para enviarte el boleta oficial, notificaciones de despacho y código de rastreo.
        </p>
      </div>

      <!-- Grid de Inputs Reactivos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        
        <!-- Nombre -->
        <div class="space-y-1.5">
          <label for="buyer-fname" class="block text-xs font-black text-bilbola-text-primary uppercase tracking-wider">
            Nombres <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-bilbola-text-secondary/60">
              <User class="w-4 h-4" />
            </div>
            <input
              id="buyer-fname"
              v-model="form.firstName"
              type="text"
              placeholder="Ej: Valentina"
              :class="[
                'w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-bilbola-sm transition-all focus:outline-none focus:ring-2',
                (touched.firstName || isSubmitted) && errors.firstName
                  ? 'border-red-500 text-red-900 placeholder:text-red-300 focus:ring-red-200 border-2'
                  : 'border-bilbola-gray-light/60 text-bilbola-text-primary focus:border-bilbola-action-focus focus:ring-bilbola-action-focus border'
              ]"
              @blur="touched.firstName = true"
            />
            <div v-if="(touched.firstName || isSubmitted) && !errors.firstName" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
              <CheckCircle2 class="w-4 h-4" />
            </div>
          </div>
          <p v-if="(touched.firstName || isSubmitted) && errors.firstName" class="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1">
            <AlertCircle class="w-3.5 h-3.5 shrink-0" />
            <span>{{ errors.firstName }}</span>
          </p>
        </div>

        <!-- Apellidos -->
        <div class="space-y-1.5">
          <label for="buyer-lname" class="block text-xs font-black text-bilbola-text-primary uppercase tracking-wider">
            Apellidos <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-bilbola-text-secondary/60">
              <User class="w-4 h-4" />
            </div>
            <input
              id="buyer-lname"
              v-model="form.lastName"
              type="text"
              placeholder="Ej: Morales del Valle"
              :class="[
                'w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-bilbola-sm transition-all focus:outline-none focus:ring-2',
                (touched.lastName || isSubmitted) && errors.lastName
                  ? 'border-red-500 text-red-900 placeholder:text-red-300 focus:ring-red-200 border-2'
                  : 'border-bilbola-gray-light/60 text-bilbola-text-primary focus:border-bilbola-action-focus focus:ring-bilbola-action-focus border'
              ]"
              @blur="touched.lastName = true"
            />
            <div v-if="(touched.lastName || isSubmitted) && !errors.lastName" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
              <CheckCircle2 class="w-4 h-4" />
            </div>
          </div>
          <p v-if="(touched.lastName || isSubmitted) && errors.lastName" class="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1">
            <AlertCircle class="w-3.5 h-3.5 shrink-0" />
            <span>{{ errors.lastName }}</span>
          </p>
        </div>

        <!-- Correo Electrónico -->
        <div class="space-y-1.5">
          <label for="buyer-email" class="block text-xs font-black text-bilbola-text-primary uppercase tracking-wider">
            Correo Electrónico <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-bilbola-text-secondary/60">
              <Mail class="w-4 h-4" />
            </div>
            <input
              id="buyer-email"
              v-model="form.email"
              type="email"
              placeholder="ejemplo@correo.com"
              :class="[
                'w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-bilbola-sm transition-all focus:outline-none focus:ring-2',
                (touched.email || isSubmitted) && errors.email
                  ? 'border-red-500 text-red-900 placeholder:text-red-300 focus:ring-red-200 border-2'
                  : 'border-bilbola-gray-light/60 text-bilbola-text-primary focus:border-bilbola-action-focus focus:ring-bilbola-action-focus border'
              ]"
              @blur="touched.email = true"
            />
            <div v-if="(touched.email || isSubmitted) && !errors.email" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
              <CheckCircle2 class="w-4 h-4" />
            </div>
          </div>
          <p v-if="(touched.email || isSubmitted) && errors.email" class="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1">
            <AlertCircle class="w-3.5 h-3.5 shrink-0" />
            <span>{{ errors.email }}</span>
          </p>
          <p class="text-[11px] text-bilbola-text-secondary font-medium">
            🔒 Exclusivamente para tu comprobante electrónico y seguimiento de envío.
          </p>
        </div>

        <!-- Teléfono de Contacto -->
        <div class="space-y-1.5">
          <label for="buyer-phone" class="block text-xs font-black text-bilbola-text-primary uppercase tracking-wider">
            Teléfono Móvil <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-bilbola-text-secondary/60">
              <Phone class="w-4 h-4" />
            </div>
            <input
              id="buyer-phone"
              v-model="form.phone"
              type="tel"
              placeholder="+56 9 8765 4321"
              :class="[
                'w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-bilbola-sm transition-all focus:outline-none focus:ring-2',
                (touched.phone || isSubmitted) && errors.phone
                  ? 'border-red-500 text-red-900 placeholder:text-red-300 focus:ring-red-200 border-2'
                  : 'border-bilbola-gray-light/60 text-bilbola-text-primary focus:border-bilbola-action-focus focus:ring-bilbola-action-focus border'
              ]"
              @blur="touched.phone = true"
            />
            <div v-if="(touched.phone || isSubmitted) && !errors.phone" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
              <CheckCircle2 class="w-4 h-4" />
            </div>
          </div>
          <p v-if="(touched.phone || isSubmitted) && errors.phone" class="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1">
            <AlertCircle class="w-3.5 h-3.5 shrink-0" />
            <span>{{ errors.phone }}</span>
          </p>
          <p class="text-[11px] text-bilbola-text-secondary font-medium">
            📦 El repartidor te contactará a este número si necesitas ayuda en la entrega.
          </p>
        </div>

      </div>

      <!-- SECCIÓN DIFERENCIAL BÍLBOLA: LA NOTA MÁGICA -->
      <div class="pt-6 border-t border-bilbola-gray-light/30">
        <div :class="[
          'rounded-bilbola-md border-2 p-5 sm:p-6 transition-all duration-300',
          form.isGift 
            ? 'bg-bilbola-surface-warm/50 border-bilbola-support-pink shadow-md' 
            : 'bg-bilbola-surface-neutral/40 border-bilbola-gray-light/40 hover:border-bilbola-gray-light'
        ]">
          
          <!-- Switch / Checkbox Tarjeta -->
          <label class="flex items-start sm:items-center gap-3.5 cursor-pointer group">
            <input 
              v-model="form.isGift" 
              type="checkbox" 
              class="w-5 h-5 mt-0.5 sm:mt-0 rounded-sm text-bilbola-action-focus focus:ring-2 focus:ring-bilbola-action-focus border-bilbola-gray-light/80 transition-colors cursor-pointer"
            />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <Gift class="w-5 h-5 text-bilbola-action-focus animate-bounce" />
                <span class="text-sm font-black text-bilbola-text-primary tracking-wide">
                  ¿Es un regalo de cumpleaños o celebración especial?
                </span>
                <span class="px-2 py-0.5 rounded-full bg-bilbola-mint-light text-[10px] font-black uppercase text-bilbola-action-focus shadow-2xs">
                  GRATIS
                </span>
              </div>
              <p class="text-xs text-bilbola-text-secondary mt-1 leading-relaxed">
                Marca esta opción y adjuntaremos una hermosa tarjeta de regalo física ilustrada con tu dedicatoria impresa en la caja de peluches.
              </p>
            </div>
          </label>

          <!-- Contenido Desplegable (Animado en vivo) -->
          <div v-if="form.isGift" class="mt-6 space-y-5 pt-5 border-t border-bilbola-support-pink/80 animate-fadeIn">
            <div>
              <div class="flex justify-between items-center mb-1.5 text-xs font-bold">
                <span class="text-bilbola-text-primary">Escribe tu dedicatoria para el niño o niña:</span>
                <span :class="form.giftNote.length > 220 ? 'text-amber-600 font-black' : 'text-bilbola-text-secondary'">
                  {{ form.giftNote.length }}/250 caracteres
                </span>
              </div>
              <textarea
                v-model="form.giftNote"
                maxlength="250"
                rows="3"
                placeholder="Ej: ¡Feliz 5º cumpleaños Mateo! Que esta camita y tus nuevos amigos peluches protejan todos tus sueños mágicos. Con cariño, tu padrino Rodrigo."
                class="w-full text-xs sm:text-sm font-semibold p-3.5 rounded-bilbola-sm bg-white border border-bilbola-support-pink focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus transition-all placeholder:text-bilbola-text-secondary/40"
              />
            </div>

            <!-- VISTA PREVIA DE LA TARJETA EN VIVO (Live Preview UI) -->
            <div class="bg-white rounded-bilbola-md p-6 border-2 border-dashed border-bilbola-support-pink relative shadow-sm overflow-hidden">
              <!-- Sello decorativo flotante -->
              <div class="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-bilbola-surface-warm opacity-60 pointer-events-none" />
              <div class="absolute right-4 top-4 text-bilbola-support-pink/80 pointer-events-none">
                <Sparkles class="w-6 h-6" />
              </div>

              <span class="text-[10px] font-black uppercase text-bilbola-text-secondary tracking-widest block mb-2">
                ✨ Vista Previa de tu Tarjeta de Regalo Bílbola:
              </span>

              <div class="py-3 px-4 rounded-sm bg-bilbola-surface-neutral/40 border border-bilbola-gray-light/20 min-h-[70px] flex items-center justify-center text-center">
                <p v-if="form.giftNote.trim()" class="text-sm sm:text-base italic font-bilbola text-bilbola-text-primary font-bold leading-relaxed">
                  "{{ form.giftNote }}"
                </p>
                <p v-else class="text-xs italic text-bilbola-text-secondary/50 font-normal">
                  Escribe tu mensaje en el cuadro de texto arriba para previsualizar cómo irá impreso en la tarjeta...
                </p>
              </div>

              <div class="mt-3 flex items-center justify-between text-[10px] text-bilbola-text-secondary/80 font-bold">
                <span>Impresión artesanal en papel ecológico Bílbola</span>
                <span>🎁 Incluido con amor en el paquete</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- Resguardo de Confidencialidad -->
      <div class="flex items-center gap-2.5 text-[11px] text-bilbola-text-secondary bg-bilbola-surface-neutral p-3 rounded-bilbola-sm">
        <Info class="w-4 h-4 text-bilbola-action-focus shrink-0" />
        <p>
          En el siguiente paso podrás especificar si quieres <strong>Despacho a tu domicilio</strong> en cualquier región de Chile o <strong>Retirar gratis en nuestra bodega</strong>.
        </p>
      </div>

    </div>

    <!-- BOTONES DE NAVEGACIÓN DEL WIZARD -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <button
        type="button"
        class="inline-flex items-center gap-2 text-xs font-bold text-bilbola-text-secondary hover:text-bilbola-action-focus transition-colors order-2 sm:order-1 px-4 py-3 rounded-bilbola-sm hover:bg-bilbola-gray-light/20"
        @click="emit('prev-step')"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Volver al Carrito (Paso 1)</span>
      </button>

      <button
        type="button"
        class="w-full sm:w-auto px-8 py-4 bg-bilbola-action-primary text-white text-sm font-black rounded-bilbola-sm tracking-wide uppercase shadow-lg hover:bg-bilbola-action-focus hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group order-1 sm:order-2"
        @click="handleNext"
      >
        <span>Continuar a Despacho</span>
        <ArrowRight class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
      </button>
    </div>

  </div>
</template>
