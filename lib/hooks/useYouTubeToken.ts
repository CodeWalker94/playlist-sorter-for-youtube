"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export const useYouTubeToken = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setToken(undefined);
      return;
    }

    fetch("/api/youtube-token")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setToken(data?.token ?? undefined))
      .catch(() => setToken(undefined));
  }, [isLoaded, isSignedIn]);

  return { token, isLoaded, isSignedIn };
};
