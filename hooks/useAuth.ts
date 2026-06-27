"use client";

import { useContext } from "react";
import { AuthContext, type AuthUser } from "@/providers/AuthProvider";

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return {
    user: context.user,
    loading: context.loading,
    isAuthenticated: context.user !== null,
  };
}
