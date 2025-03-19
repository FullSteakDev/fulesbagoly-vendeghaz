/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'res.cloudinary.com'],
    },
    experimental: {
        optimizeCss: false, // Disable CSS minification
    },
};

export default nextConfig