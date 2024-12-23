import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        hostname: "*.cloudfront.net",
      },
      {
        hostname: "forum.cfx.re",
      },
      {
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
