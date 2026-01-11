# @react-google-maps/api

<div align="center">

![logo](https://raw.githubusercontent.com/JustFly1984/react-google-maps-api/master/logo.png)

[![npm package](https://img.shields.io/npm/v/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm downloads](https://img.shields.io/npm/dt/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

React components and hooks for the Google Maps JavaScript API.

## Requirements

- React 16.8+ (hooks support required)
- React 19 supported since v2.20.0

## Commercial License

**Version 3.x and later** of `@react-google-maps/api` is commercial software. For licensing information and pricing, visit our documentation:

- **[Documentation & Licensing](https://react-google-maps-api.ospm.app)** - Complete API reference and commercial licensing details

For open-source use, please see our [GitHub repository](https://github.com/JustFly1984/react-google-maps-api) for community-supported versions.

## Installation

```bash
# npm
npm install @react-google-maps/api

# yarn
yarn add @react-google-maps/api

# bun
bun add @react-google-maps/api
```

## Basic Usage

```tsx
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useMemo, useCallback, useState } from 'react';

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const containerStyle = useMemo(() => ({
    width: '100%',
    height: '400px',
  }), []);

  const center = useMemo(() => ({
    lat: 40.7128,
    lng: -74.006,
  }), []);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Markers, InfoWindows, etc. */}
    </GoogleMap>
  );
}
```

> **Important:** Always use `useMemo` for objects/arrays and `useCallback` for functions passed as props to prevent unnecessary re-renders.

## Loading the API

### useJsApiLoader Hook (Recommended)

```tsx
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places', 'drawing'];

function App() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return <MyMap />;
}
```

### LoadScript Component

```tsx
import { LoadScript, GoogleMap } from '@react-google-maps/api';

function App() {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={['places']}>
      <MyMap />
    </LoadScript>
  );
}
```

## Components

### Drawing

| Component | Description |
|-----------|-------------|
| `Marker` | Display markers on the map |
| `InfoWindow` | Popup windows for markers |
| `Polyline` | Draw lines connecting coordinates |
| `Polygon` | Draw closed shapes |
| `Rectangle` | Draw rectangles |
| `Circle` | Draw circles |
| `DrawingManager` | Interactive drawing tools |

### Layers

| Component | Description |
|-----------|-------------|
| `TrafficLayer` | Real-time traffic conditions |
| `BicyclingLayer` | Bike paths and routes |
| `TransitLayer` | Public transit routes |
| `HeatmapLayer` | Data intensity visualization |
| `KmlLayer` | KML/KMZ file rendering |

### Services

| Component | Description |
|-----------|-------------|
| `DirectionsService` | Route calculation |
| `DirectionsRenderer` | Route display |
| `DistanceMatrixService` | Distance/time calculations |
| `Autocomplete` | Place autocomplete input |
| `StandaloneSearchBox` | Place search box |

### Overlays

| Component | Description |
|-----------|-------------|
| `OverlayView` | Custom React components on map |
| `GroundOverlay` | Image overlays |
| `StreetViewPanorama` | Street View integration |

### Addons

| Component | Description |
|-----------|-------------|
| `MarkerClusterer` | Cluster nearby markers |
| `InfoBox` | Customizable info windows |

## Hooks

### useGoogleMap

Access the map instance from child components:

```tsx
import { useGoogleMap } from '@react-google-maps/api';

function MapControls() {
  const map = useGoogleMap();

  const panTo = useCallback(() => {
    map?.panTo({ lat: 40.7128, lng: -74.006 });
  }, [map]);

  return <button onClick={panTo}>Pan to NYC</button>;
}
```

## Example: Markers with InfoWindow

```tsx
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useMemo, useCallback, useState } from 'react';

function MapWithMarkers() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const markers = useMemo(() => [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.7580, lng: -73.9855 },
  ], []);

  const onCloseClick = useCallback(() => setSelected(null), []);

  if (!isLoaded) return null;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {markers.map((pos, i) => (
        <Marker
          key={i}
          position={pos}
          onClick={() => setSelected(pos)}
        />
      ))}

      {selected && (
        <InfoWindow position={selected} onCloseClick={onCloseClick}>
          <div>Selected location</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
```

## Example: Directions

```tsx
import { GoogleMap, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { useMemo, useCallback, useState } from 'react';

function MapWithDirections() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const directionsOptions = useMemo(() => ({
    destination: 'Boston, MA',
    origin: 'New York, NY',
    travelMode: google.maps.TravelMode.DRIVING,
  }), []);

  const directionsCallback = useCallback((
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === 'OK' && result) {
      setDirections(result);
    }
  }, []);

  if (!isLoaded) return null;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
      {!directions && (
        <DirectionsService options={directionsOptions} callback={directionsCallback} />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
```

## Features

- **Simplified API** - Declarative React components
- **Context API** - Access map instance from any child component
- **StrictMode compliant** - Works with React's strict mode
- **Small bundle** - ~12kb gzipped, tree-shakeable
- **No Roboto fonts** - Use `<LoadScript preventGoogleFonts />` to prevent font loading

## API Key

Get your Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials).

Required APIs:

- Maps JavaScript API
- Places API (if using autocomplete/search)
- Directions API (if using directions)

## Documentation

- [Live Documentation](https://react-google-maps-api.ospm.app) - Interactive component explorer
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) - Official Google docs

## Community

- [Slack Channel](https://join.slack.com/t/react-google-maps-api/shared_invite/enQtODc5ODU1NTY5MzQ4LTBiNTYzZmY1YmVjYzJhZThkMGU0YzUwZjJkNGJmYjk4YjQyYjZhMDk2YThlZGEzNDc0M2RhNjBmMWE4ZTJiMjQ) - Get help and discuss
- [GitHub Issues](https://github.com/JustFly1984/react-google-maps-api/issues) - Report bugs and request features

## Contributing

Contributions welcome! See [this issue](https://github.com/JustFly1984/react-google-maps-api/issues/18) to get started.

## Support

[Sponsor the project](https://opencollective.com/react-google-maps-api#category-CONTRIBUTE)
