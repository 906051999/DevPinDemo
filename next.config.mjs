/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@ant-design/pro-chat', 'antd', '@ant-design/icons'],
};

export default nextConfig;
