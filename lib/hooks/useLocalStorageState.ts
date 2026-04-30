"use client";

import { useEffect, useState } from "react";

export const useLocalStorageState = (
  key: string,
  defaultValue: string,
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === "undefined") return defaultValue;
    return window.localStorage.getItem(key) ?? defaultValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
