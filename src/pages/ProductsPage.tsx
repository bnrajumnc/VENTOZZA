import CatalogueApplications from './CatalogueApplications'
import TileCalculator from './TileCalculator'
import CataloguesPage from './CataloguesPage'
import './ProductsPage.css'
import FinishExplorer from './FinishExplorer'
import { suppliedSurfaceGallery } from '../data/tileData'

type TileView = 'overview' | 'size' | 'look-feel' | 'visualizer' | 'calculator' | 'catalogues'
type View = { id: TileView; label: string }
type Props = {
  tileView: TileView; views: readonly View[]; productSearch: string;
  sizeOptions: { name: string; dimensions: string; note: string; image: string }[];
  looks: { name: string; note: string; image: string; finish: string }[];
  initialCatalogueFormat?: string | null;
  onSelect: (view: TileView, catalogueFormat?: string | null) => void; onEnquire: (interest: string) => void; onClearSearch: () => void; onNavigateContact: () => void
}
const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗︎' : '→'}</span>

export default function ProductsPage(p: Props) {
  const visibleSurfaces = suppliedSurfaceGallery.filter(surface => `${surface.title} ${surface.note}`.toLowerCase().includes(p.productSearch.trim().toLowerCase()))
  return <>
    <section className="products section-wrap" id="products">
      {p.tileView === 'overview' && <div className="all-tiles-library">


        <div className="all-tiles-library-heading">


          <div>

            <span className="eyebrow">

              <i /> ALL TILES · SURFACE LIBRARY</span>

            <h3>{p.productSearch ? `Results for “${p.productSearch}”` : 'Explore the VENTOZZA surface collection.'}</h3>

            <p>Browse decorative patterns, marble looks and expressive stone surfaces. Select a design to continue to the catalogue library.</p></div>


          <button className="text-action" onClick={() => p.onSelect('catalogues')}>BROWSE CATALOGUES

            <Arrow /></button>
        </div>
        {visibleSurfaces.length ? <div className="all-tiles-library-grid">{visibleSurfaces.map((surface) => <button type="button" className="all-tiles-library-card reveal" key={surface.image} onClick={() => p.onSelect('catalogues')}>


          <span className="all-tiles-library-image">

            <img src={surface.image} alt={`${surface.title} tile surface`} loading="lazy" /></span>


          <span className="all-tiles-library-copy">

            <small>{surface.note}</small>

            <b>{surface.title}</b></span>
        </button>)}</div> : <p className="no-product-results">No surfaces match that search. Try “marble”, “decor” or a collection name.</p>}
        {p.productSearch && <button className="clear-tile-search" onClick={p.onClearSearch}>CLEAR SEARCH ×</button>}
      </div>}
      {p.tileView === 'size' && <div className="size-view">

        <div className="tile-view-heading">

          <div>

            <span className="eyebrow">

              <i /> BROWSE BY FORMAT</span>

            <h3>Explore size options.</h3></div>

          <p>Compare catalogue formats from 1200 × 2400 mm statement slabs and 1200 × 1800 mm surfaces to 300 × 450 mm wall tiles and 200 × 1200 mm wood-look planks. Select a format to ask about its range.</p></div>

        <div className="tile-size-grid">{p.sizeOptions.map((o) => <button type="button" className="tile-size-card" key={o.dimensions} onClick={() => p.onEnquire(`${o.name} (${o.dimensions}) tile enquiry`)}>

          <div className="tile-size-image">

            <img src={o.image} alt={`${o.name} tile format inspiration`} loading="lazy" />

            <span className="tile-dimension-diagram">

              <i />

              <b>{o.dimensions}</b></span></div>

          <strong>{o.name}</strong>

          <small>{o.dimensions}</small>

          <span className="tile-size-note">{o.note}

            <Arrow diagonal /></span></button>)}</div></div>}
      {p.tileView === 'look-feel' && <FinishExplorer onEnquire={p.onEnquire} onCatalogue={(format) => p.onSelect('catalogues', format)} />}
      {p.tileView === 'visualizer' && <CatalogueApplications onEnquire={p.onEnquire} onBrowseCatalogues={(format) => p.onSelect('catalogues', format)} />}
      {p.tileView === 'calculator' && <TileCalculator onEnquire={() => p.onEnquire('Tile quantity estimate enquiry')} />}
      {p.tileView === 'catalogues' && <CataloguesPage initialFormat={p.initialCatalogueFormat} onEnquire={p.onEnquire} />}
    </section>
  </>
}
