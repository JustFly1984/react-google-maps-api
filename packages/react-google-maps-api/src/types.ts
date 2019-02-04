/* global google */
export type PolygonPath = google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[]
export type PolygonPaths = google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>> | google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[][] | google.maps.LatLngLiteral[][] | google.maps.LatLng[] | google.maps.LatLngLiteral[]
export type HeatmapLayerData = google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[]
export type Bounds = google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
export type LatLng = google.maps.LatLng | google.maps.LatLngLiteral;
