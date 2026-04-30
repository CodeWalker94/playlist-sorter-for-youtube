"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SortDropdown from "@/components/UI/SortDropdown";
import Search from "@/components/Search/Search";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";

const CuratedPlaylists = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [sortMode, setSortMode] = useLocalStorageState(
    "sort-curated-playlists",
    "recent",
  );

  const sortedItems = useMemo(() => {
    const curatedItems: Array<{ id: string; title: string }> = [];
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? curatedItems.filter((item) =>
          item.title.toLowerCase().includes(normalizedQuery),
        )
      : curatedItems;

    return sortMode === "alphabetical"
      ? [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      : filtered;
  }, [query, sortMode]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Search />
        <SortDropdown
          label="Sort"
          value={sortMode}
          options={[
            { value: "recent", label: "Most recent" },
            { value: "alphabetical", label: "Alphabetical" },
          ]}
          onChange={(value) => setSortMode(value as "recent" | "alphabetical")}
        />
      </div>

      <div className="playlist-grid">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <div key={item.id} className="chrome-card playlist-card">
              <div className="playlist-card-info">
                <h3 className="card-title line-clamp-2">{item.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No curated playlists available yet.</p>
        )}
      </div>
    </div>
  );
};

export default CuratedPlaylists;
