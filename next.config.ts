import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

/**
 * This machine's LAN IPv4 addresses (e.g. 192.168.1.153).
 * Next.js blocks dev-server scripts for any origin other than localhost, so
 * opening `npm run dev` from a phone on the same Wi-Fi would load the HTML but
 * never run any JavaScript. Allowing these addresses fixes that in development
 * only; production builds ignore this setting.
 */
function lanAddresses(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((net) => net && net.family === "IPv4" && !net.internal)
    .map((net) => net!.address);
}

const nextConfig: NextConfig = {
  allowedDevOrigins: [...lanAddresses(), "*.local"],
};

export default nextConfig;
