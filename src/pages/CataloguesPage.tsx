
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { catalogueItems } from '../data/catalogues'
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
          <i /> VENTOZZA · DIGITAL CATALOGUE LIBRARY
        </span>

        <h3>
          View and Download Our
          <br />
          Catalogues
        </h3>

        <p>
          Explore our tile collections by size, finish and application.
          View a catalogue here or download its PDF directly from the site.
        </p>
      </header>

      <div className="catalogues-browser">
        <aside className="catalogues-sidebar" aria-label="Catalogue categories">
          <div className="catalogues-sidebar-title">
            BROWSE CATALOGUES
          </div>

          <nav className="catalogue-category-list">
            {filters.map((filter) => (
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

        <section
          className="catalogues-results"
          aria-label="Available catalogues"
        >
          <div className="catalogues-toolbar">
            <div className="catalogues-results-count">
              {shownCatalogues.length}{' '}
              {shownCatalogues.length === 1 ? 'CATALOGUE' : 'CATALOGUES'}
            </div>

            <label className="catalogue-search">
              <span aria-hidden="true">⌕</span>

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search catalogues"
                aria-label="Search catalogues"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
          </div>

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
