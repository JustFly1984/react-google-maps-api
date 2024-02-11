// eslint-disable-next-line node/no-extraneous-import
import type { StoryFn, Meta } from '@storybook/react'
import GoogleMap from '../../GoogleMap'
import { OverlayViewF, OVERLAY_LAYER } from './OverlayView'

const mapContainerStyle = {
  height: '400px',
  width: '800px',
}
const center = { lat: -28.024, lng: 140.887 }

const locations: google.maps.LatLngLiteral[] = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -45.718234, lng: 150.363181 },
]
function createKey(location: google.maps.LatLngLiteral) {
  return location.lat + location.lng
}

const exp: Meta<typeof OverlayViewF> = {
  title: 'Overlay View',
  component: OverlayViewF,
}

export default exp


const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const Template: StoryFn<typeof OverlayViewF> = () => {
  const newZealand = new google.maps.LatLngBounds({lat: -46.641, lng: 166.509}, {lat: -34.450, lng: 178.517})

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
      {locations.map((location, index): JSX.Element => {return (
        <OverlayViewF
          mapPaneName={OVERLAY_LAYER}
          getPixelPositionOffset={getPixelPositionOffset}
          key={createKey(location)}
          position={location}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'red',
              fontSize: '30px',
            }}
          >
            {index}
          </div>
        </OverlayViewF>
      )})}

      <OverlayViewF
        mapPaneName={OVERLAY_LAYER}
        bounds={newZealand}
        position={{lat: -46.641, lng: 166.509}}
        >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255,255,0,0.4)',
            fontSize: '12px',
          }}
        >
          Overlay with Bounds
        </div>
      </OverlayViewF>
    </GoogleMap>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Default = Template.bind({})
