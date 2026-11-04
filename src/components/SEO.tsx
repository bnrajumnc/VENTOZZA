import { useEffect } from 'react'

export type SEOPage = 'home' | 'products' | 'about' | 'certificates' | 'contact'
export type SEOTileView = 'overview' | 'size' | 'look-feel' | 'visualizer' | 'calculator' | 'catalogues'

type SEOProps = {
  page: SEOPage
  tileView?: SEOTileView
}

const brandName = 'VENTOZZA'
const canonicalUrl = 'https://www.ventozzasurfaces.com/'
const defaultImage = `${canonicalUrl}images/ventozza/ventozza-logo-clear.png`

const tileViewMetadata: Record<SEOTileView, { title: string; description: string }> = {
  overview: {
    title: 'Ceramic Tile Collection',
    description: 'Browse VENTOZZA ceramic tile designs for walls and floors, and find a style for your space.',
  },
  size: {
    title: 'Tile Sizes & Formats',
    description: 'Explore VENTOZZA tile sizes and formats, from large-format slabs to decorative wall tiles.',
  },
  'look-feel': {
    title: 'Tile Looks & Finishes',
    description: 'Explore VENTOZZA tile looks, colours and finishes, including glossy, matt and rustic surfaces.',
  },
  visualizer: {
    title: 'Digital Tile Showroom',
    description: 'Browse room applications and discover VENTOZZA tile designs alongside matching catalogues.',
  },
  calculator: {
    title: 'Tile Quantity Calculator',
    description: 'Estimate tile quantities using room dimensions, tile format and an allowance for cuts.',
  },
  catalogues: {
    title: 'Tile Catalogues',
    description: 'Browse VENTOZZA tile catalogues by size and design, and view available product documents.',
  },
}

const pageMetadata: Record<Exclude<SEOPage, 'products'>, { title: string; description: string }> = {
  home: {
    title: 'Ceramic Tiles for Walls and Floors',
    description: 'Explore VENTOZZA ceramic tiles for residential and commercial spaces, with considered sizes, styles and finishes.',
  },
  about: {
    title: 'About VENTOZZA Surfaces',
    description: 'Learn about VENTOZZA, its tile expertise, company story, team and expansion across India.',
  },
  certificates: {
    title: 'Tile Quality & Certificates',
    description: 'View VENTOZZA quality information and request product specifications, certificates and tile care guidance.',
  },
  contact: {
    title: 'Contact VENTOZZA',
    description: 'Contact the VENTOZZA tile team for product information, availability and project enquiries.',
  },
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = url
}

/** Keeps document and social preview metadata in one reusable place for every SPA route. */
export default function SEO({ page, tileView = 'overview' }: SEOProps) {
  useEffect(() => {
    const metadata = page === 'products' ? tileViewMetadata[tileView] : pageMetadata[page]
    const title = page === 'home' ? `${brandName} — ${metadata.title}` : `${metadata.title} | ${brandName}`

    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', metadata.description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', `${brandName} Surfaces`)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[property="og:image"]', 'property', 'og:image', defaultImage)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', defaultImage)
    setCanonical(canonicalUrl)
  }, [page, tileView])

  return null
}
