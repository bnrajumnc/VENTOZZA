import DigitalShowroom from './DigitalShowroom'
import TileCalculator from './TileCalculator'
import CataloguesPage from './CataloguesPage'
import './ProductsPage.css'

type Product = { name:string; code:string; size:string; finish:string; image:string; alt:string }
type TileView = 'overview'|'size'|'look-feel'|'visualizer'|'calculator'|'catalogues'
type View = {id:TileView;label:string}
type Props = {
  tileView:TileView; views:readonly View[]; products:Product[]; productSearch:string;
  sizeOptions:{name:string;dimensions:string;note:string;image:string}[];
  looks:{name:string;note:string;image:string;finish:string}[];
  initialCatalogueFormat?: string | null;
  onSelect:(view:TileView)=>void; onEnquire:(interest:string)=>void; onClearSearch:()=>void; onNavigateContact:()=>void
}
const Arrow=({diagonal=false}:{diagonal?:boolean})=><span aria-hidden="true">{diagonal?'↗︎':'→'}</span>

export default function ProductsPage(p:Props) {
  const browseViews=p.views.filter(v=>v.id!=='visualizer'&&v.id!=='calculator')
  return <>
    <section className="products section-wrap" id="products">
      <div className="section-head reveal"><div><div className="eyebrow"><i/> THE VENTOZZA TILE COLLECTION</div><h2>Find your<br/>kind of <em>tile.</em></h2></div><div className="section-head-aside"><p>Explore ceramic wall and floor tiles by format, surface character or catalogue. Find large-format slabs, wood-look planks and decorative designs, then ask our team about product details and availability.</p><button className="under-link" onClick={p.onNavigateContact}>ASK ABOUT TILES <Arrow/></button></div></div>
      <div className="tile-subnav" aria-label="Browse tiles">{browseViews.map(v=><button key={v.id} className={p.tileView===v.id?'tile-tab active':'tile-tab'} onClick={()=>p.onSelect(v.id)}>{v.label}</button>)}</div>
      {p.tileView==='overview'&&<><div className="tile-view-heading"><div><span className="eyebrow"><i/> FEATURED CATALOGUE DESIGNS</span><h3>{p.productSearch?`Results for “${p.productSearch}”`:'Decorative wall tiles, in four distinct looks.'}</h3><p className="tile-view-description">Explore selected 300 × 450 mm glossy designs from the catalogues: Fish &amp; Flower, Kitchen 2, Golden and Honeycomb. Open Catalogues to browse the full format brochures.</p></div><button className="text-action" onClick={()=>p.onSelect('catalogues')}>BROWSE CATALOGUES <Arrow/></button></div>{p.products.length?<div className="product-grid">{p.products.map((product)=><button className="product-card reveal" key={product.name} onClick={()=>p.onEnquire(`${product.name} tile enquiry`)}><div className="product-image"><img src={product.image} alt={product.alt} loading="lazy"/><span className="product-arrow"><Arrow diagonal/></span><span className="product-tag">{product.finish}</span></div><div className="product-info"><span>{product.code}</span><h3>{product.name}</h3><div className="product-details"><span>{product.size}</span><span>ASK ABOUT IT <Arrow/></span></div></div></button>)}</div>:<p className="no-product-results">No featured designs match that search. Try a tile name such as “Golden” or clear your search.</p>}{p.productSearch&&<button className="clear-tile-search" onClick={p.onClearSearch}>CLEAR SEARCH ×</button>}</>}
      {p.tileView==='size'&&<div className="size-view"><div className="tile-view-heading"><div><span className="eyebrow"><i/> BROWSE BY FORMAT</span><h3>Explore size options.</h3></div><p>Compare catalogue formats from 1200 × 2400 mm statement slabs and 1200 × 1800 mm surfaces to 300 × 450 mm wall tiles and 200 × 1200 mm wood-look planks. Select a format to ask about its range.</p></div><div className="tile-size-grid">{p.sizeOptions.map((o)=><button type="button" className="tile-size-card" key={o.dimensions} onClick={()=>p.onEnquire(`${o.name} (${o.dimensions}) tile enquiry`)}><div className="tile-size-image"><img src={o.image} alt={`${o.name} tile format inspiration`} loading="lazy"/><span className="tile-dimension-diagram"><i/><b>{o.dimensions}</b></span></div><strong>{o.name}</strong><small>{o.dimensions}</small><span className="tile-size-note">{o.note} <Arrow diagonal/></span></button>)}</div></div>}
      {p.tileView==='look-feel'&&<div className="lookfeel-view"><div className="tile-view-heading"><div><span className="eyebrow"><i/> SURFACE FINISHES</span><h3>Choose the finish that suits your space.</h3></div><p>Compare the four finish styles shown in the VENTOZZA catalogue. Each card gives a visual starting point; finish availability can vary by design and size, so ask our team to confirm a specific combination.</p></div><div className="lookfeel-grid">{p.looks.map((item,i)=><button type="button" key={item.name} className="lookfeel-card" onClick={()=>p.onEnquire(`${item.name} finish availability enquiry`)}><img src={item.image} alt={`${item.name} surface example from the VENTOZZA catalogue`} loading="lazy"/><span className="lookfeel-number">0{i+1}</span><span className="lookfeel-card-title">{item.name}<small>{item.note}</small></span><span className="lookfeel-arrow"><Arrow diagonal/></span></button>)}</div><p className="lookfeel-footnote">Screen previews are indicative. Confirm the exact tile, finish and size before ordering.</p></div>}
      {p.tileView==='visualizer'&&<DigitalShowroom onEnquire={()=>p.onEnquire('Digital showroom tile enquiry')}/>}
      {p.tileView==='calculator'&&<TileCalculator onEnquire={()=>p.onEnquire('Tile quantity estimate enquiry')}/>}
      {p.tileView==='catalogues'&&<CataloguesPage initialFormat={p.initialCatalogueFormat} onEnquire={p.onEnquire}/>}
      {/* {p.tileView==='overview'&&<div className="format-strip"><b>CATALOGUE FORMATS</b>{catalogueSizeLabels.map((size)=><span key={size}>{size}</span>)}</div>} */}
    </section>
  </>
}
