import { useState } from 'react'
import './FinishExplorer.css'

const finishes = [
  { name: 'Glossy', mood: 'Light, reflected.', description: 'A reflective surface that brings out colour and veining.', sheen: 'Reflective', character: 'Smooth, luminous', image: '/images/ventozza/pgvt-random/estrella-beige-600x1200.png', alt: 'Polished beige floor and wall tiles with soft daylight reflections', sample: 'Estrella Beige', format: '600x1200', size: '600 × 1200 mm' },
  { name: 'Matt', mood: 'Quiet by design.', description: 'A low-sheen finish with a calm, understated appearance.', sheen: 'Low sheen', character: 'Soft, restrained', image: '/images/ventozza/matt/cemeta-white-600x1200.png', alt: 'Pale cement-look matt tiles in a minimalist living room', sample: 'Cemeta White', format: '600x1200', size: '600 × 1200 mm' },
  { name: 'Rustic', mood: 'Character in every detail.', description: 'Explore natural-looking texture and expressive surface variation.', sheen: 'Varies by design', character: 'Textured, natural-looking', image: '/images/ventozza/catalogue-art/finish-rustic.webp', alt: 'Rustic tile surface illustrating natural-looking texture', sample: 'Rustic surface inspiration', format: '', size: 'Explore available formats' },
  { name: 'Carving', mood: 'Depth you can see.', description: 'Fine sculpted details add another dimension to a stone-inspired design.', sheen: 'Varies by design', character: 'Detailed, tactile', image: '/images/ventozza/carving/el-defana-ivory-brown-600x1200.png', alt: 'Carving-finish ivory and brown tiles in a refined hotel lobby', sample: 'El Defana · Ivory & Brown', format: '600x1200', size: '600 × 1200 mm' },
] as const

type Props = { onEnquire: (interest: string) => void; onCatalogue: (format?: string) => void }
export default function FinishExplorer({ onEnquire, onCatalogue }: Props) {
  const [selected, setSelected] = useState(0)
  const [comparing, setComparing] = useState(false)
  const [comparison, setComparison] = useState(1)
  const active = finishes[selected]
  const secondary = finishes[comparison]
  return <div className="finish-explorer">


    <header className="finish-header">

      <div>

        <span className="eyebrow">LOOK &amp; FEEL</span>

        <h2>Find your finish.</h2></div>

      <button type="button" className="finish-catalogue-link" onClick={() => onCatalogue()}>All catalogues

        <span aria-hidden="true">↗</span></button></header>


    <div className="finish-selector" aria-label="Choose a finish">{finishes.map((finish, index) => <button key={finish.name} type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); if (index === comparison) setComparison((index + 1) % finishes.length) }}>

      <img src={finish.image} alt="" loading="lazy" />

      <span>

        <b>{finish.name}</b>

        <small>{finish.sheen}</small></span></button>)}</div>


    <div className={`finish-stage${comparing ? ' is-comparing' : ''}`}>


      <div className="finish-visuals">

        <figure>

          <img src={active.image} alt={active.alt} />

          <figcaption>

            <b>{active.name}</b>

            <span>{active.sample}</span></figcaption></figure>{comparing && <figure>

              <img src={secondary.image} alt={secondary.alt} />

              <figcaption>

                <b>{secondary.name}</b>

                <span>{secondary.sample}</span></figcaption></figure>}</div>


      <aside className="finish-details">


        <div aria-live="polite">

          <span className="finish-detail-label">{active.name.toUpperCase()} FINISH</span>

          <h3>{active.mood}</h3>

          <p>{active.description}</p>

          <dl>

            <div>

              <dt>Appearance</dt>

              <dd>{active.character}</dd></div>

            <div>

              <dt>Sample format</dt>

              <dd>{active.size}</dd></div></dl></div>


        <label className="finish-compare-toggle">

          <input type="checkbox" checked={comparing} onChange={event => setComparing(event.target.checked)} />Compare another finish</label>
        {comparing && <label className="finish-compare-select">Compare with

          <select value={comparison} onChange={event => setComparison(Number(event.target.value))}>{finishes.map((finish, index) => index !== selected && <option key={finish.name} value={index}>{finish.name}</option>)}</select></label>}


        <button type="button" className="finish-primary" onClick={() => onCatalogue(active.format || undefined)}>View catalogues

          <span aria-hidden="true">↗</span></button>


        <button type="button" className="finish-enquire" onClick={() => onEnquire(`${active.name} finish · ${active.sample}`)}>Ask about this finish

          <span aria-hidden="true">→</span></button>
      </aside>
    </div>


    <p className="finish-caption">Illustrative previews. Confirm finish, availability and suitability with a physical sample.</p>
  </div>
}
