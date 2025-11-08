import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Temporary debug logs to verify environment variables at runtime.
// Remove these once the issue is resolved.
try {
  // eslint-disable-next-line no-console
  console.log('[sanity/client] projectId=', projectId, 'dataset=', dataset, 'apiVersion=', apiVersion)
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('[sanity/client] failed to log env values', err)
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
