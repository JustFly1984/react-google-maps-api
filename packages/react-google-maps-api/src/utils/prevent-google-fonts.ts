function isGoogleFontStyle(element: Node): boolean {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === 'style' &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.styleSheet.cssText = ''
    return true
  }
  // font style elements for other browsers
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === 'style' &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.innerHTML = ''
    return true
  }
  // when google tries to add empty style
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element.tagName.toLowerCase() === 'style' &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !element.styleSheet &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  if (head) {
    const trueInsertBefore = head.insertBefore.bind(head)

    // TODO: adding return before reflect solves the TS issue

    head.insertBefore = function insertBefore<T extends Node>(
      newElement: T,
      referenceElement: HTMLElement
    ): T {
      if (!isGoogleFontStyle(newElement)) {
        Reflect.apply(trueInsertBefore, head, [newElement, referenceElement])
      }

      return newElement
    }

    const trueAppend = head.appendChild.bind(head)

    // TODO: adding return before reflect solves the TS issue

    head.appendChild = function appendChild<T extends Node>(textNode: T): T {
      if (!isGoogleFontStyle(textNode)) {
        Reflect.apply(trueAppend, head, [textNode])
      }

      return textNode
    }
  }

}
