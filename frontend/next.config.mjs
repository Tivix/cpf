/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // TODO: remove once we get the final logo
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'tailwindui.com',
      pathname: '/img/logos/mark.svg',
    }],
  },
  compiler: {
    styledComponents: true
  },
};

export default nextConfig;
