import clsx from 'clsx';
import {
  Book,
  Box,
  Code,
  Compass,
  Layers,
  Map,
  Pencil,
  Route,
  Search,
  StretchHorizontal,
} from 'lucide-react';
import type { JSX } from 'react';
import { Link, useParams } from 'react-router';

import { CodeHighlight } from '../components/code-highlight.tsx';
import { styles } from '../styles.ts';

type Section = {
  id: string;
  name: string;
  icon: typeof Book;
  children?: { id: string; name: string }[] | undefined;
};

const sections: Section[] = [
  { id: 'getting-started', name: 'Getting Started', icon: Book },
  { id: 'loading', name: 'Loading the API', icon: Code },
  { id: 'google-map', name: 'GoogleMap', icon: Map },
  {
    id: 'drawing',
    name: 'Drawing',
    icon: Pencil,
    children: [
      { id: 'marker', name: 'Marker' },
      { id: 'info-window', name: 'InfoWindow' },
      { id: 'polyline', name: 'Polyline' },
      { id: 'polygon', name: 'Polygon' },
      { id: 'rectangle', name: 'Rectangle' },
      { id: 'circle', name: 'Circle' },
      { id: 'drawing-manager', name: 'DrawingManager' },
    ],
  },
  {
    id: 'layers',
    name: 'Layers',
    icon: Layers,
    children: [
      { id: 'traffic-layer', name: 'TrafficLayer' },
      { id: 'bicycling-layer', name: 'BicyclingLayer' },
      { id: 'transit-layer', name: 'TransitLayer' },
      { id: 'heatmap-layer', name: 'HeatmapLayer' },
      { id: 'kml-layer', name: 'KmlLayer' },
    ],
  },
  {
    id: 'services',
    name: 'Services',
    icon: Route,
    children: [
      { id: 'directions', name: 'Directions' },
      { id: 'distance-matrix', name: 'DistanceMatrix' },
    ],
  },
  {
    id: 'places',
    name: 'Places',
    icon: Search,
    children: [
      { id: 'autocomplete', name: 'Autocomplete' },
      { id: 'search-box', name: 'StandaloneSearchBox' },
    ],
  },
  {
    id: 'overlays',
    name: 'Overlays',
    icon: Box,
    children: [
      { id: 'overlay-view', name: 'OverlayView' },
      { id: 'ground-overlay', name: 'GroundOverlay' },
    ],
  },
  {
    id: 'street-view',
    name: 'Street View',
    icon: Compass,
    children: [
      { id: 'street-view-panorama', name: 'StreetViewPanorama' },
      { id: 'street-view-service', name: 'StreetViewService' },
    ],
  },
  {
    id: 'addons',
    name: 'Addons',
    icon: StretchHorizontal,
    children: [
      { id: 'marker-clusterer', name: 'MarkerClusterer' },
      { id: 'info-box', name: 'InfoBox' },
    ],
  },
];

const content: Record<
  string,
  {
    title: string;
    content: string;
    code?: string;
    props?: { name: string; type: string; description: string }[];
  }
> = {
  'getting-started': {
    title: 'Getting Started',
    content: `React Google Maps API provides a comprehensive set of React components for the Google Maps JavaScript API.

This library allows you to declaratively create maps, markers, overlays, and more using familiar React patterns.

**Installation**`,
    code: `npm install @react-google-maps/api

# or with yarn
yarn add @react-google-maps/api

# or with bun
bun add @react-google-maps/api`,
  },
  loading: {
    title: 'Loading the API',
    content: `Before using any map components, you need to load the Google Maps JavaScript API. There are two approaches:

**1. useJsApiLoader Hook (Recommended)**
A hook-based approach that gives you more control over the loading state.

**2. LoadScript Component**
A component-based approach that wraps your map components.`,
    code: `// Using useJsApiLoader (Recommended)
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';

const libraries = ['places', 'drawing'];

function MyMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
    libraries,
  });

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    />
  );
}

// Using LoadScript Component
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';

const libraries = ['places'];

function MyMap() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      />
    </LoadScript>
  );
}`,
    props: [
      { name: 'googleMapsApiKey', type: 'string', description: 'Your Google Maps API key' },
      {
        name: 'libraries',
        type: 'Libraries[]',
        description: 'Array of libraries to load: places, drawing, geometry, visualization',
      },
      { name: 'language', type: 'string', description: 'Language for the map UI' },
      { name: 'region', type: 'string', description: 'Region bias for geocoding' },
      { name: 'version', type: 'string', description: 'API version (default: weekly)' },
      { name: 'mapIds', type: 'string[]', description: 'Map IDs for cloud-based map styling' },
    ],
  },
  'google-map': {
    title: 'GoogleMap',
    content: `The GoogleMap component is the core component that renders a Google Map. All other map components must be children of GoogleMap.

**Features:**
- Fully controlled via props
- Supports all map events
- Access map instance via onLoad callback
- Use useGoogleMap() hook to access map from child components`,
    code: `import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [map, setMap] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = useMemo(() => ({
    streetViewControl: false,
    mapTypeControl: false,
  }), []);

  const onLoad = useCallback((map) => {
    setMap(map);
    // Fit bounds, add listeners, etc.
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onClick = useCallback((e) => {
    console.log('Clicked:', e.latLng?.toJSON());
  }, []);

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      mapContainerClassName="my-map-container"
      center={center}
      zoom={12}
      onClick={onClick}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {/* Child components go here */}
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'mapContainerStyle',
        type: 'CSSProperties',
        description: 'Style object for the map container',
      },
      {
        name: 'mapContainerClassName',
        type: 'string',
        description: 'CSS class for the map container',
      },
      { name: 'center', type: 'LatLng | LatLngLiteral', description: 'Initial center position' },
      { name: 'zoom', type: 'number', description: 'Initial zoom level (0-22)' },
      { name: 'options', type: 'google.maps.MapOptions', description: 'Map options object' },
      { name: 'onClick', type: '(e: MapMouseEvent) => void', description: 'Map click handler' },
      { name: 'onDrag', type: '() => void', description: 'Map drag handler' },
      { name: 'onZoomChanged', type: '() => void', description: 'Zoom change handler' },
      { name: 'onLoad', type: '(map: Map) => void', description: 'Called when map is loaded' },
      {
        name: 'onUnmount',
        type: '(map: Map) => void',
        description: 'Called when map is unmounted',
      },
    ],
  },
  marker: {
    title: 'Marker',
    content: `The Marker component renders a marker on the map. Markers can be customized with icons, labels, animations, and event handlers.

**Note:** Marker is deprecated in favor of AdvancedMarkerElement, but remains widely used.`,
    code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

function MapWithMarkers() {
  const [selected, setSelected] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 39.8283, lng: -98.5795 }), []);
  const locations = useMemo(() => [
    { id: 1, position: { lat: 40.7128, lng: -74.006 }, title: 'New York' },
    { id: 2, position: { lat: 34.0522, lng: -118.2437 }, title: 'Los Angeles' },
  ], []);
  const icon = useMemo(() => ({
    url: '/marker-icon.png',
    scaledSize: new google.maps.Size(32, 32),
  }), []);

  const onCloseClick = useCallback(() => setSelected(null), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
    >
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.position}
          title={loc.title}
          onClick={() => setSelected(loc)}
          icon={icon}
          animation={google.maps.Animation.DROP}
        />
      ))}

      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={onCloseClick}
        >
          <div>{selected.title}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'position',
        type: 'LatLng | LatLngLiteral',
        description: 'Marker position (required)',
      },
      { name: 'icon', type: 'string | Icon | Symbol', description: 'Custom marker icon' },
      { name: 'label', type: 'string | MarkerLabel', description: 'Marker label' },
      { name: 'title', type: 'string', description: 'Hover tooltip text' },
      { name: 'draggable', type: 'boolean', description: 'Allow marker to be dragged' },
      { name: 'visible', type: 'boolean', description: 'Marker visibility' },
      { name: 'animation', type: 'Animation', description: 'DROP or BOUNCE animation' },
      { name: 'clusterer', type: 'Clusterer', description: 'MarkerClusterer instance' },
      { name: 'onClick', type: '(e: MapMouseEvent) => void', description: 'Click handler' },
      { name: 'onDragEnd', type: '(e: MapMouseEvent) => void', description: 'Drag end handler' },
      { name: 'onLoad', type: '(marker: Marker) => void', description: 'Load callback' },
    ],
  },
  'info-window': {
    title: 'InfoWindow',
    content: `InfoWindow displays content in a popup window above the map. It can be anchored to a marker or positioned at coordinates.`,
    code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

function MapWithInfoWindow() {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const position = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  const onMarkerClick = useCallback(() => setIsOpen(true), []);
  const onCloseClick = useCallback(() => setIsOpen(false), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={12}
    >
      <Marker position={position} onClick={onMarkerClick} />

      {isOpen && (
        <InfoWindow
          position={position}
          onCloseClick={onCloseClick}
        >
          <div className="p-2">
            <h3 className="font-bold">New York City</h3>
            <p>The Big Apple</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'position',
        type: 'LatLng | LatLngLiteral',
        description: 'Position (required if no anchor)',
      },
      { name: 'anchor', type: 'MVCObject', description: 'Anchor to a marker' },
      { name: 'children', type: 'ReactNode', description: 'Content to display' },
      { name: 'onCloseClick', type: '() => void', description: 'Close button click handler' },
      { name: 'onLoad', type: '(infoWindow: InfoWindow) => void', description: 'Load callback' },
    ],
  },
  polyline: {
    title: 'Polyline',
    content: `Polyline draws a line on the map connecting a series of coordinates. Useful for routes, paths, and boundaries.`,
    code: `import { GoogleMap, Polyline } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithPolyline() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 39.8283, lng: -98.5795 }), []);
  const path = useMemo(() => [
    { lat: 40.7128, lng: -74.006 },
    { lat: 41.8781, lng: -87.6298 },
    { lat: 34.0522, lng: -118.2437 },
  ], []);
  const options = useMemo(() => ({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    geodesic: true,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
    >
      <Polyline
        path={path}
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'path', type: 'LatLng[] | LatLngLiteral[]', description: 'Array of coordinates' },
      { name: 'options', type: 'PolylineOptions', description: 'Polyline styling options' },
      { name: 'draggable', type: 'boolean', description: 'Allow polyline to be dragged' },
      { name: 'editable', type: 'boolean', description: 'Allow editing vertices' },
      { name: 'onClick', type: '(e: PolyMouseEvent) => void', description: 'Click handler' },
      { name: 'onLoad', type: '(polyline: Polyline) => void', description: 'Load callback' },
    ],
  },
  polygon: {
    title: 'Polygon',
    content: `Polygon draws a closed shape on the map. Useful for highlighting areas, regions, or zones.`,
    code: `import { GoogleMap, Polygon } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithPolygon() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 24.886, lng: -70.268 }), []);
  const triangleCoords = useMemo(() => [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ], []);
  const options = useMemo(() => ({
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
    >
      <Polygon
        paths={triangleCoords}
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'paths',
        type: 'LatLng[][] | LatLngLiteral[][]',
        description: 'Array of coordinate arrays',
      },
      { name: 'options', type: 'PolygonOptions', description: 'Polygon styling options' },
      { name: 'draggable', type: 'boolean', description: 'Allow polygon to be dragged' },
      { name: 'editable', type: 'boolean', description: 'Allow editing vertices' },
      { name: 'onClick', type: '(e: PolyMouseEvent) => void', description: 'Click handler' },
      { name: 'onLoad', type: '(polygon: Polygon) => void', description: 'Load callback' },
    ],
  },
  rectangle: {
    title: 'Rectangle',
    content: `Rectangle draws a rectangular shape on the map defined by bounds.`,
    code: `import { GoogleMap, Rectangle } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithRectangle() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 44.5452, lng: -78.5389 }), []);
  const bounds = useMemo(() => ({
    north: 44.599,
    south: 44.49,
    east: -78.443,
    west: -78.649,
  }), []);
  const options = useMemo(() => ({
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    strokeColor: '#0000FF',
    strokeWeight: 2,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9}
    >
      <Rectangle
        bounds={bounds}
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'bounds',
        type: 'LatLngBounds | LatLngBoundsLiteral',
        description: 'Rectangle bounds (required)',
      },
      { name: 'options', type: 'RectangleOptions', description: 'Rectangle styling options' },
      { name: 'draggable', type: 'boolean', description: 'Allow rectangle to be dragged' },
      { name: 'editable', type: 'boolean', description: 'Allow resizing' },
      { name: 'onClick', type: '(e: MapMouseEvent) => void', description: 'Click handler' },
      { name: 'onLoad', type: '(rectangle: Rectangle) => void', description: 'Load callback' },
    ],
  },
  circle: {
    title: 'Circle',
    content: `Circle draws a circular shape on the map defined by a center and radius.`,
    code: `import { GoogleMap, Circle } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithCircle() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = useMemo(() => ({
    fillColor: '#00FF00',
    fillOpacity: 0.35,
    strokeColor: '#00FF00',
    strokeWeight: 2,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <Circle
        center={center}
        radius={1000} // meters
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'center', type: 'LatLng | LatLngLiteral', description: 'Circle center (required)' },
      { name: 'radius', type: 'number', description: 'Radius in meters' },
      { name: 'options', type: 'CircleOptions', description: 'Circle styling options' },
      { name: 'draggable', type: 'boolean', description: 'Allow circle to be dragged' },
      { name: 'editable', type: 'boolean', description: 'Allow resizing' },
      { name: 'onClick', type: '(e: MapMouseEvent) => void', description: 'Click handler' },
      { name: 'onLoad', type: '(circle: Circle) => void', description: 'Load callback' },
    ],
  },
  'drawing-manager': {
    title: 'DrawingManager',
    content: `DrawingManager enables users to draw shapes (markers, circles, polygons, etc.) directly on the map.

**Requires:** \`drawing\` library`,
    code: `import { GoogleMap, DrawingManager } from '@react-google-maps/api';
import { useCallback, useMemo } from 'react';

function MapWithDrawing() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = useMemo(() => ({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
  }), []);

  const onPolygonComplete = useCallback((polygon) => {
    const path = polygon.getPath().getArray();
    console.log('Polygon drawn:', path);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <DrawingManager
        drawingMode={google.maps.drawing.OverlayType.POLYGON}
        options={options}
        onPolygonComplete={onPolygonComplete}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'drawingMode', type: 'OverlayType', description: 'Active drawing mode' },
      { name: 'options', type: 'DrawingManagerOptions', description: 'Drawing manager options' },
      {
        name: 'onMarkerComplete',
        type: '(marker: Marker) => void',
        description: 'Marker drawn callback',
      },
      {
        name: 'onCircleComplete',
        type: '(circle: Circle) => void',
        description: 'Circle drawn callback',
      },
      {
        name: 'onPolygonComplete',
        type: '(polygon: Polygon) => void',
        description: 'Polygon drawn callback',
      },
      {
        name: 'onPolylineComplete',
        type: '(polyline: Polyline) => void',
        description: 'Polyline drawn callback',
      },
      {
        name: 'onRectangleComplete',
        type: '(rectangle: Rectangle) => void',
        description: 'Rectangle drawn callback',
      },
    ],
  },
  'traffic-layer': {
    title: 'TrafficLayer',
    content: `TrafficLayer displays real-time traffic conditions on the map.`,
    code: `import { GoogleMap, TrafficLayer } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithTraffic() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <TrafficLayer />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'onLoad', type: '(layer: TrafficLayer) => void', description: 'Load callback' },
      { name: 'onUnmount', type: '(layer: TrafficLayer) => void', description: 'Unmount callback' },
    ],
  },
  'bicycling-layer': {
    title: 'BicyclingLayer',
    content: `BicyclingLayer displays bike paths and bike-friendly roads on the map.`,
    code: `import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithBicycling() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      <BicyclingLayer />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'onLoad', type: '(layer: BicyclingLayer) => void', description: 'Load callback' },
      {
        name: 'onUnmount',
        type: '(layer: BicyclingLayer) => void',
        description: 'Unmount callback',
      },
    ],
  },
  'transit-layer': {
    title: 'TransitLayer',
    content: `TransitLayer displays public transit routes and stations on the map.`,
    code: `import { GoogleMap, TransitLayer } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithTransit() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      <TransitLayer />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'onLoad', type: '(layer: TransitLayer) => void', description: 'Load callback' },
      { name: 'onUnmount', type: '(layer: TransitLayer) => void', description: 'Unmount callback' },
    ],
  },
  'heatmap-layer': {
    title: 'HeatmapLayer',
    content: `HeatmapLayer visualizes data intensity with color gradients.

**Requires:** \`visualization\` library`,
    code: `import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithHeatmap() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const data = useMemo(() => [
    new google.maps.LatLng(40.7128, -74.006),
    new google.maps.LatLng(40.7148, -74.004),
    new google.maps.LatLng(40.7108, -74.008),
    // ... more points
  ], []);
  const options = useMemo(() => ({
    radius: 20,
    opacity: 0.6,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <HeatmapLayer
        data={data}
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'data', type: 'LatLng[] | WeightedLocation[]', description: 'Heatmap data points' },
      {
        name: 'options',
        type: 'HeatmapLayerOptions',
        description: 'Heatmap options (radius, opacity, gradient)',
      },
      { name: 'onLoad', type: '(layer: HeatmapLayer) => void', description: 'Load callback' },
    ],
  },
  'kml-layer': {
    title: 'KmlLayer',
    content: `KmlLayer renders KML/KMZ files on the map.`,
    code: `import { GoogleMap, KmlLayer } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithKml() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = useMemo(() => ({
    preserveViewport: true,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
    >
      <KmlLayer
        url="https://example.com/path/to/file.kml"
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'url', type: 'string', description: 'URL to KML/KMZ file (required)' },
      { name: 'options', type: 'KmlLayerOptions', description: 'KML layer options' },
      { name: 'onClick', type: '(e: KmlMouseEvent) => void', description: 'Click handler' },
      { name: 'onLoad', type: '(layer: KmlLayer) => void', description: 'Load callback' },
    ],
  },
  directions: {
    title: 'Directions',
    content: `DirectionsService calculates routes and DirectionsRenderer displays them on the map.`,
    code: `import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useCallback, useMemo } from 'react';

function MapWithDirections() {
  const [directions, setDirections] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const directionsServiceOptions = useMemo(() => ({
    destination: 'Boston, MA',
    origin: 'New York, NY',
    travelMode: google.maps.TravelMode.DRIVING,
  }), []);
  const directionsRendererOptions = useMemo(() => ({
    polylineOptions: {
      strokeColor: '#FF0000',
      strokeWeight: 4,
    },
  }), []);

  const directionsCallback = useCallback((result, status) => {
    if (status === 'OK' && result) {
      setDirections(result);
    }
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
    >
      {!directions && (
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={directionsRendererOptions}
        />
      )}
    </GoogleMap>
  );
}`,
    props: [
      { name: 'options', type: 'DirectionsRequest', description: 'Directions request options' },
      { name: 'callback', type: '(result, status) => void', description: 'Response callback' },
      {
        name: 'directions',
        type: 'DirectionsResult',
        description: 'Directions result (for renderer)',
      },
    ],
  },
  'distance-matrix': {
    title: 'DistanceMatrixService',
    content: `DistanceMatrixService calculates travel distance and time for multiple origins and destinations.`,
    code: `import { DistanceMatrixService } from '@react-google-maps/api';

function DistanceCalculator() {
  const onLoad = useCallback((service) => {
    service.getDistanceMatrix({
      origins: ['New York, NY', 'Boston, MA'],
      destinations: ['Los Angeles, CA', 'Chicago, IL'],
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK') {
        console.log(response);
      }
    });
  }, []);

  return <DistanceMatrixService onLoad={onLoad} />;
}`,
    props: [
      { name: 'options', type: 'DistanceMatrixRequest', description: 'Request options' },
      { name: 'callback', type: '(response, status) => void', description: 'Response callback' },
      { name: 'onLoad', type: '(service) => void', description: 'Load callback' },
    ],
  },
  autocomplete: {
    title: 'Autocomplete',
    content: `Autocomplete provides address/place suggestions as users type.

**Requires:** \`places\` library`,
    code: `import { Autocomplete } from '@react-google-maps/api';
import { useState, useCallback, useMemo } from 'react';

function PlaceAutocomplete() {
  const [autocomplete, setAutocomplete] = useState(null);

  const restrictions = useMemo(() => ({ country: 'us' }), []);

  const onLoad = useCallback((auto) => {
    setAutocomplete(auto);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      console.log('Selected place:', place);
    }
  }, [autocomplete]);

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      restrictions={restrictions}
    >
      <input
        type="text"
        placeholder="Search for a place"
        className="w-full p-2 border rounded"
      />
    </Autocomplete>
  );
}`,
    props: [
      { name: 'children', type: 'ReactElement<InputHTMLAttributes>', description: 'Input element' },
      { name: 'restrictions', type: 'ComponentRestrictions', description: 'Country restrictions' },
      { name: 'types', type: 'string[]', description: 'Place types to return' },
      { name: 'fields', type: 'string[]', description: 'Place data fields to fetch' },
      { name: 'onPlaceChanged', type: '() => void', description: 'Place selection callback' },
      { name: 'onLoad', type: '(autocomplete) => void', description: 'Load callback' },
    ],
  },
  'search-box': {
    title: 'StandaloneSearchBox',
    content: `StandaloneSearchBox provides a search box for places without requiring a map.

**Requires:** \`places\` library`,
    code: `import { StandaloneSearchBox } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

function SearchBox() {
  const [searchBox, setSearchBox] = useState(null);

  const onLoad = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      console.log('Places:', places);
    }
  }, [searchBox]);

  return (
    <StandaloneSearchBox
      onLoad={onLoad}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
    </StandaloneSearchBox>
  );
}`,
    props: [
      { name: 'children', type: 'ReactElement<InputHTMLAttributes>', description: 'Input element' },
      { name: 'bounds', type: 'LatLngBounds', description: 'Search bias bounds' },
      { name: 'onPlacesChanged', type: '() => void', description: 'Places changed callback' },
      { name: 'onLoad', type: '(searchBox) => void', description: 'Load callback' },
    ],
  },
  'overlay-view': {
    title: 'OverlayView',
    content: `OverlayView renders custom React components as map overlays at specific coordinates.`,
    code: `import { GoogleMap, OverlayView, OVERLAY_MOUSE_TARGET } from '@react-google-maps/api';
import { useCallback, useMemo } from 'react';

function MapWithCustomOverlay() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const position = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);

  const onButtonClick = useCallback(() => {
    alert('Clicked!');
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={12}
    >
      <OverlayView
        position={position}
        mapPaneName={OVERLAY_MOUSE_TARGET}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">Custom Overlay</h3>
          <p>Any React component!</p>
          <button onClick={onButtonClick}>
            Click me
          </button>
        </div>
      </OverlayView>
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'position',
        type: 'LatLng | LatLngLiteral',
        description: 'Overlay position (required)',
      },
      {
        name: 'mapPaneName',
        type: 'string',
        description: 'Pane to render in (OVERLAY_MOUSE_TARGET, etc.)',
      },
      { name: 'children', type: 'ReactNode', description: 'Content to render' },
      {
        name: 'getPixelPositionOffset',
        type: '(w, h) => {x, y}',
        description: 'Offset calculation',
      },
      { name: 'onLoad', type: '(overlay) => void', description: 'Load callback' },
    ],
  },
  'ground-overlay': {
    title: 'GroundOverlay',
    content: `GroundOverlay displays an image on the map within specified bounds.`,
    code: `import { GoogleMap, GroundOverlay } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithGroundOverlay() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.74, lng: -74.18 }), []);
  const bounds = useMemo(() => ({
    north: 40.773941,
    south: 40.712216,
    east: -74.12544,
    west: -74.22655,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
    >
      <GroundOverlay
        url="https://example.com/overlay-image.png"
        bounds={bounds}
        opacity={0.5}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'url', type: 'string', description: 'Image URL (required)' },
      {
        name: 'bounds',
        type: 'LatLngBounds | LatLngBoundsLiteral',
        description: 'Image bounds (required)',
      },
      { name: 'opacity', type: 'number', description: 'Opacity (0-1)' },
      { name: 'onLoad', type: '(overlay) => void', description: 'Load callback' },
    ],
  },
  'street-view-panorama': {
    title: 'StreetViewPanorama',
    content: `StreetViewPanorama displays Google Street View imagery.`,
    code: `import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithStreetView() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const position = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = useMemo(() => ({
    enableCloseButton: true,
    addressControl: false,
  }), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={14}
    >
      <StreetViewPanorama
        position={position}
        visible={true}
        options={options}
      />
    </GoogleMap>
  );
}`,
    props: [
      { name: 'position', type: 'LatLng | LatLngLiteral', description: 'Panorama position' },
      { name: 'pov', type: 'StreetViewPov', description: 'Point of view (heading, pitch)' },
      { name: 'visible', type: 'boolean', description: 'Visibility' },
      { name: 'options', type: 'StreetViewPanoramaOptions', description: 'Panorama options' },
      { name: 'onLoad', type: '(panorama) => void', description: 'Load callback' },
    ],
  },
  'street-view-service': {
    title: 'StreetViewService',
    content: `StreetViewService provides metadata about Street View coverage.`,
    code: `import { StreetViewService } from '@react-google-maps/api';

function StreetViewChecker() {
  const onLoad = useCallback((service) => {
    service.getPanorama({
      location: { lat: 40.7128, lng: -74.006 },
      radius: 50,
    }, (data, status) => {
      if (status === 'OK') {
        console.log('Street View available:', data);
      }
    });
  }, []);

  return <StreetViewService onLoad={onLoad} />;
}`,
    props: [{ name: 'onLoad', type: '(service) => void', description: 'Load callback' }],
  },
  'marker-clusterer': {
    title: 'MarkerClusterer',
    content: `MarkerClusterer groups nearby markers into clusters for better performance and UX with many markers.`,
    code: `import { GoogleMap, MarkerClusterer, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

function MapWithClusters() {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const locations = useMemo(() => [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.7148, lng: -74.004 },
    { lat: 40.7108, lng: -74.008 },
    // ... many more markers
  ], []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      <MarkerClusterer>
        {(clusterer) =>
          locations.map((loc, i) => (
            <Marker
              key={i}
              position={loc}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}`,
    props: [
      {
        name: 'children',
        type: '(clusterer) => ReactNode',
        description: 'Render function for markers',
      },
      { name: 'options', type: 'ClustererOptions', description: 'Clusterer options' },
      {
        name: 'averageCenter',
        type: 'boolean',
        description: 'Center clusters at average position',
      },
      {
        name: 'minimumClusterSize',
        type: 'number',
        description: 'Minimum markers to form cluster',
      },
      { name: 'onLoad', type: '(clusterer) => void', description: 'Load callback' },
    ],
  },
  'info-box': {
    title: 'InfoBox',
    content: `InfoBox is a customizable alternative to InfoWindow with more styling options.`,
    code: `import { GoogleMap, Marker, InfoBox } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

function MapWithInfoBox() {
  const [isOpen, setIsOpen] = useState(false);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const position = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const options = useMemo(() => ({
    closeBoxURL: '',
    enableEventPropagation: true,
    pixelOffset: new google.maps.Size(-70, -100),
  }), []);

  const onMarkerClick = useCallback(() => setIsOpen(true), []);
  const onCloseClick = useCallback(() => setIsOpen(false), []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={12}
    >
      <Marker position={position} onClick={onMarkerClick} />

      {isOpen && (
        <InfoBox
          position={position}
          options={options}
        >
          <div className="bg-white p-4 rounded shadow-lg min-w-[200px]">
            <h3 className="font-bold">Custom InfoBox</h3>
            <p>Fully customizable styling!</p>
            <button onClick={onCloseClick}>Close</button>
          </div>
        </InfoBox>
      )}
    </GoogleMap>
  );
}`,
    props: [
      { name: 'position', type: 'LatLng | LatLngLiteral', description: 'Position' },
      { name: 'options', type: 'InfoBoxOptions', description: 'InfoBox options' },
      { name: 'children', type: 'ReactNode', description: 'Content to display' },
      { name: 'onCloseClick', type: '() => void', description: 'Close callback' },
      { name: 'onLoad', type: '(infoBox) => void', description: 'Load callback' },
    ],
  },
};

const containerClasses = clsx(
  styles.container,
  styles.maxW7xl,
  styles.px4,
  styles.smPx6,
  styles.lgPx8,
);
const layoutClasses = clsx(styles.flex, styles.flexCol, styles.lgFlexRow, styles.gap8);
const sidebarClasses = clsx(styles.lgW72, styles.mdW64, styles.shrink0);
const navClasses = clsx(styles.card, styles.p4, styles.sticky, styles.top4);
const navTitleClasses = clsx(styles.fontSemibold, styles.textThemePrimary, styles.mb4);
const navItemClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.px3,
  styles.py2,
  styles.textSm,
  styles.fontMedium,
  styles.textThemePrimary,
);
const navIconClasses = clsx(styles.h4, styles.w4);
const navChildrenClasses = clsx(styles.ml6, styles.spaceY1);
const navChildLinkClasses = clsx(
  styles.block,
  styles.px3,
  styles.py1_5,
  styles.rounded,
  styles.textSm,
  styles.transitionColors,
);
const mainClasses = clsx(styles.flex1, styles.minW0);
const contentCardClasses = clsx(styles.card, styles.p8);
const contentTitleClasses = clsx(
  styles.text3xl,
  styles.fontBold,
  styles.textThemePrimary,
  styles.mb4,
);
const contentClasses = clsx(styles.prose, styles.proseGray, styles.maxWNone, styles.mb6);
const contentParagraphClasses = clsx(styles.textThemeSecondary, styles.mb4);
const codeTitleClasses = clsx(
  styles.textLg,
  styles.fontSemibold,
  styles.textThemePrimary,
  styles.mb4,
);
const propsTitleClasses = clsx(
  styles.textLg,
  styles.fontSemibold,
  styles.textThemePrimary,
  styles.mb4,
);
const tableClasses = clsx(styles.wFull, styles.textSm);
const tableHeaderClasses = clsx(styles.borderB, styles.borderTheme);
const tableHeaderCellClasses = clsx(
  styles.textLeft,
  styles.py3,
  styles.px4,
  styles.fontSemibold,
  styles.textThemePrimary,
);
const tableRowClasses = clsx(styles.borderB, styles.borderTheme);
const tableCellClasses = clsx(styles.py3, styles.px4);
const codeClasses = clsx(
  styles.textBlue600,
  styles.bgBlue50,
  styles.px1,
  styles.py0_5,
  styles.rounded,
  styles.fontMono,
  styles.textSm,
);

export default function DocsPage(): JSX.Element {
  const { section } = useParams();
  const currentSection = section || 'getting-started';
  const currentContent = content[currentSection] ?? content['getting-started']!;

  return (
    <div className={styles.py12}>
      <div className={containerClasses}>
        <div className={layoutClasses}>
          <aside className={sidebarClasses}>
            <nav className={navClasses}>
              <h2 className={navTitleClasses}>Documentation</h2>
              <ul className={styles.spaceY1}>
                {sections.map((item) => (
                  <li key={item.id}>
                    {item.children ? (
                      <div>
                        <div className={navItemClasses}>
                          <item.icon className={navIconClasses} />
                          {item.name}
                        </div>
                        <ul className={navChildrenClasses}>
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link to={`/docs/${child.id}`} className={navChildLinkClasses}>
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link to={`/docs/${item.id}`} className={navItemClasses}>
                        <item.icon className={styles.iconSm} />
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className={mainClasses}>
            <div className={contentCardClasses}>
              <h1 className={contentTitleClasses}>{currentContent.title}</h1>
              <div className={contentClasses}>
                {currentContent.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className={contentParagraphClasses}>
                    {paragraph.split('**').map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className={styles.textThemePrimary}>
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                ))}
              </div>

              {currentContent.code ? (
                <div className={styles.mb8}>
                  <h3 className={codeTitleClasses}>Example</h3>
                  <CodeHighlight code={currentContent.code} language="tsx" />
                </div>
              ) : null}

              {currentContent.props && currentContent.props.length > 0 ? (
                <div>
                  <h3 className={propsTitleClasses}>Props</h3>
                  <div className={styles.overflowXAuto}>
                    <table className={tableClasses}>
                      <thead>
                        <tr className={tableHeaderClasses}>
                          <th className={tableHeaderCellClasses}>Prop</th>
                          <th className={tableHeaderCellClasses}>Type</th>
                          <th className={tableHeaderCellClasses}>Description</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentContent.props.map((prop) => (
                          <tr key={prop.name} className={tableRowClasses}>
                            <td className={tableCellClasses}>
                              <code className={codeClasses}>{prop.name}</code>
                            </td>
                            <td className={tableCellClasses}>
                              <code className={codeClasses}>{prop.type}</code>
                            </td>
                            <td className={tableCellClasses}>{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
