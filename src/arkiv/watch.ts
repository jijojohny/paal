import { openWatchClient } from "./client"

/** Reruns the readings query when an entity is created or deleted. The event is not the count. */
export function watchReadings(onChange: () => void): () => void {
  const client = openWatchClient()
  return client.watchEntityEvents({
    onEntityCreated: () => onChange(),
    onEntityDeleted: () => onChange(),
    onError: () => onChange(),
  })
}
