/* eslint-disable @typescript-eslint/no-explicit-any */
import hash from 'object-hash';

type CachedObject = {
  createdAt: Date;
  ttlInSeconds: number;
  value: any;
};

export const createKeyHash = (
  mainHashKey: string,
  params: Record<string, unknown>
) => {
  return hash({
    ...params,
    mainHashKey,
  }); // sha1 by default
};

const cache: {
  [k: string]: CachedObject;
} = {};

const forget = (key: string) => {
  if (cache[key]) {
    delete cache.key;
  }
};

const get = (key: string) => {
  const cachedObject = cache[key];
  if (!cachedObject) {
    return;
  }

  const { createdAt, ttlInSeconds, value } = cachedObject;
  const expireDate = new Date(createdAt);
  const now = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + ttlInSeconds);
  if (now >= expireDate) {
    forget(key);

    return;
  }

  return value;
};

const store = (key: string, value: any, ttlInSeconds = 3600) => {
  cache[key] = {
    createdAt: new Date(),
    ttlInSeconds,
    value,
  };
};

const getCacheSize = () => Object.keys(cache).length;

export default {
  store,
  get,
  forget,
  getCacheSize,
};
