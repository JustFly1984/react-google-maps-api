/* global google */
/* eslint-disable filenames/match-regex */
import { Cluster } from './Cluster'
import { ClusterIcon } from './ClusterIcon'

import {
  MarkerExtended,
  ClustererOptions,
  ClusterIconStyle,
  TCalculator,
  ClusterIconInfo,
} from './types'

/**
 * Supports up to 9007199254740991 (Number.MAX_SAFE_INTEGER) markers
 * which is not a problem as max array length is 4294967296 (2**32)
 */
function CALCULATOR(
  markers: MarkerExtended[],
  numStyles: number
): ClusterIconInfo {
  const count = markers.length

  const numberOfDigits = count.toString().length

  const index = Math.min(numberOfDigits, numStyles)

  return {
    text: count.toString(),
    index,
    title: '',
  }
}

const BATCH_SIZE = 2000

const BATCH_SIZE_IE = 500

const IMAGE_PATH =
  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'

const IMAGE_EXTENSION = 'png'

const IMAGE_SIZES = [53, 56, 66, 78, 90]

const CLUSTERER_CLASS = 'cluster'

export class Clusterer {
  markers: MarkerExtended[]
  clusters: Cluster[]
  listeners: google.maps.MapsEventListener[]
  activeMap: google.maps.Map | google.maps.StreetViewPanorama | null
  ready: boolean
  gridSize: number
  minClusterSize: number
  maxZoom: number | null
  styles: ClusterIconStyle[]
  title: string
  zoomOnClick: boolean
  averageCenter: boolean
  ignoreHidden: boolean
  enableRetinaIcons: boolean
  imagePath: string
  imageExtension: string
  imageSizes: number[]
  calculator: TCalculator
  batchSize: number
  batchSizeIE: number
  clusterClass: string
  timerRefStatic: number | null

  constructor(
    map: google.maps.Map,
    optMarkers: MarkerExtended[] = [],
    optOptions: ClustererOptions = {}
  ) {
    this.getMinimumClusterSize = this.getMinimumClusterSize.bind(this)
    this.setMinimumClusterSize = this.setMinimumClusterSize.bind(this)
    this.getEnableRetinaIcons = this.getEnableRetinaIcons.bind(this)
    this.setEnableRetinaIcons = this.setEnableRetinaIcons.bind(this)
    this.addToClosestCluster = this.addToClosestCluster.bind(this)
    this.getImageExtension = this.getImageExtension.bind(this)
    this.setImageExtension = this.setImageExtension.bind(this)
    this.getExtendedBounds = this.getExtendedBounds.bind(this)
    this.getAverageCenter = this.getAverageCenter.bind(this)
    this.setAverageCenter = this.setAverageCenter.bind(this)
    this.getTotalClusters = this.getTotalClusters.bind(this)
    this.fitMapToMarkers = this.fitMapToMarkers.bind(this)
    this.getIgnoreHidden = this.getIgnoreHidden.bind(this)
    this.setIgnoreHidden = this.setIgnoreHidden.bind(this)
    this.getClusterClass = this.getClusterClass.bind(this)
    this.setClusterClass = this.setClusterClass.bind(this)
    this.getTotalMarkers = this.getTotalMarkers.bind(this)
    this.getZoomOnClick = this.getZoomOnClick.bind(this)
    this.setZoomOnClick = this.setZoomOnClick.bind(this)
    this.getBatchSizeIE = this.getBatchSizeIE.bind(this)
    this.setBatchSizeIE = this.setBatchSizeIE.bind(this)
    this.createClusters = this.createClusters.bind(this)
    this.onZoomChanged = this.onZoomChanged.bind(this)
    this.getImageSizes = this.getImageSizes.bind(this)
    this.setImageSizes = this.setImageSizes.bind(this)
    this.getCalculator = this.getCalculator.bind(this)
    this.setCalculator = this.setCalculator.bind(this)
    this.removeMarkers = this.removeMarkers.bind(this)
    this.resetViewport = this.resetViewport.bind(this)
    this.getImagePath = this.getImagePath.bind(this)
    this.setImagePath = this.setImagePath.bind(this)
    this.pushMarkerTo = this.pushMarkerTo.bind(this)
    this.removeMarker = this.removeMarker.bind(this)
    this.clearMarkers = this.clearMarkers.bind(this)
    this.setupStyles = this.setupStyles.bind(this)
    this.getGridSize = this.getGridSize.bind(this)
    this.setGridSize = this.setGridSize.bind(this)
    this.getClusters = this.getClusters.bind(this)
    this.getMaxZoom = this.getMaxZoom.bind(this)
    this.setMaxZoom = this.setMaxZoom.bind(this)
    this.getMarkers = this.getMarkers.bind(this)
    this.addMarkers = this.addMarkers.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.setStyles = this.setStyles.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.getTitle = this.getTitle.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.repaint = this.repaint.bind(this)
    this.onIdle = this.onIdle.bind(this)
    this.redraw = this.redraw.bind(this)
    this.extend = this.extend.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.draw = this.draw.bind(this)

    this.extend(Clusterer, google.maps.OverlayView)

    this.markers = []
    this.clusters = []
    this.listeners = []
    this.activeMap = null
    this.ready = false
    this.gridSize = optOptions.gridSize || 60
    this.minClusterSize = optOptions.minimumClusterSize || 2
    this.maxZoom = optOptions.maxZoom || null
    this.styles = optOptions.styles || []

    this.title = optOptions.title || ''

    this.zoomOnClick = true

    if (optOptions.zoomOnClick !== undefined) {
      this.zoomOnClick = optOptions.zoomOnClick
    }

    this.averageCenter = false

    if (optOptions.averageCenter !== undefined) {
      this.averageCenter = optOptions.averageCenter
    }

    this.ignoreHidden = false

    if (optOptions.ignoreHidden !== undefined) {
      this.ignoreHidden = optOptions.ignoreHidden
    }

    this.enableRetinaIcons = false

    if (optOptions.enableRetinaIcons !== undefined) {
      this.enableRetinaIcons = optOptions.enableRetinaIcons
    }
    this.imagePath = optOptions.imagePath || IMAGE_PATH

    this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION

    this.imageSizes = optOptions.imageSizes || IMAGE_SIZES

    this.calculator = optOptions.calculator || CALCULATOR

    this.batchSize = optOptions.batchSize || BATCH_SIZE

    this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE

    this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS

    if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
      // Try to avoid IE timeout when processing a huge number of markers:
      this.batchSize = this.batchSizeIE
    }

    this.timerRefStatic = null

    this.setupStyles()

    this.addMarkers(optMarkers, true);

    (this as unknown as google.maps.OverlayView).setMap(map) // Note: this causes onAdd to be called
  }

  onZoomChanged() {
    this.resetViewport(false)

    // Workaround for this Google bug: when map is at level 0 and "-" of
    // zoom slider is clicked, a "zoom_changed" event is fired even though
    // the map doesn't zoom out any further. In this situation, no "idle"
    // event is triggered so the cluster markers that have been removed
    // do not get redrawn. Same goes for a zoom in at maxZoom.
    if (
      (this as unknown as google.maps.OverlayView).getMap()?.getZoom() === ((this as unknown as google.maps.OverlayView).get('minZoom') || 0) ||
      (this as unknown as google.maps.OverlayView).getMap()?.getZoom() === (this as unknown as google.maps.OverlayView).get('maxZoom')
    ) {
      google.maps.event.trigger(this, 'idle')
    }
  }

  onIdle() {
    this.redraw()
  }

  onAdd() {
    const map = (this as unknown as google.maps.OverlayView).getMap()

    this.activeMap = map

    this.ready = true

    this.repaint()

    if (map !== null) {
      // Add the map event listeners
      this.listeners = [
        google.maps.event.addListener(
          map,
          'zoom_changed',
          this.onZoomChanged
        ),
        google.maps.event.addListener(
          map,
          'idle',
          this.onIdle
        ),
      ]
    }
  }

  onRemove() {
    // Put all the managed markers back on the map:
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].getMap() !== this.activeMap) {
        this.markers[i].setMap(this.activeMap)
      }
    }

    // Remove all clusters:
    for (let i = 0; i < this.clusters.length; i++) {
      this.clusters[i].remove()
    }

    this.clusters = []

    // Remove map event listeners:
    for (let i = 0; i < this.listeners.length; i++) {
      google.maps.event.removeListener(this.listeners[i])
    }

    this.listeners = []

    this.activeMap = null

    this.ready = false
  }

  draw() { return }

  setupStyles() {
    if (this.styles.length > 0) {
      return
    }

    for (let i = 0; i < this.imageSizes.length; i++) {
      this.styles.push({
        url: `${this.imagePath + (i + 1)}.${this.imageExtension}`,
        height: this.imageSizes[i],
        width: this.imageSizes[i],
      })
    }
  }

  fitMapToMarkers() {
    const markers = this.getMarkers()

    const bounds = new google.maps.LatLngBounds()

    for (let i = 0; i < markers.length; i++) {
      const position = markers[i].getPosition()

      if (position) {
        bounds.extend(position)
      }
    }

    const map = (this as unknown as google.maps.OverlayView).getMap()

    if (map !== null && 'fitBounds' in map) {
      map.fitBounds(bounds)
    }

  }

  getGridSize(): number {
    return this.gridSize
  }

  setGridSize(gridSize: number) {
    this.gridSize = gridSize
  }

  getMinimumClusterSize(): number {
    return this.minClusterSize
  }

  setMinimumClusterSize(minimumClusterSize: number) {
    this.minClusterSize = minimumClusterSize
  }

  getMaxZoom(): number | null {
    return this.maxZoom
  }

  setMaxZoom(maxZoom: number) {
    this.maxZoom = maxZoom
  }

  getStyles(): ClusterIconStyle[] {
    return this.styles
  }

  setStyles(styles: ClusterIconStyle[]) {
    this.styles = styles
  }

  getTitle(): string {
    return this.title
  }

  setTitle(title: string) {
    this.title = title
  }

  getZoomOnClick(): boolean {
    return this.zoomOnClick
  }

  setZoomOnClick(zoomOnClick: boolean) {
    this.zoomOnClick = zoomOnClick
  }

  getAverageCenter(): boolean {
    return this.averageCenter
  }

  setAverageCenter(averageCenter: boolean) {
    this.averageCenter = averageCenter
  }

  getIgnoreHidden(): boolean {
    return this.ignoreHidden
  }

  setIgnoreHidden(ignoreHidden: boolean) {
    this.ignoreHidden = ignoreHidden
  }

  getEnableRetinaIcons(): boolean {
    return this.enableRetinaIcons
  }

  setEnableRetinaIcons(enableRetinaIcons: boolean) {
    this.enableRetinaIcons = enableRetinaIcons
  }

  getImageExtension(): string {
    return this.imageExtension
  }

  setImageExtension(imageExtension: string) {
    this.imageExtension = imageExtension
  }

  getImagePath(): string {
    return this.imagePath
  }

  setImagePath(imagePath: string) {
    this.imagePath = imagePath
  }

  getImageSizes(): number[] {
    return this.imageSizes
  }

  setImageSizes(imageSizes: number[]) {
    this.imageSizes = imageSizes
  }

  getCalculator(): TCalculator {
    return this.calculator
  }

  setCalculator(calculator: TCalculator) {
    this.calculator = calculator
  }

  getBatchSizeIE(): number {
    return this.batchSizeIE
  }

  setBatchSizeIE(batchSizeIE: number) {
    this.batchSizeIE = batchSizeIE
  }

  getClusterClass(): string {
    return this.clusterClass
  }

  setClusterClass(clusterClass: string) {
    this.clusterClass = clusterClass
  }

  getMarkers(): MarkerExtended[] {
    return this.markers
  }

  getTotalMarkers(): number {
    return this.markers.length
  }

  getClusters(): Cluster[] {
    return this.clusters
  }

  getTotalClusters(): number {
    return this.clusters.length
  }

  addMarker(marker: MarkerExtended, optNoDraw: boolean) {
    this.pushMarkerTo(marker)

    if (!optNoDraw) {
      this.redraw()
    }
  }

  addMarkers(markers: MarkerExtended[], optNoDraw: boolean) {
    for (const key in markers) {
      if (Object.prototype.hasOwnProperty.call(markers, key)) {
        this.pushMarkerTo(markers[key])
      }
    }

    if (!optNoDraw) {
      this.redraw()
    }
  }

  pushMarkerTo(marker: MarkerExtended) {
    // If the marker is draggable add a listener so we can update the clusters on the dragend:
    if (marker.getDraggable()) {
      google.maps.event.addListener(marker, 'dragend', () => {
        if (this.ready) {
          marker.isAdded = false

          this.repaint()
        }
      })
    }

    marker.isAdded = false

    this.markers.push(marker)
  }

  removeMarker_(marker: MarkerExtended): boolean {
    let index = -1

    if (this.markers.indexOf) {
      index = this.markers.indexOf(marker)
    } else {
      for (let i = 0; i < this.markers.length; i++) {
        if (marker === this.markers[i]) {
          index = i

          break
        }
      }
    }

    if (index === -1) {
      // Marker is not in our list of markers, so do nothing:
      return false
    }

    marker.setMap(null)

    this.markers.splice(index, 1) // Remove the marker from the list of managed markers

    return true
  }

  removeMarker(marker: MarkerExtended, optNoDraw: boolean): boolean {
    const removed = this.removeMarker_(marker)

    if (!optNoDraw && removed) {
      this.repaint()
    }

    return removed
  }

  removeMarkers(markers: MarkerExtended[], optNoDraw: boolean): boolean {
    let removed = false

    for (let i = 0; i < markers.length; i++) {
      removed = removed || this.removeMarker_(markers[i])
    }

    if (!optNoDraw && removed) {
      this.repaint()
    }

    return removed
  }

  clearMarkers() {
    this.resetViewport(true)

    this.markers = []
  }

  repaint() {
    const oldClusters = this.clusters.slice()

    this.clusters = []

    this.resetViewport(false)

    this.redraw()

    // Remove the old clusters.
    // Do it in a timeout to prevent blinking effect.
    setTimeout(function timeout() {
      for (let i = 0; i < oldClusters.length; i++) {
        oldClusters[i].remove()
      }
    }, 0)
  }

  getExtendedBounds(bounds: google.maps.LatLngBounds): google.maps.LatLngBounds {
    const projection = (this as unknown as google.maps.OverlayView).getProjection()

    // Convert the points to pixels and the extend out by the grid size.
    const trPix = projection.fromLatLngToDivPixel(
      // Turn the bounds into latlng.
      new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng())
    )

    if (trPix !== null) {
      trPix.x += this.gridSize
      trPix.y -= this.gridSize
    }

    const blPix = projection.fromLatLngToDivPixel(
      // Turn the bounds into latlng.
      new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng())
    )

    if (blPix !== null) {
      blPix.x -= this.gridSize
      blPix.y += this.gridSize
    }


    // Extend the bounds to contain the new bounds.
    if (trPix !== null) {
      // Convert the pixel points back to LatLng nw
      const point1 = projection.fromDivPixelToLatLng(trPix)

      if (point1 !== null) {
        bounds.extend(point1)
      }
    }

    if (blPix !== null) {
      // Convert the pixel points back to LatLng sw
      const point2 =  projection.fromDivPixelToLatLng(blPix)

      if (point2 !== null) {
        bounds.extend(
          point2
        )
      }
    }


    return bounds
  }

  redraw() {
    // Redraws all the clusters.
    this.createClusters(0)
  }

  resetViewport(optHide: boolean) {
    // Remove all the clusters
    for (let i = 0; i < this.clusters.length; i++) {
      this.clusters[i].remove()
    }

    this.clusters = []

    // Reset the markers to not be added and to be removed from the map.
    for (let i = 0; i < this.markers.length; i++) {
      const marker = this.markers[i]

      marker.isAdded = false

      if (optHide) {
        marker.setMap(null)
      }
    }
  }

  distanceBetweenPoints(p1: google.maps.LatLng, p2: google.maps.LatLng): number {
    const R = 6371 // Radius of the Earth in km

    const dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180
    const dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat() * Math.PI) / 180) *
        Math.cos((p2.lat() * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
  }

  isMarkerInBounds(marker: MarkerExtended, bounds: google.maps.LatLngBounds): boolean {
    const position = marker.getPosition()

    if (position) {
      return bounds.contains(position)
    }

    return false
  }

  addToClosestCluster(marker: MarkerExtended) {
    let cluster

    let distance = 40000 // Some large number

    let clusterToAddTo = null

    for (let i = 0; i < this.clusters.length; i++) {
      cluster = this.clusters[i]

      const center = cluster.getCenter()

      const position = marker.getPosition()

      if (center && position) {
        const d = this.distanceBetweenPoints(center, position)

        if (d < distance) {
          distance = d

          clusterToAddTo = cluster
        }
      }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
      clusterToAddTo.addMarker(marker)
    } else {
      cluster = new Cluster(this)

      cluster.addMarker(marker)

      this.clusters.push(cluster)
    }
  }

  createClusters(iFirst: number) {
    if (!this.ready) {
      return
    }

    // Cancel previous batch processing if we're working on the first batch:
    if (iFirst === 0) {
      /**
       * This event is fired when the <code>Clusterer</code> begins
       *  clustering markers.
       * @name Clusterer#clusteringbegin
       * @param {Clusterer} mc The Clusterer whose markers are being clustered.
       * @event
       */
      google.maps.event.trigger(this, 'clusteringbegin', this)

      if (this.timerRefStatic !== null) {
        window.clearTimeout(this.timerRefStatic)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete this.timerRefStatic
      }
    }

    const map = (this as unknown as google.maps.OverlayView).getMap()

    const bounds = map !== null && 'getBounds' in map ? map.getBounds() : null

    const zoom =  map?.getZoom() || 0
    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    //
    // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
    const mapBounds = zoom > 3
        ? new google.maps.LatLngBounds(
            bounds?.getSouthWest(),
            bounds?.getNorthEast()
          )
        : new google.maps.LatLngBounds(
            new google.maps.LatLng(85.02070771743472, -178.48388434375),
            new google.maps.LatLng(-85.08136444384544, 178.00048865625)
          )

    const extendedMapBounds = this.getExtendedBounds(mapBounds)

    const iLast = Math.min(iFirst + this.batchSize, this.markers.length)

    for (let i = iFirst; i < iLast; i++) {
      const marker = this.markers[i]

      if (!marker.isAdded && this.isMarkerInBounds(marker, extendedMapBounds) && (!this.ignoreHidden || (this.ignoreHidden && marker.getVisible()))) {
        this.addToClosestCluster(marker)
      }
    }

    if (iLast < this.markers.length) {
      this.timerRefStatic = window.setTimeout(
        () => {
          this.createClusters(iLast)
        },
        0
      )
    } else {
      this.timerRefStatic = null

      /**
       * This event is fired when the <code>Clusterer</code> stops
       *  clustering markers.
       * @name Clusterer#clusteringend
       * @param {Clusterer} mc The Clusterer whose markers are being clustered.
       * @event
       */
      google.maps.event.trigger(this, 'clusteringend', this)

      for (let i = 0; i < this.clusters.length; i++) {
        this.clusters[i].updateIcon()
      }
    }
  }

  extend<A extends typeof ClusterIcon | typeof Clusterer>(obj1: A, obj2: typeof google.maps.OverlayView): A {
    return function applyExtend(this: A, object: typeof google.maps.OverlayView): A {
      for (const property in object.prototype) {
        // @ts-ignore
        this.prototype[property] = object.prototype[property  as keyof google.maps.OverlayView]
      }

      return this
    }.apply<A, [typeof google.maps.OverlayView], any>(obj1, [obj2])
  }
}
