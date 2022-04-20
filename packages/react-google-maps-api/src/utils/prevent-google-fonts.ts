function isGoogleFontStyle(element: HTMLElement): boolean {
  // 'Roboto' or 'Google Sans Text' font download
  const href = (element as HTMLLinkElement).href;
  if (
    href && (
      href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0 ||
      href.indexOf('https://fonts.googleapis.com/css?family=Google+Sans+Text') === 0
    )
  ) {
    return true
  }
  // font style elements
  if (
    element.tagName.toLowerCase() === 'style' &&
    // @ts-ignore
    element.styleSheet &&
    // @ts-ignore
    element.styleSheet.cssText &&
    // @ts-ignore
    element.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0
  ) {
    // @ts-ignore
    element.styleSheet.cssText = ''
    return true
  }
  // font style elements for other browsers
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
    // @ts-ignore
    !element.styleSheet &&
    !element.innerHTML
  ) {
    return true
  }

  return false
}

// Preventing the Google Maps library from downloading an extra font
export function preventGoogleFonts (): void {
  // we override these methods only for one particular head element
  // default methods for other elements are not affected
  const head = document.getElementsByTagName('head')[0]

  const trueInsertBefore = head.insertBefore.bind(head)

  // TODO: adding return before reflect solves the TS issue
  // @ts-ignore
  head.insertBefore = function insertBefore(
    newElement: HTMLElement,
    referenceElement: HTMLElement
  ): void {
    if (!isGoogleFontStyle(newElement)) {
      Reflect.apply(trueInsertBefore, head, [newElement, referenceElement])
    }
  }

  const trueAppend = head.appendChild.bind(head)

  // TODO: adding return before reflect solves the TS issue
  // @ts-ignore
  head.appendChild = function appendChild(textNode: HTMLElement): void {
    if (!isGoogleFontStyle(textNode)) {
      Reflect.apply(trueAppend, head, [textNode])
    }
  }
}
