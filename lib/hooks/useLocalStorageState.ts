"use client";

import { useEffect, useState } from "react";

export const useLocalStorageState = (
  key: string,
  defaultValue: string,
): [string, (value: string) => void] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(key);
    if (stored) {
      setValue(stored);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
