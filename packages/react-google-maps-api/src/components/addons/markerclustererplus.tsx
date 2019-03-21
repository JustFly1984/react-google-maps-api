/**
 * @name @react-google-maps/markerclusterer for Google Maps V3
 * @version 1.0.0 [Mart 2019]
 * @author Alexey Lyakhov
 * @justfly1984
 * The library creates and manages per-zoom-level clusters for large amounts of markers.
 * <p>
 * This is typescript enhanced implementation of Gary Little's enhanced V3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >V2 MarkerClusterer</a> by Xiaoxi Wu. It is based on the
 * <a href="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/"
 * >V3 MarkerClusterer</a> port by Luke Mahe. MarkerClustererPlus was created by Gary Little.
 * <p>
 * v2.0 release: MarkerClustererPlus v2.0 is backward compatible with MarkerClusterer v1.0. It
 *  adds support for the <code>ignoreHidden</code>, <code>title</code>, <code>batchSizeIE</code>,
 *  and <code>calculator</code> properties as well as support for four more events. It also allows
 *  greater control over the styling of the text that appears on the cluster marker. The
 *  documentation has been significantly improved and the overall code has been simplified and
 *  polished. Very large numbers of markers can now be managed without causing Javascript timeout
 *  errors on Internet Explorer. Note that the name of the <code>clusterclick</code> event has been
 *  deprecated. The new name is <code>click</code>, so please change your application code now.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface ClusterIconStyle {
  url: string;
  height: number;
  width: number;
  anchorText: string[];
  anchorIcon: string[];
  textColor: string;
  textSize: number;
  textDecoration: string;
  fontWeight: string;
  fontStyle: string;
  fontFamily: string;
  backgroundPosition: string;
}

/**
 * @name ClusterIconStyle
 * @class This class represents the object for values in the <code>styles</code> array passed
 *  to the {@link MarkerClusterer} constructor. The element in this array that is used to
 *  style the cluster icon is determined by calling the <code>calculator</code> function.
 *
 * @property {string} url The URL of the cluster icon image file. Required.
 * @property {number} height The display height (in pixels) of the cluster icon. Required.
 * @property {number} width The display width (in pixels) of the cluster icon. Required.
 * @property {Array} [anchorText] The position (in pixels) from the center of the cluster icon to
 *  where the text label is to be centered and drawn. The format is <code>[yoffset, xoffset]</code>
 *  where <code>yoffset</code> increases as you go down from center and <code>xoffset</code>
 *  increases to the right of center. The default is <code>[0, 0]</code>.
 * @property {Array} [anchorIcon] The anchor position (in pixels) of the cluster icon. This is the
 *  spot on the cluster icon that is to be aligned with the cluster position. The format is
 *  <code>[yoffset, xoffset]</code> where <code>yoffset</code> increases as you go down and
 *  <code>xoffset</code> increases to the right of the top-left corner of the icon. The default
 *  anchor position is the center of the cluster icon.
 * @property {string} [textColor="black"] The color of the label text shown on the
 *  cluster icon.
 * @property {number} [textSize=11] The size (in pixels) of the label text shown on the
 *  cluster icon.
 * @property {string} [textDecoration="none"] The value of the CSS <code>text-decoration</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontWeight="bold"] The value of the CSS <code>font-weight</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontStyle="normal"] The value of the CSS <code>font-style</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [fontFamily="Arial,sans-serif"] The value of the CSS <code>font-family</code>
 *  property for the label text shown on the cluster icon.
 * @property {string} [backgroundPosition="0 0"] The position of the cluster icon image
 *  within the image defined by <code>url</code>. The format is <code>"xpos ypos"</code>
 *  (the same format as for the CSS <code>background-position</code> property). You must set
 *  this property appropriately when the image defined by <code>url</code> represents a sprite
 *  containing multiple images. Note that the position <i>must</i> be specified in px units.
 */

interface ClusterIconInfo {
  text: string;
  index: number;
  title: string;
}

/**
 * @name ClusterIconInfo
 * @class This class is an object containing general information about a cluster icon. This is
 *  the object that a <code>calculator</code> function returns.
 *
 * @property {string} text The text of the label to be shown on the cluster icon.
 * @property {number} index The index plus 1 of the element in the <code>styles</code>
 *  array to be used to style the cluster icon.
 * @property {string} title The tooltip to display when the mouse moves over the cluster icon.
 *  If this value is <code>undefined</code> or <code>""</code>, <code>title</code> is set to the
 *  value of the <code>title</code> property passed to the MarkerClusterer.
 */

/**
 * A cluster icon.
 *
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Cluster} cluster The cluster with which the icon is to be associated.
 * @param {Array} [styles] An array of {@link ClusterIconStyle} defining the cluster icons
 *  to use for various cluster sizes.
 * @private
 */

export type ExtendedMarker = google.maps.Marker & {
  isAdded: boolean
}

class ClusterIcon extends google.maps.OverlayView {
  constructor(cluster: Cluster, styles: ClusterIconStyle[]) {
    super()

    this.cluster = cluster
    this.div = null
    this.visible = false
    this.className = cluster.getMarkerClusterer().getClusterClass()

    // this.cluster.getMarkerClusterer()

    this.styles = styles;
    this.center = null;
    this.sums = null;
    this.boundsChangedListener = null
    this.backgroundPosition = "0 0"
    this.width = 0
    this.height = 0
    this.anchorText = []
    this.url = ''
    this.textColor = "black"
    this.textSize = 11
    this.fontFamily = "Arial,sans-serif"
    this.fontWeight = "bold"
    this.fontStyle = "normal"
    this.textDecoration = "none"
    this.anchorIcon = []


    this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
  }

  cluster: Cluster;
  div: HTMLDivElement | null;
  visible: boolean;
  className: string;
  styles: ClusterIconStyle[];
  center: google.maps.LatLng | null;
  sums: ClusterIconInfo | null;
  boundsChangedListener: google.maps.MapsEventListener | null;
  backgroundPosition: string;
  width: number;
  height: number;
  anchorText: string[];
  anchorIcon: string[];
  url: string;
  textColor: string;
  textSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;

  onAdd = () => {
    let isMouseDownInCluster: boolean;
    let isDraggingMapByCluster: boolean;

    this.div = document.createElement("div");

    this.div.className = this.className;

    if (this.visible) {
      this.show();
    }

    this.getPanes().overlayMouseTarget.appendChild(this.div)

    // Fix for Issue 157
    this.boundsChangedListener = google.maps.event.addListener(
      this.getMap(),
      "boundschanged",
      () => {
      isDraggingMapByCluster = isMouseDownInCluster;
      }
    )

    google.maps.event.addDomListener(
      this.div,
      "mousedown",
      () => {
        isMouseDownInCluster = true;
        isDraggingMapByCluster = false;
      }
    )

    google.maps.event.addDomListener(
      this.div,
      "click",
      (e: MouseEvent) => {
        isMouseDownInCluster = false;

        if (!isDraggingMapByCluster) {
          const markerClusterer = this.cluster.getMarkerClusterer()
          /**
           * This event is fired when a cluster marker is clicked.
           * @name MarkerClusterer#click
           * @param {Cluster} c The cluster that was clicked.
           * @event
           */
          google.maps.event
            .trigger(
              markerClusterer,
              "click",
              this.cluster
            )

          google.maps.event
            .trigger(
              markerClusterer,
              "clusterclick",
              this.cluster
            ) // deprecated name

          // The default click handler follows. Disable it by setting
          // the zoomOnClick property to false.
          if (markerClusterer.getZoomOnClick()) {
            // Zoom into the cluster.
            const maxZoom = markerClusterer
              .getMaxZoom()

            const bounds = this.cluster
              .getBounds()

            if (bounds !== null) {
              markerClusterer
                .getMap()
                .fitBounds(bounds)

              // There is a fix for Issue 170 here:
              setTimeout(
                () => {
                  markerClusterer
                    .getMap()
                    .fitBounds(bounds)
                  // Don't zoom beyond the max zoom level
                  if (
                    maxZoom !== null &&
                    markerClusterer.getMap().getZoom() > maxZoom
                  ) {
                    markerClusterer
                      .getMap()
                      .setZoom(maxZoom + 1)
                  }
                },
                100
              )
            }
          }

          // Prevent event propagation to the map:
          e.cancelBubble = true

          if (e.stopPropagation) {
            e.stopPropagation()
          }
        }
      }
    )

    google.maps.event.addDomListener(
      this.div,
      "mouseover",
      () => {
        /**
         * This event is fired when the mouse moves over a cluster marker.
         * @name MarkerClusterer#mouseover
         * @param {Cluster} c The cluster that the mouse moved over.
         * @event
         */
        google.maps.event
          .trigger(
            this.cluster.getMarkerClusterer(),
            "mouseover",
            this.cluster
          )
      }
    )

    google.maps.event.addDomListener(
      this.div,
      "mouseout",
      () => {
        /**
         * This event is fired when the mouse moves out of a cluster marker.
         * @name MarkerClusterer#mouseout
         * @param {Cluster} c The cluster that the mouse moved out of.
         * @event
         */
        google.maps.event
          .trigger(
            this.cluster.getMarkerClusterer(),
            "mouseout",
            this.cluster
          )
      }
    )
  }

  onRemove = (): void => {
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

  draw = (): void => {
    if (this.visible) {
      if (this.center !== null) {
      var pos = this.getPosFromLatLng(this.center)

        if (this.div !== null) {
          this.div.style.top = pos.y + "px"

          this.div.style.left = pos.x + "px"
        }
      }
    }
  }

  hide = (): void => {
    if (this.div !== null) {
      this.div.style.display = "none"
    }

    this.visible = false
  }

  show = (): void => {
    if (this.div !== null && this.sums !== null) {
      let img = ""

      // NOTE: values must be specified in px units
      const bp = this.backgroundPosition.split(" ")

      const spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ""), 10)
      const spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ""), 10)

      if (this.center !== null) {
        this.div.style.cssText = this.createCss(
          this.getPosFromLatLng(this.center)
        )
      }

      img = "<img src='" + this.url + "' style='position: absolute; top: " + spriteV + "px; left: " + spriteH + "px; "

      if (!this.cluster.getMarkerClusterer().enableRetinaIcons) {
        img += "clip: rect(" + (-1 * spriteV) + "px, " + ((-1 * spriteH) + this.width) + "px, " +
          ((-1 * spriteV) + this.height) + "px, " + (-1 * spriteH) + "px);"
      }

      img += "'>"

      this.div.innerHTML = img + "<div style='" +
        "position: absolute;" +
        "top: " + this.anchorText[0] + "px;" +
        "left: " + this.anchorText[1] + "px;" +
        "color: " + this.textColor + ";" +
        "font-size: " + this.textSize + "px;" +
        "font-family: " + this.fontFamily + ";" +
        "font-weight: " + this.fontWeight + ";" +
        "font-style: " + this.fontStyle + ";" +
        "text-decoration: " + this.textDecoration + ";" +
        "text-align: center;" +
        "width: " + this.width + "px;" +
        "line-height:" + this.height + "px;" +
        "'>" + this.sums.text + "</div>"

      if (typeof this.sums.title === "undefined" || this.sums.title === "") {
        this.div.title = this.cluster.getMarkerClusterer().getTitle()
      } else {
        this.div.title = this.sums.title
      }

      this.div.style.display = ""
    }

    this.visible = true
  }

  useStyle = (sums: ClusterIconInfo): void => {
    this.sums = sums

    const style = this.styles[Math.min(this.styles.length - 1, Math.max(0, this.sums.index - 1))]

    this.url = style.url

    this.height = style.height

    this.width = style.width

    this.anchorText = style.anchorText || [0, 0]

    this.anchorIcon = style.anchorIcon || [String(this.height / 2), String(this.width / 2)]

    this.textColor = style.textColor;
    this.textSize = style.textSize;
    this.textDecoration = style.textDecoration;
    this.fontWeight = style.fontWeight;
    this.fontStyle = style.fontStyle;
    this.fontFamily = style.fontFamily;
    this.backgroundPosition = style.backgroundPosition;
  }

  setCenter = (center: google.maps.LatLng): void => {
    this.center = center;
  }

  createCss = (pos: google.maps.Point): string =>
    "cursor: pointer; position: absolute; top: " + pos.y + "px; left: " + pos.x + "px; width: " + this.width + "px; height: " + this.height + "px;"

  getPosFromLatLng = (latlng: google.maps.LatLng): google.maps.Point => {
    const pos = this.getProjection().fromLatLngToDivPixel(latlng)

    pos.x = pos.x - parseInt(this.anchorIcon[1], 10)

    pos.y = pos.y - parseInt(this.anchorIcon[0], 10)

    return pos
  }
}

/**
 * Creates a single cluster that manages a group of proximate markers.
 *  Used internally, do not call this constructor directly.
 * @constructor
 * @param {MarkerClusterer} mc The <code>MarkerClusterer</code> object with which this
 *  cluster is associated.
 */

class Cluster {
  constructor(mc: MarkerClusterer & google.maps.OverlayView) {
    this.markerClusterer = mc

    this.map = mc.getMap()

    this.gridSize = this.markerClusterer.getGridSize()

    this.minClusterSize = this.markerClusterer.getMinimumClusterSize()

    this.averageCenter = this.markerClusterer.getAverageCenter()

    this.markers = []
    this.center = null
    this.bounds = null
    this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles())
  }

  clusterIcon: ClusterIcon;
  markerClusterer: MarkerClusterer;
  map: google.maps.Map;
  markers: ExtendedMarker[];
  center: google.maps.LatLng | null;
  bounds: google.maps.LatLngBounds | null;
  gridSize: number;
  minClusterSize: number;
  averageCenter: boolean;

  getSize = (): number =>
    this.markers.length

  getMarkers = (): ExtendedMarker[] =>
    this.markers

  getCenter = (): google.maps.LatLng | null =>
    this.center

  getMap = (): google.maps.Map =>
    this.map

  getMarkerClusterer = (): MarkerClusterer =>
    this.markerClusterer

  getBounds = (): google.maps.LatLngBounds | null => {
    if (this.center !== null) {
      const bounds = new google.maps.LatLngBounds(this.center, this.center)

      const markers = this.getMarkers()

      for (let i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
      }

      return bounds
    }

    return null
  }

  remove = (): void => {
    this.clusterIcon.setMap(null)

    this.markers = []

    delete this.markers
  }

  addMarker = (marker: ExtendedMarker): boolean => {
    if (this.isMarkerAlreadyAdded(marker)) {
      return false
    }

    if (this.center === null) {
      this.center = marker.getPosition()

      this.calculateBounds()
    } else {
      if (this.averageCenter) {
        this.center = new google.maps.LatLng(
          (this.center.lat() * this.markers.length + marker.getPosition().lat()) / (this.markers.length + 1),
          (this.center.lng() * this.markers.length + marker.getPosition().lng()) / (this.markers.length + 1)
        )

        this.calculateBounds()
      }
    }

    marker.isAdded = true

    this.markers.push(marker)

    const mCount = this.markers.length

    const mz = this.markerClusterer.getMaxZoom()

    if (mz !== null && this.map.getZoom() > mz) {
      // Zoomed in past max zoom, so show the marker.
      if (marker.getMap() !== this.map) {
        marker.setMap(this.map)
      }
    } else if (mCount < this.minClusterSize) {
      // Min cluster size not reached so show the marker.
      if (marker.getMap() !== this.map) {
        marker.setMap(this.map)
      }
    } else if (mCount === this.minClusterSize) {
      // Hide the markers that were showing.
      for (let i = 0; i < mCount; i++) {
        this.markers[i].setMap(null)
      }
    } else {
      marker.setMap(null)
    }

    this.updateIcon()

    return true
  }

  isMarkerInClusterBounds = (marker: ExtendedMarker): boolean => {
    if (this.bounds !== null) {
      return this.bounds.contains(marker.getPosition())
    }

    return false
  }

  calculateBounds = (): void => {
    if (this.center !== null) {
      this.bounds = this.markerClusterer.getExtendedBounds(
        new google.maps.LatLngBounds(this.center, this.center)
      )
    }
  }

  updateIcon = (): void => {
    const mCount = this.markers.length

    const mz = this.markerClusterer.getMaxZoom()

    if (mz !== null && this.map.getZoom() > mz) {
      this.clusterIcon.hide()

      return
    }

    if (mCount < this.minClusterSize) {
      // Min cluster size not yet reached.
      this.clusterIcon.hide()

      return
    }

    if (this.center !== null) {
      this.clusterIcon.setCenter(this.center)
    }

    this.clusterIcon.useStyle(
      this.markerClusterer.getCalculator()(
        this.markers,
        this.markerClusterer.getStyles().length
      )
    )

    this.clusterIcon.show()
  }

  isMarkerAlreadyAdded = (marker: ExtendedMarker): boolean => {
    if (this.markers.indexOf) {
      return this.markers.indexOf(marker) !== -1
    } else {
      for (let i = 0; i < this.markers.length; i++) {
        if (marker === this.markers[i]) {
          return true
        }
      }
    }

    return false
  }
}

/**
 * @name MarkerClustererOptions
 * @class This class represents the optional parameter passed to
 *  the {@link MarkerClusterer} constructor.
 * @property {number} [gridSize=60] The grid size of a cluster in pixels. The grid is a square.
 * @property {number} [maxZoom=null] The maximum zoom level at which clustering is enabled or
 *  <code>null</code> if clustering is to be enabled at all zoom levels.
 * @property {boolean} [zoomOnClick=true] Whether to zoom the map when a cluster marker is
 *  clicked. You may want to set this to <code>false</code> if you have installed a handler
 *  for the <code>click</code> event and it deals with zooming on its own.
 * @property {boolean} [averageCenter=false] Whether the position of a cluster marker should be
 *  the average position of all markers in the cluster. If set to <code>false</code>, the
 *  cluster marker is positioned at the location of the first marker added to the cluster.
 * @property {number} [minimumClusterSize=2] The minimum number of markers needed in a cluster
 *  before the markers are hidden and a cluster marker appears.
 * @property {boolean} [ignoreHidden=false] Whether to ignore hidden markers in clusters. You
 *  may want to set this to <code>true</code> to ensure that hidden markers are not included
 *  in the marker count that appears on a cluster marker (this count is the value of the
 *  <code>text</code> property of the result returned by the default <code>calculator</code>).
 *  If set to <code>true</code> and you change the visibility of a marker being clustered, be
 *  sure to also call <code>MarkerClusterer.repaint()</code>.
 * @property {string} [title=""] The tooltip to display when the mouse moves over a cluster
 *  marker. (Alternatively, you can use a custom <code>calculator</code> function to specify a
 *  different tooltip for each cluster marker.)
 * @property {function} [calculator=MarkerClusterer.CALCULATOR] The function used to determine
 *  the text to be displayed on a cluster marker and the index indicating which style to use
 *  for the cluster marker. The input parameters for the function are (1) the array of markers
 *  represented by a cluster marker and (2) the number of cluster icon styles. It returns a
 *  {@link ClusterIconInfo} object. The default <code>calculator</code> returns a
 *  <code>text</code> property which is the number of markers in the cluster and an
 *  <code>index</code> property which is one higher than the lowest integer such that
 *  <code>10^i</code> exceeds the number of markers in the cluster, or the size of the styles
 *  array, whichever is less. The <code>styles</code> array element used has an index of
 *  <code>index</code> minus 1. For example, the default <code>calculator</code> returns a
 *  <code>text</code> value of <code>"125"</code> and an <code>index</code> of <code>3</code>
 *  for a cluster icon representing 125 markers so the element used in the <code>styles</code>
 *  array is <code>2</code>. A <code>calculator</code> may also return a <code>title</code>
 *  property that contains the text of the tooltip to be used for the cluster marker. If
 *   <code>title</code> is not defined, the tooltip is set to the value of the <code>title</code>
 *   property for the MarkerClusterer.
 * @property {string} [clusterClass="cluster"] The name of the CSS class defining general styles
 *  for the cluster markers. Use this class to define CSS styles that are not set up by the code
 *  that processes the <code>styles</code> array.
 * @property {Array} [styles] An array of {@link ClusterIconStyle} elements defining the styles
 *  of the cluster markers to be used. The element to be used to style a given cluster marker
 *  is determined by the function defined by the <code>calculator</code> property.
 *  The default is an array of {@link ClusterIconStyle} elements whose properties are derived
 *  from the values for <code>imagePath</code>, <code>imageExtension</code>, and
 *  <code>imageSizes</code>.
 * @property {boolean} [enableRetinaIcons=false] Whether to allow the use of cluster icons that
 * have sizes that are some multiple (typically double) of their actual display size. Icons such
 * as these look better when viewed on high-resolution monitors such as Apple's Retina displays.
 * Note: if this property is <code>true</code>, sprites cannot be used as cluster icons.
 * @property {number} [batchSize=MarkerClusterer.BATCH_SIZE] Set this property to the
 *  number of markers to be processed in a single batch when using a browser other than
 *  Internet Explorer (for Internet Explorer, use the batchSizeIE property instead).
 * @property {number} [batchSizeIE=MarkerClusterer.BATCH_SIZE_IE] When Internet Explorer is
 *  being used, markers are processed in several batches with a small delay inserted between
 *  each batch in an attempt to avoid Javascript timeout errors. Set this property to the
 *  number of markers to be processed in a single batch; select as high a number as you can
 *  without causing a timeout error in the browser. This number might need to be as low as 100
 *  if 15,000 markers are being managed, for example.
 * @property {string} [imagePath=MarkerClusterer.IMAGE_PATH]
 *  The full URL of the root name of the group of image files to use for cluster icons.
 *  The complete file name is of the form <code>imagePath</code>n.<code>imageExtension</code>
 *  where n is the image file number (1, 2, etc.).
 * @property {string} [imageExtension=MarkerClusterer.IMAGE_EXTENSION]
 *  The extension name for the cluster icon image files (e.g., <code>"png"</code> or
 *  <code>"jpg"</code>).
 * @property {Array} [imageSizes=MarkerClusterer.IMAGE_SIZES]
 *  An array of numbers containing the widths of the group of
 *  <code>imagePath</code>n.<code>imageExtension</code> image files.
 *  (The images are assumed to be square.)
 */

/**
 * Creates a MarkerClusterer object with the options specified in {@link MarkerClustererOptions}.
 * @constructor
 * @extends google.maps.OverlayView
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<ExtendedMarker>} [opt_markers] The markers to be added to the cluster.
 * @param {MarkerClustererOptions} [opt_options] The optional parameters.
 */

interface MarkerClustererOptions {
  gridSize: number;
  maxZoom: number | null;
  zoomOnClick: boolean;
  averageCenter: boolean;
  minimumClusterSize: number;
  ignoreHidden: boolean;
  title: string;
  calculator: (markers: ExtendedMarker[], numStyles: number) => ClusterIconInfo;
  clusterClass: string;
  styles: ClusterIconStyle[];
  enableRetinaIcons: boolean;
  batchSize: number;
  batchSizeIE:number;
  imagePath: string;
  imageExtension: string;
  imageSizes: number[]
}

class MarkerClusterer extends google.maps.OverlayView {
  markers: ExtendedMarker[];
  clusters: Cluster[];
  listeners: google.maps.MapsEventListener[]
  activeMap: google.maps.Map | null;
  ignoreHidden: boolean;
  enableRetinaIcons: boolean;
  ready: boolean;
  gridSize?: number;
  minClusterSize?: number;
  maxZoom?: number | null;
  styles?: ClusterIconStyle[];
  title?: string;
  imagePath?:  string;
  imageExtension?: string;
  imageSizes?: number[];
  calculator?: (markers: ExtendedMarker[], numStyles: number) => ClusterIconInfo;
  batchSize?: number;
  batchSizeIE?: number;
  clusterClass?: string;
  zoomOnClick?: boolean;
  averageCenter?: boolean;
  timerRefStatic: null | number;

  constructor (
    map: google.maps.Map,
    opt_markers: ExtendedMarker[] = [],
    opt_options: MarkerClustererOptions = {
      gridSize: 60,
      minimumClusterSize: 2,
      maxZoom: null,
      styles: [],
      title: "",
      imagePath: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m",
      imageExtension: "png",
      imageSizes: [53, 56, 66, 78, 90],
      calculator: (markers: ExtendedMarker[], numStyles: number): ClusterIconInfo => {
        let index = 0

        let title = ""

        let count = markers.length.toString()

        let dv = count

        // @ts-ignore weird magic
        while (dv !== 0) {
          // @ts-ignore weird magic
          dv = parseInt(dv, 10) / 10

          index++
        }

        index = Math.min(index, numStyles)

        return {
          text: count,
          index: index,
          title: title
        }
      },
      batchSize: 2000,
      batchSizeIE: 500,
      clusterClass: "cluster",
      zoomOnClick: true,
      averageCenter: true,
      enableRetinaIcons: false,
      ignoreHidden: true,
    }
  ) {
    super()

    this.markers = []
    this.clusters = []
    this.listeners = []
    this.activeMap = null
    this.ready = false

    this.gridSize = opt_options.gridSize
    this.minClusterSize = opt_options.minimumClusterSize
    this.maxZoom = opt_options.maxZoom
    this.styles = opt_options.styles
    this.title = opt_options.title
    this.zoomOnClick = opt_options.zoomOnClick

    this.averageCenter = false

    this.timerRefStatic = null

    if (opt_options.averageCenter !== undefined) {
      this.averageCenter = opt_options.averageCenter
    }

    this.ignoreHidden = false

    if (opt_options.ignoreHidden !== undefined) {
      this.ignoreHidden = opt_options.ignoreHidden
    }

    this.enableRetinaIcons = false;

    if (opt_options.enableRetinaIcons !== undefined) {
      this.enableRetinaIcons = opt_options.enableRetinaIcons;
    }

    this.imagePath = opt_options.imagePath
    this.imageExtension = opt_options.imageExtension
    this.imageSizes = opt_options.imageSizes
    this.calculator =opt_options.calculator
    this.batchSize = opt_options.batchSize
    this.batchSizeIE = opt_options.batchSizeIE
    this.clusterClass = opt_options.clusterClass

    if (navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
      // Try to avoid IE timeout when processing a huge number of markers:
      this.batchSize = this.batchSizeIE
    }

    this.setupStyles()

    this.addMarkers(opt_markers, true)

    this.setMap(map) // Note: this causes onAdd to be called
  }

  onAdd = (): void => {
    this.activeMap = this.getMap()

    this.ready = true

    this.repaint()

    // Add the map event listeners
    this.listeners = [
      google.maps.event.addListener(this.getMap(), "zoom_changed", () => {
        this.resetViewport(false)
        // Workaround for this Google bug: when map is at level 0 and "-" of
        // zoom slider is clicked, a "zoom_changed" event is fired even though
        // the map doesn't zoom out any further. In this situation, no "idle"
        // event is triggered so the cluster markers that have been removed
        // do not get redrawn. Same goes for a zoom in at maxZoom.
        if (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) {
          google.maps.event.trigger(this, "idle")
        }
      }),
      google.maps.event.addListener(this.getMap(), "idle", () => {
        this.redraw()
      })
    ]
  }

  onRemove = (): void => {
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

  draw = (): void => {}

  setupStyles = (): void => {
    if (this.styles.length > 0) {
      return
    }

    for (let i = 0; i < this.imageSizes.length; i++) {
      const size = this.imageSizes[i]

      this.styles.push({
        url: this.imagePath + (i + 1) + "." + this.imageExtension,
        height: size,
        width: size
      })
    }
  }

  fitMapToMarkers = (): void => {
    const markers = this.getMarkers()

    const bounds = new google.maps.LatLngBounds()

    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition())
    }

    this.getMap().fitBounds(bounds)
  }

  getGridSize = (): number =>
    this.gridSize

  setGridSize = (gridSize: number): void => {
    this.gridSize = gridSize
  }

  getMinimumClusterSize = (): number =>
    this.minClusterSize

  setMinimumClusterSize = (minimumClusterSize: number): void => {
    this.minClusterSize = minimumClusterSize;
  }

  getMaxZoom = (): number =>
    this.maxZoom

  setMaxZoom = (maxZoom: number): void => {
    this.maxZoom = maxZoom
  }

  getStyles = (): ClusterIconStyle[] =>
    this.styles

  setStyles = (styles: ClusterIconStyle[]): void => {
    this.styles = styles
  }

  getTitle = (): string =>
    this.title

  setTitle = (title: string): void => {
    this.title = title
  }

  getZoomOnClick = (): boolean =>
    this.zoomOnClick

  setZoomOnClick = (zoomOnClick: boolean): void => {
    this.zoomOnClick = zoomOnClick
  }

  getAverageCenter = (): boolean =>
    this.averageCenter

  setAverageCenter = (averageCenter: boolean): void => {
    this.averageCenter = averageCenter
  }

  getIgnoreHidden = (): boolean =>
    this.ignoreHidden

  setIgnoreHidden = (ignoreHidden: boolean): void => {
    this.ignoreHidden = ignoreHidden
  }

  getEnableRetinaIcons = (): boolean =>
    this.enableRetinaIcons

  setEnableRetinaIcons = (enableRetinaIcons: boolean): void => {
    this.enableRetinaIcons = enableRetinaIcons;
  }

  getImageExtension = (): string =>
    this.imageExtension

  setImageExtension = (imageExtension: string): void => {
    this.imageExtension = imageExtension
  }

  getImagePath = (): string =>
    this.imagePath

  setImagePath = (imagePath: string): void => {
    this.imagePath = imagePath
  }

  getImageSizes = (): number[] =>
    this.imageSizes

  setImageSizes = (imageSizes: number[]): void => {
    this.imageSizes = imageSizes
  }

  getCalculator = (): (markers: ExtendedMarker[], numStyles: number) => ClusterIconInfo =>
    this.calculator

  setCalculator = (calculator: (markers: ExtendedMarker[], numStyles: number) => ClusterIconInfo) => {
    this.calculator = calculator
  }

  getBatchSizeIE = (): number =>
    this.batchSizeIE

  setBatchSizeIE = (batchSizeIE: number): void => {
    this.batchSizeIE = batchSizeIE;
  }

  getClusterClass = (): string =>
    this.clusterClass

  setClusterClass = (clusterClass: string): void => {
    this.clusterClass = clusterClass;
  }

  getMarkers = (): ExtendedMarker[] =>
    this.markers

  getTotalMarkers = (): number =>
    this.markers.length

  getClusters = (): Cluster[] =>
    this.clusters

  getTotalClusters = (): number =>
    this.clusters.length

  addMarker = (marker: ExtendedMarker, opt_nodraw: boolean): void => {
    this.pushMarkerTo(marker)

    if (!opt_nodraw) {
      this.redraw()
    }
  }

  addMarkers = (markers: ExtendedMarker[], opt_nodraw: boolean): void => {
    for (let key in markers) {
      if (markers.hasOwnProperty(key)) {
        this.pushMarkerTo(markers[key])
      }
    }

    if (!opt_nodraw) {
      this.redraw()
    }
  }

  pushMarkerTo = (marker: ExtendedMarker): void => {
    // If the marker is draggable add a listener so we can update the clusters on the dragend:
    if (marker.getDraggable()) {
      google.maps.event.addListener(marker, "dragend", () => {
        if (this.ready) {
          marker.isAdded = false

          this.repaint()
        }
      })
    }

    marker.isAdded = false

    this.markers.push(marker)
  }

  removeMarker = (marker: ExtendedMarker, opt_nodraw: boolean): boolean => {
    let index = this.markers.indexOf(marker)

    let removed

    if (index === -1) {
      // Marker is not in our list of markers, so do nothing:
      removed = false
    } // Remove the marker from the list of managed markers

    removed = true

    if (removed) {
      marker.setMap(null)

      this.markers.splice(index, 1)

      if (!opt_nodraw) {
        this.repaint()
      }
    }

    return removed
  }

  removeMarkers = (markers: ExtendedMarker[], opt_nodraw: boolean): boolean => {
    let removed = false

    for (let i = 0; i < markers.length; i++) {
      removed = this.removeMarker(markers[i], opt_nodraw)
    }

    if (!opt_nodraw && removed) {
      this.repaint()
    }

    return removed
  }

  clearMarkers = (): void => {
    this.resetViewport(true)

    this.markers = []
  }

  repaint = () => {
    var oldClusters = this.clusters.slice()

    this.clusters = []

    this.resetViewport(false)

    this.redraw()

    // Remove the old clusters.
    // Do it in a timeout to prevent blinking effect.
    setTimeout(
      () => {
        for (let i = 0; i < oldClusters.length; i++) {
          oldClusters[i].remove()
        }
      },
      0
    )
  }

  getExtendedBounds = (bounds: google.maps.LatLngBounds): google.maps.LatLngBounds => {
    var projection = this.getProjection()

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getNorthEast().lng()
    )

    var bl = new google.maps.LatLng(
      bounds.getSouthWest().lat(),
      bounds.getSouthWest().lng()
    )

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr)

    trPix.x += this.gridSize
    trPix.y -= this.gridSize

    var blPix = projection.fromLatLngToDivPixel(bl)

    blPix.x -= this.gridSize
    blPix.y += this.gridSize

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix)
    var sw = projection.fromDivPixelToLatLng(blPix)

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne)
    bounds.extend(sw)

    return bounds
  }

  redraw = () => {
    this.createClusters(0)
  }

  resetViewport = (opt_hide: boolean): void => {
    // Remove all the clusters
    for (let i = 0; i < this.clusters.length; i++) {
      this.clusters[i].remove();
    }

    this.clusters = [];

    // Reset the markers to not be added and to be removed from the map.
    for (let i = 0; i < this.markers.length; i++) {
      const marker = this.markers[i]

      marker.isAdded = false

      if (opt_hide) {
        marker.setMap(null)
      }
    }
  }

  distanceBetweenPoints = (p1: google.maps.LatLng, p2: google.maps.LatLng): number => {
    const R = 6371 // Radius of the Earth in km

    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)

    return R * (
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      )
    )
  }

  isMarkerInBounds = (marker: ExtendedMarker, bounds: google.maps.LatLngBounds): boolean =>
    bounds.contains(marker.getPosition())

  addToClosestCluster = function (marker: ExtendedMarker): void {
    var d
    var cluster
    var center

    var distance = 40000 // Some large number

    var clusterToAddTo = null

    for (let i = 0; i < this.clusters.length; i++) {
      cluster = this.clusters[i]

      center = cluster.getCenter()

      if (center) {
        d = this.distanceBetweenPoints(center, marker.getPosition())

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

  createClusters = (iFirst: number) => {
    var marker

    var mapBounds

    if (!this.ready) {
      return;
    }

    // Cancel previous batch processing if we're working on the first batch:
    if (iFirst === 0) {
      /**
       * This event is fired when the <code>MarkerClusterer</code> begins
       *  clustering markers.
       * @name MarkerClusterer#clusteringbegin
       * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
       * @event
       */
      google.maps.event.trigger(this, "clusteringbegin", this);

      if (this.timerRefStatic !== null) {
        clearTimeout(this.timerRefStatic)

        delete this.timerRefStatic
      }
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    //
    // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
    if (this.getMap().getZoom() > 3) {
      mapBounds = new google.maps.LatLngBounds(
        this.getMap().getBounds().getSouthWest(),
        this.getMap().getBounds().getNorthEast()
      )
    } else {
      mapBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(85.02070771743472, -178.48388434375),
        new google.maps.LatLng(-85.08136444384544, 178.00048865625)
      )
    }

    var bounds = this.getExtendedBounds(mapBounds)

    var iLast = Math.min(
      iFirst + this.batchSize,
      this.markers.length
    )

    for (let i = iFirst; i < iLast; i++) {
      marker = this.markers[i]

      if (!marker.isAdded && this.isMarkerInBounds(marker, bounds)) {
        if (!this.ignoreHidden || (this.ignoreHidden && marker.getVisible())) {
          this.addToClosestCluster(marker)
        }
      }
    }

    if (iLast < this.markers.length) {
      this.timerRefStatic = setTimeout(
        () => {
          this.createClusters(iLast)
        },
        0
      )
    } else {
      delete this.timerRefStatic

      /**
       * This event is fired when the <code>MarkerClusterer</code> stops
       *  clustering markers.
       * @name MarkerClusterer#clusteringend
       * @param {MarkerClusterer} mc The MarkerClusterer whose markers are being clustered.
       * @event
       */
      google.maps.event.trigger(this, "clusteringend", this)
    }
  }
}
