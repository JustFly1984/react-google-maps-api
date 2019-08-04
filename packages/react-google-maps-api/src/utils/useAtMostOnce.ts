import * as React from 'react'
import invariant from 'invariant';

export const createUseAtMostOnce = (
  errorMessage: string = 'This hook can only be mounted once per application'
) => {
  const ref: React.MutableRefObject<boolean> = { current: false }

  const useAtMostOnce = () => {
    React.useEffect(() => {
      invariant(!ref.current, errorMessage)
      ref.current = true
      return () => {
        ref.current = false
      }
    }, [])
  }

  return useAtMostOnce
}
