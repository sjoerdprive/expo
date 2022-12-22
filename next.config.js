/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  env: {
    GOOGLE_FONTS_KEY: "AIzaSyAKYz3WR8RB4olia1hz1E8_YZ45zY1pqcI"

  }
}

module.exports = nextConfig
