import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from 'react'
import ventozzaLogo from '../assets/ventozza-logo-clear.png'
import SiteFooter from './components/SiteFooter'
import { enquiryRecipient, submitEnquiry } from './utils/formSubmit'
import { products, tileLooks, tileSizeOptions } from './data/tileData'
import AboutPage from './pages/AboutPage'
import CertificatesPage from './pages/CertificatesPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'

const slides = [
  {
    eyebrow: 'TILES THAT FEEL LIKE HOME',
    title: <>Find the tile<br />that feels like <em>you.</em></>,
    body: 'Explore tile styles, sizes and finishes for every room, from one considered collection.',
    image: '/images/ventozza/catalogue-art/hero-slide-01.webp',
    alt: 'Marble-look ceramic tiles across the walls and floor of a modern bathroom',
    note: 'MARBLE-LOOK · WALL & FLOOR',
  },
  {
    eyebrow: 'A TILE FOR EVERY ROOM',
    title: <>Make room<br />for a new <em>look.</em></>,
    body: 'From subtle stone looks to expressive patterns, find tiles that bring your ideas together.',
    image: '/images/ventozza/catalogue-art/hero-slide-02.webp',
    alt: 'Warm wood-look tile flooring in a contemporary dining space',
    note: '200 × 1200 MM · WOOD-LOOK PLANK',
  },
  {
    eyebrow: 'SIZE. FINISH. FEEL.',
    title: <>The right tile<br />changes <em>everything.</em></>,
    body: 'Compare formats and finishes, then find the tile that fits your project and your plans.',
    image: '/images/ventozza/catalogue-art/hero-slide-03.webp',
    alt: 'Modern bathroom with clearly detailed wall and floor tiles',
    note: '600 × 1200 MM · FULL BODY',
  },
  {
    eyebrow: 'LARGE-FORMAT SURFACES',
    title: <>A calmer kind<br />of <em>statement.</em></>,
    body: 'Create a seamless impression with generous tile formats and considered stone looks.',
    image: '/images/ventozza/catalogue-art/hero-slide-04.webp',
    alt: 'Bright dining interior with large format ceramic floor tiles',
    note: '800 × 1600 MM · GLOSSY RANGE',
  },
  {
    eyebrow: 'SURFACES FOR EVERY ROOM',
    title: <>Let the room<br />find its <em>rhythm.</em></>,
    body: 'Browse tile looks for kitchens, living spaces, bathrooms and more.',
    image: '/images/ventozza/catalogue-art/hero-slide-05.webp',
    alt: 'Contemporary living room finished with large format floor tiles',
    note: '800 × 1600 MM · ANT CREMILO',
  },
  {
    eyebrow: 'COLOUR. TEXTURE. CHARACTER.',
    title: <>A surface that<br />speaks <em>your style.</em></>,
    body: 'From soft stone tones to distinctive patterns, find a finish that feels right.',
    image: '/images/ventozza/catalogue-art/hero-slide-06.webp',
    alt: 'Modern lounge with pale tile flooring and layered architectural details',
    note: '800 × 1600 MM · ANT GREY',
  },
]

const tileViews = [
  { id: 'overview', label: 'All tiles' },
  { id: 'size', label: 'By size' },
  { id: 'look-feel', label: 'Look & feel' },
  { id: 'visualizer', label: 'Digital visualizer' },
  { id: 'calculator', label: 'Tile calculator' },
  { id: 'catalogues', label: 'Catalogues' },
  // Temporarily disabled site-wide: By location and Collections.
] as const
type TileView = typeof tileViews[number]['id']
const normalizeSearchText = (value: string) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[×✕]/g, 'x')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
type Page = 'home' | 'products' | 'about' | 'certificates' | 'contact'
type ChatAction = { label: string; page?: Page; tileView?: TileView; prompt?: string; catalogueFormat?: string }
type ChatMessage = { id: number; role: 'assistant' | 'user'; text: string; actions?: ChatAction[] }

const chatFormats = [
  { key: '1200x1800', size: '1200 × 1800 mm', groups: ['1200x1800'], details: 'The catalogue includes Opulenza, Glossy, DG Matt and Carving ranges in this format.' },
  { key: '800x1600', size: '800 × 1600 mm', groups: ['800x1600'], details: 'Available catalogue ranges include Glossy, Glossy Endless, Matt, Carving, Lustra, GHR and GLR.' },
  { key: '800x800', size: '800 × 800 mm', groups: ['800x800'], details: 'This square format appears in the Double Charge catalogue range.' },
  { key: '600x1200', size: '600 × 1200 mm', groups: ['600-full-body'], details: 'The supplied 600 × 1200 catalogues include Full Body, Magic Series and Traventino ranges.' },
  { key: '600x600', size: '600 × 600 mm', groups: ['600x600', '600-full-body'], details: 'This square format is listed in the Full Body and 600 × 600 catalogue material.' },
  { key: '300x600', size: '300 × 600 mm', groups: ['300x600'], details: 'The catalogue includes Satin Matt, Glossy, Nature Series and decorative wall-tile ranges.' },
  { key: '300x450', size: '300 × 450 mm', groups: ['300x450'], details: 'The catalogue includes Glossy, Kitchen, Fish & Flower and other decorative wall-tile ranges.' },
  { key: '200x1200', size: '200 × 1200 mm', groups: ['200x1200'], details: 'This long plank format is listed in the GVT Wood Planks and related brochures.' },
  { key: '600x1200', size: '600 × 1200 mm', groups: ['600x1200'], details: 'The supplied 600 × 1200 catalogues include Full Body, Magic Series and Traventino ranges.' },
]

const normalizeChat = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[×✕]/g, 'x')
const findChatFormat = (message: string) => {
  const compact = message.replace(/\s+/g, '')
  return chatFormats.find((format) => compact.includes(format.key))
}

const getTileReply = (question: string, previousQuestion = ''): Pick<ChatMessage, 'text' | 'actions'> => {
  const message = normalizeChat(question)
  const previous = normalizeChat(previousQuestion)
  const matchedFormat = findChatFormat(message)
  const previousFormat = findChatFormat(previous)
  const relevantFormat = matchedFormat ?? previousFormat
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(message)) return { text: 'Hello! I’m the VENTOZZA tile guide. I can help with catalogue formats, room ideas, finishes, quantity estimates and product documents. What are you working on?', actions: [{ label: 'Find a tile size', page: 'products', tileView: 'size' }, { label: 'Open visualizer', page: 'products', tileView: 'visualizer' }, { label: 'Calculate quantity', page: 'products', tileView: 'calculator' }] }
  if (/visuali[sz]|showroom|preview|upload my room/.test(message)) return { text: 'The Digital Visualizer lets you preview tile looks in the living room, kitchen or bathroom scene. Choose a room, then compare the available surface looks. The preview is indicative; screen colour may differ from a physical tile.', actions: [{ label: 'Open digital visualizer', page: 'products', tileView: 'visualizer' }, { label: 'Browse tile finishes', page: 'products', tileView: 'look-feel' }] }
  if (/calculat|how many|quantity|pieces|tiles needed|wastage/.test(message)) return { text: matchedFormat ? `For ${matchedFormat.size}, each tile covers about ${Number(matchedFormat.key.slice(0, matchedFormat.key.indexOf('x'))) * Number(matchedFormat.key.slice(matchedFormat.key.indexOf('x') + 1)) / 1_000_000} m². The calculator uses your room dimensions and extra allowance to estimate pieces; confirm box coverage and installation requirements with your tile professional.` : 'The calculator estimates tile pieces from room length × width, selected tile format and an extra allowance for cuts. Enter the room dimensions in metres and choose a tile size to see an estimate. Want to open it?', actions: [{ label: 'Open tile calculator', page: 'products', tileView: 'calculator' }, ...(matchedFormat ? [{ label: `Browse ${matchedFormat.size}`, page: 'products' as Page, tileView: 'catalogues' as TileView, catalogueFormat: matchedFormat.groups[0] }] : [{ label: 'Browse available sizes', page: 'products' as Page, tileView: 'size' as TileView }])] }
  if (matchedFormat && !/catalog|brochure|download|pdf|kitchen|bath|shower|finish|texture|pattern|look|style|colour|color|glossy|matte|rustic|carving|calculate|quantity|pieces|how many|good for|suitable|room|wall|floor/.test(message)) return { text: `${matchedFormat.size} is listed in the VENTOZZA catalogue. ${matchedFormat.details} Would you like to see those catalogues or estimate how many tiles your room may need?`, actions: [{ label: `View ${matchedFormat.size} catalogues`, page: 'products', tileView: 'catalogues', catalogueFormat: matchedFormat.groups[0] }, { label: 'Calculate quantity', page: 'products', tileView: 'calculator' }] }
  if (/catalog|brochure|download|pdf/.test(message)) return { text: relevantFormat ? `I can take you directly to the ${relevantFormat.size} brochures. Open a catalogue to preview its PDF here, or use Download to save it.` : 'The e-catalogue library keeps the supplied brochure names and lets you preview PDFs on the site or download them. Which tile size or catalogue name should I look for?', actions: relevantFormat ? [{ label: `View ${relevantFormat.size} catalogues`, page: 'products', tileView: 'catalogues', catalogueFormat: relevantFormat.groups[0] }, { label: 'Browse all catalogues', page: 'products', tileView: 'catalogues' }] : [{ label: 'Browse catalogues', page: 'products', tileView: 'catalogues' }, { label: 'See tile sizes', page: 'products', tileView: 'size' }] }
  if (/what sizes|which sizes|sizes.*offer|size range|all sizes|available sizes|tile sizes|formats/.test(message)) return { text: 'The catalogue lists 1200 × 1800, 800 × 1600, 800 × 800, 600 × 1200, 600 × 600, 300 × 600, 300 × 450, 200 × 1200, 600 × 1200, and 150 × 900 mm, plus step-and-riser formats. Tell me one size and I’ll point you to its catalogue.', actions: [{ label: 'Browse sizes', page: 'products', tileView: 'size' }, { label: 'Browse catalogues', page: 'products', tileView: 'catalogues' }] }
  if (/kitchen/.test(message)) return { text: relevantFormat ? `For a kitchen, ${relevantFormat.size} is a listed format. The best choice depends on whether it is for a wall or floor, the layout and cleaning needs. The catalogue can show designs available in that size.` : 'For kitchens, consider easy-to-clean wall tiles for the splashback and a floor finish suited to the application. The catalogue includes patterned, marble-look, subway/kitkat, terrazzo and other wall looks. The visualizer includes a kitchen scene.', actions: [{ label: 'Preview a kitchen', page: 'products', tileView: 'visualizer' }, ...(relevantFormat ? [{ label: `See ${relevantFormat.size} catalogues`, page: 'products' as Page, tileView: 'catalogues' as TileView, catalogueFormat: relevantFormat.groups[0] }] : [{ label: 'Explore tile looks', page: 'products' as Page, tileView: 'look-feel' as TileView }])] }
  if (/bath(room)?|shower/.test(message)) return { text: relevantFormat ? `For a bathroom, ${relevantFormat.size} is a listed format. Check the tile’s intended application and slip requirements before selecting it for a wet floor; its catalogue shows the designs and finishes.` : 'Bathrooms often pair a wall feature with a floor finish selected for the application and slip requirements. Explore marble-look, mosaic, Moroccan, terrazzo and subway styles, then confirm suitability and care guidance with the team.', actions: [{ label: 'Preview a bathroom', page: 'products', tileView: 'visualizer' }, { label: 'Explore tile looks', page: 'products', tileView: 'look-feel' }] }
  if (/finish|texture|pattern|look|style|colour|color|glossy|matte|rustic|carving/.test(message)) return { text: relevantFormat ? `${relevantFormat.size} has catalogue ranges in several styles. ${relevantFormat.details} Compare the catalogue covers and confirm the exact finish with the tile team.` : 'The Look & feel section groups surfaces by character, including glossy, matte, rustic and carving styles. Use catalogue images to compare patterns, and check the exact finish with the team before deciding.', actions: [{ label: 'Explore Look & feel', page: 'products', tileView: 'look-feel' }, ...(relevantFormat ? [{ label: `Browse ${relevantFormat.size}`, page: 'products' as Page, tileView: 'catalogues' as TileView, catalogueFormat: relevantFormat.groups[0] }] : [{ label: 'Browse catalogues', page: 'products' as Page, tileView: 'catalogues' as TileView }])] }
  if (/bedroom|living|lounge|hall|interior|floor|wall|outdoor|balcony|parking|stair/.test(message)) return { text: relevantFormat ? `For that space, ${relevantFormat.size} is one catalogue-listed option. The best choice depends on the area, installation surface, desired look and maintenance needs. I can show the matching catalogue.` : 'Start with how the space is used, then compare colour, finish, tile scale and maintenance. The catalogue covers indoor and outdoor applications, from living spaces and balconies to parking and stairs.', actions: [{ label: 'Browse tile range', page: 'products', tileView: 'overview' }, ...(relevantFormat ? [{ label: `See ${relevantFormat.size} catalogues`, page: 'products' as Page, tileView: 'catalogues' as TileView, catalogueFormat: relevantFormat.groups[0] }] : [{ label: 'Open visualizer', page: 'products' as Page, tileView: 'visualizer' as TileView }])] }
  if (/cert|technical|document|install|care|clean/.test(message)) return { text: 'The Certificates page explains the available quality documentation and how to request product specifications, certificates or test reports. Installation and care can depend on the selected tile and application, so include the product name in your enquiry.', actions: [{ label: 'Open certificates', page: 'certificates' }, { label: 'Contact the team', page: 'contact' }] }
  if (/where|address|visit|location|buy|dealer|store|office/.test(message)) return { text: 'The Contact page lists VENTOZZA’s registered office in Secunderabad and corporate office in Morbi, Gujarat. Please contact the team before visiting to confirm the right location and product availability.', actions: [{ label: 'View contact details', page: 'contact' }, { label: 'Request a call back', page: 'contact' }] }
  if (/price|cost|rate|available|stock|order|contact|team|callback|call back/.test(message)) return { text: 'Pricing and live stock aren’t shown in this site guide. Send an enquiry with the tile name or catalogue format, project location and approximate quantity, and the team can follow up with current details.', actions: [{ label: 'Send an enquiry', page: 'contact' }, { label: 'Request a call back', page: 'contact' }] }
  if (/\b(thanks|thank you|thankyou)\b/.test(message)) return { text: previousFormat ? `You’re welcome! I can also help you browse the ${previousFormat.size} catalogue or estimate a quantity.` : 'You’re welcome! Ask me about a tile size, room, finish or catalogue whenever you need.', actions: previousFormat ? [{ label: `Browse ${previousFormat.size}`, page: 'products', tileView: 'catalogues', catalogueFormat: previousFormat.groups[0] }, { label: 'Calculate quantity', page: 'products', tileView: 'calculator' }] : [{ label: 'Browse tile sizes', page: 'products', tileView: 'size' }, { label: 'View catalogues', page: 'products', tileView: 'catalogues' }] }
  return { text: 'I can guide you through tile applications, finishes, catalogue sizes, quantity estimates, the digital showroom and product documents. For a tailored suggestion, tell me the room (for example, kitchen or bathroom), whether you need wall or floor tiles, and any size or style you have in mind.', actions: [{ label: 'Browse tile sizes', page: 'products', tileView: 'size' }, { label: 'Explore finishes', page: 'products', tileView: 'look-feel' }, { label: 'Ask the team', page: 'contact' }] }
}

const pageFromHash = (): Page => {
  const id = window.location.hash.slice(1)
  if (id === 'products' || id === 'tile-formats' || id.startsWith('tiles/')) return 'products'
  if (id === 'about') return 'about'
  if (id === 'certificates') return 'certificates'
  if (id === 'contact') return 'contact'
  return 'home'
}

const tileViewFromHash = (): TileView => {
  const key = window.location.hash.slice(1).replace('tiles/', '')
  return tileViews.some((view) => view.id === key) ? key as TileView : 'overview'
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗︎' : '→'}</span>
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tilesMenuOpen, setTilesMenuOpen] = useState(false)
  const [visualizerMenuOpen, setVisualizerMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState<Page>(pageFromHash)
  const [tileView, setTileView] = useState<TileView>(tileViewFromHash)
  const [initialCatalogueFormat, setInitialCatalogueFormat] = useState<string | null>(null)
  const [navigationRevision, setNavigationRevision] = useState(0)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [callbackSent, setCallbackSent] = useState(false)
  const [callbackSending, setCallbackSending] = useState(false)
  const [callbackError, setCallbackError] = useState('')
  const [callbackInterest, setCallbackInterest] = useState('Tile enquiry')
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [showTop, setShowTop] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const nextChatMessageId = useRef(2)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'assistant', text: 'Hello! I’m the VENTOZZA tile guide. Ask me about tile sizes, finishes or choosing tiles for a room.' },
  ])

  const navigateTo = (page: Page) => {
    if (page !== activePage) window.history.pushState(null, '', `#${page}`)
    setActivePage(page)
    setNavigationRevision((revision) => revision + 1)
    setMenuOpen(false)
    setTilesMenuOpen(false)
    setVisualizerMenuOpen(false)
  }

  const navigateToTileView = (view: TileView, catalogueFormat: string | null = null) => {
    const hash = view === 'overview' ? '#products' : `#tiles/${view}`
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)
    setTileView(view)
    setInitialCatalogueFormat(catalogueFormat)
    setActivePage('products')
    setNavigationRevision((revision) => revision + 1)
    setMenuOpen(false)
    setTilesMenuOpen(false)
    setVisualizerMenuOpen(false)
  }

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [activePage, tileView, navigationRevision])

  const handlePageLink = (event: ReactMouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) return
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
    if (!anchor) return
    const target = anchor.getAttribute('href')?.slice(1)
    if (!target) return
    const page: Page = target === 'products' || target === 'tile-formats' ? 'products' : target === 'about' ? 'about' : target === 'certificates' ? 'certificates' : target === 'contact' ? 'contact' : 'home'
    event.preventDefault()
    navigateTo(page)
  }
  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [activePage])

  useEffect(() => {
    const viewTitles: Partial<Record<TileView, string>> = {
      overview: 'Ceramic Tile Collection', size: 'Tile Sizes & Formats', 'look-feel': 'Tile Looks & Finishes',
      visualizer: 'Digital Tile Visualizer', calculator: 'Tile Quantity Calculator', catalogues: 'Tile Catalogues',
    }
    const pageTitles: Record<Page, string> = {
      home: 'Ceramic Tiles for Walls & Floors', products: viewTitles[tileView] ?? 'Tile Collection',
      about: 'About VENTOZZA Surfaces', certificates: 'Tile Quality & Certificates', contact: 'Contact VENTOZZA',
    }
    const pageDescriptions: Record<Page, string> = {
      home: 'Explore VENTOZZA ceramic tile collections, catalogue formats, room inspiration and tile selection tools.',
      products: 'Browse VENTOZZA ceramic tile designs, sizes, finishes and downloadable product catalogues.',
      about: 'Learn about VENTOZZA Surfaces, its tile expertise, offices and company profile.',
      certificates: 'Request VENTOZZA product specifications, quality certificates and tile care information.',
      contact: 'Contact the VENTOZZA tile team for product information, availability and project enquiries.',
    }
    document.title = `${pageTitles[activePage]} | VENTOZZA`
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = pageDescriptions[activePage]
    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (openGraphTitle) openGraphTitle.content = `${pageTitles[activePage]} | VENTOZZA`
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (openGraphDescription) openGraphDescription.content = pageDescriptions[activePage]
  }, [activePage, tileView])

  useEffect(() => {
    const updateScrollState = () => setShowTop(window.scrollY > 420)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (chatOpen) chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [chatOpen, chatMessages])

  useEffect(() => {
    const syncPageFromHash = () => {
      setActivePage(pageFromHash())
      setTileView(tileViewFromHash())
    }
    window.addEventListener('popstate', syncPageFromHash)
    window.addEventListener('hashchange', syncPageFromHash)
    return () => {
      window.removeEventListener('popstate', syncPageFromHash)
      window.removeEventListener('hashchange', syncPageFromHash)
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    const frame = window.requestAnimationFrame(() => {
      const activeView = document.querySelector<HTMLElement>(`main#home[data-page="${activePage}"]`)
      const elements = activeView?.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)') ?? []

      // Reveal content immediately in older browsers that do not support IO.
      if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('is-visible'))
        return
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      }, { threshold: 0.08 })
      elements.forEach((element) => observer?.observe(element))
    })

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [activePage, tileView, navigationRevision])



  const sendChatMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = chatInput.trim()
    if (!text) return
    const previousQuestion = [...chatMessages].reverse().find((message) => message.role === 'user')?.text ?? ''
    const userId = nextChatMessageId.current++
    const assistantId = nextChatMessageId.current++
    setChatMessages((current) => [...current, { id: userId, role: 'user', text }, { id: assistantId, role: 'assistant', ...getTileReply(text, previousQuestion) }])
    setChatInput('')
  }

  const sendQuickPrompt = (text: string) => {
    const previousQuestion = [...chatMessages].reverse().find((message) => message.role === 'user')?.text ?? ''
    const userId = nextChatMessageId.current++
    const assistantId = nextChatMessageId.current++
    setChatMessages((current) => [...current, { id: userId, role: 'user', text }, { id: assistantId, role: 'assistant', ...getTileReply(text, previousQuestion) }])
  }

  const useChatAction = (action: ChatAction) => {
    if (action.prompt) {
      sendQuickPrompt(action.prompt)
      return
    }
    if (action.tileView) {
      navigateToTileView(action.tileView, action.catalogueFormat ?? null)
      return
    }
    if (action.page) navigateTo(action.page)
  }

  const submitCallbackRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    setCallbackSending(true)
    setCallbackError('')
    try {
      await submitEnquiry({
        _subject: 'VENTOZZA callback request',
        name: String(values.get('name') ?? ''),
        phone: String(values.get('phone') ?? ''),
        interest: String(values.get('interest') ?? ''),
      })
      setCallbackSent(true)
      form.reset()
    } catch (submissionError) {
      setCallbackError(submissionError instanceof Error ? submissionError.message : `The callback request could not be sent. Please email ${enquiryRecipient}.`)
    } finally {
      setCallbackSending(false)
    }
  }

  const submitTileSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProductSearch(headerSearch.trim())
    setHeaderSearchOpen(false)
    navigateToTileView('overview')
  }

  const moveSlide = (step: number) => setActiveSlide((current) => (current + step + slides.length) % slides.length)
  const slide = slides[activeSlide]
  const searchTerms = normalizeSearchText(productSearch).split(' ').filter(Boolean)
  const visibleProducts = products.filter((product) => {
    const searchable = normalizeSearchText(`${product.name} ${product.code} ${product.size} ${product.finish} ${product.alt}`)
    return searchTerms.every((term) => searchable.includes(term))
  })

  return (
    <>
      {/* <div className="topline"><span>VENTOZZA · A TILE-FOCUSED COMPANY</span><span>Find your tile <a href="#products" onClick={(event) => { event.preventDefault(); navigateTo('products') }}>Explore <Arrow diagonal /></a></span><span className="topline-right">TILES FOR HOME & PROJECTS</span></div> */}
      <header className="header">
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <a className="logo" href="#home" aria-label="VENTOZZA home" onClick={(event) => { event.preventDefault(); navigateTo('home') }}><img src={ventozzaLogo} alt="VENTOZZA" /></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <button className={activePage === 'home' ? 'nav-active' : ''} aria-current={activePage === 'home' ? 'page' : undefined} onClick={() => navigateTo('home')}>Home</button>
          <button className={activePage === 'about' ? 'nav-active' : ''} aria-current={activePage === 'about' ? 'page' : undefined} onClick={() => navigateTo('about')}>About Us</button>
          <div className={`nav-products ${tilesMenuOpen ? 'mobile-open' : ''}`}>
            <button className={activePage === 'products' && !['visualizer', 'calculator'].includes(tileView) ? 'nav-active' : ''} aria-expanded={tilesMenuOpen} onClick={() => { if (window.matchMedia('(max-width: 700px)').matches) setTilesMenuOpen((open) => !open); else navigateToTileView('overview') }}>E-catalogue <span className="nav-chevron">⌄</span></button>
            <div className="tiles-dropdown" aria-label="E-Eatalogue tile categories">
              {tileViews.filter((view) => !['visualizer', 'calculator'].includes(view.id)).map((view) => <button key={view.id} className={tileView === view.id ? 'submenu-active' : ''} onClick={() => navigateToTileView(view.id)}>{view.label}</button>)}
            </div>
          </div>
          <div className={`nav-products nav-visualizer ${visualizerMenuOpen ? 'mobile-open' : ''}`}>
            <button className={activePage === 'products' && ['visualizer', 'calculator'].includes(tileView) ? 'nav-active' : ''} aria-expanded={visualizerMenuOpen} onClick={() => { if (window.matchMedia('(max-width: 700px)').matches) setVisualizerMenuOpen((open) => !open); else navigateToTileView('visualizer') }}>Digital Visualizer <span className="nav-chevron">⌄</span></button>
            <div className="tiles-dropdown" aria-label="Digital visualizer tools">
              <button className={tileView === 'visualizer' ? 'submenu-active' : ''} onClick={() => navigateToTileView('visualizer')}>Digital showroom</button>
              {/* Temporarily hidden; keep available here to re-enable later. */}
              {/* <button className="visualizer-unavailable" type="button" onClick={() => { setCallbackInterest('Virtual space creator enquiry'); setCallbackOpen(true) }}>Virtual space creator</button> */}
              <button className={tileView === 'calculator' ? 'submenu-active' : ''} onClick={() => navigateToTileView('calculator')}>Tile calculator</button>
            </div>
          </div>
          <button className={activePage === 'certificates' ? 'nav-active' : ''} aria-current={activePage === 'certificates' ? 'page' : undefined} onClick={() => navigateTo('certificates')}>Certificates</button>
          <button className={activePage === 'contact' ? 'nav-active' : ''} aria-current={activePage === 'contact' ? 'page' : undefined} onClick={() => navigateTo('contact')}>Contact Us</button>
        </nav>
        <div className="header-tools">
          <button className="where-to-buy" type="button" onClick={() => navigateTo('contact')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg><span>WHERE TO BUY</span></button>
          {/* Temporarily hidden account access icon; restore this button when login is needed. */}
          {/* <button className="header-icon-button" type="button" aria-label="Login" onClick={() => navigateTo('login')}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="9" r="3" /><path d="M6.5 18c1.1-2.2 3-3.3 5.5-3.3s4.4 1.1 5.5 3.3" /></svg></button> */}
          <button className="header-icon-button" type="button" aria-label={headerSearchOpen ? 'Close search' : 'Search tiles'} aria-expanded={headerSearchOpen} onClick={() => setHeaderSearchOpen((open) => !open)}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="7.2" /><path d="m16 16 5 5" /></svg></button>
          {headerSearchOpen && <form className="header-search-panel" onSubmit={submitTileSearch}><label htmlFor="header-tile-search">Search VENTOZZA tiles</label><div><input id="header-tile-search" type="search" value={headerSearch} onChange={(event) => setHeaderSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setHeaderSearchOpen(false) }} placeholder="Try a tile name, size or finish" autoFocus /><button type="submit" aria-label="Search tiles">→</button></div><small>Search tile names, codes, finishes and displayed sizes.</small></form>}
        </div>
      </header>

      <main id="home" data-page={activePage} data-tile-view={tileView} onClick={handlePageLink}>
        {activePage === 'home' && <HomePage slide={slide} activeSlide={activeSlide} slideCount={slides.length} onMoveSlide={moveSlide} onNavigate={navigateTo} onTiles={navigateToTileView} onCatalogueSize={(format) => navigateToTileView('catalogues', format)} />}

        {activePage === 'products' && <ProductsPage tileView={tileView} views={tileViews} products={visibleProducts} productSearch={productSearch} sizeOptions={tileSizeOptions} looks={tileLooks} initialCatalogueFormat={initialCatalogueFormat} onSelect={navigateToTileView} onEnquire={(interest) => { setCallbackInterest(interest); setCallbackOpen(true) }} onClearSearch={() => { setProductSearch(''); setHeaderSearch('') }} onNavigateContact={() => navigateTo('contact')} />}

        <AboutPage />

        <CertificatesPage />

        <ContactPage />

      </main>

      <SiteFooter onNavigate={navigateTo} onNavigateTiles={navigateToTileView} />

      <button className="callback-tab" type="button" onClick={() => { setCallbackSent(false); setCallbackError(''); setCallbackOpen(true) }}>REQUEST A CALL BACK</button>
      {callbackOpen && <div className="callback-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCallbackOpen(false) }}><section className="callback-dialog" role="dialog" aria-modal="true" aria-labelledby="callback-title"><button className="callback-close" type="button" aria-label="Close callback form" onClick={() => setCallbackOpen(false)}>×</button>{callbackSent ? <div className="callback-thanks"><span className="eyebrow"><i /> REQUEST SENT</span><h2 id="callback-title">Thank you.</h2><p>Your callback request has been sent to the VENTOZZA team. We’ll be in touch.</p><button className="button button-light" onClick={() => setCallbackOpen(false)}>DONE <Arrow /></button></div> : <><span className="eyebrow"><i /> TILE ENQUIRY</span><h2 id="callback-title">Request a call back.</h2><p>Tell us how to reach you and what tile information you need.</p><form className="callback-form" onSubmit={submitCallbackRequest}><label>Your name<input name="name" autoComplete="name" placeholder="Name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" pattern="[+0-9()\\s-]{8,20}" title="Enter a valid phone number" required /></label><label>What would you like to discuss?<select name="interest" defaultValue={callbackInterest}><option>{callbackInterest}</option><option>Tile sizes and finishes</option><option>Catalogue request</option><option>Product availability</option></select></label><button className="button button-light" type="submit" disabled={callbackSending}>{callbackSending ? 'SENDING…' : 'SEND CALLBACK REQUEST'} <Arrow diagonal /></button>{callbackError && <p className="form-error" role="alert">{callbackError}</p>}<small>Form delivery is handled by FormSubmit; submissions may be retained for up to 30 days.</small></form></>}</section></div>}

      {showTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><span aria-hidden="true">↑</span><small>TOP</small></button>}

      <aside className="chat-widget" aria-label="VENTOZZA tile guide">
        {chatOpen && <section className="chat-panel" aria-label="Tile guide chat"><header className="chat-header"><div><b>VENTOZZA TILE GUIDE</b><span><i className="chat-status-dot"/>Interactive tile help</span></div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button></header><div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">{chatMessages.map((message) => <div className={`chat-message chat-${message.role}`} key={message.id}><p>{message.text}</p>{message.actions && <div className="chat-actions">{message.actions.map((action) => <button type="button" key={action.label} onClick={() => useChatAction(action)}>{action.label}<span aria-hidden="true">↗</span></button>)}</div>}</div>)}{chatMessages.length === 1 && <div className="chat-welcome-prompts"><span>POPULAR QUESTIONS</span><div className="chat-prompts"><button type="button" onClick={() => sendQuickPrompt('What tile sizes do you offer?')}>Tile sizes</button><button type="button" onClick={() => sendQuickPrompt('How do I use the visualizer?')}>Digital showroom</button><button type="button" onClick={() => sendQuickPrompt('How do I calculate quantity?')}>Tile calculator</button><button type="button" onClick={() => sendQuickPrompt('What tile finish is right for my bathroom?')}>Bathroom ideas</button><button type="button" onClick={() => sendQuickPrompt('Where can I find tile certificates?')}>Certificates</button><button type="button" onClick={() => sendQuickPrompt('How do I view a catalogue?')}>Catalogues</button></div></div>}<div ref={chatEndRef} /></div><form className="chat-form" onSubmit={sendChatMessage}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about sizes, rooms, finishes…" aria-label="Ask the tile guide" /><button type="submit" aria-label="Send message" disabled={!chatInput.trim()}>→</button></form><p className="chat-note">Guidance is based on site information. Confirm product suitability, availability and pricing with our team.</p></section>}
        <button className="chat-launcher" type="button" onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label={chatOpen ? 'Close tile guide' : 'Open tile guide'}><span className="chat-launcher-icon" aria-hidden="true">{chatOpen ? '×' : '✳︎'}</span><span>{chatOpen ? 'Close' : 'Guide'}</span></button>
      </aside>

    </>
  )
}

export default App
