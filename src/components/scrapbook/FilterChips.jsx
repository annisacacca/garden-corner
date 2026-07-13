import { motion } from "framer-motion";

// ---- Custom doodle icons (replaces emoji) ----

function SparkleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c0.6 4 2.6 6 6.6 6.6-4 0.6-6 2.6-6.6 6.6-0.6-4-2.6-6-6.6-6.6C9.4 8 11.4 6 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloudIcon({ className }) {
  return (
    <svg viewBox="0 0 30 20" className={className} fill="none">
      <path
        d="M8 16c-3.5 0-6-2.2-6-5 0-2.6 2-4.6 4.6-4.9C7.4 3.4 10 1.5 13 1.5c3.4 0 6.2 2.4 6.8 5.6 2.8 0.3 5 2.6 5 5.4 0 2.9-2.5 5-5.6 5H8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}

function FlowerIcon({ className }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="13"
          cy="7"
          rx="3"
          ry="6"
          fill="currentColor"
          opacity="0.8"
          transform={`rotate(${deg} 13 13)`}
        />
      ))}
      <circle cx="13" cy="13" r="3" fill="currentColor" />
    </svg>
  );
}

function NoteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M9 18V5l11-2v13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="6.5" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="17.5" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function QuoteIcon({ className }) {
  return (
    <svg viewBox="0 0 28 22" className={className} fill="none">
      <path
        d="M2 14c0-6 4-10 9-11l1 2.6c-3.4 1-5.4 3-5.7 5.6.8-.5 1.8-.7 2.7-.5 2 .4 3.2 2 2.8 3.9-.4 2-2.4 3.2-4.4 2.8C4.4 16.8 2 15.8 2 14Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M15 14c0-6 4-10 9-11l1 2.6c-3.4 1-5.4 3-5.7 5.6.8-.5 1.8-.7 2.7-.5 2 .4 3.2 2 2.8 3.9-.4 2-2.4 3.2-4.4 2.8-3-.6-5.4-1.6-5.4-3.4Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function CameraIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function CatIcon({ className }) {
  return (
    <svg viewBox="0 0 30 26" className={className} fill="none">
      <path
        d="M6 10 3 3l6 4.5h12L27 3l-3 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="5" y="9" width="20" height="14" rx="7" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="11" cy="17" r="1.3" fill="currentColor" />
      <circle cx="19" cy="17" r="1.3" fill="currentColor" />
      <path d="M13 20c0.8 0.8 2.2 0.8 3 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function FrogIcon({ className }) {
  return (
    <svg viewBox="0 0 30 24" className={className} fill="none">
      <ellipse cx="8" cy="7" rx="4.2" ry="3.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <ellipse cx="22" cy="7" rx="4.2" ry="3.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="8" cy="7" r="1.4" fill="currentColor" />
      <circle cx="22" cy="7" r="1.4" fill="currentColor" />
      <rect x="4" y="9" width="22" height="13" rx="6.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M10 16c1.6 1.6 8.4 1.6 10 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 22" className={className} fill="none">
      <path
        d="M12 20C6 15.6 2 12 2 7.6 2 4.5 4.4 2 7.4 2c1.9 0 3.6 1 4.6 2.6C13 3 14.7 2 16.6 2 19.6 2 22 4.5 22 7.6c0 4.4-4 8-10 12.4Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function LaughIcon({ className }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none">
      <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path
        d="M8 10c0.6-1.4 2.6-1.4 3.2 0M15 10c0.6-1.4 2.6-1.4 3.2 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M6.5 15c1.5 4 11.5 4 13 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const FILTERS = [
  { id: "all", label: "All", Icon: SparkleIcon },
  { id: "sky", label: "Sky", Icon: CloudIcon },
  { id: "nature", label: "Nature", Icon: FlowerIcon },
  { id: "music", label: "Music", Icon: NoteIcon },
  { id: "quote", label: "Quotes", Icon: QuoteIcon },
  { id: "photography", label: "Photography", Icon: CameraIcon },
  { id: "pets", label: "Pets", Icon: CatIcon },
  { id: "frog", label: "Frogs", Icon: FrogIcon },
  { id: "memory", label: "Memories", Icon: HeartIcon },
  { id: "meme", label: "Memes", Icon: LaughIcon },
];

export default function FilterChips({ active, onChange }) {
  return (
    <div className="flex max-w-6xl gap-2 px-6 pb-2 mx-auto overflow-x-auto scrollbar-none">
      {FILTERS.map((filter) => {
        const isActive = active === filter.id;
        const Icon = filter.Icon;
        return (
          <button
            key={filter.id}
            onClick={() => onChange(filter.id)}
            className={`relative flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-transparent text-white"
                : "border-[--scrap-brown]/15 bg-white/70 text-[--scrap-ink]/70 hover:bg-[--scrap-beige]/60"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-[--scrap-forest]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="relative w-4 h-4 shrink-0" />
            <span className="relative">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}