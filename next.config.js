/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
     },
     eslint: {
        ignoreDuringBuilds: true,
    },
    serverComponentsExternalPackages: ['bcrypt'],
}

module.exports = nextConfig
