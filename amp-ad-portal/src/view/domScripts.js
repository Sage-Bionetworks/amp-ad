import _ from "lodash"

const setActiveNavigation = () => {
  const navItems = document.querySelectorAll(".nav li a.main-nav-item")
  navItems.forEach((element) => {
    element.classList.remove("active")
    if (window.location.href.includes(element.innerHTML)) {
      element.classList.add("active")
    }
    if (window.location.hash === "#/" && element.innerHTML === "Home") {
      element.classList.add("active")
    }
  })
}

const detectIfUserHasScrolledToBottom = () => {
  // returns true or false
  let bottom = false
  if (window.innerHeight + window.scrollY + 200 > document.body.offsetHeight) {
    bottom = true
    console.log(bottom)
    return bottom
  }
  return bottom
}

const shrinkHeader = () => {
  window.addEventListener(
    "scroll",
    _.debounce(() => {
      // lodash debounce method.
      const supportPageOffset = window.pageXOffset !== undefined
      const isCSS1Compat = (document.compatMode || "") === "CSS1Compat"
      const scroll = {
        x: supportPageOffset
          ? window.pageXOffset
          : isCSS1Compat
            ? document.documentElement.scrollLeft
            : document.body.scrollLeft,
        y: supportPageOffset
          ? window.pageYOffset
          : isCSS1Compat
            ? document.documentElement.scrollTop
            : document.body.scrollTop,
      }

      if (scroll.y > 50) {
        // 3000px (arbitrary - put whatever point you need there.)
        const element = document.querySelector("header") // target element to change attribute
        element.setAttribute(
          "class",
          "row between-xs header center-xs middle-xs squish",
        ) // change the attribute.

        const main = document.querySelector("div.main")
        main.classList.add("squish")
      }
      if (scroll.y < 50) {
        // 3000px (arbitrary - put whatever point you need there.)
        const element = document.querySelector("header") // target element to change attribute
        element.setAttribute(
          "class",
          "row between-xs header center-xs middle-xs",
        ) // change the attribute.
        const main = document.querySelector("div.main")
        main.classList.remove("squish")
      }
    }, 50),
  )
}

export { setActiveNavigation, shrinkHeader, detectIfUserHasScrolledToBottom }
