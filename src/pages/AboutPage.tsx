import { useEffect, useState } from 'react'
import './AboutPage.css'
import ExpansionRoadmap from './ExpansionRoadmap'

const promoters = [
  { name: 'Vijay Kumar N. Jakhaniya', role: 'Director / Promoter', initials: 'VJ' },
  { name: 'P. Vishal Kumar', role: 'Director / Promoter', initials: 'PV' },
  { name: 'H. Narayana Rao', role: 'Vice President – Sales & Marketing', initials: 'HN' },
]

const team = [
  { name: 'A. Niranjan', role: 'Senior Regional Manager' },
  { name: 'G. Ramakrishna', role: 'Zonal Manager · South' },
  { name: 'G. HimaBindu', role: 'Retail Manager · Sales' },
  { name: 'V. Nehru', role: 'Senior Sales Manager' },
  { name: 'A. Jaswanth', role: 'Operations' },
  { name: 'G. Thukaram', role: 'Senior Sales Manager' },
  { name: 'A. Ramulu', role: 'Sales Manager' },
  { name: 'Md. V Khan', role: 'Business Development Manager' },
  { name: 'Debopriya Dam', role: 'Sales Head · North' },
]

const commitments = [
  { number: '01', title: 'Dedicated Relationship Managers', text: 'We assign specific managers per project. No rotating sales staff. You see the same face every visit.' },
  { number: '02', title: 'Empowered to Decide', text: 'Our on-ground team approves samples, pricing flexibility, and logistics on the spot.' },
  { number: '03', title: 'We Train for Your Language', text: 'Our team is trained in construction terminology and site workflows, not just catalogues.' },
  { number: '04', title: 'Feedback Loop, Not Feedback Form', text: 'Employee site insights directly shape our stock planning and service delivery.' },
]


const sizeFormats = [
  { format: '1200 × 1800 mm', note: 'Large format', image: '/images/ventozza/about-reference/specialty-1200x1800.png', alt: 'Two white porcelain tile panels with grey and warm gold veining' },
  { format: '800 × 1600 mm', note: 'Large format', image: '/images/ventozza/about-reference/specialty-800x1600.png', alt: 'Taupe stone and granular stone-look tile samples' },
  { format: '800 × 800 mm', note: 'Square format', image: '/images/ventozza/about-reference/specialty-800x800.png', alt: 'Four square stone-look tile finishes in ivory, white and grey' },
  { format: '600 × 1200 & 600 × 600 mm', note: 'Full Body', image: '/images/ventozza/about-reference/specialty-600x1200-fullbody.png', alt: 'Warm ivory full-body tile with a subtle speckled surface' },
  { format: '600 × 1200 mm', note: 'Cerrecin Beige', image: '/images/ventozza/about-reference/specialty-600x1200.png', alt: 'Cerrecin Beige tile slab with fine beige stone veining' },
  { format: '600 × 600 mm', note: 'Polished finish', image: '/images/ventozza/about-reference/specialty-600x600.png', alt: 'Two polished ivory tiles with delicate gold veining' },
  { format: '300 × 600 mm', note: 'Decorative wall tile', image: '/images/ventozza/about-reference/specialty-300x600.png', alt: 'Pink and taupe decorative tile panel with still-life motifs' },
  { format: '300 × 450 mm', note: 'Geometric wall tile', image: '/images/ventozza/about-reference/specialty-300x450.png', alt: 'Colorful geometric tile panel with repeating hexagon motifs' },
  { format: '200 × 1200 mm', note: 'Wood-look plank', image: '/images/ventozza/about-reference/specialty-200x1200.png', alt: 'Long wood-look tile planks in varied warm brown grain' },
]

export default function AboutPage() {
  const [activeFormatIndex, setActiveFormatIndex] = useState(0)
  const [formatPaused, setFormatPaused] = useState(false)
  const activeFormat = sizeFormats[activeFormatIndex]

  useEffect(() => {
    if (formatPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActiveFormatIndex((current) => (current + 1) % sizeFormats.length), 6000)
    return () => window.clearInterval(timer)
  }, [activeFormatIndex, formatPaused])


  return <div className="about-reference-page" id="about">
    <header className="about-reference-hero reveal" id="about-overview">
      <div className="about-reference-hero-media" aria-hidden="true">
        <img className="about-reference-hero-editorial" src="/images/ventozza/about-reference/about-hero-editorial.png" alt="" />
      </div>
      <div className="about-reference-container about-reference-hero-content">
        <div className="about-reference-hero-copy">
          <span className="about-reference-kicker">COMPANY PROFILE · EST. 2017</span>
          <h1>Legacy of<br /><em>Innovation.</em></h1>
          <p>Every project deserves a tile partner, not just a tile supplier. Built by industry veterans, focused on builders and architects.</p>
          <a className="about-reference-hero-link" href="#about-story">DISCOVER VENTOZZA <span aria-hidden="true">↓</span></a>
          <div className="about-reference-hero-stats" aria-label="VENTOZZA at a glance">
            <span><b>2017</b><small>Established within Greenray Granito</small></span>
            <span><b>15+</b><small>Years of combined project-sales experience</small></span>
          </div>
        </div>
      </div>
    </header>

    <section className="about-reference-section reveal" id="about-story">
      <div className="about-reference-container about-reference-split about-reference-story-layout">
        <figure className="about-reference-story-art reveal">
          <img className="about-reference-story-backdrop" src="/images/ventozza/about-reference/our-story-kitchen-collage.png" alt="A curated composition of stone and marble tile finishes with a marble-finished kitchen" loading="lazy" />
          <img className="about-reference-story-overlay" src="/images/ventozza/about-reference/interior-el-scott-bianco.png" alt="A warm dining space featuring VENTOZZA stone-look floor tiles" loading="lazy" />
          <figcaption>CRAFTED SURFACES · CONSIDERED SPACES</figcaption>
        </figure>
        <div className="about-reference-copy">
          <span className="about-reference-eyebrow">OUR STORY</span>
          <h2>Shaping the Future of Ceramics</h2>
          <p>After years of working with builders across residential and commercial projects, we noticed the same story repeat itself: architects reworking mood boards because samples arrived too late, builders compromising on finish because the right size wasn’t in stock, and project timelines slipping over tile selection alone.</p>
          <p>We didn’t start VENTOZZA to sell more tiles. We started it to <strong>remove tiles as a bottleneck in your project.</strong></p>
          <ul className="about-reference-points">
            <li>Speed matters more than showroom size.</li>
            <li>A builder’s timeline is our timeline.</li>
            <li>Every project deserves a dedicated point of contact—not just a salesperson.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="about-reference-section reveal" id="about-foundation">
      <div className="about-reference-container about-reference-split">
        <div className="about-reference-copy">
          <span className="about-reference-eyebrow">THE VENTOZZA FOUNDATION</span>
          <h2>About VENTOZZA</h2>
          <p>Established in 2017 within Greenray Granito Private Limited, VENTOZZA brings reliability to premium tile distribution and project sales for builders and architects.</p>
          <p>Built on a proven track record, VENTOZZA combines extensive project-sales experience with focused support for every project.</p>
          <div className="about-reference-proof reveal" aria-label="VENTOZZA experience">
            <div className="about-reference-proof-stat"><b>2017</b><span>VENTOZZA established within Greenray Granito Private Limited</span></div>
            <div className="about-reference-proof-stat"><b>15+</b><span>Years of combined project-sales experience</span></div>
          </div>
        </div>
        <figure className="about-reference-image about-reference-transparent-collage">
          <img src="/images/ventozza/about-reference/foundation-tile-collage.png" alt="VENTOZZA tile inspiration: a green tiled bathroom, layered stone samples and colorful geometric tiles" loading="lazy" />
        </figure>
      </div>
    </section>

    <section className="about-reference-section about-reference-principles reveal" id="about-principles">
      <div className="about-reference-container">
        <div className="about-reference-principles-grid">
          <article className="about-reference-principle reveal">
            <svg viewBox="0 0 64 48" aria-hidden="true"><path d="M4 24s10-15 28-15 28 15 28 15-10 15-28 15S4 24 4 24Z"/><circle cx="32" cy="24" r="10"/><circle cx="32" cy="24" r="4"/></svg>
            <h3>Our Vision</h3>
            <p>To be a trusted tile partner for builders and architects, bringing considered surfaces, project-ready sizes and dependable support to every project.</p>
          </article>
          <article className="about-reference-principle reveal">
            <svg viewBox="0 0 64 56" aria-hidden="true"><path d="m32 9 20 8-4 28H16l-4-28 20-8Z"/><path d="m12 17 20 28 20-28M24 17l8 28 8-28M12 17h40"/><path d="M12 4v7M8.5 7.5h7M51 2v6M48 5h6M55 11v6M52 14h6"/></svg>
            <h3>Our Mission</h3>
            <p>To make tile selection and supply easier with quality collections, useful format choices and responsive guidance from first discussion through delivery.</p>
          </article>
          <article className="about-reference-principle reveal">
            <svg viewBox="0 0 64 56" aria-hidden="true"><circle cx="29" cy="31" r="22"/><circle cx="29" cy="31" r="16"/><circle cx="29" cy="31" r="10"/><circle cx="29" cy="31" r="4"/><path d="m29 31 25-25M45 6l10-3-3 10-7 7-7-7 7-7Z"/></svg>
            <h3>Our Values</h3>
            <p>Reliability, product quality and attentive service guide how we work. We build lasting relationships through clear communication and practical project support.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="about-reference-section about-reference-team reveal" id="about-team">
      <div className="about-reference-container">
        <div className="about-reference-section-heading about-reference-team-heading">
          <span className="about-reference-eyebrow">OUR TEAM</span>
          <h2>The Team Behind VENTOZZA</h2>
          <p>Promoters and core team members across sales, operations and regional support.</p>
        </div>
        <div className="about-reference-promoters">
          <h3>Directors / Promoters</h3>
          {promoters.map((person) => <article className={person.initials === 'HN' ? 'team-vice-president' : undefined} key={person.name}><i className="team-promoter-initials" aria-hidden="true">{person.initials}</i><div className="team-promoter-details"><b>{person.name}</b><span>{person.role}</span></div></article>)}
        </div>
        <div className="about-reference-team-grid" aria-label="Core team directory">
          {team.map((person) => <article key={person.name}><span aria-hidden="true">{person.name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')}</span><b>{person.name}</b><small>{person.role}</small></article>)}
        </div>
      </div>
    </section>

    <div className="about-reference-brand-panels">
      <section className="about-reference-section about-reference-commitments reveal" id="about-commitment">
        <div className="about-reference-container about-reference-commitment-layout">
          <div className="about-reference-section-heading about-reference-commitment-intro">
            <span className="about-reference-eyebrow">OUR COMMITMENT</span>
            <h2>Same Face,<br />Every Visit</h2>
            <p>Our commitment is to be your partner, not just a vendor—built around a supported team and a coordinated builder experience.</p>
          </div>
          <div className="about-reference-commitment-grid">
            {commitments.map((item, index) => <article className={`about-reference-commitment-card about-reference-commitment-card-${index + 1}`} key={item.number}>
              <h3>{item.title}</h3><p>{item.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="about-reference-section about-reference-specialties reveal" id="about-products">
        <div className="about-reference-container about-reference-split about-reference-size-layout">
          <div className="about-reference-copy">
            <span className="about-reference-eyebrow">OUR SPECIALTIES</span>
            <h2>Sizes &amp; Finishes We Specialize In</h2>
            <p>Built to Perform. Finished to Impress. We stock project-ready formats designed to reduce wastage, speed up installation, and deliver a flawless finish for residential and commercial spaces.</p>
            <p className="about-reference-format-note"><em>Looking for a specific format? Our team can source custom sizes and specialized finishes based on your project requirements.</em></p>
            <a className="about-reference-text-link" href="#tiles/catalogues">EXPLORE THE CATALOGUE <span aria-hidden="true">↗</span></a>
          </div>
          <div className="about-reference-specialties-showcase" onMouseEnter={() => setFormatPaused(true)} onMouseLeave={() => setFormatPaused(false)} onFocusCapture={() => setFormatPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFormatPaused(false) }}>
            <article className="about-reference-specialty-slide" key={activeFormat.format} role="group" aria-roledescription="slide" aria-label={`Format ${activeFormatIndex + 1} of ${sizeFormats.length}`}>
              <div className="about-reference-size-tile-wrap">
                <img key={activeFormat.image} src={activeFormat.image} alt={activeFormat.alt} />
              </div>
              <div className="about-reference-specialty-slide-copy">
                <small>FORMAT {String(activeFormatIndex + 1).padStart(2, '0')} · {activeFormat.note.toUpperCase()}</small>
                <h3>{activeFormat.format}</h3>
                <p>Explore this VENTOZZA format in the catalogue and compare finishes suited to your project.</p>
              </div>
            </article>
            <div className="about-reference-specialty-controls" aria-label="Tile format slides">
              <div className="about-reference-specialty-dots" role="tablist" aria-label="Choose a tile format">
                {sizeFormats.map((item, index) => <button key={item.format} type="button" role="tab" aria-label={`Show ${item.format}`} aria-selected={index === activeFormatIndex} className={index === activeFormatIndex ? 'active' : ''} onClick={() => setActiveFormatIndex(index)} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <ExpansionRoadmap />
  </div>
}
