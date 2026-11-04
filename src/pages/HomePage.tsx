import { useEffect, useRef, useState, type ReactNode } from 'react'
import './HomePage.css'
import ProductSizesSection from './ProductSizesSection'
import { ventozzaEdit as editCollections } from '../data/ventozzaEdit'
import { findYourFitContent } from '../data/homepageContent'

type Slide = { eyebrow: string; title: ReactNode; body: string; image: string; alt: string; note: string }
type Props = { slide: Slide; activeSlide: number; slideCount: number; onMoveSlide: (step: number) => void; onSelectSlide: (index: number) => void; onHeroInteraction: () => void; onNavigate: (page: 'about' | 'contact') => void; onTiles: (view: 'overview' | 'look-feel' | 'size' | 'visualizer') => void; onCatalogueSize: (format: string) => void }
const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗︎' : '→'}</span>


export default function HomePage({ slide, activeSlide, slideCount, onMoveSlide, onSelectSlide, onHeroInteraction, onNavigate, onTiles, onCatalogueSize }: Props) {
  const heroPointer = useRef<{ id: number; x: number; y: number } | null>(null)
  const editTrack = useRef<HTMLDivElement>(null)
  const [activeEdit, setActiveEdit] = useState(0)
  const [editHovered, setEditHovered] = useState(false)
  const [editFocused, setEditFocused] = useState(false)
  const showEdit = (index: number) => {
    const track = editTrack.current
    const card = track?.querySelectorAll<HTMLElement>('.home-edit-card')[index]
    if (!track || !card) return
    track.scrollTo({ left: track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left - (track.clientWidth - card.offsetWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  const moveEdit = (direction: number) => {
    showEdit((activeEdit + direction + editCollections.length) % editCollections.length)
  }
  useEffect(() => {
    if (editHovered || editFocused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      if (!document.hidden) showEdit((activeEdit + 1) % editCollections.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [activeEdit, editHovered, editFocused])
  useEffect(() => {
    const track = editTrack.current
    const centerCard = track?.querySelectorAll<HTMLElement>('.home-edit-card')[2]
    if (!track || !centerCard) return
    const trackLeft = track.getBoundingClientRect().left
    const cardLeft = centerCard.getBoundingClientRect().left
    track.scrollLeft += cardLeft - trackLeft - (track.clientWidth - centerCard.offsetWidth) / 2
    setActiveEdit(2)
  }, [])
  const syncEdit = () => {
    const track = editTrack.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.home-edit-card'))
    const center = track.getBoundingClientRect().left + track.clientWidth / 2
    const nearest = cards.reduce((best, card, index) => {
      const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2
      const bestCenter = cards[best].getBoundingClientRect().left + cards[best].offsetWidth / 2
      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center) ? index : best
    }, 0)
    setActiveEdit(nearest)
  }
  return <>
    <section
      className="hero hero-image-showcase"
      aria-label="Featured VENTOZZA tiles. Swipe left or right to change slides."
      onPointerDown={(event) => {
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return
        if ((event.target as HTMLElement).closest('button, a, input, select, textarea')) return
        if (event.pointerType === 'mouse') event.preventDefault()
        heroPointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
        onHeroInteraction()
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* pointer may have left the document */ }
      }}
      onPointerMove={(event) => {
        if (heroPointer.current?.id === event.pointerId && event.pointerType === 'mouse') event.preventDefault()
      }}
      onPointerUp={(event) => {
        const start = heroPointer.current
        heroPointer.current = null
        if (!start || start.id !== event.pointerId) return
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.25) onMoveSlide(dx < 0 ? 1 : -1)
      }}
      onPointerCancel={() => { heroPointer.current = null }}
      onLostPointerCapture={() => { heroPointer.current = null }}
    >


      <div className="hero-backdrop" key={`hero-image-${activeSlide}`} role="img" aria-label={slide.alt} style={{ backgroundImage: `url("${slide.image}")` }} />


      <div className="hero-inner">


        <div className="hero-copy" key={`copy-${activeSlide}`}>


          <h1>{slide.title}</h1>


          <p>{slide.body}</p>
        </div>


        <div className="hero-bottom">


          <div className="hero-progress" role="tablist" aria-label="Choose a featured slide">
            {Array.from({ length: slideCount }, (_, index) => <button key={index} type="button" role="tab" aria-label={`Show slide ${index + 1}`} aria-selected={index === activeSlide} className={index === activeSlide ? 'active' : ''} onClick={() => onSelectSlide(index)} />)}
          </div>
        </div>
      </div>
    </section>
    <section className="home-edit is-visible" aria-labelledby="home-edit-title" onMouseEnter={() => setEditHovered(true)} onMouseLeave={() => setEditHovered(false)} onFocusCapture={() => setEditFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setEditFocused(false) }}>


      <div className="home-edit-heading reveal">


        <div>

          <div className="eyebrow">

            <i /> THE VENTOZZA EDIT</div>

          <h2 id="home-edit-title">Surfaces in

            <em>motion.</em></h2></div>


        <button type="button" className="under-link" onClick={() => onTiles('overview')}>EXPLORE COLLECTIONS

          <Arrow /></button>
      </div>


      <div className="home-edit-viewport">


        <div className="home-edit-track" ref={editTrack} onScroll={syncEdit}>
          {editCollections.map((collection, index) => <button type="button" className={`home-edit-card${collection.landscape ? ' is-landscape' : ''}${index === activeEdit ? ' is-active' : ''}`} key={collection.title} onClick={() => collection.format ? onCatalogueSize(collection.format) : onTiles('look-feel')} aria-label={`Explore ${collection.title}, ${collection.size} mm`}>


            <img src={collection.image} alt={collection.alt} loading="lazy" decoding="async" />
          </button>)}
        </div>
      </div>


      <div className="home-edit-controls">


        <div className="home-edit-position" role="progressbar" aria-label="Collection position" aria-valuemin={1} aria-valuemax={editCollections.length} aria-valuenow={activeEdit + 1}>

          <span style={{ left: `${activeEdit / editCollections.length * 100}%`, width: `${100 / editCollections.length}%` }} /></div>


        <div className="home-edit-arrows">

          <button type="button" aria-label="Previous collection" onClick={() => moveEdit(-1)}>‹</button>

          <button type="button" aria-label="Next collection" onClick={() => moveEdit(1)}>›</button></div>
      </div>
    </section>
    <section className="home-format-teaser find-fit-exact find-fit-editable" aria-labelledby="find-fit-editable-title">


      <img src={findYourFitContent.image} alt={findYourFitContent.alt} loading="lazy" decoding="async" />


      <div className="find-fit-editable-heading">

        <span>{findYourFitContent.eyebrow}</span>

        <h2 id="find-fit-editable-title">{findYourFitContent.heading}</h2></div>


      <button type="button" className="find-fit-exact-link" onClick={() => onTiles('size')}>{findYourFitContent.link}

        <Arrow /></button>
    </section>
    <ProductSizesSection onTiles={onTiles} />
    <section className="why-visit section-wrap why-visit-reference">


      <div className="why-visit-heading reveal">


        <div className="why-visit-title">

          <div className="eyebrow">

            <i /> A BETTER WAY TO CHOOSE</div>

          <h2>Why visit

            <em>us?</em></h2></div>


        <p>Explore the surfaces, compare the details and get practical guidance from a team focused on tiles.</p>
      </div>


      <div className="why-visit-grid why-visit-cinematic">


        <button type="button" className="why-visit-card why-visit-feature reveal" onClick={() => onNavigate('contact')}>


          <span className="why-visit-image">

            <img src="/images/ventozza/catalogue-art/why-visit-reference-01.jpg" alt="A tile consultant and homeowner comparing samples over a project plan" loading="lazy" /></span>


          <span className="why-visit-copy">

            <small>PERSONAL GUIDANCE</small>

            <span className="why-visit-card-title">Talk through your project with our tile team.</span>

            <span className="why-visit-description">Bring your plans. Explore options with people who understand your project.</span>

            <span className="why-visit-link">LET’S TALK

              <Arrow /></span></span>
        </button>


        <div className="why-visit-stack">


          <button type="button" className="why-visit-card why-visit-stacked reveal" onClick={() => onTiles('look-feel')}>


            <span className="why-visit-image">

              <img src="/images/ventozza/catalogue-art/why-visit-reference-02.jpg" alt="Hands comparing several tile colours and finishes" loading="lazy" /></span>


            <span className="why-visit-copy">

              <small>SEE THE FINISH</small>

              <span className="why-visit-card-title">Compare tile colours, patterns and textures.</span>

              <span className="why-visit-link">EXPLORE FINISHES

                <Arrow /></span></span>
          </button>


          <button type="button" className="why-visit-card why-visit-stacked reveal" onClick={() => onNavigate('contact')}>


            <span className="why-visit-image">

              <img src="/images/ventozza/catalogue-art/why-visit-reference-03.jpg" alt="Tile samples being measured against an architectural floor plan" loading="lazy" /></span>


            <span className="why-visit-copy">

              <small>PROJECT SUPPORT</small>

              <span className="why-visit-card-title">Get help finding a suitable tile format.</span>

              <span className="why-visit-link">CONTACT OUR TEAM

                <Arrow /></span></span>
          </button>
        </div>
      </div>
    </section>
    <section className="home-technology section-wrap" aria-labelledby="home-technology-title">


      <div className="home-technology-heading reveal">


        <div className="eyebrow">

          <i /> THE TECHNOLOGY</div>


        <h2 id="home-technology-title">See It Before You Select It</h2>


        <p>Explore tile applications in room settings, then open the matching product catalogue.</p>
      </div>


      <div className="home-technology-grid">


        <article className="home-technology-card reveal">


          <img src="/images/ventozza/catalogue-art/showroom-room-living.webp" alt="Living room tile visualizer preview with a marble-look floor" loading="lazy" />


          <div>

            <h3>Choose Your Format</h3>

            <p>Find the tile size for your project.</p></div>
        </article>


        <article className="home-technology-card reveal">


          <img src="/images/ventozza/catalogue-art/about-technology.webp" alt="Digital showroom scene for previewing tile finishes in an interior" loading="lazy" />


          <div>

            <h3>Explore Room Ideas</h3>

            <p>See illustrated tile applications.</p></div>
        </article>


        <article className="home-technology-card reveal">


          <img src="/images/ventozza/catalogue-art/showroom-room-kitchen.webp" alt="Kitchen tile visualization for comparing surface selections" loading="lazy" />


          <div>

            <h3>Explore the Catalogue</h3>

            <p>Confirm designs and speak to our team.</p></div>
        </article>
      </div>


      <button className="home-technology-link under-link" onClick={() => onTiles('visualizer')}>OPEN DIGITAL SHOWROOM

        <Arrow diagonal /></button>
    </section>
  </>
}
