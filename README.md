<div align="center">

![logo](https://raw.githubusercontent.com/JustFly1984/react-google-maps-api/master/logo.png)

# @react-google-maps/api

**React components and hooks for Google Maps JavaScript API**

[![npm package](https://img.shields.io/npm/v/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm downloads](https://img.shields.io/npm/dt/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)

[Documentation](https://react-google-maps-api.ospm.app) · [NPM Package](https://www.npmjs.com/package/@react-google-maps/api) · [Examples](./packages/react-google-maps-api/README.md)

</div>

## Commercial License

**Version 3.x and later** of `@react-google-maps/api` is commercial software. For licensing information and pricing, visit our documentation:

- **[Documentation & Licensing](https://react-google-maps-api.ospm.app)** - Complete API reference and commercial licensing details

For open-source use, please see our [GitHub repository](https://github.com/JustFly1984/react-google-maps-api) for community-supported versions.

## Overview

`@react-google-maps/api` provides declarative React components for the Google Maps JavaScript API. Build interactive maps with markers, overlays, directions, and more using familiar React patterns.

### Features

- **Hooks-based API** - `useJsApiLoader`, `useGoogleMap`, and more
- **Full TypeScript support** - Complete type definitions included
- **React 19 compatible** - Works with the latest React features
- **Tree-shakeable** - Only bundle what you use (~12kb gzipped)
- **SSR friendly** - Works with Next.js, Remix, and other frameworks

## Quick Start

```bash
# npm
npm install @react-google-maps/api

# yarn
yarn add @react-google-maps/api

# bun
bun add @react-google-maps/api
```

```tsx
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useMemo, useCallback, useState, type JSX } from 'react';

function Map(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const center = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), []);
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    />
  );
}
```

## Documentation

For full API documentation and examples, see:

- **[Package README](./packages/react-google-maps-api/README.md)** - Detailed API docs and examples
- **[Live Documentation](https://react-google-maps-api.ospm.app)** - Interactive component explorer

## Community

- [Slack Channel](https://join.slack.com/t/react-google-maps-api/shared_invite/enQtODc5ODU1NTY5MzQ4LTBiNTYzZmY1YmVjYzJhZThkMGU0YzUwZjJkNGJmYjk4YjQyYjZhMDk2YThlZGEzNDc0M2RhNjBmMWE4ZTJiMjQ) - Get help and discuss
- [GitHub Issues](https://github.com/JustFly1984/react-google-maps-api/issues) - Report bugs and request features

## Contributing

We welcome contributions! See our [contributing guide](https://github.com/JustFly1984/react-google-maps-api/issues/18) to get started.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/JustFly1984/react-google-maps-api.git
cd react-google-maps-api

# Install dependencies
bun install

# Set up workspace
bun run bootstrap
```

### Requirements

- Node.js 18+
- Bun
- Google Maps API Key from [Google Cloud Console](https://console.cloud.google.com)

## Support

If you find this library useful, consider [sponsoring the project](https://opencollective.com/react-google-maps-api#category-CONTRIBUTE).
