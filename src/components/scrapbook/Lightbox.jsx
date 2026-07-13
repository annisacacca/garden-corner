import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin } from "lucide-react";

const CATEGORY_LABEL = {
  sky: "🌤️ Sky",
  nature: "🌸 Nature",
  frog: "🐸 Frog",
  pets: "🐱 Pets",
  music: "🎵 Music",
  photography: "📸 Photography",
  meme: "😂 Meme",
  quote: "💭 Quote",
  memory: "❤️ Memory",
};

export default function Lightbox({ post, onClose }) {
  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[--scrap-ink]/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-[--scrap-cream] shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-[--scrap-ink] shadow hover:bg-white"
            >
              <X size={18} />
            </button>

            {post.image_url && (
              <div className="max-h-[55vh] w-full overflow-hidden bg-black/5">
                <img
                  src={post.image_url}
                  alt={post.caption}
                  className="mx-auto max-h-[55vh] w-full object-contain"
                />
              </div>
            )}

            <div className="flex flex-col gap-2 p-6">
              <span className="w-fit rounded-full bg-[--scrap-sage]/15 px-3 py-1 text-xs font-medium text-[--scrap-forest]">
                {CATEGORY_LABEL[post.category] ?? post.category}
              </span>
              <p className="text-lg leading-relaxed text-[--scrap-ink]">{post.caption}</p>
              <div className="mt-2 flex items-center justify-between text-sm text-[--scrap-ink]/50">
                <span>{post.anonymous_name || "Anonymous Visitor"}</span>
                {post.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} /> {post.location}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
