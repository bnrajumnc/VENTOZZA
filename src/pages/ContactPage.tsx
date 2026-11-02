import { useState, type FormEvent } from 'react'
import { enquiryRecipient, submitEnquiry } from '../utils/formSubmit'
// @ts-ignore CSS files are loaded by the bundler and have no TypeScript declarations.
import './ContactPage.css'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    setSending(true)
    setError('')

    try {
      await submitEnquiry({
        _subject: 'VENTOZZA tile enquiry',
        _replyto: String(values.get('email') ?? ''),
        name: String(values.get('name') ?? ''),
        email: String(values.get('email') ?? ''),
        phone: String(values.get('phone') ?? ''),
        message: String(values.get('message') ?? ''),
      })
      setSent(true)
      form.reset()
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : `Your enquiry could not be sent. Please email ${enquiryRecipient}.`)
    } finally {
      setSending(false)
    }
  }

  return <section className="contact contact-structured" id="contact">
    <div className="contact-copy reveal">
      <div className="eyebrow eyebrow-light"><i /> VENTOZZA · TILE ENQUIRIES</div>
      <h2>Let’s bring<br />your space to <em>life.</em></h2>
      <p>Talk with our sales team about tile styles, sizes, finishes and project requirements.</p>
      <div className="contact-person">
        <span className="contact-channel-icon" aria-hidden="true">✉</span>
        <span>SALES &amp; PROJECT ENQUIRIES</span>
        <small>Project guidance, product details and availability.</small>
        <a href="mailto:sales@ventozzasurfaces.com"><span aria-hidden="true">✉</span> sales@ventozzasurfaces.com <b aria-hidden="true">↗</b></a>
      </div>
      <div className="contact-offices" aria-label="Our offices">
        <article>
          <div className="contact-office-heading"><span>REGISTERED OFFICE</span><h3>Secunderabad</h3><small>Telangana · India</small></div>
          <address>10-3-71/3/A, 3rd Floor,<br />Teachers Colony, East Marredpally,<br />Secunderabad – 500026,<br />Telangana, India</address>
          <a className="contact-map-link" href="https://maps.google.com/?q=10-3-71%2F3%2FA%2C+Teachers+Colony%2C+East+Marredpally%2C+Secunderabad+500026" target="_blank" rel="noreferrer">VIEW ON MAP <span aria-hidden="true">↗</span></a>
        </article>
        <article>
          <div className="contact-office-heading"><span>CORPORATE OFFICE</span><h3>Morbi</h3><small>Gujarat · India</small></div>
          <address>Siromani 142, Ground Floor,<br />G-15, Near Eden Ceramic,<br />NH-8A, Lalpar, Morbi-2,<br />Gujarat, India</address>
          <a className="contact-map-link" href="https://maps.google.com/?q=Siromani+142%2C+G-15%2C+Near+Eden+Ceramic%2C+NH-8A%2C+Lalpar%2C+Morbi%2C+Gujarat" target="_blank" rel="noreferrer">VIEW ON MAP <span aria-hidden="true">↗</span></a>
        </article>
      </div>
    </div>
    <form className="contact-form reveal" onSubmit={submit}>
      <span className="eyebrow"><i /> START A CONVERSATION</span><h3>Tell us about your project.</h3>
      <label>Your name<input name="name" autoComplete="name" placeholder="Name" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+91" /></label>
      <label>Which tiles are you interested in?<textarea name="message" rows={3} placeholder="Style, size, finish or project details…" /></label>
      <button className="button button-light" type="submit" disabled={sending}>{sending ? 'SENDING…' : 'SEND A TILE ENQUIRY'} <span aria-hidden="true">↗︎</span></button>
      {sent && <p className="form-success" role="status">Your enquiry has been sent to {enquiryRecipient}.</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {/* <small>Testing enquiries are routed to {enquiryRecipient}. First-time delivery requires activating the inbox through FormSubmit.</small> */}
    </form>
  </section>
}
