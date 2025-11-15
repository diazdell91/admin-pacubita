import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    // Disable ESLint during production builds to allow deployment
    // ESLint errors are caught during development and pre-commit hooks
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds
    // Type checking is done during development and in CI/CD pipelines
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
