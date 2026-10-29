import { useEffect, useState, type ChangeEvent, type CSSProperties } from 'react'
import { visualizerLooks as tileLooks, visualizerRooms } from '../data/tileData'
import './DigitalShowroom.css'

type Props = { onEnquire: () => void }
type Surface = 'floor' | 'wall' | 'both'
type Pattern = 'straight' | 'brick' | 'diagonal'
const formats = ['1200 × 1800 mm', '800 × 1600 mm', '600 × 1200 mm', '600 × 600 mm', '300 × 600 mm']
const defaultDesign = { room: 0, look: 0, surface: 'floor' as Surface, pattern: 'straight' as Pattern, format: formats[2], strength: 76 }

export default function DigitalShowroom({ onEnquire }: Props) {
  const [room, setRoom] = useState(defaultDesign.room)
  const [look, setLook] = useState(defaultDesign.look)
  const [surface, setSurface] = useState<Surface>(defaultDesign.surface)
  const [pattern, setPattern] = useState<Pattern>(defaultDesign.pattern)
  const [format, setFormat] = useState(defaultDesign.format)
  const [strength, setStrength] = useState(defaultDesign.strength)
  const [compare, setCompare] = useState(false)
  const [compareAt, setCompareAt] = useState(52)
  const [upload, setUpload] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [saveStatus, setSaveStatus] = useState('')
  const roomImage = upload || visualizerRooms[room].image
  const tileSteps: Record<string, string> = { '1200 × 1800 mm': '270px', '800 × 1600 mm': '235px', '600 × 1200 mm': '205px', '600 × 600 mm': '165px', '300 × 600 mm': '135px' }
  const lookTints = ['rgba(218, 191, 145, .20)', 'rgba(126, 157, 174, .24)', 'rgba(183, 119, 102, .12)', 'rgba(113, 125, 112, .22)']
  // Keep the selected material visibly distinct while allowing the room to show through.
  const textureStyle = {
    '--texture-image': `url("${tileLooks[look].image}")`,
    '--tile-tint': lookTints[look],
    '--intensity': .58 + (strength / 100) * .4,
    '--compare-at': `${compareAt}%`,
    '--tile-step': tileSteps[format],
  } as CSSProperties

  useEffect(() => () => { if (upload.startsWith('blob:')) URL.revokeObjectURL(upload) }, [upload])
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ventozza-showroom-design')
      if (!saved) return
      const design = JSON.parse(saved) as { room?: string; look?: string; surface?: Surface; pattern?: Pattern; format?: string; strength?: number }
      const roomIndex = visualizerRooms.findIndex((item) => item.name === design.room)
      const lookIndex = tileLooks.findIndex((item) => item.name === design.look)
      if (roomIndex >= 0) setRoom(roomIndex)
      if (lookIndex >= 0) setLook(lookIndex)
      if (design.surface && ['floor', 'wall', 'both'].includes(design.surface)) setSurface(design.surface)
      if (design.pattern && ['straight', 'brick', 'diagonal'].includes(design.pattern)) setPattern(design.pattern)
      if (design.format && formats.includes(design.format)) setFormat(design.format)
      if (typeof design.strength === 'number' && design.strength >= 30 && design.strength <= 100) setStrength(design.strength)
    } catch { /* Ignore unavailable storage and keep the default preview. */ }
  }, [])

  const uploadRoom = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    event.currentTarget.value = ''
    setUploadError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setUploadError('Choose a JPG, PNG or WEBP room photo.'); return }
    if (file.size > 8 * 1024 * 1024) { setUploadError('Choose a room photo smaller than 8 MB.'); return }
    if (upload.startsWith('blob:')) URL.revokeObjectURL(upload)
    setUpload(URL.createObjectURL(file))
    setCompare(false)
  }

  const saveDesign = () => {
    try {
      localStorage.setItem('ventozza-showroom-design', JSON.stringify({ room: visualizerRooms[room].name, look: tileLooks[look].name, surface, pattern, format, strength }))
      setSaveStatus('Design saved in this browser')
    } catch { setSaveStatus('Browser storage is unavailable') }
    window.setTimeout(() => setSaveStatus(''), 2800)
  }

  const overlay = (zone: 'floor' | 'wall') => <div className={`showroom-after ${compare ? 'is-comparing' : ''}`} style={textureStyle} key={`${zone}-${room}-${look}-${surface}-${pattern}`}>
    <div className={`showroom-tile-plane plane-${zone} room-${room} pattern-${pattern}`} aria-hidden="true" />
  </div>

  return <div className="digital-showroom">
    <div className="showroom-heading">
      <div><span className="eyebrow"><i /> VENTOZZA DIGITAL SHOWROOM</span><h3>Try a new look<br />in your <em>space.</em></h3><p>Choose a room, surface and catalogue finish. See your options side by side before you decide.</p></div>
      <div className="showroom-heading-note"><span>DESIGN PREVIEW</span><b>ROOMS · SURFACES · FINISHES</b></div>
    </div>
    <div className="showroom-workspace">
      <div className="showroom-stage-column">
        <div className={`showroom-stage room-${room} surface-${surface}`} style={textureStyle}>
          <img className="showroom-room-image" src={roomImage} alt={upload ? 'Your uploaded room photo with the selected tile preview' : `${visualizerRooms[room].name} interior preview`} />
          {surface !== 'wall' && overlay('floor')}
          {surface !== 'floor' && overlay('wall')}
          {compare && <div className="showroom-compare-rule" style={{ left: `${compareAt}%` }} aria-hidden="true"><span>↔</span></div>}
          <div className="showroom-stage-top"><span>{upload ? 'YOUR ROOM' : visualizerRooms[room].name.toUpperCase()}</span><span>{compare ? 'BEFORE / AFTER' : `${tileLooks[look].name.toUpperCase()} · ${format}`}</span></div>
          <div className="showroom-stage-title"><small>VENTOZZA SURFACE PREVIEW</small><strong>{tileLooks[look].name}</strong><span>{surface === 'both' ? 'Floor + feature wall' : `${surface[0].toUpperCase()}${surface.slice(1)} application`} · {pattern} lay</span></div>
        </div>
        {compare && <div className="showroom-compare-control"><label htmlFor="showroom-compare-range"><span>Original</span><b>Drag to compare</b><span>Tile preview</span></label><input id="showroom-compare-range" aria-label="Compare original room with tile preview" type="range" min="5" max="95" value={compareAt} onChange={(event) => setCompareAt(Number(event.target.value))} /></div>}
        <div className="showroom-stage-tools"><button type="button" className={compare ? 'active' : ''} onClick={() => setCompare((value) => !value)}>{compare ? '✓ Comparing' : '⇄ Compare before / after'}</button><label className="showroom-upload">＋ Upload your room<input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadRoom} /></label>{upload && <button type="button" onClick={() => { URL.revokeObjectURL(upload); setUpload(''); setUploadError('') }}>Use sample room</button>}</div>
        {uploadError && <p className="showroom-upload-error" role="alert">{uploadError}</p>}
        <div className="showroom-room-strip"><div><span className="eyebrow"><i /> 01 · CHOOSE A ROOM</span><small>{upload ? 'Using your uploaded room' : 'Start with a sample interior'}</small></div><div className="showroom-room-picker">{visualizerRooms.map((item, index) => <button key={item.name} type="button" aria-pressed={!upload && room === index} className={!upload && room === index ? 'active' : ''} onClick={() => { setRoom(index); setUpload(''); setCompare(false) }}><img src={item.image} alt=""/><span>{item.name}</span>{!upload && room === index && <b>✓</b>}</button>)}</div></div>
      </div>
      <aside className="showroom-controls">
        <div className="showroom-controls-head"><span className="eyebrow"><i /> 02 · CUSTOMISE THE LOOK</span><span className="showroom-live"><i/> LIVE PREVIEW</span></div>
        <section><div className="showroom-control-heading"><b>Surface</b><small>Where should this tile appear?</small></div><div className="showroom-segment">{(['floor', 'wall', 'both'] as Surface[]).map((item) => <button key={item} type="button" aria-pressed={surface === item} className={surface === item ? 'active' : ''} onClick={() => setSurface(item)}>{item === 'both' ? 'Floor + wall' : item[0].toUpperCase() + item.slice(1)}</button>)}</div></section>
        <section><div className="showroom-control-heading"><b>Choose a catalogue look</b><small>Select a finish to preview</small></div><div className="showroom-finishes">{tileLooks.map((item, index) => <button key={item.name} type="button" aria-pressed={look === index} className={look === index ? 'active' : ''} onClick={() => { setLook(index); setCompare(false) }}><img src={item.image} alt=""/><span>{item.name}</span>{look === index && <i>✓</i>}</button>)}</div></section>
        <section className="showroom-detail-controls"><label><span>Tile format</span><select value={format} onChange={(event) => setFormat(event.target.value)}>{formats.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Lay pattern</span><select value={pattern} onChange={(event) => setPattern(event.target.value as Pattern)}><option value="straight">Straight lay</option><option value="brick">Brick bond</option><option value="diagonal">Diagonal</option></select></label></section>
        <label className="showroom-strength"><span>Tile visibility <b>{strength}%</b></span><input type="range" min="30" max="100" value={strength} onChange={(event) => setStrength(Number(event.target.value))}/><small>Adjust to blend the finish with the room lighting.</small></label>
        <div className="showroom-actions"><button type="button" className="showroom-save" onClick={saveDesign}>{saveStatus || 'Save this design'}</button><button type="button" className="showroom-reset" onClick={() => { setRoom(defaultDesign.room); setLook(defaultDesign.look); setSurface(defaultDesign.surface); setPattern(defaultDesign.pattern); setFormat(defaultDesign.format); setStrength(defaultDesign.strength); setCompare(false); setCompareAt(52); if (upload.startsWith('blob:')) URL.revokeObjectURL(upload); setUpload(''); setUploadError(''); setSaveStatus('Preview reset') }}>{'Reset preview'}</button><button type="button" className="showroom-enquire" onClick={onEnquire}>Ask about this tile <span>↗</span></button></div>
        <p className="showroom-disclaimer">A visual guide, not a photorealistic render. Tile colour and finish can vary by lighting, device and batch; confirm product suitability with the VENTOZZA team.</p>
      </aside>
    </div>
  </div>
}
