
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { GoogleMap, MarkerF , GoogleMapsMarkerClusterer as gm } from '../..'
import GoogleMarkerClusterer from './GoogleMarkerClusterer'


const { DBScanAlgorithm, GridAlgorithm, KmeansAlgorithm, NoopAlgorithm } = gm

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

export default {
  title: 'Google Marker Clusterer',
  component: GoogleMarkerClusterer,
} as ComponentMeta<typeof GoogleMarkerClusterer>

const Template: ComponentStory<typeof GoogleMarkerClusterer> = (args) => {
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
      <GoogleMarkerClusterer {...args}>
        {(clusterer) =>
          locations.map((location) => (
            <MarkerF key={createKey(location)} position={location} clusterer={clusterer} />
          )) as any
        }
      </GoogleMarkerClusterer>
    </GoogleMap>
  )
}

export const Default = Template.bind({})

export const DBScan = Template.bind({})
DBScan.args = {
  options: { algorithm: new DBScanAlgorithm({}) },
}

export const Grid = Template.bind({})
Grid.args = {
  options: { algorithm: new GridAlgorithm({ maxDistance: 40000 }) },
}

export const Kmeans = Template.bind({})
Kmeans.args = {
  options: { algorithm: new KmeansAlgorithm({ numberOfClusters: 10 }) },
}

export const Noop = Template.bind({})
Noop.args = {
  options: { algorithm: new NoopAlgorithm({}) },
}

export const Render = Template.bind({})
Render.args = {
  options: {
    renderer: {
      render: ({ count, position }: gm.Cluster) =>
        new google.maps.Marker({
          label: { text: String(count), color: 'white', fontSize: '10px' },
          position,
          // adjust zIndex to be above other markers
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        }),
    },
  },
}
