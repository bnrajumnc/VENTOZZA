// Temporary testing destination. Change this one value to restore the public
// sales inbox after testing; contact and callback forms share this endpoint.
export const enquiryRecipient = 'iampranaymusapuri@gmail.com'

/** Sends contact and callback requests through FormSubmit's AJAX endpoint. */
export async function submitEnquiry(fields: Record<string, string>) {
  let response: Response
  try {
    response = await fetch(`https://formsubmit.co/ajax/${enquiryRecipient}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(fields),
    })
  } catch {
    throw new Error(`Could not connect to the enquiry service. Please try again or email ${enquiryRecipient}.`)
  }

  const responseText = await response.text()
  let result: { success?: string | boolean; message?: string } | null = null
  try {
    result = JSON.parse(responseText) as { success?: string | boolean; message?: string }
  } catch {
    // FormSubmit may return an activation page before the inbox is verified.
  }
  if (!response.ok || (result?.success !== true && result?.success !== 'true')) {
    const message = result?.message || responseText
    if (/activat|confirm/i.test(message)) {
      throw new Error(`FormSubmit is waiting for inbox activation. Open the activation email sent to ${enquiryRecipient}, then submit again.`)
    }
    throw new Error(message || `Your enquiry could not be sent. Please try again or email ${enquiryRecipient}.`)
  }
}
