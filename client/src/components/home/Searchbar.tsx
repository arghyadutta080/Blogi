"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchBar({
  initialSearch = "",
  setSearch,
}: {
  initialSearch?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-lg mx-auto items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <SearchIcon className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
