import * as React from 'react'

const useIsMounted = () => {
  const isMountedRef = React.useRef(false)
  React.useEffect(function trackMountedState() {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return isMountedRef
}

export default useIsMounted;
