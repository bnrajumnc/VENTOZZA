import { useState } from 'react'
import states from './roadmapStates.json'
import './AboutRoadmap.css'

const phases = [
  { zone: 'south', title: 'South India', status: 'Current focus', label: 'Deepen our roots', note: 'Deepen support across Telangana, Andhra Pradesh, Karnataka and Tamil Nadu.', places: ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'], x: 300, y: 565 },
  { zone: 'east', title: 'East India', status: 'Next', label: 'Extend our reach', note: 'Odisha, West Bengal and the eastern corridor.', places: ['Odisha', 'West Bengal'], x: 445, y: 390 },
  { zone: 'north', title: 'North India', status: 'Future', label: 'Build what’s next', note: 'Metro and Tier-1 markets, backed by the operating playbook.', places: ['Metro & Tier-1 markets'], x: 260, y: 235 },
] as const

export default function ExpansionRoadmap() {
  const [activeZone, setActiveZone] = useState<string>('south')
  const active = phases.find(phase => phase.zone === activeZone)!

  return <section className="expansion-roadmap" id="about-roadmap" aria-labelledby="about-roadmap-title">


    <div className="expansion-inner">


      <header className="expansion-heading">


        <div>

          <span className="expansion-eyebrow">OUR EXPANSION ROADMAP</span>


          <h2 id="about-roadmap-title">Growing to serve

            <br className="expansion-title-break" /> you better.</h2></div>


        <p>A stronger presence. The same commitment.

          <br />Supporting builders wherever they build next.</p>
      </header>


      <div className="expansion-layout">


        <figure className="expansion-map" data-active={activeZone}>


          <div className="expansion-map-caption">

            <span className="expansion-live-dot" /> A considered journey across India</div>


          <svg viewBox="0 0 760 830" role="img" aria-labelledby="expansion-map-title expansion-map-description">


            <title id="expansion-map-title">Ventozza expansion roadmap</title>


            <desc id="expansion-map-description">Southern target states, Odisha and West Bengal, and an illustrative northern region. Select a phase using the controls below or the roadmap entries.</desc>


            <defs>

              <linearGradient id="expansion-map-fade">

                <stop offset="0%" stopColor="white" />

                <stop offset="84%" stopColor="white" />

                <stop offset="100%" stopColor="white" stopOpacity="0.15" /></linearGradient>

              <mask id="expansion-map-mask">

                <rect width="760" height="830" fill="url(#expansion-map-fade)" /></mask></defs>


            <g className="expansion-states" mask="url(#expansion-map-mask)">
              {states.map(state => <path key={state.name} d={state.path} data-zone={state.zone} className={state.zone === activeZone ? 'is-active' : ''}>

                <title>{state.name}</title></path>)}
            </g>


            <path id="expansion-route-path" className="expansion-route" d="M300 565 C420 540 510 470 445 390 S325 370 260 235" />


            <circle className="expansion-route-traveler" r="7" aria-hidden="true">


              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">


                <mpath href="#expansion-route-path" />
              </animateMotion>
            </circle>
            {phases.map((phase, index) => <g key={phase.zone} data-region={phase.zone} className={`expansion-map-marker ${phase.zone === activeZone ? 'is-active' : ''}`} transform={`translate(${phase.x} ${phase.y})`} aria-hidden="true">

              <circle className="expansion-marker-halo" r="27" />

              <circle r="17" />

              <text textAnchor="middle" dy="5">0{index + 1}</text></g>)}
          </svg>


          <figcaption>


            <div className="expansion-legend" aria-label="Highlight a roadmap region">
              {phases.map(phase => <button type="button" key={phase.zone} data-region={phase.zone} aria-pressed={activeZone === phase.zone} onClick={() => setActiveZone(phase.zone)}>

                <i aria-hidden="true" />{phase.title}</button>)}
            </div>


            <p className="expansion-map-note">Illustrative expansion zones · not office locations</p>
          </figcaption>
        </figure>


        <div className="expansion-phases">
          {phases.map((phase, index) => <article key={phase.zone} data-region={phase.zone} className={activeZone === phase.zone ? 'is-active' : ''}>


            <button type="button" className="expansion-phase-select" aria-pressed={activeZone === phase.zone} onClick={() => setActiveZone(phase.zone)}>


              <span className="expansion-phase-number">0{index + 1}</span>


              <span className="expansion-phase-title">

                <span className="expansion-phase-label">{phase.label}</span>

                <span className="expansion-region-name">{phase.title}</span></span>


              <span className="expansion-phase-status">{phase.status}</span>
            </button>


            <p>{phase.note}</p>
          </article>)}


          <div className="expansion-focus" data-region={activeZone} aria-live="polite" aria-atomic="true">


            <span className="expansion-focus-label">{active.title} · {active.status}</span>


            <div>{active.places.map(place => <span key={place}>{place}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
