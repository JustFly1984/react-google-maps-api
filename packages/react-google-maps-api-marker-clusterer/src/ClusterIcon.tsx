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
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.setMap(cluster.getMap()) // Note: this causes onAdd to be called
  }

  onAdd() {
    let cMouseDownInCluster: boolean
    let cDraggingMapByCluster: boolean

    this.div = document.createElement('div')
    this.div.className = this.className
    if (this.visible) {
      this.show()
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.getPanes().overlayMouseTarget.appendChild(this.div)

    // Fix for Issue 157
    this.boundsChangedListener = google.maps.event.addListener(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.getMap(),
      'boundschanged',
      function boundsChanged() {
        cDraggingMapByCluster = cMouseDownInCluster
      }
    )

    google.maps.event.addDomListener(this.div, 'mousedown', function onMouseDown() {
      cMouseDownInCluster = true
      cDraggingMapByCluster = false
    })

    // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
    google.maps.event.addDomListener(
      this.div,
      'click',
      // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
      (event: Event) => {
        cMouseDownInCluster = false

        if (!cDraggingMapByCluster) {
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

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            markerClusterer.getMap().fitBounds(bounds)

            // There is a fix for Issue 170 here:
            setTimeout(function timeout() {
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              markerClusterer.getMap().fitBounds(bounds)

              // Don't zoom beyond the max zoom level
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              if (maxZoom !== null && markerClusterer.getMap().getZoom() > maxZoom) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                markerClusterer.getMap().setZoom(maxZoom + 1)
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
    )

    google.maps.event.addDomListener(
      this.div,
      'mouseover',
      // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
      () => {
        /**
         * This event is fired when the mouse moves over a cluster marker.
         * @name MarkerClusterer#mouseover
         * @param {Cluster} c The cluster that the mouse moved over.
         * @event
         */
        google.maps.event.trigger(this.cluster.getClusterer(), 'mouseover', this.cluster)
      }
    )

    // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
    google.maps.event.addDomListener(
      this.div,
      'mouseout',
      // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
      () => {
        /**
         * This event is fired when the mouse moves out of a cluster marker.
         * @name MarkerClusterer#mouseout
         * @param {Cluster} c The cluster that the mouse moved out of.
         * @event
         */
        google.maps.event.trigger(this.cluster.getClusterer(), 'mouseout', this.cluster)
      }
    )
  }

  onRemove() {
    if (this.div && this.div.parentNode) {
      this.hide()

      if (this.boundsChangedListener !== null) {
        google.maps.event.removeListener(this.boundsChangedListener)
      }

      google.maps.event.clearInstanceListeners(this.div)

      this.div.parentNode.removeChild(this.div)

      this.div = null
    }
  }

  draw() {
    if (this.visible && this.div !== null && this.center) {
      const { x, y } = this.getPosFromLatLng(this.center)

      this.div.style.top = y + 'px'
      this.div.style.left = x + 'px'
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
      let img = '',
        divTitle = ''

      // NOTE: values must be specified in px units
      const bp = this.backgroundPosition.split(' ')

      const spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ''), 10)

      const spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ''), 10)

      const pos = this.getPosFromLatLng(this.center)

      if (this.sums === null || typeof this.sums.title === 'undefined' || this.sums.title === '') {
        divTitle = this.cluster.getClusterer().getTitle()
      } else {
        divTitle = this.sums.title
      }

      this.div.style.cssText = this.createCss(pos)

      img =
        "<img alt='" +
        divTitle +
        "' src='" +
        this.url +
        "' style='position: absolute; top: " +
        spriteV +
        'px; left: ' +
        spriteH +
        'px; '

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      if (!this.cluster.getClusterer().enableRetinaIcons) {
        img +=
          'clip: rect(' +
          -1 * spriteV +
          'px, ' +
          (-1 * spriteH + this.width) +
          'px, ' +
          (-1 * spriteV + this.height) +
          'px, ' +
          -1 * spriteH +
          'px);'
      }

      img += "'>"

      this.div.innerHTML =
        img +
        "<div style='" +
        'position: absolute;' +
        'top: ' +
        this.anchorText[0] +
        'px;' +
        'left: ' +
        this.anchorText[1] +
        'px;' +
        'color: ' +
        this.textColor +
        ';' +
        'font-size: ' +
        this.textSize +
        'px;' +
        'font-family: ' +
        this.fontFamily +
        ';' +
        'font-weight: ' +
        this.fontWeight +
        ';' +
        'font-style: ' +
        this.fontStyle +
        ';' +
        'text-decoration: ' +
        this.textDecoration +
        ';' +
        'text-align: center;' +
        'width: ' +
        this.width +
        'px;' +
        'line-height:' +
        this.height +
        'px;' +
        "'>" +
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.sums.text +
        '</div>'

      this.div.title = divTitle

      this.div.style.display = ''
    }

    this.visible = true
  }

  useStyle(sums: ClusterIconInfo) {
    this.sums = sums
    const styles = this.cluster.getClusterer().getStyles()
    const style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))]

    this.url = style.url
    this.height = style.height
    this.width = style.width

    if (style.className) this.className = `${this.clusterClassName} ${style.className}`

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

  createCss(pos: google.maps.Point): string {
    const style = []

    style.push('cursor: pointer;')

    style.push('position: absolute; top: ' + pos.y + 'px; left: ' + pos.x + 'px;')

    style.push('width: ' + this.width + 'px; height: ' + this.height + 'px;')

    return style.join('')
  }

  getPosFromLatLng(latlng: google.maps.LatLng): google.maps.Point {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const pos = this.getProjection().fromLatLngToDivPixel(latlng)

    pos.x -= this.anchorIcon[1]

    pos.y -= this.anchorIcon[0]

    // pos.x = pos.x

    // pos.y = pos.y

    return pos
  }
}
