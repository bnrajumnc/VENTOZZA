const salesEmail = 'sales@ventozzasurfaces.com'

/** Opens the visitor's email app with a prepared enquiry. This static site has
 * no server endpoint, so it never claims that a form was delivered remotely. */
export function openEnquiryEmail(subject: string, details: string[]) {
  const body = details.join('\n')
  const href = `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = href
}
