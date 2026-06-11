import { headers } from "next/headers";

/**
 * Extracts the client's IP address from request headers or Next.js headers context.
 * Attempts to retrieve IP from x-forwarded-for (proxy) or x-real-ip headers.
 * x-forwarded-for may contain multiple IPs, so we extract the first one (client's original IP).
 *
 * @param request - Optional Request object. If provided, uses request headers; otherwise uses Next.js headers context.
 * @returns The client's IP address as a string, or null if not found.
 */
export function getUserIp(request?: Request): string | null {
  if (request) {
    // Extract IP from request headers when a Request object is provided
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    // x-forwarded-for may contain multiple IPs; extract the first one (original client IP)
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }

    // Fallback to x-real-ip header
    if (realIp) {
      return realIp.trim();
    }

    return null;
  }

  // Fallback: Extract IP from Next.js headers context (used in Server Components/Actions)
  const forwardedFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
}
