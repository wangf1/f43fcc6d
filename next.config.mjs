/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/inbox",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
