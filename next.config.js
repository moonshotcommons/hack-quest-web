/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    reactStrictMode: true,
    // 配置环境变量
    env: {
      BASE_URL: process.env.BASE_URL || 'https://test.hackquest.io/api/',
      IS_DEV: isDev
    }
  };
};

module.exports = nextConfig;
