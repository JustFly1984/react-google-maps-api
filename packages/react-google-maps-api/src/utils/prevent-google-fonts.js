// Preventing the Google Maps libary from downloading an extra font
export const preventGoogleFonts = () => {
  const isRobotoStyle = element => {
    // roboto font download
    if (
      element.href &&
      element.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0
    ) {
      return true
    }
    // roboto style elements
    if (
      element.tagName.toLowerCase() === 'style' &&
      element.styleSheet &&
      element.styleSheet.cssText &&
      element.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0
    ) {
      element.styleSheet.cssText = ''
      return true
    }
    // roboto style elements for other browsers
    if (
      element.tagName.toLowerCase() === 'style' &&
      element.innerHTML &&
      element.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0
    ) {
      element.innerHTML = ''
      return true
    }
    // when google tries to add empty style
    if (
      element.tagName.toLowerCase() === 'style' &&
      !element.styleSheet &&
      !element.innerHTML
    ) {
      return true
    }

    return false
  }

  // we override these methods only for one particular head element
  // default methods for other elements are not affected
  const head = document.getElementsByTagName('head')[0]

  const insertBefore = head.insertBefore

  head.insertBefore = (newElement, referenceElement) => {
    if (!isRobotoStyle(newElement)) {
      Reflect.apply(insertBefore, head, [newElement, referenceElement])
    }
  }

  const appendChild = head.appendChild

  head.appendChild = textNode => {
    if (!isRobotoStyle(textNode)) {
      Reflect.apply(appendChild, head, [textNode])
    }
  }
}
