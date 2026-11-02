import './ProductSizesSection.css'

const artwork = '/images/ventozza/about-reference/product-sizes-editorial.png'
const scenes = [
  { title: 'Kitchen', image: '/images/ventozza-kitchen-upload.png', view: 'look-feel' },
  { title: 'Living', image: '/images/ventozza-marble-living-room.png', view: 'look-feel' },
  { title: 'Bathroom', image: '/images/ventozza-statement-marble-bathroom.png', view: 'look-feel' },
  { title: 'Planks', image: '/images/ventozza/wooden-planks/balsa-wood-200x1200.png', view: 'size' },
  { title: 'Bedroom', image: '/images/ventozza-brown-marble-bedroom.png', view: 'look-feel' },
  { title: 'Wall tiles', image: '/images/ventozza/glossy-botanical/gold-leaf-7043-300x450.png', view: 'look-feel' },
] as const

// SVG viewports retain the reference photography without stretching or raster edits.
function EditorialImage({ crop, label }: { crop: string; label: string }) {
  return <svg viewBox={crop} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
    <image href={artwork} width="1024" height="1536" />
  </svg>
}

export default function ProductSizesSection({ onTiles }: { onTiles: (view: 'look-feel' | 'size') => void }) {
  return <section className="product-sizes-editorial" aria-labelledby="product-sizes-title">
    <div className="product-sizes-inner">
      <div className="product-sizes-materials">
        <EditorialImage crop="0 0 430 1450" label="Vertical display of blue onyx, white marble, emerald, terrazzo and plank tile formats" />
      </div>
      <div className="product-sizes-content">
        <header><span>Our</span><h2 id="product-sizes-title">PRODUCT SIZES</h2></header>
        <div className="product-sizes-scenes">
          {scenes.map(scene => <button key={scene.title} type="button" onClick={() => onTiles(scene.view)} aria-label={`Explore ${scene.title.toLowerCase()} tiles`}>
            <img src={scene.image} alt={`${scene.title} interior featuring ceramic tile surfaces`} loading="lazy" decoding="async" />
            <span className="product-sizes-caption">{scene.title}</span>
          </button>)}
        </div>
        <button className="product-sizes-link" type="button" onClick={() => onTiles('size')}>EXPLORE ALL FORMATS <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </section>
}
