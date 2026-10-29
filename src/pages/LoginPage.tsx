import { useState, type FormEvent } from 'react'
import { openEnquiryEmail } from '../utils/enquiry'
import './LoginPage.css'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [notice, setNotice] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const name = String(values.get('name') ?? '')
    const phone = String(values.get('phone') ?? '')
    openEnquiryEmail(mode === 'login' ? 'VENTOZZA account access assistance' : 'VENTOZZA account registration enquiry', [
      `Request: ${mode === 'login' ? 'Account access assistance' : 'Account registration'}`,
      ...(name ? [`Name: ${name}`] : []),
      `Mobile: ${phone}`,
    ])
    setNotice('Your email app should open with the request. Account sign-in and OTP are not enabled in this preview.')
  }
  return <section className="login-page" id="login"><div className="login-card"><div className="login-card-heading"><span className="eyebrow"><i /> VENTOZZA ACCOUNT</span><h1>{mode === 'login' ? 'Account access' : 'Create an account'}</h1><p>{mode === 'login' ? 'Request help accessing your VENTOZZA account.' : 'Send an account registration enquiry to our team.'}</p></div>{mode === 'login' ? <form className="login-form" onSubmit={submit}><label htmlFor="login-phone">Mobile number</label><input id="login-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter your mobile number" pattern="[+0-9()\\s-]{8,20}" title="Enter a valid phone number" required /><button className="login-submit" type="submit">EMAIL ACCOUNT ACCESS REQUEST <span aria-hidden="true">→</span></button></form> : <form className="login-form" onSubmit={submit}><label htmlFor="register-name">Your name</label><input id="register-name" name="name" placeholder="Enter your name" autoComplete="name" required /><label htmlFor="register-phone">Mobile number</label><input id="register-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter your mobile number" pattern="[+0-9()\\s-]{8,20}" title="Enter a valid phone number" required /><button className="login-submit" type="submit">EMAIL REGISTRATION REQUEST <span aria-hidden="true">→</span></button></form>}{notice && <p className="login-notice" role="status">{notice} If no mail app opens, contact sales@ventozzasurfaces.com.</p>}<p className="login-switch">{mode === 'login' ? 'Need a new account?' : 'Already have an account?'} <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setNotice('') }}>{mode === 'login' ? 'Register here' : 'Account access'}</button></p><small className="login-preview-note">Account authentication needs a secure server and SMS provider; this page prepares an email request instead.</small></div></section>
}
