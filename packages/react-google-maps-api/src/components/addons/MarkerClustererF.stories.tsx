// eslint-disable-next-line node/no-extraneous-import
import type { StoryFn, Meta } from '@storybook/react'
import { GoogleMap, Marker } from '../..'
import { MarkerClustererF } from './MarkerClusterer'

import type {
  ClustererOptions,
  ClusterIconInfo,
  ClusterIconStyle,
  MarkerExtended,
} from '@react-google-maps/marker-clusterer'

const mapContainerStyle = {
  height: '400px',
  width: '800px',
}

const center = { lat: -28.024, lng: 140.887 }

const locations: google.maps.LatLngLiteral[] = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
]

function createKey(location: google.maps.LatLngLiteral) {
  return location.lat + location.lng
}

const baseClusterIconStyle: Partial<ClusterIconStyle> = {
  textColor: '#D40511',
  fontFamily: 'Arial',
  fontStyle: 'normal',
  fontWeight: '700',
}

const smallClusterIconStyle: ClusterIconStyle = {
  ...baseClusterIconStyle,
  url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGNpcmNsZSBjeD0iMjYiIGN5PSIyNiIgcj0iMTYiIGZpbGw9IiNGQzAiLz48Y2lyY2xlIGN4PSIyNiIgY3k9IjI2IiByPSIxNS4yNSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvZz48L3N2Zz4=',
  height: 52,
  width: 52,
  textSize: 16,
}

const mediumClusterIconStyle: ClusterIconStyle = {
  ...baseClusterIconStyle,
  url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGNpcmNsZSBjeD0iMzQiIGN5PSIzNCIgcj0iMjQiIGZpbGw9IiNGQzAiLz48Y2lyY2xlIGN4PSIzNCIgY3k9IjM0IiByPSIyMyIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+',
  height: 68,
  width: 68,
  textSize: 18,
}

const largeClusterIconStyle: ClusterIconStyle = {
  ...baseClusterIconStyle,
  url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGNpcmNsZSBjeD0iNDUiIGN5PSI0NSIgcj0iMzUiIGZpbGw9IiNGQzAiLz48Y2lyY2xlIGN4PSI0NSIgY3k9IjQ1IiByPSIzMy41IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyIvPjwvZz48L3N2Zz4=',
  height: 90,
  width: 90,
  textSize: 22,
}

const clusterIconStyles = [
  smallClusterIconStyle,
  mediumClusterIconStyle,
  largeClusterIconStyle,
]

const markerLengthToIndex = (length: number): number => {
  if (length >= 50) {
    return 3
  } else if (length >= 10) {
    return 2
  }
  return 1
}

const markerClustererCalculator = (
  markers: MarkerExtended[]
): ClusterIconInfo => ({
  text: `${markers.length}`,
  index: markerLengthToIndex(markers.length),
  title: '',
})

const markerClustererOptions: ClustererOptions = {
  averageCenter: true,
  calculator: markerClustererCalculator,
  maxZoom: 13,
  styles: clusterIconStyles,
}

const exp: Meta<typeof MarkerClustererF> = {
  title: 'Marker ClustererF',
  component: MarkerClustererF,
}

export default exp

const Template: StoryFn<typeof MarkerClustererF> = (args) => {
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
      <MarkerClustererF {...args} options={markerClustererOptions}>
        {(clusterer) => (
          <>
            {locations.map((location) => (
              <Marker
                key={createKey(location)}
                position={location}
                clusterer={clusterer}
              />
            ))}
          </>
        )}
      </MarkerClustererF>
    </GoogleMap>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Default = Template.bind({})
