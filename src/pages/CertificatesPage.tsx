import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './CertificatesPage.css'

const certificate = '/documents/ventozza-iso-9001-2015.pdf'

export default function CertificatesPage() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = previousOverflow }
  }, [open])

  return <section className="certificates certificates-page" id="certificates">
    <div className="certificates-visual" aria-hidden="true" />
    <div className="cert-page-head">
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
    </div>

    <article className="cert-document reveal">
      <div className="cert-document-art" aria-hidden="true"><span>VENTOZZA</span><i>✳︎</i><small>QUALITY · MATERIAL · CARE</small></div>
      <div className="cert-document-copy">
        <span className="eyebrow"><i /> COMPANY PROFILE DOCUMENT</span>
        <h3>ISO 9001:2015<br/>Quality Management System</h3>
        <p className="cert-holder"><b>Certificate holder</b><span>Greenray Granito Private Limited</span></p>
        <p>Open the supplied certificate as a PDF in a focused viewer. It covers the manufacture, supply, import and export of vitrified, glazed vitrified, polished glazed vitrified, porcelain and ceramic tiles.</p>
        <dl className="cert-meta"><div><dt>Certificate reference</dt><dd>QMS/95F7/0925</dd></div><div><dt>Issue date</dt><dd>23 September 2025</dd></div><div><dt>Valid through</dt><dd>22 September 2028</dd></div></dl>
        <button className="cert-view-button" type="button" onClick={() => setOpen(true)}>VIEW CERTIFICATE <span aria-hidden="true">↗︎</span></button>
      </div>
    </article>

    <div className="cert-guidance reveal">
      <span className="cert-guidance-icon" aria-hidden="true">⌕</span>
      <div><b>Need a document for a specific tile?</b><p>Product specifications and test information can depend on the selected size, finish and application. Contact our team with the collection or project details you’re reviewing.</p></div>
      <a href="#contact" aria-label="Contact VENTOZZA about tile documentation">ASK OUR TEAM <span aria-hidden="true">↗︎</span></a>
    </div>
    {open && createPortal(<div className="certificate-viewer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
      <section className="certificate-viewer" role="dialog" aria-modal="true" aria-label="ISO 9001:2015 certificate PDF">
        <header><div><small>VENTOZZA · QUALITY DOCUMENTATION</small><b>ISO 9001:2015 Certificate</b></div><button type="button" onClick={() => setOpen(false)} aria-label="Close certificate">×</button></header>
        <iframe src={`${certificate}#toolbar=0&navpanes=0`} title="ISO 9001:2015 certificate PDF" />
      </section>
    </div>, document.body)}
  </section>
}
