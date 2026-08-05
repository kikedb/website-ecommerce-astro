export interface ProductBadge {
  type: 'customizable' | 'bestseller' | 'eco' | 'new' | 'last-units' | 'discount' | 'verified';
  label: string;
}

export interface MockProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: 'cama' | 'lampara' | 'cojin' | 'repisa' | 'mural';
  categoryLabel: string;
  inStock: boolean;
  isCustomizable: boolean;
  badges: ProductBadge[];
}

export interface FilterCategoryOption {
  label: string;
  value: string;
  count: number;
}

export interface FilterCategoryGroup {
  id: string;
  name: string;
  options: FilterCategoryOption[];
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 101,
    name: 'Cama Montessori Roble Natura - Plaza y Media',
    price: 189990,
    originalPrice: 219990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'cama',
    categoryLabel: 'Camas Montessori',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'Madera Roble' }]
  },
  {
    id: 102,
    name: 'Lámpara de Noche Nube Mágica (LED Cálido)',
    price: 34990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'lampara',
    categoryLabel: 'Lámparas y Nubes',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'bestseller', label: 'Más Vendido' }]
  },
  {
    id: 103,
    name: 'Set Textil Algodón Orgánico 300 Hilos - Safari',
    price: 49990,
    originalPrice: 59990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'cojin',
    categoryLabel: 'Cojines y Textiles',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'eco', label: '100% Orgánico' }]
  },
  {
    id: 104,
    name: 'Estante Librero Frontal Oso Polar - Blanco Mate',
    price: 64990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: true,
    isCustomizable: true,
    badges: []
  },
  {
    id: 105,
    name: 'Móvil Colgante Estrellas & Lunas Tejiendo Sueños',
    price: 28990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'mural',
    categoryLabel: 'Murales y Adornos',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'new', label: 'Nuevo' }]
  },
  {
    id: 106,
    name: 'Alfombra de Juegos Acolchada Hipoalergénica',
    price: 42990,
    originalPrice: 52990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'cojin',
    categoryLabel: 'Cojines y Textiles',
    inStock: true,
    isCustomizable: false,
    badges: []
  },
  {
    id: 107,
    name: 'Baúl Organizador Juguetero sobre Ruedas',
    price: 55990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: false,
    isCustomizable: false,
    badges: []
  },
  {
    id: 108,
    name: 'Espejo Montessori Seguro Irrompible con Barra',
    price: 79990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'mural',
    categoryLabel: 'Murales y Adornos',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'A Medida' }]
  },
  {
    id: 109,
    name: 'Cama Casita de Ensueño con Toldo de Lino - Dos Plazas',
    price: 249990,
    originalPrice: 279990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'cama',
    categoryLabel: 'Camas Montessori',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'bestseller', label: 'Destacado' }, { type: 'customizable', label: 'Color a elección' }]
  },
  {
    id: 110,
    name: 'Lámpara Colgante Globo Aerostático Vintage',
    price: 38990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'lampara',
    categoryLabel: 'Lámparas y Nubes',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'new', label: 'Recién llegado' }]
  },
  {
    id: 111,
    name: 'Cojín Nube de Terciopelo Ultra Suave - Pastel',
    price: 18990,
    originalPrice: 22990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'cojin',
    categoryLabel: 'Cojines y Textiles',
    inStock: true,
    isCustomizable: false,
    badges: []
  },
  {
    id: 112,
    name: 'Repisa Flotante Nube de Madera Abedul (Set de 3)',
    price: 32990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'Madera Abedul' }]
  },
  {
    id: 113,
    name: 'Mural Adhesivo Bosque Encantado Acuarela',
    price: 45990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'mural',
    categoryLabel: 'Murales y Adornos',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'eco', label: 'Tintas Eco' }]
  },
  {
    id: 114,
    name: 'Cama Nido Convertible Juvenil Roble & Blanco',
    price: 219990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'cama',
    categoryLabel: 'Camas Montessori',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'Modular' }]
  },
  {
    id: 115,
    name: 'Guirnalda Luz de Hadas LED Bola de Algodón',
    price: 15990,
    originalPrice: 19990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'lampara',
    categoryLabel: 'Lámparas y Nubes',
    inStock: true,
    isCustomizable: false,
    badges: []
  },
  {
    id: 116,
    name: 'Mesa de Noche Infantil Nordica con Cajón Cerradura Suave',
    price: 58990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'new', label: 'Nuevo' }]
  }
];

export function getMockCategories(): FilterCategoryGroup[] {
  const categoryCounts: Record<string, number> = {};
  MOCK_PRODUCTS.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return [
    {
      id: 'category',
      name: 'Categorías Decokids',
      options: [
        { label: 'Camas Montessori', value: 'cama', count: categoryCounts['cama'] || 0 },
        { label: 'Lámparas y Nubes', value: 'lampara', count: categoryCounts['lampara'] || 0 },
        { label: 'Cojines y Textiles', value: 'cojin', count: categoryCounts['cojin'] || 0 },
        { label: 'Repisas y Muebles', value: 'repisa', count: categoryCounts['repisa'] || 0 },
        { label: 'Murales y Adornos', value: 'mural', count: categoryCounts['mural'] || 0 }
      ]
    }
  ];
}
