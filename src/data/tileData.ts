export type CatalogueFormat = { label: string; area: number }

// These formats come from the 64 supplied catalogue PDFs. Special brochures
// remain available in the catalogue library even where they do not state one
// single tile size.
export const catalogueSizeLabels = [
  '1200 × 1800',
  '800 × 1600',
  '800 × 800',
  '600 × 1200',
  '600 × 600',
  '300 × 600',
  '300 × 450',
  '200 × 1200',
  '600 × 1200 & 600 Full-Body',
  'Step & riser formats',
]

export const products = [
  { name: 'PGVT Random', code: 'GLOSSY SERIES · DIGITAL WALL TILES', size: '300 × 450 MM', finish: 'Patterned · glossy', image: '/images/ventozza/catalogue-art/product-fish-flower.webp', alt: 'Fish and flower inspired decorative tile design from the 300 by 450 catalogue' },
  { name: 'Kitchen 2', code: 'GLOSSY SERIES · KITCHEN WALL TILES', size: '300 × 450 MM', finish: 'Warm · decorative', image: '/images/ventozza/catalogue-art/product-kitchen-collection.webp', alt: 'Warm patterned kitchen wall tile design from the catalogue' },
  { name: 'Golden', code: 'GLOSSY SERIES · MARBLE LOOK', size: '300 × 450 MM', finish: 'Marble look · glossy', image: '/images/ventozza/catalogue-art/product-golden-marble.webp', alt: 'Golden marble look tile from the glossy catalogue range' },
  { name: 'Honeycomb', code: 'GLOSSY SERIES · DECOR TILES', size: '300 × 450 MM', finish: 'Botanical · geometric', image: '/images/ventozza/catalogue-art/product-honeycomb.webp', alt: 'Botanical honeycomb tile pattern shown in the catalogue' },
]

export const sizes = catalogueSizeLabels.map((size, index) => ({ size, label: 'Format shown in the supplied catalogue library', number: String(index + 1).padStart(2, '0') }))

export const tileViews = [
  { id: 'overview', label: 'All tiles' },
  { id: 'size', label: 'By size' },
  { id: 'look-feel', label: 'Look & feel' },
  // Temporarily disabled site-wide: By location and Collections.
  { id: 'catalogues', label: 'Catalogues' },
] as const
export type TileView = typeof tileViews[number]['id'] | 'visualizer' | 'calculator' // Virtual space creator is temporarily disabled site-wide.
export type Page = 'home' | 'products' | 'about' | 'certificates' | 'contact'

export const tileSizeOptions = [
  { name: 'Large format', dimensions: '1200 × 1800 mm', note: 'Large-format catalogue', image: '/images/ventozza/catalogue-art/size-1200x1800.webp' },
  { name: 'Large format', dimensions: '800 × 1600 mm', note: 'Glossy and carving ranges', image: '/images/ventozza/catalogue-art/size-800x1600.webp' },
  { name: 'Full Body', dimensions: '600 × 1200 mm', note: 'Full Body catalogue range', image: '/images/ventozza/catalogue-art/size-600x1200.webp' },
  { name: 'Square format', dimensions: '800 × 800 mm', note: 'Double charge catalogue', image: '/images/ventozza/catalogue-art/size-800x800.webp' },
  { name: 'Square format', dimensions: '600 × 600 mm', note: 'Full Body and 600 × 600 catalogues', image: '/images/ventozza/catalogue-art/size-600x600.webp' },
  { name: 'Wall tile', dimensions: '300 × 600 mm', note: 'Satin Matt and Glossy ranges', image: '/images/ventozza/catalogue-art/size-300x600.webp' },
  { name: 'Wall tile', dimensions: '300 × 450 mm', note: 'Glossy, Kitchen and decorative ranges', image: '/images/ventozza/catalogue-art/size-300x450.webp' },
  { name: 'Wood plank', dimensions: '200 × 1200 mm', note: 'GVT wood plank brochures', image: '/images/ventozza/catalogue-art/size-200x1200.webp' },
  { name: 'Wood plank', dimensions: '150 × 900 mm', note: 'Also listed in the 20 × 120 cm and 15 × 90 cm brochure', image: '/images/ventozza/catalogue-art/size-15x90cm.webp' },
  { name: 'Full Body', dimensions: '600 × 1200 × 600 mm', note: 'See the dedicated step-riser brochure for application details', image: '/images/ventozza/catalogue-art/size-step-riser.webp' },
]

export const catalogues = [
  { title: 'The VENTOZZA Tile Collection', description: 'Explore tile looks and finishes for walls and floors.' },
  { title: 'Tile Sizes & Formats', description: 'Browse the formats listed across the supplied VENTOZZA catalogue library.' },
  { title: 'Care & Installation Guide', description: 'Ask our team for product care and installation guidance.' },
]

export const tileLooks = [
  { name: 'Glossy', note: 'A polished surface with a clear, reflective sheen.', image: '/images/ventozza/catalogue-art/finish-glossy.webp', finish: 'Polished sheen' },
  { name: 'Matte', note: 'A low-sheen look for a quieter, softer appearance.', image: '/images/ventozza/catalogue-art/finish-matte.webp', finish: 'Low sheen' },
  { name: 'Rustic', note: 'A textured, natural-looking character with visual depth.', image: '/images/ventozza/catalogue-art/finish-rustic.webp', finish: 'Textured character' },
  { name: 'Carving', note: 'A sculpted surface that brings detail into the design.', image: '/images/ventozza/catalogue-art/finish-carving.webp', finish: 'Sculpted detail' },
]

// Separate source images keep the showroom scene and its tile overlays distinct
// from the E-catalogue product cards and finish gallery.
export const visualizerRooms = [
  { name: 'Living room', image: '/images/ventozza/marble-living-room.png' },
  { name: 'Kitchen', image: '/images/ventozza/kitchen-showroom-enhanced.png' },
  { name: 'Bathroom', image: '/images/ventozza/catalogue-art/showroom-room-bathroom.webp' },
]

export const visualizerLooks = [
  { name: 'Ivory marble', image: '/images/ventozza/cream-marble-texture.png', thumbnail: '/images/ventozza/catalogue-art/showroom-look-matte.webp' },
  { name: 'Silver stone', image: '/images/ventozza/silver-marble-slab.png', thumbnail: '/images/ventozza/catalogue-art/showroom-look-glossy.webp' },
  { name: 'Patterned ceramic', image: '/images/ventozza/entryway-patterned-floor.png', thumbnail: '/images/ventozza/catalogue-art/showroom-look-pattern.webp' },
  { name: 'Mixed stone', image: '/images/ventozza/tile-assortment-closeup.png', thumbnail: '/images/ventozza/catalogue-art/showroom-look-rustic.webp' },
]

export const tileFormats: CatalogueFormat[] = [
  { label: '1200 × 1800 mm', area: 2.16 },
  { label: '800 × 1600 mm', area: 1.28 },
  { label: '800 × 800 mm', area: 0.64 },
  { label: '600 × 1200 mm', area: 0.72 },
  { label: '600 × 600 mm', area: 0.36 },
  { label: '300 × 600 mm', area: 0.18 },
  { label: '300 × 450 mm', area: 0.135 },
  { label: '200 × 1200 mm', area: 0.24 },
  { label: '150 × 900 mm', area: 0.135 },
]

export const company = {
  website: 'https://www.ventozzasurfaces.com',
  contactName: 'H. Narayana Rao',
  role: 'Vice President – Sales & Marketing',
  email: 'sales@ventozzasurfaces.com',
  registeredOffice: ['10-3-71/3/A, 3rd Floor,', 'Teachers Colony, East Marredpally,', 'Secunderabad – 500026,', 'Telangana, India'],
  corporateOffice: ['Siromani 142, Ground Floor,', 'G-15, Near Eden Ceramic,', 'NH-8A, Lalpar, Morbi-2,', 'Gujarat, India'],
}
