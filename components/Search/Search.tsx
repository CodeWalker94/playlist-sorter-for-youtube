"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchProps = {
  placeholder?: string;
  queryParam?: string;
};

const Search = ({
  placeholder = "Search videos...",
  queryParam = "query",
}: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentQuery = searchParams.get(queryParam) ?? "";
  const [value, setValue] = useState(currentQuery);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setValue(next);

    const params = new URLSearchParams(searchParams);
    if (next) {
      params.set(queryParam, next);
    } else {
      params.delete(queryParam);
    }

    router.replace(`${pathname}?${params.toString()}`);
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
