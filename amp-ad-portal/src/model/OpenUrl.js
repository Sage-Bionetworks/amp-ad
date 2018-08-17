const openUrl = (event, link) => {
  event.preventDefault()
  const hashIndex = window.location.href.indexOf("#", 0)
  const baseUrl = window.location.href.slice(0, hashIndex - 1)
  window.location.href = baseUrl + link
}

export default openUrl
