/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withAntdLess = require('next-plugin-antd-less');
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return withAntdLess({
    reactStrictMode: false,
    // 配置环境变量
    env: {
      BACKEND_BASE_URL:
        process.env.BACKEND_BASE_URL || 'https://api.dev.hackquest.io/v1/',
      IS_DEV: isDev,
      IDE_URL: process.env.IDE_URL || 'http://localhost:8080'
    },
    assetPrefix:
      isDev || !process.env.NEXT_PUBLIC_ASSET_PREFIX_FOR_CHINA
        ? ''
        : process.env.NEXT_PUBLIC_ASSET_PREFIX_FOR_CHINA,
    modifyVars: {
      '@primary-color': '#000000',
      '@link-color': '#676767',

      '@text-color': '#FFFFFF ',
      '@text-color-secondary': '#676767',

      '@btn-primary-color': '#000000 ',
      '@btn-border-radius-base': '2.5rem',
      '@btn-border-width': '.0625rem',
      '@btn-shadow': '0px 3px 6px rgba(0, 0, 0, 0.16)',
      '@btn-primary-shadow': '0px 3px 6px rgba(0, 0, 0, 0.16)',

      '@layout-body-background': '#ffffff',
      '@layout-sider-background': '#f7f7f7',

      '@border-radius-base': '10px',
      '@border-color-base': '#e6e6e6',
      '@font-size-base': '13px'
    },
    images: {
      domains: [
        'hack-quest-s3-dev.s3.amazonaws.com',
        'hackquest-s3-dev.s3.ap-northeast-1.amazonaws.com',
        's3.ap-northeast-1.amazonaws.com',
        's3.amazonaws.com',
        'hack-quest-s3-prod.s3.amazonaws.com',
        'hack-quest-s3-staging.s3.amazonaws.com',
        'hackquest-s3-dev.s3.ap-northeast-1.amazonaws.com',
        'hackquest-s3-staging.s3.ap-northeast-1.amazonaws.com',
        'hackquest-s3-prod.s3.ap-northeast-1.amazonaws.com'
      ]
    },
    output: 'standalone'
  });
};

module.exports = nextConfig;
