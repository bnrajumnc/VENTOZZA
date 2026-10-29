
import ventozzaLogo from '../../assets/ventozza-logo-footer.png'
import { catalogueSizeLabels } from '../data/tileData'
import './SiteFooter.css'

type Page = 'home' | 'about' | 'certificates' | 'contact'

type TileView =
  | 'overview'
  | 'size'
  | 'look-feel'
  | 'catalogues'
  | 'visualizer'
  | 'calculator'

type Props = {
  onNavigate: (page: Page) => void
  onNavigateTiles: (
    view: TileView,
    catalogueFormat?: string | null,
  ) => void
}

const sizeFilters: Record<string, string> = {
  '1200 × 1800 mm': '1200x1800',
  '800 × 1600 mm': '800x1600',
  '800 × 800 mm': '800x800',
  '600 × 1200 mm': '600x1200',
  '600 × 600 mm': '600x600',
  '300 × 600 mm': '300x600',
  '300 × 450 mm': '300x450',
  '200 × 1200 mm': '200x1200',
  '600 × 1200 & 600 Full-Body mm': '600-full-body',
  'Step & riser formats': 'step-riser',
}

export default function SiteFooter({
  onNavigate,
  onNavigateTiles,
}: Props) {
  const handlePageNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: Page,
  ) => {
    event.preventDefault()
    onNavigate(page)
  }

  const handleTileNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    view: TileView,
    format?: string | null,
  ) => {
    event.preventDefault()
    onNavigateTiles(view, format)
  }

  const visibleSizes = catalogueSizeLabels.filter(
    (size) => !/150\s*[×x]\s*900/i.test(size),
  )

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <a
            href="#home"
            aria-label="VENTOZZA home"
            onClick={(event) =>
              handlePageNavigation(event, 'home')
            }
          >
            <img src={ventozzaLogo} alt="VENTOZZA" />
          </a>

          <p>
            Tiles for walls and floors, with considered styles,
            sizes and finishes for real spaces.
          </p>
        </div>

        {/* Quick links */}
        <div className="footer-links">
          <span>QUICK LINKS</span>

          <a
            href="#home"
            onClick={(event) =>
              handlePageNavigation(event, 'home')
            }
          >
            Home
          </a>

          <a
            href="#about"
            onClick={(event) =>
              handlePageNavigation(event, 'about')
            }
          >
            About Us
          </a>

          <a
            href="#products"
            onClick={(event) =>
              handleTileNavigation(event, 'catalogues')
            }
          >
            E-Catalogue
          </a>

          <a
            href="#products"
            onClick={(event) =>
              handleTileNavigation(event, 'visualizer')
            }
          >
            Digital Visualizer
          </a>

          <a
            className="footer-sub-link"
            href="#products"
            onClick={(event) =>
              handleTileNavigation(event, 'calculator')
            }
          >
            ↳ Tile calculator
          </a>

          <a
            href="#certificates"
            onClick={(event) =>
              handlePageNavigation(event, 'certificates')
            }
          >
            Certificates
          </a>

          <a
            href="#contact"
            onClick={(event) =>
              handlePageNavigation(event, 'contact')
            }
          >
            Contact Us
          </a>
        </div>

        {/* Product sizes linking to catalogues */}
        <div className="footer-links footer-sizes" >
          <span>PRODUCT SIZES</span>

          {visibleSizes.map((size) => (
            <a
              href="#tiles/catalogues"
              key={size}
              onClick={(event) =>
                handleTileNavigation(
                  event,
                  'catalogues',
                  sizeFilters[size] ?? null,
                )
              }
            >
              {size.replace(' mm', '')}
            </a>
          ))}
        </div>

        {/* Office addresses */}
        <div className="footer-note footer-addresses">
          <span>CORPORATE</span>

          <p>
            <b style={{ fontSize: '16px' }}>
              Registered Office:
            </b>
            <br />
            10-3-71/3/A, 3rd Floor,
            <br />
            Teachers Colony, East Marredpally,
            <br />
            Secunderabad – 500026,
            <br />
            Telangana, India
          </p>

          <p>
            <b style={{ fontSize: '16px' }}>
              Corporate Office:
            </b>
            <br />
            Siromani 142, Ground Floor,
            <br />
            G-15, Near Eden Ceramic,
            <br />
            NH-8A, Lalpar, Morbi-2,
            <br />
            Gujarat, India
          </p>
        </div>

        {/* Contact information */}
        <div className="footer-note footer-contact">
          <span>CONTACT US</span>

          <p className="footer-company">
            VENTOZZA SURFACES
          </p>

          <p>
            <b>H. Narayana Rao</b>
            <br />
            Vice President – Sales &amp; Marketing
          </p>

          <a href="mailto:sales@ventozzasurfaces.com">
            sales@ventozzasurfaces.com
          </a>

          <a
            href="#contact"
            onClick={(event) =>
              handlePageNavigation(event, 'contact')
            }
          >
            Request a call back ↗︎
          </a>

          <a
            href="https://www.ventozzasurfaces.com"
            target="_blank"
            rel="noreferrer"
          >
            www.ventozzasurfaces.com ↗︎
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <span>© 2026 VENTOZZA. ALL RIGHTS RESERVED.</span>
        <span>TILE ENQUIRIES · WALL &amp; FLOOR</span>
      </div>
    </footer>
  )
}
