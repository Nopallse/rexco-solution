"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearStoredAuth,
  getStoredAuth,
  validateToken,
  type AuthSession,
} from "@/app/lib/auth-client";

const DEFAULT_BYPASS = ["/log8i8n738"];

export function useAuthGuard(bypassPaths: string[] = DEFAULT_BYPASS) {
  const pathname = usePathname();
  const router = useRouter();
  const [auth, setAuth] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  const allowedWithoutAuth = useMemo(() => {
    if (!pathname) return false;
    return bypassPaths.some((path) => pathname.startsWith(path));
  }, [pathname, bypassPaths]);

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      const session = getStoredAuth();
      console.log('useAuthGuard - getStoredAuth result:', session);
      if (!session && !allowedWithoutAuth) {
        router.replace("/log8i8n738");
        if (active) setReady(true);
        return;
      }

      if (!session) {
        if (!active) return;
        setAuth(null);
        setReady(true);
        return;
      }

      try {
        await validateToken(session.token);
        if (!active) return;
        setAuth(session);
        setReady(true);
      } catch (error) {
        console.error("Token validation failed", error);
        clearStoredAuth();
        if (!active) return;
        setAuth(null);
        setReady(true);
        if (!allowedWithoutAuth) {
          router.replace("/log8i8n738");
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, [allowedWithoutAuth, pathname, router]);

  return { auth, ready, allowedWithoutAuth };
}
