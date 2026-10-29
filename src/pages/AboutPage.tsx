import './AboutPage.css'

const leaders = [
  { name: 'Hejebu Narayana Rao', role: 'Vice President · Sales & Marketing', initials: 'HR' },
  { name: 'A. Niranjan', role: 'Senior Regional Manager', initials: 'AN' },
  { name: 'G. Ramakrishna', role: 'Zonal Manager · South', initials: 'GR' },
  { name: 'G. HimaBindu', role: 'Retail Manager · Sales', initials: 'HB' },
  { name: 'V. Nehru', role: 'Senior Sales Manager', initials: 'VN' },
  { name: 'A. Jaswanth', role: 'Operations', initials: 'AJ' },
  { name: 'G. Thukaram', role: 'Senior Sales Manager', initials: 'GT' },
  { name: 'A. Ramulu', role: 'Sales Manager', initials: 'AR' },
  { name: 'Md. V Khan', role: 'Business Development Manager', initials: 'VK' },
  { name: 'Debopriya Dam', role: 'Sales Head · North', initials: 'DD' },
]

const principles = [
  { icon: '↗︎', title: 'A project-first approach', text: 'We work with builders and architects, keeping deadlines, site realities and design intent in view.' },
  { icon: '◷', title: 'A consistent point of contact', text: 'Dedicated relationship managers help keep conversations clear from selection through follow-up.' },
  { icon: '⌖', title: 'Decisions closer to site', text: 'Our field teams are trained around construction language and project workflows.' },
  { icon: '⟳', title: 'Learning from every project', text: 'On-ground feedback helps guide service and product planning.' },
]

const regions = [
  { number: '01', title: 'South India', note: 'Current focus: deepen support across Telangana, Andhra Pradesh, Karnataka and Tamil Nadu.', image: '/images/ventozza/catalogue-art/about-region-south.webp' },
  { number: '02', title: 'East India', note: 'Next in the roadmap: Odisha, West Bengal and the eastern corridor.', image: '/images/ventozza/catalogue-art/about-region-east.webp' },
  { number: '03', title: 'North India', note: 'Planned expansion into metro and Tier-1 markets as the operating model grows.', image: '/images/ventozza/catalogue-art/about-region-north.webp' },
]

const sizeFormats = [
  { size: '1200 × 2400', label: 'Statement slab', image: '/images/ventozza/catalogue-art/size-1200x1800.webp', alt: 'Large-format marble-look tile from the VENTOZZA catalogue' },
  { size: '1200 × 1800', label: 'Opulenza', image: '/images/ventozza/catalogue-covers/1200x1800-02-opulenza.webp', alt: 'Opulenza large-format tile catalogue cover' },
  { size: '800 × 1600', label: 'Glossy series', image: '/images/ventozza/catalogue-covers/800x1600-04-glossy-800-1600.webp', alt: 'Glossy series tile catalogue cover' },
  { size: '800 × 800', label: 'Double charge', image: '/images/ventozza/catalogue-covers/800x800-ventozza-800-x-800-double-charge-9d8f6fb6.webp', alt: 'Double charge square tile catalogue cover' },
  { size: '600 × 1200', label: 'Full body', image: '/images/ventozza/catalogue-covers/600x1200-ventozza-sajavat-collection.webp', alt: 'Full body tile catalogue cover' },
  { size: '600 × 1200 & 600 Full body', label: 'Full body', image: '/images/ventozza/catalogue-covers/600-full-body-02-full-body.webp', alt: 'Full body tile catalogue cover' },
  { size: '600 × 600', label: 'Square format', image: '/images/ventozza/catalogue-covers/600x600-ventozza-600x600mm-brochure-f20ac735.webp', alt: '600 by 600 square tile catalogue cover' },
  { size: '300 × 600', label: 'Nature Series', image: '/images/ventozza/catalogue-covers/300x600-11-nature-series.webp', alt: 'Nature Series wall tile catalogue cover' },
  { size: '300 × 450', label: 'Fish & Flower', image: '/images/ventozza/catalogue-covers/300x450-12-fish-flower.webp', alt: 'Fish and Flower decorative tile catalogue cover' },
  { size: '200 × 1200', label: 'GVT wood plank', image: '/images/ventozza/catalogue-covers/200x1200-ventozza-20x120cm-gvt-wood-planks-brochure-1-b6e633c6.webp', alt: 'GVT wood plank tile catalogue cover' },
]

export default function AboutPage() {
  return <section className="about about-page section-wrap" id="about">
    <div className="about-hero">
      <div className="about-hero-image reveal">
        <img src="/images/stock/living-room-marble.webp" alt="A bright living space with marble-look floor tiles" loading="lazy" />
        <span className="about-image-label"><i>✳︎</i> WALL &amp; FLOOR TILE PARTNERS</span>
        <div className="about-image-index"><b>VENTOZZA</b><span>PROJECT-READY SURFACES</span></div>
      </div>
      <div className="about-hero-copy reveal">
        <div className="eyebrow"><i /> ABOUT VENTOZZA</div>
        <h2>A tile partner<br />for every <em>project.</em></h2>
        <p className="about-lead">Every project deserves a tile partner who understands the design, the site and the schedule.</p>
        <p>Founded in 2017 under Greenray Granito Private Limited, VENTOZZA brings a focused range of wall and floor tiles together with practical product guidance for builders and architects. The team brings more than 15 years of combined project-sales experience, with roots in Telangana and a disciplined plan to grow across India.</p>
        <a className="button button-outline" href="#products">EXPLORE THE TILE RANGE <span aria-hidden="true">↗︎</span></a>
      </div>
    </div>

    <div className="about-proof" aria-label="VENTOZZA at a glance">
      <article><b>15+</b><span>YEARS OF COMBINED<br/>PROJECT-SALES EXPERIENCE</span></article>
      <article><b>Wall <i>&amp;</i> floor</b><span>A CLEAR FOCUS ON<br/>CERAMIC TILE SURFACES</span></article>
      <article><b>India</b><span>TELANGANA ROOTS WITH<br/>A DISCIPLINED GROWTH PLAN</span></article>
    </div>

    <section className="about-size-range" aria-labelledby="about-size-title">
      <div className="about-size-heading"><div><span className="eyebrow"><i /> BUILT TO PERFORM · FINISHED TO IMPRESS</span><h3 id="about-size-title">Sizes &amp; finishes<br/>for considered spaces.</h3></div><p>Explore formats and the catalogue ranges designed around them—from expressive wall tiles to expansive surfaces and wood-look planks.</p></div>
      <div className="about-size-gallery" aria-label="Tile sizes and matching catalogue ranges">{sizeFormats.map((format)=><article className="about-size-card" key={format.size}><div className="about-size-image"><img src={format.image} alt={format.alt} loading="lazy"/></div><div className="about-size-caption"><b>{format.size}</b><small>{format.label}</small></div></article>)}</div>
      <div className="about-size-foot"><span>FORMAT OPTIONS SHOWN FROM VENTOZZA CATALOGUES</span><span>Confirm availability and finish with our team.</span></div>
    </section>

    <div className="about-origin">
      <div className="about-origin-copy reveal">
        <div className="eyebrow"><i /> WHY VENTOZZA BEGAN</div>
        <h3>Make tile selection<br />easier to <em>move through.</em></h3>
        <p>Working across residential and commercial projects showed us how tile selection can slow a build: samples can arrive late, the preferred size may be difficult to source, and teams can lose time revisiting decisions.</p>
        <p>VENTOZZA was shaped to address those everyday project pressures with a dedicated point of contact, practical product conversations and technology that helps teams preview a surface before ordering. The goal is straightforward: be a dependable tile partner, not simply a supplier of products.</p>
      </div>
      <figure className="about-origin-image reveal">
        <img src="/images/stock/staircase-tile-interior.webp" alt="Stone-look floor tiles meeting a contemporary staircase" loading="lazy" />
        <figcaption><span>01 / THE PROJECT</span><b>Design intent, timing and the right finish.</b></figcaption>
      </figure>
    </div>

    <section className="about-employee-first" aria-labelledby="about-employee-title">
      <div className="about-employee-photo reveal"><img src="/images/stock/bedroom-marble.webp" alt="Warm marble-look floor tiles in a bright bedroom" loading="lazy"/><span>PEOPLE · PROJECTS · PROGRESS</span></div>
      <div className="about-employee-copy reveal"><div className="eyebrow"><i /> EMPLOYEE FIRST · BUILDER FIRST</div><h3 id="about-employee-title">Better support starts<br/>with the <em>people behind it.</em></h3><p>The company profile’s guiding idea is “Employee First”: supported, informed teams are better able to support builders. Relationship managers stay close to each project, while field experience helps the team respond to real site needs.</p><div className="about-service-list"><article><b>01</b><span><strong>Empowered on-site support</strong><small>Teams can coordinate samples, pricing and logistics with decisions closer to the project.</small></span></article><article><b>02</b><span><strong>Construction-aware guidance</strong><small>Training covers construction terminology and the workflows teams use on site.</small></span></article><article><b>03</b><span><strong>Feedback that improves planning</strong><small>Insights from projects inform stock planning and customer service.</small></span></article></div></div>
    </section>

    <section className="about-technology" aria-labelledby="about-technology-title">
      <div><div className="eyebrow eyebrow-light"><i /> TECHNOLOGY · BETTER DECISIONS</div><h3 id="about-technology-title">See the surface<br/>before it reaches the <em>site.</em></h3><p>Our digital visualizer helps builders, architects and clients preview tile surfaces in a room setting before confirming an order. It is designed to make early conversations clearer and reduce avoidable site visits and rework.</p><a className="button button-light" href="#products" onClick={(event) => { event.preventDefault(); window.location.hash = '#tiles/visualizer' }}>OPEN DIGITAL VISUALIZER <span aria-hidden="true">↗︎</span></a></div>
      <figure><img src="/images/ventozza/catalogue-art/about-technology.webp" alt="A contemporary room with stone-look tiled floors and walls" loading="lazy"/><figcaption>ROOM PREVIEW · SURFACE SELECTION · PROJECT PLANNING</figcaption></figure>
    </section>

    <section className="about-principles-section" aria-labelledby="about-principles-title">
      <div className="about-subhead reveal"><div><div className="eyebrow"><i /> HOW WE WORK</div><h3 id="about-principles-title">Built around the people<br/>building the space.</h3></div><p>Our service model puts the project team first, with people who understand construction workflows and can respond close to the work.</p></div>
      <div className="about-principles-grid">{principles.map((item) => <article className="about-principle reveal" key={item.title}><div className="about-principle-top"><span>{item.icon}</span></div><h4>{item.title}</h4><p>{item.text}</p></article>)}</div>
    </section>

    <section className="about-team" aria-labelledby="about-team-title">
      <div className="about-subhead reveal"><div><div className="eyebrow"><i /> THE PEOPLE BEHIND THE WORK</div><h3 id="about-team-title">A team with project<br/>experience on the ground.</h3></div><p>VENTOZZA’s company profile names the leadership and sales, operations and regional team supporting its project focus.</p></div>
      <div className="about-promoters"><span className="eyebrow"><i /> DIRECTORS / PROMOTERS</span><div><article><b>Vijay Kumar N. Jakhaniya</b><small>Director / Promoter</small></article><article><b>P. Vishal Kumar</b><small>Director / Promoter</small></article></div></div>
      <div className="about-team-grid">{leaders.map((person) => <article className="about-person reveal" key={person.name}><span aria-hidden="true">{person.initials}</span><div><b>{person.name}</b><small>{person.role}</small></div><i aria-hidden="true">↗︎</i></article>)}</div>
    </section>

    <section className="about-roadmap" aria-labelledby="about-roadmap-title">
      <div className="about-roadmap-head reveal"><div><div className="eyebrow eyebrow-light"><i /> A DISCIPLINED GROWTH ROADMAP</div><h3 id="about-roadmap-title">Rooted locally.<br/>Growing with <em>purpose.</em></h3></div><p>The company profile describes a phased expansion plan: build regional depth first, then extend the same operating approach to more of India.</p></div>
      <div className="about-region-grid">{regions.map((region) => <article className="about-region reveal" key={region.number}><img src={region.image} alt="Tile surfaces representing the VENTOZZA regional project roadmap" loading="lazy"/><div><small>{region.number} / ROADMAP</small><h4>{region.title}</h4><p>{region.note}</p></div></article>)}</div>
      <div className="about-roadmap-foot"><span>BUILT FOR BUILDERS &amp; ARCHITECTS</span><span>WALL &amp; FLOOR TILES · PROJECT GUIDANCE</span></div>
    </section>
  </section>
}
