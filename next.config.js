/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // "same-origin-allow-popups"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
