import { ref, computed } from 'vue';

export interface CartItemType {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variantText?: string;
  customizationText?: string;
  maxStock?: number;
}

// Shared reactivity state across island instances
const isCartOpen = ref(false);
const isMobileMenuOpen = ref(false);

const items = ref<CartItemType[]>([
  {
    id: 'prod-1',
    name: 'Cama Montessori Bosque Encantado',
    price: 349990,
    quantity: 1,
    imageUrl: 'https://placehold.co/400x400/png?text=Cama+Montessori',
    variantText: 'Madera Natural - 1 plaza',
    customizationText: 'Grabado nombre "Tomás"',
    maxStock: 5
  },
  {
    id: 'prod-2',
    name: 'Lámpara Estrella de Miel',
    price: 45990,
    quantity: 2,
    imageUrl: 'https://placehold.co/400x400/png?text=Lampara+Estrella',
    variantText: 'Luz Cálida Dimmable',
    maxStock: 12
  }
]);

export function useCart() {
  const totalItems = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((acc, item) => acc + item.price * item.quantity, 0));

  function openCart() {
    isCartOpen.value = true;
  }

  function closeCart() {
    isCartOpen.value = false;
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value;
  }

  function openMobileMenu() {
    isMobileMenuOpen.value = true;
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false;
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }

  function addItem(newItem: Omit<CartItemType, 'quantity'> & { quantity?: number }) {
    const existing = items.value.find(
      (i) => i.id === newItem.id && i.variantText === newItem.variantText
    );
    const addQty = newItem.quantity || 1;
    if (existing) {
      existing.quantity += addQty;
    } else {
      items.value.push({
        ...newItem,
        quantity: addQty
      });
    }
    openCart();
  }

  function removeItem(id: string | number) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function updateQuantity(id: string | number, newQuantity: number) {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const target = items.value.find((item) => item.id === id);
    if (target) {
      target.quantity = newQuantity;
    }
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    isCartOpen,
    isMobileMenuOpen,
    totalItems,
    totalPrice,
    openCart,
    closeCart,
    toggleCart,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
}
