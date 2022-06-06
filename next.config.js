/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack:{
    resolve:{
      // other configs
      alias:{
        "bn.js":"fork-bn.js"
      }
    }
  }
}

module.exports = nextConfig
