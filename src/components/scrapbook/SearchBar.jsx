import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mx-auto mb-6 max-w-md px-6">
      <div className="flex items-center gap-2 rounded-full border border-[--scrap-brown]/15 bg-white/80 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[--scrap-sage]/50">
        <Search size={16} className="text-[--scrap-brown]/50" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search little moments..."
          className="w-full bg-transparent text-sm text-[--scrap-ink] placeholder:text-[--scrap-ink]/40 focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="text-[--scrap-brown]/50 hover:text-[--scrap-brown]"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
