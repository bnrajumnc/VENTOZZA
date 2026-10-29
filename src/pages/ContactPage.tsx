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

  return <section className="contact" id="contact">
    <div className="contact-copy reveal">
      <div className="eyebrow eyebrow-light"><i /> VENTOZZA · TILE ENQUIRIES</div>
      <h2>Let’s bring<br />your space to <em>life.</em></h2>
      <p>Talk with our sales team about tile styles, sizes, finishes and project requirements.</p>
      <div className="contact-person">
        <span>YOUR VENTOZZA CONTACT</span><strong>H. Narayana Rao</strong>
        <small>Vice President – Sales &amp; Marketing</small><small>Request a call back using the enquiry form.</small>
        <a href="mailto:sales@ventozzasurfaces.com">sales@ventozzasurfaces.com ↗︎</a>
      </div>
      <div className="contact-offices">
        <article><span>REGISTERED OFFICE</span><p>10-3-71/3/A, 3rd Floor,<br />Teachers Colony, East Marredpally,<br />Secunderabad – 500026,<br />Telangana, India</p></article>
        <article><span>CORPORATE OFFICE</span><p>Siromani 142, Ground Floor,<br />G-15, Near Eden Ceramic,<br />NH-8A, Lalpar, Morbi-2,<br />Gujarat, India</p></article>
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
      <small>Testing enquiries are routed to {enquiryRecipient}. First-time delivery requires activating the inbox through FormSubmit.</small>
    </form>
  </section>
}
