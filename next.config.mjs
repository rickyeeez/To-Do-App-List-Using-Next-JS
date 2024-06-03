/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_HOST: "localhost",
    PUBLIC_DB_USER: "root",
    DB_PASS: "",
    DB_SCHEMA: "ujm_po",
  },
};

export default nextConfig;
