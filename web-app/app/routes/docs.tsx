import clsx from 'clsx';
import {
  Book,
  Box,
  Circle,
  Code,
  Compass,
  Component,
  Layers,
  LucideProps,
  Map,
  Pencil,
  Route,
  Search,
  StretchHorizontal,
} from 'lucide-react';
import { useMemo, type ForwardRefExoticComponent, type JSX, type RefAttributes } from 'react';
import { useParams } from 'react-router';

import { useTranslation } from 'react-i18next';
import { CodeHighlight } from '../components/code-highlight.tsx';
import { styles } from '../styles.ts';
import { LocaleLink } from '../utils/locale-link.tsx';

type Section = {
  id: string;
  name: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  children?:
    | {
        id: string;
        name: string;
        icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
      }[]
    | undefined;
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
  'text-theme-accent',
  'bg-theme-accent-light',
  styles.px1,
  styles.py0_5,
  styles.rounded,
  styles.fontMono,
  styles.textSm,
);

export default function DocsPage(): JSX.Element {
  const { t } = useTranslation();
  const { section } = useParams<{ section?: string | undefined }>();
  const currentSection = section || 'getting-started';

  const sections = useMemo<Array<Section>>(() => {
    return [
      { id: 'getting-started', name: t('docs.navigation.sections.gettingStarted'), icon: Book },
      { id: 'loading', name: t('docs.navigation.sections.loading'), icon: Code },
      { id: 'google-map', name: t('docs.navigation.sections.googleMap'), icon: Map },
      {
        id: 'drawing',
        name: t('docs.navigation.sectionNames.drawing'),
        icon: Pencil,
        children: [
          { id: 'marker', name: t('docs.navigation.sections.marker'), icon: Map },
          { id: 'info-window', name: t('docs.navigation.sections.infoWindow'), icon: Pencil },
          { id: 'polyline', name: t('docs.navigation.sections.polyline'), icon: Route },
          { id: 'polygon', name: t('docs.navigation.sections.polygon'), icon: Pencil },
          { id: 'rectangle', name: t('docs.navigation.sections.rectangle'), icon: Box },
          { id: 'circle', name: t('docs.navigation.sections.circle'), icon: Circle },
          {
            id: 'drawing-manager',
            name: t('docs.navigation.sections.drawingManager'),
            icon: Pencil,
          },
        ],
      },
      {
        id: 'layers',
        name: t('docs.navigation.sectionNames.layers'),
        icon: Layers,
        children: [
          { id: 'traffic-layer', name: t('docs.navigation.sections.trafficLayer') },
          { id: 'bicycling-layer', name: t('docs.navigation.sections.bicyclingLayer') },
          { id: 'transit-layer', name: t('docs.navigation.sections.transitLayer') },
          { id: 'heatmap-layer', name: t('docs.navigation.sections.heatmapLayer') },
          { id: 'kml-layer', name: t('docs.navigation.sections.kmlLayer') },
        ],
      },
      {
        id: 'services',
        name: t('docs.navigation.sectionNames.services'),
        icon: Route,
        children: [
          { id: 'directions', name: t('docs.navigation.sections.directions') },
          { id: 'distance-matrix', name: t('docs.navigation.sections.distanceMatrix') },
        ],
      },
      {
        id: 'places',
        name: t('docs.navigation.sectionNames.places'),
        icon: Search,
        children: [
          { id: 'components', name: t('docs.navigation.sections.components'), icon: Component },
          { id: 'search-box', name: t('docs.navigation.sections.searchBox') },
          { id: 'autocomplete', name: t('docs.navigation.sections.autocomplete') },
        ],
      },
      {
        id: 'overlays',
        name: t('docs.navigation.sectionNames.overlays'),
        icon: Box,
        children: [
          { id: 'overlay-view', name: t('docs.navigation.sections.overlayView') },
          { id: 'ground-overlay', name: t('docs.navigation.sections.groundOverlay') },
        ],
      },
      {
        id: 'street-view',
        name: t('docs.navigation.sectionNames.streetView'),
        icon: Compass,
        children: [
          { id: 'street-view-panorama', name: t('docs.navigation.sections.streetViewPanorama') },
          { id: 'street-view-service', name: t('docs.navigation.sections.streetViewService') },
        ],
      },
      {
        id: 'addons',
        name: t('docs.navigation.sectionNames.addons'),
        icon: StretchHorizontal,
        children: [
          { id: 'marker-clusterer', name: t('docs.navigation.sections.markerClusterer') },
          { id: 'info-box', name: t('docs.navigation.sections.infoBox') },
        ],
      },
    ];
  }, [t]);

  const content = useMemo<
    Record<
      string,
      {
        title: string;
        content: string;
        code?: string | undefined;
        props?: Array<{ name: string; type: string; description: string }> | undefined;
      }
    >
  >(() => {
    return {
      'getting-started': {
        title: t('docs.content.gettingStarted.title'),
        content: t('docs.content.gettingStarted.content'),
        code: `npm install @react-google-maps/api

# or with yarn
yarn add @react-google-maps/api

# or with bun
bun add @react-google-maps/api`,
      },
      loading: {
        title: t('docs.content.loading.title'),
        content: t('docs.content.loading.content'),
        code: `// Using useJsApiLoader (Recommended)
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

const libraries = ['places', 'drawing'];

function MyMap(): JSX.Element {
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
import { useMemo, type JSX } from 'react';

const libraries = ['places'] as const;

function MyMap(): JSX.Element {
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
          {
            name: 'googleMapsApiKey',
            type: 'string',
            description: t('docs.props.googleMapsApiKey'),
          },
          {
            name: 'libraries',
            type: 'Libraries[]',
            description: t('docs.props.arrayOfLibraries'),
          },
          { name: 'language', type: 'string', description: t('docs.props.language') },
          { name: 'region', type: 'string', description: t('docs.props.region') },
          { name: 'version', type: 'string', description: t('docs.props.version') },
          { name: 'mapIds', type: 'string[]', description: t('docs.props.mapIds') },
        ],
      },
      'google-map': {
        title: t('docs.content.googleMap.title'),
        content: t('docs.content.googleMap.content'),
        code: `import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useMemo, useState, type JSX } from 'react';

function MyMap(): JSX.Element {
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

  const onLoad = useCallback((map: google.maps.Map): void => {
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
            description: t('docs.props.mapContainerStyle'),
          },
          {
            name: 'mapContainerClassName',
            type: 'string',
            description: t('docs.props.mapContainerClassName'),
          },
          {
            name: 'center',
            type: 'LatLng | LatLngLiteral',
            description: t('docs.props.initialCenterPosition'),
          },
          { name: 'zoom', type: 'number', description: t('docs.props.initialZoomLevel') },
          {
            name: 'options',
            type: 'google.maps.MapOptions',
            description: t('docs.props.mapOptionsObject'),
          },
          {
            name: 'onClick',
            type: '(e: MapMouseEvent) => void',
            description: t('docs.props.mapClickHandler'),
          },
          { name: 'onDrag', type: '() => void', description: t('docs.props.mapDragHandler') },
          {
            name: 'onZoomChanged',
            type: '() => void',
            description: t('docs.props.zoomChangeHandler'),
          },
          {
            name: 'onLoad',
            type: '(map: Map) => void',
            description: t('docs.props.calledWhenMapIsLoaded'),
          },
          {
            name: 'onUnmount',
            type: '(map: Map) => void',
            description: t('docs.props.calledWhenMapIsUnmounted'),
          },
        ],
      },
      marker: {
        title: t('docs.content.marker.title'),
        content: t('docs.content.marker.content'),
        code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useMemo, useState, type JSX } from 'react';

function MapWithMarkers(): JSX.Element {
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

      {selected ? (
        <InfoWindow
          position={selected.position}
          onCloseClick={onCloseClick}
        >
          <div>{selected.title}</div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}`,
        props: [
          {
            name: 'position',
            type: 'LatLng | LatLngLiteral',
            description: t('docs.props.markerPosition'),
          },
          {
            name: 'icon',
            type: 'string | Icon | Symbol',
            description: t('docs.props.customMarkerIcon'),
          },
          { name: 'label', type: 'string | MarkerLabel', description: t('docs.props.markerLabel') },
          { name: 'title', type: 'string', description: t('docs.props.hoverTooltipText') },
          {
            name: 'draggable',
            type: 'boolean',
            description: t('docs.props.allowMarkerToBeDragged'),
          },
          { name: 'visible', type: 'boolean', description: t('docs.props.markerVisibility') },
          {
            name: 'animation',
            type: 'Animation',
            description: t('docs.props.dropOrBounceAnimation'),
          },
          {
            name: 'clusterer',
            type: 'Clusterer',
            description: t('docs.props.markerClustererInstance'),
          },
          {
            name: 'onClick',
            type: '(e: MapMouseEvent) => void',
            description: t('docs.props.clickHandler'),
          },
          {
            name: 'onDragEnd',
            type: '(e: MapMouseEvent) => void',
            description: t('docs.props.dragEndHandler'),
          },
          {
            name: 'onLoad',
            type: '(marker: Marker) => void',
            description: t('docs.props.loadCallback'),
          },
        ],
      },
      'info-window': {
        title: t('docs.content.infoWindow.title'),
        content: t('docs.content.infoWindow.content'),
        code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useMemo, useState, type JSX } from 'react';

function MapWithInfoWindow(): JSX.Element {
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

      {isOpen ? (
        <InfoWindow
          position={position}
          onCloseClick={onCloseClick}
        >
          <div className="p-2">
            <h3 className="font-bold">New York City</h3>
            <p>The Big Apple</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}`,
        props: [
          {
            name: 'position',
            type: 'LatLng | LatLngLiteral',
            description: t('docs.props.props.positionRequiredIfNoAnchor'),
          },
          { name: 'anchor', type: 'MVCObject', description: t('docs.props.props.anchorToAMarker') },
          {
            name: 'children',
            type: 'ReactNode',
            description: t('docs.props.props.contentToDisplay'),
          },
          {
            name: 'onCloseClick',
            type: '() => void',
            description: t('docs.props.props.closeButtonClickHandler'),
          },
          {
            name: 'onLoad',
            type: '(infoWindow: InfoWindow) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      polyline: {
        title: t('docs.content.polyline.title'),
        content: t('docs.content.polyline.content'),
        code: `import { GoogleMap, Polyline } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithPolyline(): JSX.Element {
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
          {
            name: 'path',
            type: 'LatLng[] | LatLngLiteral[]',
            description: t('docs.props.props.arrayOfCoordinates'),
          },
          {
            name: 'options',
            type: 'PolylineOptions',
            description: t('docs.props.props.polylineStylingOptions'),
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: t('docs.props.props.allowPolylineToBeDragged'),
          },
          {
            name: 'editable',
            type: 'boolean',
            description: t('docs.props.props.allowEditingVertices'),
          },
          {
            name: 'onClick',
            type: '(e: PolyMouseEvent) => void',
            description: t('docs.props.props.clickHandler'),
          },
          {
            name: 'onLoad',
            type: '(polyline: Polyline) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      polygon: {
        title: t('docs.content.polygon.title'),
        content: t('docs.content.polygon.content'),
        code: `import { GoogleMap, Polygon } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithPolygon(): JSX.Element {
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
            description: t('docs.props.props.arrayOfCoordinateArrays'),
          },
          {
            name: 'options',
            type: 'PolygonOptions',
            description: t('docs.props.props.polygonStylingOptions'),
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: t('docs.props.props.allowPolygonToBeDragged'),
          },
          {
            name: 'editable',
            type: 'boolean',
            description: t('docs.props.props.allowEditingVertices'),
          },
          {
            name: 'onClick',
            type: '(e: PolyMouseEvent) => void',
            description: t('docs.props.props.clickHandler'),
          },
          {
            name: 'onLoad',
            type: '(polygon: Polygon) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      rectangle: {
        title: t('docs.content.rectangle.title'),
        content: t('docs.content.rectangle.content'),
        code: `import { GoogleMap, Rectangle } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithRectangle(): JSX.Element {
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
            description: t('docs.props.props.rectangleBounds'),
          },
          {
            name: 'options',
            type: 'RectangleOptions',
            description: t('docs.props.props.rectangleStylingOptions'),
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: t('docs.props.props.allowRectangleToBeDragged'),
          },
          { name: 'editable', type: 'boolean', description: t('docs.props.props.allowResizing') },
          {
            name: 'onClick',
            type: '(e: MapMouseEvent) => void',
            description: t('docs.props.props.clickHandler'),
          },
          {
            name: 'onLoad',
            type: '(rectangle: Rectangle) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      circle: {
        title: t('docs.content.circle.title'),
        content: t('docs.content.circle.content'),
        code: `import { GoogleMap, Circle } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithCircle(): JSX.Element {
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
          {
            name: 'center',
            type: 'LatLng | LatLngLiteral',
            description: t('docs.props.props.circleCenter'),
          },
          { name: 'radius', type: 'number', description: t('docs.props.props.radiusInMeters') },
          {
            name: 'options',
            type: 'CircleOptions',
            description: t('docs.props.props.circleStylingOptions'),
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: t('docs.props.props.allowCircleToBeDragged'),
          },
          { name: 'editable', type: 'boolean', description: t('docs.props.props.allowResizing') },
          {
            name: 'onClick',
            type: '(e: MapMouseEvent) => void',
            description: t('docs.props.props.clickHandler'),
          },
          {
            name: 'onLoad',
            type: '(circle: Circle) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'drawing-manager': {
        title: t('docs.content.drawingManager.title'),
        content: t('docs.content.drawingManager.content'),
        code: `import { GoogleMap, DrawingManager } from '@react-google-maps/api';
import { useCallback, useMemo, type JSX } from 'react';

function MapWithDrawing(): JSX.Element {
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
          {
            name: 'drawingMode',
            type: 'OverlayType',
            description: t('docs.props.props.activeDrawingMode'),
          },
          {
            name: 'options',
            type: 'DrawingManagerOptions',
            description: t('docs.props.props.drawingManagerOptions'),
          },
          {
            name: 'onMarkerComplete',
            type: '(marker: Marker) => void',
            description: t('docs.props.props.markerDrawnCallback'),
          },
          {
            name: 'onCircleComplete',
            type: '(circle: Circle) => void',
            description: t('docs.props.props.circleDrawnCallback'),
          },
          {
            name: 'onPolygonComplete',
            type: '(polygon: Polygon) => void',
            description: t('docs.props.props.polygonDrawnCallback'),
          },
          {
            name: 'onPolylineComplete',
            type: '(polyline: Polyline) => void',
            description: t('docs.props.props.polylineDrawnCallback'),
          },
          {
            name: 'onRectangleComplete',
            type: '(rectangle: Rectangle) => void',
            description: t('docs.props.props.rectangleDrawnCallback'),
          },
        ],
      },
      'traffic-layer': {
        title: t('docs.content.trafficLayer.title'),
        content: t('docs.content.trafficLayer.content'),
        code: `import { GoogleMap, TrafficLayer } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithTraffic(): JSX.Element {
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
          {
            name: 'onLoad',
            type: '(layer: TrafficLayer) => void',
            description: t('docs.props.props.loadCallback'),
          },
          {
            name: 'onUnmount',
            type: '(layer: TrafficLayer) => void',
            description: t('docs.props.props.unmountCallback'),
          },
        ],
      },
      'bicycling-layer': {
        title: t('docs.content.bicyclingLayer.title'),
        content: t('docs.content.bicyclingLayer.content'),
        code: `import { GoogleMap, BicyclingLayer } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithBicycling(): JSX.Element {
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
          {
            name: 'onLoad',
            type: '(layer: BicyclingLayer) => void',
            description: t('docs.props.props.loadCallback'),
          },
          {
            name: 'onUnmount',
            type: '(layer: BicyclingLayer) => void',
            description: t('docs.props.props.unmountCallback'),
          },
        ],
      },
      'transit-layer': {
        title: t('docs.content.transitLayer.title'),
        content: t('docs.content.transitLayer.content'),
        code: `import { GoogleMap, TransitLayer } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithTransit(): JSX.Element {
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
          {
            name: 'onLoad',
            type: '(layer: TransitLayer) => void',
            description: t('docs.props.props.loadCallback'),
          },
          {
            name: 'onUnmount',
            type: '(layer: TransitLayer) => void',
            description: t('docs.props.props.unmountCallback'),
          },
        ],
      },
      'heatmap-layer': {
        title: t('docs.content.heatmapLayer.title'),
        content: t('docs.content.heatmapLayer.content'),
        code: `import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithHeatmap(): JSX.Element {
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
          {
            name: 'data',
            type: 'LatLng[] | WeightedLocation[]',
            description: t('docs.props.props.heatmapDataPoints'),
          },
          {
            name: 'options',
            type: 'HeatmapLayerOptions',
            description: t('docs.props.props.heatmapStylingOptions'),
          },
          {
            name: 'onLoad',
            type: '(layer: HeatmapLayer) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'kml-layer': {
        title: t('docs.content.kmlLayer.title'),
        content: t('docs.content.kmlLayer.content'),
        code: `import { GoogleMap, KmlLayer } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithKml(): JSX.Element {
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
          { name: 'url', type: 'string', description: t('docs.props.props.kmlLayerUrl') },
          {
            name: 'options',
            type: 'KmlLayerOptions',
            description: t('docs.props.props.kmlLayerOptions'),
          },
          {
            name: 'onClick',
            type: '(e: KmlMouseEvent) => void',
            description: t('docs.props.props.clickHandler'),
          },
          {
            name: 'onLoad',
            type: '(layer: KmlLayer) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      directions: {
        title: t('docs.content.directions.title'),
        content: t('docs.content.directions.content'),
        code: `import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useCallback, useMemo, type JSX } from 'react';

function MapWithDirections(): JSX.Element {
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
      {directions ? (
        <DirectionsRenderer
          directions={directions}
          options={directionsRendererOptions}
        />
      ) : (
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
      )}
    </GoogleMap>
  );
}`,
        props: [
          {
            name: 'options',
            type: 'DirectionsRequest',
            description: t('docs.props.props.mapOptionsObject'),
          },
          {
            name: 'callback',
            type: '(result, status) => void',
            description: t('docs.props.props.placeSelectionCallback'),
          },
          {
            name: 'directions',
            type: 'DirectionsResult',
            description: t('docs.props.props.arrayOfCoordinates'),
          },
        ],
      },
      'distance-matrix': {
        title: t('docs.content.distanceMatrix.title'),
        content: t('docs.content.distanceMatrix.content'),
        code: `import { DistanceMatrixService } from '@react-google-maps/api';
import { useCallback, type JSX } from 'react';

function DistanceCalculator(): JSX.Element {
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
          {
            name: 'options',
            type: 'DistanceMatrixRequest',
            description: t('docs.props.props.mapOptionsObject'),
          },
          {
            name: 'callback',
            type: '(response, status) => void',
            description: t('docs.props.props.placeSelectionCallback'),
          },
          {
            name: 'onLoad',
            type: '(circle: Circle) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      autocomplete: {
        title: t('docs.content.autocomplete.title'),
        content: t('docs.content.autocomplete.content'),
        code: `import { Autocomplete } from '@react-google-maps/api';
import { useState, useCallback, useMemo, type JSX } from 'react';

function PlaceAutocomplete(): JSX.Element {
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
          {
            name: 'children',
            type: 'ReactElement<InputHTMLAttributes>',
            description: t('docs.props.props.inputElement'),
          },
          {
            name: 'restrictions',
            type: 'ComponentRestrictions',
            description: t('docs.props.props.countryRestrictions'),
          },
          { name: 'types', type: 'string[]', description: t('docs.props.props.placeTypes') },
          { name: 'fields', type: 'string[]', description: t('docs.props.props.dataFields') },
          {
            name: 'onPlaceChanged',
            type: '() => void',
            description: t('docs.props.props.placeSelectionCallback'),
          },
          {
            name: 'onLoad',
            type: '(autocomplete) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'search-box': {
        title: t('docs.content.searchBox.title'),
        content: t('docs.content.searchBox.content'),
        code: `import { StandaloneSearchBox } from '@react-google-maps/api';
import { useState, useCallback, type JSX } from 'react';

function SearchBox(): JSX.Element {
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
          {
            name: 'children',
            type: 'ReactElement<InputHTMLAttributes>',
            description: t('docs.props.props.inputElement'),
          },
          {
            name: 'bounds',
            type: 'LatLngBounds',
            description: t('docs.props.props.countryRestrictions'),
          },
          {
            name: 'onPlacesChanged',
            type: '() => void',
            description: t('docs.props.props.placeSelectionCallback'),
          },
          {
            name: 'onLoad',
            type: '(infoBox) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'overlay-view': {
        title: t('docs.content.overlayView.title'),
        content: t('docs.content.overlayView.content'),
        code: `import { GoogleMap, OverlayView, OVERLAY_MOUSE_TARGET } from '@react-google-maps/api';
import { useCallback, useMemo, type JSX } from 'react';

function MapWithCustomOverlay(): JSX.Element {
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
            description: t('docs.props.props.positionRequiredIfNoAnchor'),
          },
          {
            name: 'mapPaneName',
            type: 'string',
            description: t('docs.props.props.mapContainerClassName'),
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: t('docs.props.props.contentToDisplay'),
          },
          {
            name: 'getPixelPositionOffset',
            type: '(w, h) => {x, y}',
            description: t('docs.props.props.positionRequiredIfNoAnchor'),
          },
          {
            name: 'onLoad',
            type: '(overlay) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'ground-overlay': {
        title: t('docs.content.groundOverlay.title'),
        content: t('docs.content.groundOverlay.content'),
        code: `import { GoogleMap, GroundOverlay } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithGroundOverlay(): JSX.Element {
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
          { name: 'url', type: 'string', description: t('docs.props.props.groundOverlayUrl') },
          {
            name: 'bounds',
            type: 'LatLngBounds | LatLngBoundsLiteral',
            description: t('docs.props.props.groundOverlayBounds'),
          },
          {
            name: 'opacity',
            type: 'number',
            description: t('docs.props.props.groundOverlayOpacity'),
          },
          {
            name: 'onLoad',
            type: '(overlay) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'street-view-panorama': {
        title: t('docs.content.streetViewPanorama.title'),
        content: t('docs.content.streetViewPanorama.content'),
        code: `import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithStreetView(): JSX.Element {
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
          {
            name: 'position',
            type: 'LatLng | LatLngLiteral',
            description: t('docs.props.props.initialCenterPosition'),
          },
          {
            name: 'pov',
            type: 'StreetViewPov',
            description: t('docs.props.props.mapOptionsObject'),
          },
          { name: 'visible', type: 'boolean', description: t('docs.props.props.markerVisibility') },
          {
            name: 'options',
            type: 'StreetViewPanoramaOptions',
            description: t('docs.props.props.mapOptionsObject'),
          },
          {
            name: 'onLoad',
            type: '(panorama) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'street-view-service': {
        title: t('docs.content.streetViewService.title'),
        content: t('docs.content.streetViewService.content'),
        code: `import { StreetViewService } from '@react-google-maps/api';
import { useCallback, type JSX } from 'react';

function StreetViewChecker(): JSX.Element {
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
        props: [
          {
            name: 'onLoad',
            type: '(service) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'marker-clusterer': {
        title: t('docs.content.markerClusterer.title'),
        content: t('docs.content.markerClusterer.content'),
        code: `import { GoogleMap, MarkerClusterer, Marker } from '@react-google-maps/api';
import { useMemo, type JSX } from 'react';

function MapWithClusters(): JSX.Element {
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
            description: t('docs.props.props.contentToDisplay'),
          },
          {
            name: 'options',
            type: 'ClustererOptions',
            description: t('docs.props.props.mapOptionsObject'),
          },
          {
            name: 'averageCenter',
            type: 'boolean',
            description: t('docs.props.props.initialCenterPosition'),
          },
          {
            name: 'minimumClusterSize',
            type: 'number',
            description: t('docs.props.props.markerPosition'),
          },
          {
            name: 'onLoad',
            type: '(clusterer) => void',
            description: t('docs.props.props.loadCallback'),
          },
        ],
      },
      'info-box': {
        title: t('docs.content.infoBox.title'),
        content: t('docs.content.infoBox.content'),
        code: `import { GoogleMap, Marker, InfoBox } from '@react-google-maps/api';
import { useCallback, useMemo, useState, type JSX } from 'react';

function MapWithInfoBox(): JSX.Element {
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

      {isOpen ? (
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
      ) : null}
    </GoogleMap>
  );
}`,
        props: [
          {
            name: 'position',
            type: 'LatLng | LatLngLiteral',
            description: t('docs.props.props.infoBoxPosition'),
          },
          {
            name: 'options',
            type: 'InfoBoxOptions',
            description: t('docs.props.props.infoBoxOptions'),
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: t('docs.props.props.contentToDisplay'),
          },
          {
            name: 'onCloseClick',
            type: '() => void',
            description: t('docs.props.props.infoBoxCloseCallback'),
          },
          {
            name: 'onLoad',
            type: '(infoBox) => void',
            description: t('docs.props.props.infoBoxLoadCallback'),
          },
        ],
      },
    };
  }, []);

  const currentContent = content[currentSection] ?? content['getting-started']!;

  return (
    <div className={styles.py12}>
      <div className={containerClasses}>
        <div className={layoutClasses}>
          <aside className={sidebarClasses}>
            <nav className={navClasses}>
              <h2 className={navTitleClasses}>{t('docs.navigation.title')}</h2>
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
                              <LocaleLink to={`/docs/${child.id}`} className={navChildLinkClasses}>
                                {child.name}
                              </LocaleLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <LocaleLink to={`/docs/${item.id}`} className={navItemClasses}>
                        <item.icon className={styles.iconSm} />
                        {item.name}
                      </LocaleLink>
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
                  <h3 className={codeTitleClasses}>{t('docs.examples.title')}</h3>
                  <CodeHighlight code={currentContent.code} language="tsx" />
                </div>
              ) : null}

              {currentContent.props && currentContent.props.length > 0 ? (
                <div>
                  <h3 className={propsTitleClasses}>{t('docs.examples.props')}</h3>
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
