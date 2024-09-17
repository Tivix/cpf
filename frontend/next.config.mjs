/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/cpf',
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
};

export default nextConfig;
