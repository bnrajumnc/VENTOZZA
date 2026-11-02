import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './CertificatesPage.css'

const certificate = '/documents/ventozza-iso-9001-2015.pdf'

export default function CertificatesPage() {
  const [open, setOpen] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    closeButton.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'Tab') {
        const items = Array.from(document.querySelectorAll<HTMLElement>('.certificate-viewer a, .certificate-viewer button'))
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [open])

  return <section className="certificates certificates-page" id="certificates">
    <header className="cert-quality-heading">
      <span className="eyebrow"><i /> QUALITY &amp; CERTIFICATION</span>
      <h2>Quality, documented.</h2>
      <p>Explore the supplied quality management certificate.</p>
    </header>
    {/* <div className="cert-page-head">
      <div className="cert-intro reveal">
        <div className="eyebrow"><i /> QUALITY &amp; DOCUMENTATION</div>
        <h2>Quality you can<br/><em>look into.</em></h2>
        <p>Explore the quality-management document included in the company profile. The certificate is not displayed on this page; open the PDF viewer when you want to review it.</p>
        <a className="cert-contact-link" href="#contact">ASK ABOUT PRODUCT DOCUMENTS <span aria-hidden="true">→</span></a>
      </div>
      <div className="cert-summary reveal">
        <span className="cert-summary-icon" aria-hidden="true">✓</span>
        <div><small>QUALITY MANAGEMENT SYSTEM</small><b>ISO 9001:2015</b><span>Issued to Greenray Granito Private Limited</span></div>
        <span className="cert-summary-index">01</span>
      </div>
    </div> */}

    <article className="cert-document reveal">
      <figure className="cert-blurred-preview">
        <button type="button" className="cert-preview-paper" onClick={() => setOpen(true)} aria-label="Open clear ISO 9001:2015 certificate"><img src="/images/ventozza/certificates/greenray-iso-9001-2015.jpg" alt="" aria-hidden="true" /></button>
        <figcaption><b>Certificate preview</b><span>Click to view the clear certificate.</span></figcaption>
      </figure>
      <div className="cert-document-copy">
        <span className="eyebrow">QUALITY MANAGEMENT SYSTEM</span>
        <h3>ISO 9001:2015</h3>
        <p className="cert-holder"><b>Certificate holder</b><span>Greenray Granito Private Limited</span></p>
        <p>Manufacture, supply, import and export of vitrified, glazed vitrified, polished glazed vitrified, porcelain and ceramic tiles.</p>
        <dl className="cert-meta"><div><dt>Certificate reference</dt><dd>QMS/95F7/0925</dd></div><div><dt>Issue date</dt><dd>23 September 2025</dd></div><div><dt>Valid through</dt><dd>22 September 2028</dd></div></dl>
        <button className="cert-view-button" type="button" onClick={() => setOpen(true)}>VIEW CERTIFICATE <span aria-hidden="true">↗︎</span></button>
        <small className="cert-pdf-label">PDF document</small>
      </div>
    </article>

    <div className="cert-guidance reveal">
      <span className="cert-guidance-icon" aria-hidden="true">⌕</span>
      <div><b>Need a document for a specific tile?</b><p>Product specifications and test information can depend on the selected size, finish and application. Contact our team with the collection or project details you’re reviewing.</p></div>
      <a href="#contact" aria-label="Contact VENTOZZA about tile documentation">ASK OUR TEAM <span aria-hidden="true">↗︎</span></a>
    </div>
    {open && createPortal(<div className="certificate-viewer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
      <section className="certificate-viewer" role="dialog" aria-modal="true" aria-label="ISO 9001:2015 certificate PDF">
        <header><div><small>VENTOZZA · QUALITY DOCUMENTATION</small><b>ISO 9001:2015 Certificate</b></div><div className="certificate-viewer-actions"><a href={certificate} target="_blank" rel="noreferrer">Open PDF ↗</a><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Close certificate">×</button></div></header>
        <div className="certificate-clear-document"><img src="/images/ventozza/certificates/greenray-iso-9001-2015.jpg" alt="ISO 9001:2015 quality management certificate issued to Greenray Granito Private Limited, reference QMS/95F7/0925" /></div>
      </section>
    </div>, document.body)}
  </section>
}
