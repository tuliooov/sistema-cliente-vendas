/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
	async redirects(){
		return [{
			source: '/',
			destination: '/blocos',
			permanent: true
		}]
	}
}

module.exports = nextConfig
