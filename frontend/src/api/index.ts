const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URLS = {
  library: {
    ladders: `${baseUrl}/library/ladders`,
    buckets: `${baseUrl}/library/buckets`,
  },
};
