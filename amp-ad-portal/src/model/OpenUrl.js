const openUrl = (event, link) => {
  event.preventDefault()
  window.open(link, "_self")
}

export default openUrl
