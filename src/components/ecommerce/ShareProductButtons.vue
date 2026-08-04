<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import BaseButton from '@/components/ui/BaseButton.vue';

export interface Props {
  productName: string;
  productUrl?: string;
  shareMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  shareMessage: '¡Mira esta hermosura decokids de Bílbola que encontré para el dormitorio!'
});

const canWebShare = ref(typeof navigator !== 'undefined' && !!navigator.share);

async function handleShare() {
  const url = props.productUrl || (typeof window !== 'undefined' ? window.location.href : '');
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.productName,
        text: props.shareMessage,
        url
      });
    } catch (err) {
      // Ignored if cancelled by user
    }
  } else {
    copyToClipboard(url);
  }
}

function copyToClipboard(text?: string) {
  const url = text || props.productUrl || (typeof window !== 'undefined' ? window.location.href : '');
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('¡Enlace copiado al portapapeles con éxito!');
    });
  }
}

function shareWhatsapp() {
  const url = props.productUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const text = encodeURIComponent(`${props.shareMessage} - ${props.productName}: ${url}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}
</script>

<template>
  <div class="flex items-center gap-2 font-bilbola">
    <!-- Native Share / Copy Trigger -->
    <BaseButton
      variant="outline"
      size="sm"
      @click="handleShare"
      class="flex items-center gap-1.5"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {{ canWebShare ? 'Compartir' : 'Copiar Link' }}
    </BaseButton>

    <!-- WhatsApp Quick Share for gift lists -->
    <button
      type="button"
      @click="shareWhatsapp"
      title="Compartir por WhatsApp (Listas de regalo)"
      class="flex h-9 px-3 items-center justify-center gap-1.5 rounded-bilbola-sm bg-[#25D366]/15 text-[#075E54] border border-[#25D366]/40 hover:bg-[#25D366]/25 font-bold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus shadow-2xs"
    >
      <span>💬 WhatsApp</span>
    </button>
  </div>
</template>
