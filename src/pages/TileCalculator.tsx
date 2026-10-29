import { useState } from 'react'
import { tileFormats } from '../data/tileData'
import './TileCalculator.css'

type Props = { onEnquire: () => void }

export default function TileCalculator({ onEnquire }: Props) {
  const [length, setLength] = useState('5')
  const [width, setWidth] = useState('4')
  const [format, setFormat] = useState(tileFormats[0].label)
  const [wastage, setWastage] = useState('10')
  const area = Math.max(0, Number(length) || 0) * Math.max(0, Number(width) || 0)
  const selected = tileFormats.find((item) => item.label === format)
  const count = area > 0 && selected
    ? Math.ceil(area * (1 + Math.max(0, Number(wastage) || 0) / 100) / selected.area)
    : 0

  const clearFields = () => {
    setLength('')
    setWidth('')
    setFormat('')
    setWastage('')
  }

  return <div className="calculator-view">
    <div className="calculator-intro">
      <span className="eyebrow"><i /> TILE CALCULATOR</span>
      <h3>Plan your tile<br /><em>quantity.</em></h3>
      <p>Estimate how many tiles your room needs. Set your measurements, choose a format and include an allowance for cuts.</p>
      <div className="calculator-note"><span>01</span><p>Measure length and width in metres. For more than one room, calculate each space separately.</p></div>
      <div className="calculator-tile-art">
        <img src="/images/ventozza/catalogue-art/calculator-background-fullbody.webp" alt="Terrazzo Full Body tile from the VENTOZZA 600 × 1200 catalogue shown in a living room" />
        <span className="calculator-art-tag">600 × 1200 · FULL BODY</span>
        <div><small>FORMAT IN A REAL SPACE</small><b>Room to plan.<br />Tile format to match.</b></div>
      </div>
    </div>

    <div className="calculator-card">
      <div className="calculator-fields">
        <label>Room length <span>METRES</span><input type="number" min="0.1" step="0.1" value={length} onChange={(event) => setLength(event.target.value)} placeholder="e.g. 5" /></label>
        <label>Room width <span>METRES</span><input type="number" min="0.1" step="0.1" value={width} onChange={(event) => setWidth(event.target.value)} placeholder="e.g. 4" /></label>
        <label className="calculator-format">Tile size<select value={format} onChange={(event) => setFormat(event.target.value)}><option value="">Choose a tile size</option>{tileFormats.map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}</select></label>
        <label className="calculator-wastage">Extra allowance<select value={wastage} onChange={(event) => setWastage(event.target.value)}><option value="">Choose allowance</option><option value="0">No extra</option><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option></select></label>
      </div>
      <div className="calculator-result">
        <span>ESTIMATED TILES{wastage ? ` · INCLUDES ${wastage}% EXTRA` : ''}</span>
        <strong>{selected && length && width && wastage ? count.toLocaleString('en-IN') : '—'}<small>{selected && length && width && wastage ? ' pieces' : ' complete all fields'}</small></strong>
        <p>Room area: {area.toFixed(2)} m² · Tile area: {selected ? `${selected.area.toFixed(3)} m²` : '—'}</p>
      </div>
      <small className="calculator-disclaimer">Planning estimate only. Confirm exact quantity, box coverage and installation requirements with your tile professional.</small>
      <div className="calculator-actions"><button className="button button-light" type="button" onClick={onEnquire}>ASK ABOUT THIS ESTIMATE <span aria-hidden="true">↗︎</span></button><button className="calculator-clear" type="button" onClick={clearFields}>CLEAR FIELDS <span aria-hidden="true">↺</span></button></div>
    </div>
  </div>
}
