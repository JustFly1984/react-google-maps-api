import {
  type ComponentType,
  memo,
  useEffect,
  useRef,
} from 'react'

export type StreetViewServiceProps = {
  onLoad?:
    | ((streetViewService: google.maps.StreetViewService | null) => void)
    | undefined
  onUnmount?:
    | ((streetViewService: google.maps.StreetViewService | null) => void)
    | undefined
}

function StreetViewServiceFunctional({
  onLoad,
  onUnmount,
}: StreetViewServiceProps): null {
  const streetViewServiceRef = useRef<google.maps.StreetViewService | null>(null)

  useEffect(() => {
    const streetViewService = new google.maps.StreetViewService()

    streetViewServiceRef.current = streetViewService

    if (onLoad) {
      onLoad(streetViewService)
    }

    return (): void => {
      if (streetViewServiceRef.current !== null) {
        if (onUnmount) {
          onUnmount(streetViewServiceRef.current)
        }

        streetViewServiceRef.current = null
      }
    }
  }, [])

  return null
}

export const StreetViewServiceF: ComponentType<StreetViewServiceProps> = memo<StreetViewServiceProps>(StreetViewServiceFunctional)

export const StreetViewService = StreetViewServiceF
