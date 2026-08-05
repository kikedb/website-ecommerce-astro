export interface ProductBadge {
  type: 'customizable' | 'bestseller' | 'eco' | 'new' | 'last-units' | 'discount' | 'verified';
  label: string;
}

export interface MediaItem {
  id: string | number;
  url: string;
  alt?: string;
  type?: 'image' | 'video';
}

export interface SwatchOption {
  name: string;
  colorCode: string;
  disabled?: boolean;
}

export interface ReviewItem {
  author: string;
  date: string;
  rating: number;
  comment: string;
  verified?: boolean;
  productVariant?: string;
}

export interface MockProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: 'cama' | 'lampara' | 'cojin' | 'repisa' | 'mural';
  categoryLabel: string;
  inStock: boolean;
  isCustomizable: boolean;
  badges: ProductBadge[];
  description?: string;
  specifications?: Record<string, string>;
  careInstructions?: string;
  media?: MediaItem[];
  colors?: SwatchOption[];
  reviews?: ReviewItem[];
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

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 101,
    name: 'Cama Montessori Roble Natura - Plaza y Media',
    slug: 'cama-montessori-roble-natura-plaza-y-media',
    price: 189990,
    originalPrice: 219990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'cama',
    categoryLabel: 'Camas Montessori',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'Madera Roble' }],
    description: 'Diseñada bajo los principios de la filosofía Montessori para fomentar la autonomía, seguridad y libertad de movimiento de tus hijos desde temprana edad. Fabricada artesanalmente en nuestro taller con madera de Roble nativo certificado, lijada meticulosamente y sellada con aceites ecológicos libres de tóxicos.',
    specifications: {
      'Dimensiones': '190 cm largo x 105 cm ancho x 35 cm alto (Plaza y media estándar chile)',
      'Material': 'Madera sólida de Roble Nativo y pino premium secado al horno',
      'Acabado': 'Barniz al agua hipoalergénico sin fragancia ni solventes (Certificación EN 71-3)',
      'Capacidad de carga': 'Hasta 120 kg (Soporta perfectamente al niño y a un adulto para la lectura nocturna)',
      'Origen': 'Fabricado 100% a mano en Chile (Taller Bílbola)'
    },
    careInstructions: 'Limpiar con un paño ligeramente húmedo y secar de inmediato. Evitar limpiadores abrasivos o químicos fuertes que puedan alterar los aceites naturales de la madera. Recomendamos revisar el apriete de pernos una vez cada 6 meses.',
    colors: [
      { name: 'Roble Natural', colorCode: '#C4A47C' },
      { name: 'Blanco Almendrado', colorCode: '#F4F1EA' },
      { name: 'Verde Menta Suave', colorCode: '#BEE9E7' },
      { name: 'Rosado Pastel', colorCode: '#F9D8D6' }
    ],
    media: [
      { id: '101-1', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', alt: 'Vista frontal Cama Montessori Roble Natura' },
      { id: '101-2', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Detalle de esquinas redondeadas y terminaciones seguras' },
      { id: '101-3', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', alt: 'Cama decorada en habitación infantil moderna' }
    ],
    reviews: [
      { author: 'Camila Sepúlveda', date: 'Hace 2 semanas', rating: 5, comment: 'La calidad del roble es espectacular. Mi hijo pasa solo del suelo a la cama y sin miedo a caerse. El envío a Santiago llegó muy bien embalado.', verified: true, productVariant: 'Roble Natural' },
      { author: 'Sebastián Valdés', date: 'Hace 1 mes', rating: 5, comment: 'Pedimos con grabado personalizado en el respaldo y quedó hermoso. Taller muy recomendable y atención de primera.', verified: true, productVariant: 'Blanco Almendrado' }
    ]
  },
  {
    id: 102,
    name: 'Lámpara de Noche Nube Mágica (LED Cálido)',
    slug: 'lampara-de-noche-nube-magica-led-calido',
    price: 34990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'lampara',
    categoryLabel: 'Lámparas y Nubes',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'bestseller', label: 'Más Vendido' }],
    description: 'Ilumina los sueños de tu bebé con un destello suave y relajante. Nuestra Lámpara Nube Mágica está tallada en madera de abedul con iluminación LED perimetral cálida (2700K) que no incomoda la vista nocturna y ayuda al descanso.',
    specifications: {
      'Dimensiones': '38 cm largo x 24 cm alto x 4 cm profundidad',
      'Tecnología de Luz': 'LED Tira flexible 5V de bajo consumo (No emite calor)',
      'Conexión': 'Cable USB con interruptor touch dimmable (incluye adaptador 220V)',
      'Material': 'Madera prensada terciada de abedul de grado infantil',
      'Consumo Eléctrico': '4W (Extremadamente eficiente)'
    },
    careInstructions: 'Desconectar de la corriente antes de limpiar. Utilizar un plumero en seco o un paño de microfibra sin líquidos sobre los componentes LED.',
    colors: [
      { name: 'Nube Blanca Mate', colorCode: '#F8F9FA' },
      { name: 'Madera Natural Abedul', colorCode: '#D8C3A5' },
      { name: 'Azul Cielo Mágico', colorCode: '#D6EAF8' }
    ],
    media: [
      { id: '102-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', alt: 'Lámpara Nube Mágica encendida en pared' },
      { id: '102-2', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', alt: 'Detalle de luz cálida indirecta y madera de abedul' }
    ],
    reviews: [
      { author: 'María José R.', date: 'Hace 3 semanas', rating: 5, comment: 'La luz regulable es perfecta para dar de mamar en la noche sin despertar al bebé completo. ¡Muy bella!', verified: true, productVariant: 'Nube Blanca Mate' }
    ]
  },
  {
    id: 103,
    name: 'Set Textil Algodón Orgánico 300 Hilos - Safari',
    slug: 'set-textil-algodon-organico-300-hilos-safari',
    price: 49990,
    originalPrice: 59990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'cojin',
    categoryLabel: 'Cojines y Textiles',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'eco', label: '100% Orgánico' }],
    description: 'Ropa de cama confeccionada en algodón 100% orgánico peruano de 300 hilos. Suavidad incomparable al tacto, hipoalergénica y transpirable para proteger la piel sensible de los más pequeños. Diseño con motivos de animales safari en tonos tierra suaves.',
    specifications: {
      'Incluye': '1 Funda de plumón (150x200 cm) + 1 Funda de almohada (50x70 cm)',
      'Composición': '100% Algodón Orgánico Certificado GOTS',
      'Hilos': '300 Hilos reales en tejido percal de alta durabilidad',
      'Tipo de cierre': 'Cierre invisible con botones de madera de coco naturales'
    },
    careInstructions: 'Lavar a máquina en ciclo suave con agua fría (máx 30°C) y detergente neutro. No usar removedores ópticos ni cloro. Secado a la sombra o en secadora a temperatura baja.',
    colors: [
      { name: 'Arena Safari', colorCode: '#E5D1B8' },
      { name: 'Menta Botánica', colorCode: '#BEE9E7' },
      { name: 'Gris Perla Suave', colorCode: '#D5D8DC' }
    ],
    media: [
      { id: '103-1', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', alt: 'Set de ropa de cama Safari en cama infantil' },
      { id: '103-2', url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', alt: 'Detalle de tejido 300 hilos algodón orgánico' }
    ],
    reviews: [
      { author: 'Valentina A.', date: 'Hace 1 mes', rating: 5, comment: 'Es ultra suave. Mi hija sufre de dermatitis y este textil le ha caído de maravillas. Vale totalmente la inversión.', verified: true, productVariant: 'Arena Safari' }
    ]
  },
  {
    id: 104,
    name: 'Estante Librero Frontal Oso Polar - Blanco Mate',
    slug: 'estante-librero-frontal-oso-polar-blanco-mate',
    price: 64990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: true,
    isCustomizable: true,
    badges: [],
    description: 'Librero frontal inspirado en el método Montessori que expone las portadas de los libros en lugar de los lomos, motivando la curiosidad y la lectura independiente infantil. Incorpora siluetas laterales en forma de osito polar friendly.',
    specifications: {
      'Dimensiones': '80 cm alto x 60 cm ancho x 30 cm profundidad (3 niveles de exposición)',
      'Material': 'MDF lacado y listones de madera de pino nativo',
      'Capacidad': 'Almacena entre 25 y 35 cuentos ilustrados infantiles',
      'Seguridad': 'Esquinas ultra redondeadas y sistema antivuelco para anclar a muro opcional'
    },
    careInstructions: 'Limpiar con un paño de microfibra seco o ligeramente humedecido. Evitar sobrecargar los estantes con objetos pesados ajenos a libros infantiles.',
    colors: [
      { name: 'Blanco Mate Oso Polar', colorCode: '#FFFFFF' },
      { name: 'Madera Roble y Blanco', colorCode: '#E5D8C5' },
      { name: 'Gris Nórdico', colorCode: '#AEB6BF' }
    ],
    media: [
      { id: '104-1', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Estante librero frontal con libros infantiles' }
    ]
  },
  {
    id: 105,
    name: 'Móvil Colgante Estrellas & Lunas Tejiendo Sueños',
    slug: 'movil-colgante-estrellas-y-lunas-tejiendo-suenos',
    price: 28990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'mural',
    categoryLabel: 'Murales y Adornos',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'new', label: 'Nuevo' }],
    description: 'Un delicado móvil colgante tejido a mano en técnica crochet con hilo de algodón 100% hipoalergénico. Sus suaves oscilaciones al paso de la brisa relajan al bebé y estimulan su desarrollo visual precoz y enfoque monocular.',
    specifications: {
      'Dimensiones': '25 cm diámetro del aro de madera x 45 cm de largo colgante',
      'Materiales': 'Hilo de algodón hipoalergénico, relleno vellón siliconado y aro de madera de haya',
      'Instalación': 'Incluye lazo superior para colgar del cielo, toldero o brazo soporte de cuna'
    },
    careInstructions: 'Limpia solo las superficies de tela con un paño húmedo. No sumergir en agua caliente para evitar que la madera de haya se deforme.',
    media: [
      { id: '105-1', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', alt: 'Móvil estrellas y lunas colgando en habitación de bebé' }
    ]
  },
  {
    id: 106,
    name: 'Alfombra de Juegos Acolchada Hipoalergénica',
    slug: 'alfombra-de-juegos-acolchada-hipoalergenica',
    price: 42990,
    originalPrice: 52990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'cojin',
    categoryLabel: 'Cojines y Textiles',
    inStock: true,
    isCustomizable: false,
    badges: [],
    description: 'El espacio perfecto y seguro para las primeras exploraciones y gateos de tu bebé. Acolchada con espuma de alta densidad (3 cm) que amortigua caídas, revestida en tela de lino-algodón suave e impermeable a derrames accidentales.',
    specifications: {
      'Dimensiones': '140 cm diámetro (Formato circular amplio)',
      'Grosor': '3 cm de espuma poliuretano de alta resistencia a la deformación',
      'Base': 'Textil antideslizante con micro-gotas de silicona adherente al piso'
    },
    careInstructions: 'Funda desmontable con cierre oculto perimetral. Lavable en lavadora ciclo suave con agua fría. No aplicar blanqueadores.',
    colors: [
      { name: 'Menta Pastel', colorCode: '#BEE9E7' },
      { name: 'Beige Arena', colorCode: '#EDE0D4' },
      { name: 'Rosa Polvo', colorCode: '#E8C5C8' }
    ],
    media: [
      { id: '106-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', alt: 'Alfombra acolchada circular en suelo infantil' }
    ]
  },
  {
    id: 107,
    name: 'Baúl Organizador Juguetero sobre Ruedas',
    slug: 'baul-organizador-juguetero-sobre-ruedas',
    price: 55990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: false,
    isCustomizable: false,
    badges: [],
    description: 'Enseñar el orden puede ser un juego divertido. Este robusto baúl de madera sobre ruedas giratorias 360° permite que el niño mueva sus propios juguetes por la casa sin rayar pisos florantes y aprenda la rutina de guardar al finalizar.',
    specifications: {
      'Dimensiones': '55 cm ancho x 38 cm fondo x 40 cm alto (con ruedas instaladas)',
      'Ruedas': '4 Ruedas de goma blanda no marcantes (2 con freno de seguridad)',
      'Material': 'Madera de pino insuperable calidad sellada en barnices naturales'
    },
    media: [
      { id: '107-1', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', alt: 'Baúl juguetero de madera sobre ruedas' }
    ]
  },
  {
    id: 108,
    name: 'Espejo Montessori Seguro Irrompible con Barra',
    slug: 'espejo-montessori-seguro-irrompible-con-barra',
    price: 79990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'mural',
    categoryLabel: 'Murales y Adornos',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'A Medida' }],
    description: 'Un elemento esencial del método Montessori. Permite que el bebé reconozca su reflejo y movimientos corporales en sus primeros meses. A medida que intenta ponerse en pie, la barra de madera pulida le brinda el soporte seguro y autónomo que necesita.',
    specifications: {
      'Dimensiones': '100 cm largo x 65 cm alto (Se instala en horizontal o vertical según crecimiento)',
      'Superficie Reflectante': 'Espejo acrílico de seguridad infantil 100% irrompible de alto brillo',
      'Barra de apoyo': 'Madera de haya maciza de 28 mm de diámetro regulable en 2 alturas',
      'Anclaje': 'Incluye tarugos de seguridad y soportes metálicos ocultos para muro de concreto o tabique'
    },
    careInstructions: 'Para limpiar el acrílico reflectante, usar EXCLUSIVAMENTE paño de microfibra muy suave ligeramente húmedo con agua o limpiador de cristales neutro. No usar papel toalla ni telas ásperas para evitar rayar la superficie acrílica.',
    colors: [
      { name: 'Madera Roble Claro', colorCode: '#D5B895' },
      { name: 'Blanco Nórdico', colorCode: '#F8F9FA' }
    ],
    media: [
      { id: '108-1', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Espejo Montessori con barra en muro' }
    ],
    reviews: [
      { author: 'Catalina M.', date: 'Hace 2 meses', rating: 5, comment: 'Es impresionante lo mucho que mi bebé de 7 meses juega frente a su espejo. Muy tranquilo saber que el cristal es irrompible.', verified: true, productVariant: 'Madera Roble Claro' }
    ]
  },
  {
    id: 109,
    name: 'Cama Casita de Ensueño con Toldo de Lino - Dos Plazas',
    slug: 'cama-casita-de-ensueno-con-toldo-de-lino-dos-plazas',
    price: 249990,
    originalPrice: 279990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'cama',
    categoryLabel: 'Camas Montessori',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'bestseller', label: 'Destacado' }, { type: 'customizable', label: 'Color a elección' }],
    description: 'La cama soñada de todo niño. Su estructura en forma de casita convierte la hora de dormir en una mágica aventura campestre en la seguridad del hogar. Incluye toldo superior de lino puro transpirable lavable que atenúa la luz externa.',
    specifications: {
      'Dimensiones': '190 cm largo x 150 cm ancho x 165 cm alto en cúspide',
      'Estructura': 'Vigas sólidas de pino oregón y roble chileno ensambladas sin tornillos expuestos',
      'Textil Toldo': '100% Lino europeo lavable con amarres decorativos de algodón'
    },
    careInstructions: 'El toldo de lino debe lavarse a mano o en ciclo suave sin centrifugado fuerte a 30°C. La madera se mantiene impecable con paño seco o aceite de linaza natural una vez al año.',
    colors: [
      { name: 'Natural Madera & Toldo Beige', colorCode: '#C8AD8D' },
      { name: 'Blanco Mágico & Toldo Blanco', colorCode: '#FAF9F6' },
      { name: 'Menta & Toldo Arena', colorCode: '#BCE2E0' }
    ],
    media: [
      { id: '109-1', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Cama casita de ensueño con toldo' }
    ]
  },
  {
    id: 110,
    name: 'Lámpara Colgante Globo Aerostático Vintage',
    slug: 'lampara-colgante-globo-aerostatico-vintage',
    price: 38990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'lampara',
    categoryLabel: 'Lámparas y Nubes',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'new', label: 'Recién llegado' }],
    description: 'Un viaje por los aires en el centro del dormitorio. Lámpara de cielo en forma de globo aerostático tradicional con canastillo de mimbre real tejido por artesanos chilenos y globo de tela estampada con certificación retardante a temperatura.',
    specifications: {
      'Dimensiones': '45 cm alto total x 30 cm diámetro de globo',
      'Casquillo': 'Rosca estándar E27 (Incluye ampolleta LED 7W cálida de regalo)',
      'Cable y Florón': 'Cable textil trenzado color blanco (1.5 metros regulable en altura) con florón de techo a juego'
    },
    careInstructions: 'Asegúrese de apagar el interruptor de pared antes de reemplazar la ampolleta. Limpiar el canastillo de mimbre con un pincel seco para retirar el polvo.',
    media: [
      { id: '110-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', alt: 'Lámpara globo aerostático colgando del cielo' }
    ]
  },
  {
    id: 111,
    name: 'Cojín Nube de Terciopelo Ultra Suave - Pastel',
    slug: 'cojin-nube-de-terciopelo-ultra-suave-pastel',
    price: 18990,
    originalPrice: 22990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'cojin',
    categoryLabel: 'Cojines y Textiles',
    inStock: true,
    isCustomizable: false,
    badges: [],
    description: 'El complemento decorativo indiscutible de cualquier cama o sillón de lactancia. Suave como una nube verdadera, fabricado en terciopelo de algodón ecológico y relleno con vellón premium hipoalergénico que no se deforma tras el lavado.',
    specifications: {
      'Dimensiones': '48 cm ancho x 32 cm alto x 12 cm espesor',
      'Material Exterior': 'Terciopelo velour 80% algodón / 20% fibra reciclada suave',
      'Relleno': 'Nube de vellón siliconado hipoalergénico de retorno rápido'
    },
    careInstructions: 'Lavar en lavadora en bolsa para prendas delicadas con agua fría. Secar al aire libre en posición horizontal para mantener su redondez impecable.',
    colors: [
      { name: 'Rosado Nube Pastel', colorCode: '#FADBD8' },
      { name: 'Menta Dulce', colorCode: '#D4EFDF' },
      { name: 'Amarillo Vainilla', colorCode: '#FCF3CF' },
      { name: 'Celeste Mágico', colorCode: '#E8F8F5' }
    ],
    media: [
      { id: '111-1', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', alt: 'Cojín nube sobre sillón de lactancia' }
    ]
  },
  {
    id: 112,
    name: 'Repisa Flotante Nube de Madera Abedul (Set de 3)',
    slug: 'repisa-flotante-nube-de-madera-abedul-set-de-3',
    price: 32990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'Madera Abedul' }],
    description: 'Decora las paredes y aprovecha el espacio vertical con este set de tres repisas flotantes con respaldo en forma de nubecita. Perfectas para exhibir pequeños muñecos de apego, portaretratos o tesoros infantiles.',
    specifications: {
      'Set incluye': '1 Repisa grande (50 cm) + 2 Repisas pequeñas (30 cm)',
      'Material': 'Terciado de abedul pulido a mano y sellado con cera de abejas',
      'Capacidad por repisa': 'Soporta hasta 4 kg con anclajes adecuados a muro'
    },
    careInstructions: 'Usar paño seco. Renovar la cera protectora de abejas una vez al año para avivar la veta natural y aroma del abedul.',
    colors: [
      { name: 'Madera Abedul Natural', colorCode: '#DDC49A' },
      { name: 'Blanco Nube Lacado', colorCode: '#FAFAFA' }
    ],
    media: [
      { id: '112-1', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', alt: 'Set de 3 repisas nube en pared' }
    ]
  },
  {
    id: 113,
    name: 'Mural Adhesivo Bosque Encantado Acuarela',
    slug: 'mural-adhesivo-bosque-encantado-acuarela',
    price: 45990,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    category: 'mural',
    categoryLabel: 'Murales y Adornos',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'eco', label: 'Tintas Eco' }],
    description: 'Transfiere la magia de un cuento ilustrado en acuarela directamente a la pared principal de tu hijo. Nuestro papel tapiz autoadhesivo se imprime con tintas de látex en base al agua 100% ecológicas, inodoras y libres de compuestos volátiles orgánicos (VOC).',
    specifications: {
      'Dimensiones': 'Rollo estándar de 280 cm de alto x 150 cm de ancho (Se puede encargar a la medida exacta de tu muro)',
      'Material': 'Vinilo textil autoadhesivo de fácil reposicionamiento (Peel & Stick)',
      'Certificación': 'GREENGUARD Gold (Apto y certificado para clínicas de neonatos y dormitorios)'
    },
    careInstructions: 'Es totalmente lavable con paño húmedo y jabón neutro. En caso de mudarse o cambiar de decoración, se remueve limpiamente sin arrancar la pintura base (en muros bien imprimados).',
    media: [
      { id: '113-1', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', alt: 'Mural bosque encantado en habitación' }
    ]
  },
  {
    id: 114,
    name: 'Cama Nido Convertible Juvenil Roble & Blanco',
    slug: 'cama-nido-convertible-juvenil-roble-y-blanco',
    price: 219990,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    category: 'cama',
    categoryLabel: 'Camas Montessori',
    inStock: true,
    isCustomizable: true,
    badges: [{ type: 'customizable', label: 'Modular' }],
    description: 'La solución inteligente para ahorrar espacio en dormitorios compartidos o para alojar a primitos y amigos en pijamadas increíbles. Cama superior con barandillas de protección removibles y cama inferior con ruedas oculta bajo la principal.',
    specifications: {
      'Dimensiones': '200 cm largo x 105 cm ancho (Ambas camas usan colchón 1 plaza estándar)',
      'Material': 'Estructura mixta en Roble sólido y cabeceras en MDF lacado color blanco mate',
      'Herrajes': 'Ruedas de alta carga con rocas de goma que deslizan suavemente con una sola mano'
    },
    careInstructions: 'Evitar saltos bruscos sobre el somier inferior abierto. Limpieza habitual de muebles de madera lacados.',
    colors: [
      { name: 'Roble & Blanco Mate', colorCode: '#E5DFD7' },
      { name: 'Roble & Menta Suave', colorCode: '#C7ECEE' }
    ],
    media: [
      { id: '114-1', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', alt: 'Cama nido juvenil con cama inferior desplegada' }
    ]
  },
  {
    id: 115,
    name: 'Guirnalda Luz de Hadas LED Bola de Algodón',
    slug: 'guirnalda-luz-de-hadas-led-bola-de-algodon',
    price: 15990,
    originalPrice: 19990,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    category: 'lampara',
    categoryLabel: 'Lámparas y Nubes',
    inStock: true,
    isCustomizable: false,
    badges: [],
    description: 'Guirnalda decorativa compuesta por 20 bolitas hechas a mano en hilo de algodón endurecido natural. Cuando se encienden en la oscuridad, proyectan sombras cálidas y relajantes ideales para ambientar doseles, espejos o estantes.',
    specifications: {
      'Largo': '3 metros de longitud con 20 esferas de algodón de 6 cm de diámetro',
      'Alimentación': 'Funciona con 3 pilas AA (o modelo con conector USB portátil)'
    },
    media: [
      { id: '115-1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', alt: 'Guirnalda de luz de algodón sobre respaldo de cama' }
    ]
  },
  {
    id: 116,
    name: 'Mesa de Noche Infantil Nordica con Cajón Cerradura Suave',
    slug: 'mesa-de-noche-infantil-nordica-con-cajon-cerradura-suave',
    price: 58990,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'repisa',
    categoryLabel: 'Repisas de Madera',
    inStock: true,
    isCustomizable: false,
    badges: [{ type: 'new', label: 'Nuevo' }],
    description: 'El compañero perfecto al lado de la cama. Un velador de estilo nórdico infantil con esquinas completamente redondeadas, patas inclinadas en madera de haya nativa y un cajón con rieles telescópicos con sistema de cierre suave anti-atrapamiento de deditos.',
    specifications: {
      'Dimensiones': '45 cm ancho x 35 cm profundidad x 50 cm alto',
      'Cajón': 'Sistema Soft-Close alemán de alta resistencia y seguridad infantil'
    },
    media: [
      { id: '116-1', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', alt: 'Mesa de noche infantil estilo nórdico' }
    ]
  }
];

export function getProductBySlug(slugOrId: string | number): MockProduct | undefined {
  const str = String(slugOrId).toLowerCase().trim();
  return MOCK_PRODUCTS.find(p => p.slug === str || String(p.id) === str || slugify(p.name) === str);
}

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
