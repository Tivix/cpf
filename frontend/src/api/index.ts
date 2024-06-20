const baseUrl = process.env.API_BASE_URL;

export const API_URLS = {
  library: {
    ladders: `${baseUrl}/library/ladders`,
    buckets: `${baseUrl}/library/buckets`,
  },
}
