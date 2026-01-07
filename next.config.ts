// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/actions/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, Content-Encoding, Accept-Encoding, X-Action-Version, X-Blockchain-Ids",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "X-Action-Version, X-Blockchain-Ids",
          },
          { key: "X-Action-Version", value: "1" },
          {
            key: "X-Blockchain-Ids",
            value: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
