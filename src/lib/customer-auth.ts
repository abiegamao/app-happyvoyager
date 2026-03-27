import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export const COOKIE_NAME = "hv_customer";
const JWT_SECRET = new TextEncoder().encode(
  process.env.CUSTOMER_JWT_SECRET || "fallback_secret_change_in_prod"
);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signCustomerToken(customerId: string): Promise<string> {
  return new SignJWT({ sub: customerId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyCustomerToken(
  token: string
): Promise<{ customerId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.sub) return null;
    return { customerId: payload.sub };
  } catch {
    return null;
  }
}

export function customerCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  };
}

export async function getCustomerFromRequest(
  request: NextRequest
): Promise<{ id: string; email?: string } | null> {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie) return null;
  const result = await verifyCustomerToken(cookie.value);
  if (!result) return null;
  return { id: result.customerId };
}
