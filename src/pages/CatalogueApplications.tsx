import { useState } from 'react'
import { ventozzaEdit } from '../data/ventozzaEdit'
import './CatalogueApplications.css'

type Props = { onEnquire: (interest: string) => void; onBrowseCatalogues: (format: string) => void }
export default function CatalogueApplications({ onEnquire, onBrowseCatalogues }: Props) {
  const [size, setSize] = useState('all')
  const [selection, setSelection] = useState(ventozzaEdit[0].title)
  const options = [...new Set(ventozzaEdit.map(item => item.size))]
  const visible = ventozzaEdit.filter(item => size === 'all' || item.size === size)
  const active = visible.find(item => item.title === selection) ?? visible[0]
  return <div className="catalogue-applications">


    <header>

      <span className="eyebrow">ROOM APPLICATIONS · CATALOGUE-LINKED</span>

      <h2>Explore VENTOZZA tiles in room settings.</h2>

      <p>Choose a catalogue design and format to see its room application, then open the matching catalogue.</p></header>


    <div className="application-layout">


      <figure className="application-preview">

        <img src={active.image} alt={active.alt} />

        <figcaption>Room application preview · Select a design to see its catalogue format.</figcaption></figure>


      <div className="application-browser">


        <label className="application-filter">Filter by catalogue format

          <select value={size} onChange={event => setSize(event.target.value)}>

            <option value="all">All formats</option>{options.map(option => <option key={option} value={option}>{option} mm</option>)}</select></label>


        <div className="application-selection" aria-live="polite">

          <h3>{active.title}</h3>

          <p>{active.size} mm · {visible.length} {visible.length === 1 ? 'design' : 'designs'} shown</p></div>


        <div className="application-actions">

          <button type="button" onClick={() => onBrowseCatalogues(active.format)}>Browse matching catalogues

            <span aria-hidden="true">↗</span></button>

          <button type="button" onClick={() => onEnquire(`${active.title} · ${active.size} mm`)}>Ask about this design

            <span aria-hidden="true">→</span></button></div>


        <p className="application-note">Use the catalogue to confirm the exact design and finish. Our team can help you check availability and suitability for your project.</p>


        <div className="application-thumbnails" aria-label="Choose a tile application">{visible.map(item => <button type="button" key={item.title} aria-pressed={active.title === item.title} onClick={() => setSelection(item.title)}>

          <img src={item.image} alt="" loading="lazy" />

          <span>{item.title}</span></button>)}</div>
      </div>
    </div>
  </div>
}
