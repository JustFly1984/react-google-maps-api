import * as React from 'react'
import { useEffect } from 'react'

export const createUseAtMostOnce = (
  errorMessage?: string = 'This hook can only be mounted once per application'
) => {
  const ref: React.MutableRefObject<boolean> = { current: false }

  const useAtMostOnce = () => {
    useEffect(() => {
      if (ref.current) {
        throw new Error(errorMessage)
      } else {
        ref.current = true
      }
      return () => {
        ref.current = false
      }
    }, [])
  }

  return useAtMostOnce
}
