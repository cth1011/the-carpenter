
import { getPayload } from 'payload';
import config from './payload.config';

// Caching the Payload client
let payload: Awaited<ReturnType<typeof getPayload>> | null = null;

export const getCachedPayload = async () => {
  if (!payload) {
    payload = await getPayload({ config });
  }
  return payload;
};
