import React, { FormEvent, useState } from "react";
import Input from "./input";
import { MdSearch, MdClear } from "react-icons/md";
import { extractYoutubeId } from "../../utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on new submission

    // Validate and extract video ID
    const videoId = extractYoutubeId(searchQuery.trim());
    if (videoId) {
      onSearch(videoId);
    } else {
      setError("Please enter a valid YouTube video URL.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center w-full mx-auto bg-background dark:bg-secondary shadow-sm border rounded-full 
        ${isFocused ? "border-primary" : "dark:border-border"} transition`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {isFocused && <MdSearch className="h-6 w-6 ml-4" />}

        <Input
          type="url"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow rounded-none rounded-l-full !border-none"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-border"
          >
            <MdClear />
          </button>
        )}

        <button
          type="submit"
          className="p-2 px-4 bg-primary dark:bg-bgSecondary border border-primary dark:border-border text-white rounded-r-full hover:bg-primary/75 transition"
        >
          <MdSearch className="h-6 w-6" />
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-primary text-xs mt-2">{error}</p>}
    </div>
  );
};

export default SearchBar;
