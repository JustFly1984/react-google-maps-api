/* global google */
/* eslint-disable filenames/match-regex */
import { Cluster } from './Cluster'

import { ClusterIconStyle, ClusterIconInfo } from './types'

export class ClusterIcon {
  cluster: Cluster
  className: string
  clusterClassName: string
  styles: ClusterIconStyle[]
  center: google.maps.LatLng | undefined
  div: HTMLDivElement | null
  sums: ClusterIconInfo | null
  visible: boolean
  url: string
  height: number
  width: number
  anchorText: number[]
  anchorIcon: number[]
  textColor: string
  textSize: number
  textDecoration: string
  fontWeight: string
  fontStyle: string
  fontFamily: string
  backgroundPosition: string
  cMouseDownInCluster: boolean | null
  cDraggingMapByCluster: boolean | null
  timeOut: number | null

  boundsChangedListener: google.maps.MapsEventListener | null

  constructor(cluster: Cluster, styles: ClusterIconStyle[]) {
    cluster.getClusterer().extend(ClusterIcon, google.maps.OverlayView)

    this.cluster = cluster

    this.clusterClassName = this.cluster.getClusterer().getClusterClass()

    this.className = this.clusterClassName

    this.styles = styles

    this.center = undefined

    this.div = null

    this.sums = null

    this.visible = false

    this.boundsChangedListener = null

    this.url = ''

    this.height = 0
    this.width = 0

    this.anchorText = [0, 0]
    this.anchorIcon = [0, 0]

    this.textColor = 'black'
    this.textSize = 11
    this.textDecoration = 'none'
    this.fontWeight = 'bold'
    this.fontStyle = 'normal'
    this.fontFamily = 'Arial,sans-serif'

    this.backgroundPosition = '0 0'

    this.cMouseDownInCluster = null
    this.cDraggingMapByCluster = null
    this.timeOut = null;

    (this as unknown as google.maps.OverlayView).setMap(cluster.getMap()) // Note: this causes onAdd to be called

    this.onBoundsChanged = this.onBoundsChanged.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.draw = this.draw.bind(this)
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.useStyle = this.useStyle.bind(this)
    this.setCenter = this.setCenter.bind(this)
    this.getPosFromLatLng = this.getPosFromLatLng.bind(this)
  }

  onBoundsChanged() {
    this.cDraggingMapByCluster = this.cMouseDownInCluster
  }

  onMouseDown() {
    this.cMouseDownInCluster = true

    this.cDraggingMapByCluster = false
  }

  onClick(event: Event) {
    this.cMouseDownInCluster = false

    if (!this.cDraggingMapByCluster) {
      const markerClusterer = this.cluster.getClusterer()

      /**
       * This event is fired when a cluster marker is clicked.
       * @name MarkerClusterer#click
       * @param {Cluster} c The cluster that was clicked.
       * @event
       */
      google.maps.event.trigger(markerClusterer, 'click', this.cluster)
      google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster) // deprecated name

      // The default click handler follows. Disable it by setting
      // the zoomOnClick property to false.
      if (markerClusterer.getZoomOnClick()) {
        // Zoom into the cluster.
        const maxZoom = markerClusterer.getMaxZoom()

        const bounds = this.cluster.getBounds()

        const map = (markerClusterer as unknown as google.maps.OverlayView).getMap()

        if (map !== null && 'fitBounds' in map) {
          map.fitBounds(bounds)
        }


        // There is a fix for Issue 170 here:
        this.timeOut = window.setTimeout(() => {
          const map = (markerClusterer as unknown as google.maps.OverlayView).getMap()

          if (map !== null) {
            if ('fitBounds' in map) {
              map.fitBounds(bounds)
            }

            const zoom = map.getZoom() || 0

            // Don't zoom beyond the max zoom level
            if (
              maxZoom !== null &&
              zoom > maxZoom
            ) {
              map.setZoom(maxZoom + 1)
            }
          }
        }, 100)
      }

      // Prevent event propagation to the map:
      event.cancelBubble = true

      if (event.stopPropagation) {
        event.stopPropagation()
      }
    }
  }

  onMouseOver() {
    /**
     * This event is fired when the mouse moves over a cluster marker.
     * @name MarkerClusterer#mouseover
     * @param {Cluster} c The cluster that the mouse moved over.
     * @event
     */
    google.maps.event.trigger(
      this.cluster.getClusterer(),
      'mouseover',
      this.cluster
    )
  }

  onMouseOut() {
    /**
     * This event is fired when the mouse moves out of a cluster marker.
     * @name MarkerClusterer#mouseout
     * @param {Cluster} c The cluster that the mouse moved out of.
     * @event
     */
    google.maps.event.trigger(
      this.cluster.getClusterer(),
      'mouseout',
      this.cluster
    )
  }

  onAdd() {
    this.div = document.createElement('div')

    this.div.className = this.className

    if (this.visible) {
      this.show()
    }

    ;(this as unknown as google.maps.OverlayView).getPanes()?.overlayMouseTarget.appendChild(this.div)

    const map = (this as unknown as google.maps.OverlayView).getMap()

    if (map !== null) {
      // Fix for Issue 157
      this.boundsChangedListener = google.maps.event.addListener(
        map,
        'bounds_changed',
        this.onBoundsChanged
      )

      this.div.addEventListener('mousedown', this.onMouseDown)

      this.div.addEventListener('click', this.onClick)

      this.div.addEventListener('mouseover', this.onMouseOver)

      this.div.addEventListener('mouseout', this.onMouseOut)
    }
  }

  onRemove() {
    if (this.div && this.div.parentNode) {
      this.hide()

      if (this.boundsChangedListener !== null) {
        google.maps.event.removeListener(this.boundsChangedListener)
      }

      this.div.removeEventListener('mousedown', this.onMouseDown)

      this.div.removeEventListener('click', this.onClick)

      this.div.removeEventListener('mouseover', this.onMouseOver)

      this.div.removeEventListener('mouseout', this.onMouseOut)

      this.div.parentNode.removeChild(this.div)

      if (this.timeOut !== null) {
        window.clearTimeout(this.timeOut)

        this.timeOut = null
      }

      this.div = null
    }
  }

  draw() {
    if (this.visible && this.div !== null && this.center) {
      const pos = this.getPosFromLatLng(this.center)

      this.div.style.top = pos !== null ? `${pos.y}px` : '0'
      this.div.style.left = pos !== null ? `${pos.x}px` : '0'
    }
  }

  hide() {
    if (this.div) {
      this.div.style.display = 'none'
    }

    this.visible = false
  }

  show() {
    if (this.div && this.center) {
      let divTitle = ''

      // NOTE: values must be specified in px units
      const bp = this.backgroundPosition.split(' ')

      const spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ''), 10)
      const spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ''), 10)

      const pos = this.getPosFromLatLng(this.center)

      if (
        this.sums === null ||
        typeof this.sums.title === 'undefined' ||
        this.sums.title === ''
      ) {
        divTitle = this.cluster.getClusterer().getTitle()
      } else {
        divTitle = this.sums.title
      }

      this.div.className = this.className
      this.div.style.cursor = 'pointer'
      this.div.style.position = 'absolute'

      this.div.style.top = pos !== null ? `${pos.y}px` : '0'
      this.div.style.left = pos !== null ? `${pos.x}px` : '0'

      this.div.style.width = `${this.width}px`
      this.div.style.height = `${this.height}px`

      const img = document.createElement('img')

      img.alt = divTitle
      img.src = this.url
      img.width = this.width
      img.height = this.height
      img.style.position = 'absolute'
      img.style.top = `${spriteV}px`
      img.style.left = `${spriteH}px`

      if (!this.cluster.getClusterer().enableRetinaIcons) {
        img.style.clip = `rect(-${spriteV}px, -${spriteH + this.width}px, -${
          spriteV + this.height
        }, -${spriteH})`
      }

      const textElm = document.createElement('div')

      textElm.style.position = 'absolute'
      textElm.style.top = `${this.anchorText[0]}px`
      textElm.style.left = `${this.anchorText[1]}px`
      textElm.style.color = this.textColor
      textElm.style.fontSize = `${this.textSize}px`
      textElm.style.fontFamily = this.fontFamily
      textElm.style.fontWeight = this.fontWeight
      textElm.style.fontStyle = this.fontStyle
      textElm.style.textDecoration = this.textDecoration
      textElm.style.textAlign = 'center'
      textElm.style.width = `${this.width}px`
      textElm.style.lineHeight = `${this.height}px`
      textElm.innerText = `${this.sums?.text}`

      this.div.innerHTML = ''

      this.div.appendChild(img)
      this.div.appendChild(textElm)

      this.div.title = divTitle

      this.div.style.display = ''
    }

    this.visible = true
  }

  useStyle(sums: ClusterIconInfo) {
    this.sums = sums

    const styles = this.cluster.getClusterer().getStyles()

    const style =
      styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))]

    this.url = style.url
    this.height = style.height
    this.width = style.width

    if (style.className)
      this.className = `${this.clusterClassName} ${style.className}`

    this.anchorText = style.anchorText || [0, 0]
    this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2]

    this.textColor = style.textColor || 'black'

    this.textSize = style.textSize || 11

    this.textDecoration = style.textDecoration || 'none'

    this.fontWeight = style.fontWeight || 'bold'

    this.fontStyle = style.fontStyle || 'normal'

    this.fontFamily = style.fontFamily || 'Arial,sans-serif'

    this.backgroundPosition = style.backgroundPosition || '0 0'
  }

  setCenter(center: google.maps.LatLng) {
    this.center = center
  }

  getPosFromLatLng(latlng: google.maps.LatLng): google.maps.Point | null {
    const pos = (this as unknown as google.maps.OverlayView).getProjection().fromLatLngToDivPixel(latlng)

    if (pos !== null) {
      pos.x -= this.anchorIcon[1]

      pos.y -= this.anchorIcon[0]
    }

    return pos
  }
}
