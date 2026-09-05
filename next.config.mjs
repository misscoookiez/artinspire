/** @type {import("next").NextConfig} */
const nextConfig = {
  // Servera deploy: CI būvē un pārsūta tikai .next/standalone (sk. .gitlab-ci.yml)
  output: "standalone",
};

export default nextConfig;
