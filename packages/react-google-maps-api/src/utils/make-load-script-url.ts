import type { Library } from '@googlemaps/js-api-loader'
import invariant from 'invariant'

export type Libraries = Library[]

export type LoadScriptUrlOptions = {
  googleMapsApiKey: string | ''
  googleMapsClientId?: string | undefined
  version?: string | undefined
  language?: string | undefined
  region?: string | undefined
  libraries?: Libraries | undefined
  channel?: string | undefined
  mapIds?: string[] | undefined
  authReferrerPolicy?: 'origin' | undefined
}

export function makeLoadScriptUrl({
  googleMapsApiKey,
  googleMapsClientId,
  version = 'weekly',
  language,
  region,
  libraries,
  channel,
  mapIds,
  authReferrerPolicy,
}: LoadScriptUrlOptions): string {
  const params = []

  invariant(
    (googleMapsApiKey && googleMapsClientId) ||
      !(googleMapsApiKey && googleMapsClientId),
    'You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.'
  )

  if (googleMapsApiKey) {
    params.push(`key=${googleMapsApiKey}`)
  } else if (googleMapsClientId) {
    params.push(`client=${googleMapsClientId}`)
  }

  if (version) {
    params.push(`v=${version}`)
  }

  if (language) {
    params.push(`language=${language}`)
  }

  if (region) {
    params.push(`region=${region}`)
  }

  if (libraries && libraries.length) {
    params.push(`libraries=${libraries.sort().join(',')}`)
  }

  if (channel) {
    params.push(`channel=${channel}`)
  }

  if (mapIds && mapIds.length) {
    params.push(`map_ids=${mapIds.join(',')}`)
  }

  if (authReferrerPolicy) {
    params.push(`auth_referrer_policy=${authReferrerPolicy}`)
  }

  params.push('loading=async')
  params.push('callback=initMap')

  return `https://maps.googleapis.com/maps/api/js?${params.join('&')}`
}
