
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { catalogueItems } from '../data/catalogues'
import { tileLooks } from '../data/tileData'
import './CataloguesPage.css'

const filters = [
  { id: 'all', label: 'All Catalogues' },
  { id: '1200x1800', label: '1200 × 1800 mm' },
  { id: '800x1600', label: '800 × 1600 mm' },
  { id: '300x600', label: '300 × 600 mm' },
  { id: '300x450', label: '300 × 450 mm' },
  { id: '600-full-body', label: '600 × 1200 / 600 × 600 · Full Body' },
  { id: '200x1200', label: '200 × 1200 mm' },
  { id: '600x1200', label: '600 × 1200 mm' },
  { id: 'step-riser', label: 'Step & riser formats' },
  { id: '600x600', label: '600 × 600 mm' },
  { id: '800x800', label: '800 × 800 mm' },
  { id: 'brochure', label: 'Special brochures' },
]

const formatShowcase = [
  { id: '1200x1800', size: '1200 × 1800 mm', name: 'Large-format porcelain', image: '/images/ventozza/catalogue-art/size-1200x1800.webp', texture: '/images/ventozza/ivory-marble-texture-enhanced.png', finish: 'Marble look · polished' },
  { id: '800x1600', size: '800 × 1600 mm', name: 'Statement surfaces', image: '/images/ventozza/catalogue-art/size-800x1600.webp', texture: '/images/ventozza/cream-marble-texture.png', finish: 'Stone look · matt' },
  { id: '800x800', size: '800 × 800 mm', name: 'Square format porcelain', image: '/images/ventozza/catalogue-art/size-800x800.webp', texture: '/images/ventozza/ivory-marble-texture-enhanced.png', finish: 'Marble look · polished' },
  { id: '600-full-body', size: '600 × 1200 & 600 × 600 mm', name: 'Full Body porcelain', image: '/images/ventozza/catalogue-art/size-600x1200.webp', texture: '/images/ventozza/silver-marble-slab.png', finish: 'Full body · polished / matt' },
  { id: '600x1200', size: '600 × 1200 mm', name: 'Large-format porcelain', image: '/images/ventozza/catalogue-art/size-600x1200.webp', texture: '/images/ventozza/ivory-marble-texture-enhanced.png', finish: 'Marble look · polished' },
  { id: '600x600', size: '600 × 600 mm', name: 'Square format porcelain', image: '/images/ventozza/catalogue-art/size-600x600.webp', texture: '/images/ventozza/cream-marble-texture.png', finish: 'Full body · glossy / matt' },
  { id: '300x600', size: '300 × 600 mm', name: 'Decorative wall tile', image: '/images/ventozza/catalogue-art/size-300x600.webp', texture: '/images/ventozza/catalogue-art/product-kitchen-collection.webp', finish: 'Decorative · glossy' },
  { id: '300x450', size: '300 × 450 mm', name: 'Decorative wall tile', image: '/images/ventozza/catalogue-art/size-300x450.webp', texture: '/images/ventozza/catalogue-art/product-fish-flower.webp', finish: 'Patterned · glossy' },
  { id: '200x1200', size: '200 × 1200 mm', name: 'Wood-look plank', image: '/images/ventozza/catalogue-art/size-200x1200.webp', texture: '/images/ventozza/catalogue-art/showroom-look-rustic.webp', finish: 'Wood look · natural' },
  { id: 'step-riser', size: 'Step & riser formats', name: 'Full Body step solutions', image: '/images/ventozza/catalogue-art/size-step-riser.webp', texture: '/images/ventozza/catalogue-art/size-step-riser.webp', finish: 'Step · riser · full body' },
]

type Props = {
  onEnquire: (interest: string) => void
  initialFormat?: string | null
}

export default function CataloguesPage({
  onEnquire,
  initialFormat,
}: Props) {
  const [activeFormat, setActiveFormat] = useState('all')
  const [query, setQuery] = useState('')
  const [viewingItemId, setViewingItemId] = useState<string | null>(null)
  const [failedCovers, setFailedCovers] = useState<string[]>([])

  const viewingItem =
    catalogueItems.find((item) => item.id === viewingItemId) ?? null

  useEffect(() => {
    setActiveFormat(initialFormat || 'all')
  }, [initialFormat])

  const shownCatalogues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return catalogueItems.filter((item) => {
      const matchesFormat =
        activeFormat === 'all' ||
        item.group === activeFormat ||
        (activeFormat === '600x1200' &&
          item.size.includes('600 × 1200')) ||
        (activeFormat === 'step-riser' &&
          /step|riser/i.test(`${item.fileName} ${item.title}`))

      const matchesQuery =
        !normalizedQuery ||
        `${item.title} ${item.fileName} ${item.size}`
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesFormat && matchesQuery
    })
  }, [activeFormat, query])

  useEffect(() => {
    if (!viewingItem) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setViewingItemId(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [viewingItem])

  return (
    <div className="catalogues-page">
      <header className="catalogues-page-heading">
        <span className="eyebrow">
          <i /> OUR SPECIALTIES
        </span>

        <h3>
          Sizes &amp; Finishes We Specialize In
        </h3>

        <p>
          Project-ready formats for residential and commercial spaces.
        </p>
      </header>

      <div className="catalogue-format-explorer">
        <aside className="catalogues-sidebar" aria-label="Catalogue categories">
          <div className="catalogues-sidebar-title">
            TILE SIZES · MM
          </div>

          <nav className="catalogue-category-list">
            {filters.filter((filter) => filter.id !== 'brochure').map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={
                  activeFormat === filter.id
                    ? 'catalogue-category active'
                    : 'catalogue-category'
                }
                onClick={() => setActiveFormat(filter.id)}
              >
                <span>{filter.label}</span>
                <span className="catalogue-category-arrow" aria-hidden="true">
                  ›
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="catalogue-content-column">
        <section className="catalogue-format-stage" aria-label="Selected tile format">
          {(() => {
            const selectedFormat = formatShowcase.find((format) => format.id === activeFormat) ?? formatShowcase[0]
            const featuredCatalogue = shownCatalogues[0] ?? catalogueItems.find((item) => item.group === selectedFormat.id)
            return <>
              <div className="catalogue-format-scene" key={selectedFormat.id}>
                <img src={selectedFormat.image} alt="" />
                <div className="catalogue-format-slab" style={{ backgroundImage: `url("${selectedFormat.texture}")` }} role="img" aria-label={`${selectedFormat.size} tile surface sample`}>
                  <span>{selectedFormat.size.replace(' mm', '')}</span>
                </div>
                <div className="catalogue-format-scene-note">VENTOZZA · SURFACE STUDY</div>
              </div>
              <div className="catalogue-format-details">
                <span className="eyebrow"><i /> FORMAT {String(Math.max(1, formatShowcase.findIndex((format) => format.id === selectedFormat.id) + 1)).padStart(2, '0')} · {selectedFormat.name.toUpperCase()}</span>
                <h4>{selectedFormat.size}</h4>
                <p>{selectedFormat.finish}. Explore the format in the catalogue and compare designs for your project.</p>
                <div className="catalogue-finish-swatches" aria-label="Available finish references">
                  {tileLooks.slice(0, 3).map((finish) => <span key={finish.name}><img src={finish.image} alt=""/><small>{finish.name}</small></span>)}
                </div>
                <div className="catalogue-feature-actions">
                  {featuredCatalogue ? <>
                    <button type="button" onClick={() => setViewingItemId(featuredCatalogue.id)}>EXPLORE THE CATALOGUE <span aria-hidden="true">↗</span></button>
                    <a href={featuredCatalogue.pdfUrl} download={featuredCatalogue.fileName}>DOWNLOAD PDF</a>
                  </> : <span className="catalogue-format-unavailable">Ask our team about this format.</span>}
                </div>
                <small className="catalogue-format-count">{shownCatalogues.length} {shownCatalogues.length === 1 ? 'catalogue' : 'catalogues'} available in this selection</small>
              </div>
            </>
          })()}
        </section>
      <section className="catalogues-library" aria-label="Catalogue library">
        <div className="catalogues-library-heading">
          <div><span className="eyebrow"><i /> DIGITAL CATALOGUE LIBRARY</span><h4>Browse the collection.</h4></div>
          <label className="catalogue-search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search catalogues" aria-label="Search catalogues" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
          </label>
        </div>
        <div className="catalogues-results-count">{shownCatalogues.length} {shownCatalogues.length === 1 ? 'CATALOGUE' : 'CATALOGUES'}</div>

          {shownCatalogues.length ? (
            <div className="catalogues-grid">
              {shownCatalogues.map((item, index) => (
                <article className="catalogue-tile-card" key={item.id}>
                  <a
                    className="catalogue-image"
                    href="#catalogue-viewer"
                    onClick={(event) => {
                      event.preventDefault()
                      setViewingItemId(item.id)
                    }}
                    aria-label={`View ${item.title}`}
                  >
                    <span className="catalogue-corner" aria-hidden="true" />

                    {failedCovers.includes(item.id) ? (
                      <div
                        className="catalogue-cover-fallback"
                        role="img"
                        aria-label={`${item.title} cover unavailable`}
                      >
                        <span>VENTOZZA</span>
                        <strong>{item.title}</strong>
                        <small>{item.size}</small>
                      </div>
                    ) : (
                      <img
                        src={item.cover}
                        alt={`${item.title} cover`}
                        title={item.fileName}
                        loading={index < 6 ? 'eager' : 'lazy'}
                        onError={() =>
                          setFailedCovers((previous) =>
                            previous.includes(item.id)
                              ? previous
                              : [...previous, item.id],
                          )
                        }
                      />
                    )}
                  </a>

                  <div className="catalogue-card-copy">
                    <h4 title={item.fileName}>{item.title}</h4>
                    <p>{item.size}</p>

                    <div className="catalogue-card-actions">
                      <button
                        className="catalogue-pdf-action"
                        type="button"
                        onClick={() => setViewingItemId(item.id)}
                      >
                        <span>VIEW</span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>

                      <a
                        className="catalogue-pdf-action"
                        href={item.pdfUrl}
                        download={item.fileName}
                      >
                        <span>DOWNLOAD</span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v4h16v-4" />
                        </svg>
                      </a>
                    </div>

                    <button
                      className="catalogue-request-link"
                      type="button"
                      onClick={() =>
                        onEnquire(`Catalogue request: ${item.fileName}`)
                      }
                    >
                      REQUEST A COPY
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalogues-empty">
              <b>No catalogues found</b>
              <p>Try another catalogue name or select a different size.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveFormat('all')
                }}
              >
                Show all catalogues
              </button>
            </div>
          )}
      </section>
        </div>
      </div>

      {viewingItem &&
        createPortal(
          <div
            className="catalogue-viewer-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setViewingItemId(null)
              }
            }}
          >
            <section
              className="catalogue-viewer"
              id="catalogue-viewer"
              role="dialog"
              aria-modal="true"
              aria-label={`Viewing ${viewingItem.title}`}
            >
              <header className="catalogue-viewer-header">
                <div>
                  <span>VENTOZZA · CATALOGUE VIEWER</span>
                  <h4>{viewingItem.title}</h4>
                </div>

                <div className="catalogue-viewer-actions">
                  <a
                    href={viewingItem.pdfUrl}
                    download={viewingItem.fileName}
                  >
                    DOWNLOAD PDF <span aria-hidden="true">↓</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setViewingItemId(null)}
                    aria-label="Close catalogue viewer"
                  >
                    ×
                  </button>
                </div>
              </header>

              <iframe
                src={`${viewingItem.pdfUrl}#toolbar=1&navpanes=0`}
                title={viewingItem.title}
              />
            </section>
          </div>,
          document.body,
        )}

      <aside className="catalogues-note">
        <span aria-hidden="true">✳︎</span>
        <p>
          <b>Need help choosing?</b> Tell us your room, preferred finish or
          tile size and our team can help you find the right brochure.
        </p>

        <button
          type="button"
          onClick={() => onEnquire('Help choosing a tile catalogue')}
        >
          ASK OUR TILE TEAM <span aria-hidden="true">→</span>
        </button>
      </aside>
    </div>
  )
}
