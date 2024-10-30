export function webpack(config, { isServer }) {
  if (!isServer) {
    config.cache = false; // Disable client-side caching
  }
  return config;
}
