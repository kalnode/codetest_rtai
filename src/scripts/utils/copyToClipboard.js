export default function copyToClipboard (textToCopy) {
  // MODERN
  // Use navigator.clipboard API; needs the browser to support it and a secure context (ie https)
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy)

    // LEGACY
    // Textarea hack
  } else {
    // Create temporary element
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)

    // Focus and select the element
    textArea.focus()
    textArea.select()

    // Perform copy
    return new Promise((response, reject) => {
      document.execCommand('copy') ? response() : reject()

      // Finally, delete the temporary element
      textArea.remove()
    })
  }
}
