import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const CATEGORY_META = {
  sky: { label: "Sky", emoji: "🌤️" },
  nature: { label: "Nature", emoji: "🌸" },
  frog: { label: "Frog", emoji: "🐸" },
  pets: { label: "Pets", emoji: "🐱" },
  music: { label: "Music", emoji: "🎵" },
  photography: { label: "Photography", emoji: "📸" },
  meme: { label: "Meme", emoji: "😂" },
  quote: { label: "Quote", emoji: "💭" },
  memory: { label: "Memory", emoji: "❤️" },
};

// Deterministic "random" rotation/style so it doesn't reshuffle on re-render.
function hashToRange(id, min, max) {
  const hash = String(id)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return min + (hash % 100) / 100 * (max - min);
}

const STYLE_VARIANTS = ["polaroid", "sticky", "paper", "filmstrip", "notebook"];

function pickVariant(post) {
  if (!post.image_url) return "sticky"; // quote-only posts read best as sticky notes
  const hash = String(post.id)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return STYLE_VARIANTS[hash % STYLE_VARIANTS.length];
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ScrapCard({ post, onOpen }) {
  const rotation = hashToRange(post.id, -3, 3);
  const variant = pickVariant(post);
  const meta = CATEGORY_META[post.category] ?? { label: post.category, emoji: "✦" };

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(post)}
      className={cardShell(variant)}
      style={{ rotate: `${rotation}deg` }}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {post.image_url && (
        <div className={imageWrap(variant)}>
          <motion.img
            src={post.image_url}
            alt={post.caption}
            loading="lazy"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      <div className={bodyWrap(variant)}>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[--scrap-sage]/15 px-2 py-0.5 text-xs font-medium text-[--scrap-forest]">
          <span>{meta.emoji}</span>
          {meta.label}
        </span>

        <p className={captionStyle(variant)}>{post.caption}</p>

        {post.location && (
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-[--scrap-brown]/70">
            <MapPin size={12} /> {post.location}
          </span>
        )}

        <div className="mt-2 flex items-center justify-between text-[11px] text-[--scrap-ink]/50">
          <span>{post.anonymous_name || "Anonymous Visitor"}</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
      </div>
    </motion.button>
  );
}

function cardShell(variant) {
  const base =
    "group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg border text-left shadow-[0_6px_18px_rgba(74,93,69,0.10)] transition-shadow hover:shadow-[0_14px_30px_rgba(74,93,69,0.18)]";
  switch (variant) {
    case "polaroid":
      return `${base} border-[--scrap-brown]/10 bg-white p-3 pb-6`;
    case "sticky":
      return `${base} border-transparent bg-[--scrap-sunny,#F4E9C9] p-4`;
    case "filmstrip":
      return `${base} border-[--scrap-ink]/10 bg-[--scrap-ink] p-2 text-[--scrap-cream]`;
    case "notebook":
      return `${base} border-[--scrap-brown]/15 bg-[repeating-linear-gradient(transparent,transparent_27px,rgba(74,93,69,0.12)_28px)] bg-[--scrap-cream] p-4 pl-8`;
    case "paper":
    default:
      return `${base} border-[--scrap-brown]/10 bg-[--scrap-cream] p-4`;
  }
}

function imageWrap(variant) {
  const base = "mb-3 overflow-hidden rounded-md";
  if (variant === "polaroid") return `${base} aspect-[4/5] rounded-sm`;
  if (variant === "filmstrip") return `${base} aspect-square rounded-none`;
  return `${base} aspect-[4/3]`;
}

function bodyWrap(variant) {
  if (variant === "notebook") return "flex flex-col";
  return "flex flex-col";
}

function captionStyle(variant) {
  const base = "mt-2 line-clamp-4 text-sm leading-snug";
  if (variant === "sticky") return `${base} font-hand text-lg text-[--scrap-ink]`;
  if (variant === "filmstrip") return `${base} text-[--scrap-cream]/90`;
  return `${base} text-[--scrap-ink]/85`;
}
