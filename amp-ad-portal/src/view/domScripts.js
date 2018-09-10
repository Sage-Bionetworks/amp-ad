import _ from "lodash"

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
        const selectedMenu = document.querySelector("div.under-bar.active")
        selectedMenu.classList.add("squish")
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

        const selectedMenu = document.querySelector("div.under-bar.active")
        selectedMenu.classList.remove("squish")
      }
    }, 50),
  )
}

/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
const getParents = (elem, selector) => {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector
      || Element.prototype.mozMatchesSelector
      || Element.prototype.msMatchesSelector
      || Element.prototype.oMatchesSelector
      || Element.prototype.webkitMatchesSelector
      || function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(
          s,
        )

        let i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }

  // Setup parents array
  const parents = []

  // Get matching parent elements
  for (; elem && elem !== document; elem = elem.parentNode) {
    // Add matching parents to array
    if (selector) {
      if (elem.matches(selector)) {
        parents.push(elem)
      }
    } else {
      parents.push(elem)
    }
  }

  return parents
}

export { getParents, shrinkHeader, detectIfUserHasScrolledToBottom }
