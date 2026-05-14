"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hooks/useDebounce";

type SearchProps = {
  placeholder?: string;
  queryParam?: string;
  onChange?: (value: string) => void;
};

const Search = ({
  placeholder = "Search videos...",
  queryParam = "query",
  onChange,
}: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(() =>
    onChange ? "" : (searchParams.get(queryParam) ?? ""),
  );
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    if (onChange) {
      onChange(debouncedValue);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set(queryParam, debouncedValue);
    } else {
      params.delete(queryParam);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, queryParam, router, searchParams, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative flex items-center mb-6">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="peer block w-full rounded-md border border-gray-700 bg-surface px-10 py-3 text-sm text-foreground outline-none focus:border-white"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  );
};

export default Search;
