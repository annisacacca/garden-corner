import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImagePlus, Loader2, MapPin, Check } from "lucide-react";
import { supabase, uploadScrapbookImage, SCRAPBOOK_TABLE } from "../../lib/supabaseClient";

// ---- Custom doodle icons (same family as FilterChips) ----

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
        <ellipse key={deg} cx="13" cy="7" rx="3" ry="6" fill="currentColor" opacity="0.8" transform={`rotate(${deg} 13 13)`} />
      ))}
      <circle cx="13" cy="13" r="3" fill="currentColor" />
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

function CatIcon({ className }) {
  return (
    <svg viewBox="0 0 30 26" className={className} fill="none">
      <path d="M6 10 3 3l6 4.5h12L27 3l-3 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <rect x="5" y="9" width="20" height="14" rx="7" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="11" cy="17" r="1.3" fill="currentColor" />
      <circle cx="19" cy="17" r="1.3" fill="currentColor" />
      <path d="M13 20c0.8 0.8 2.2 0.8 3 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function NoteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M9 18V5l11-2v13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="6.5" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="17.5" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function CameraIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function LaughIcon({ className }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none">
      <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8 10c0.6-1.4 2.6-1.4 3.2 0M15 10c0.6-1.4 2.6-1.4 3.2 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M6.5 15c1.5 4 11.5 4 13 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function QuoteIcon({ className }) {
  return (
    <svg viewBox="0 0 28 22" className={className} fill="none">
      <path d="M2 14c0-6 4-10 9-11l1 2.6c-3.4 1-5.4 3-5.7 5.6.8-.5 1.8-.7 2.7-.5 2 .4 3.2 2 2.8 3.9-.4 2-2.4 3.2-4.4 2.8C4.4 16.8 2 15.8 2 14Z" fill="currentColor" opacity="0.85" />
      <path d="M15 14c0-6 4-10 9-11l1 2.6c-3.4 1-5.4 3-5.7 5.6.8-.5 1.8-.7 2.7-.5 2 .4 3.2 2 2.8 3.9-.4 2-2.4 3.2-4.4 2.8-3-.6-5.4-1.6-5.4-3.4Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 22" className={className} fill="none">
      <path d="M12 20C6 15.6 2 12 2 7.6 2 4.5 4.4 2 7.4 2c1.9 0 3.6 1 4.6 2.6C13 3 14.7 2 16.6 2 19.6 2 22 4.5 22 7.6c0 4.4-4 8-10 12.4Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

const CATEGORIES = [
  { id: "sky", label: "Sky", Icon: CloudIcon },
  { id: "nature", label: "Nature", Icon: FlowerIcon },
  { id: "frog", label: "Frog", Icon: FrogIcon },
  { id: "pets", label: "Pets", Icon: CatIcon },
  { id: "music", label: "Music", Icon: NoteIcon },
  { id: "photography", label: "Photography", Icon: CameraIcon },
  { id: "meme", label: "Meme", Icon: LaughIcon },
  { id: "quote", label: "Quote", Icon: QuoteIcon },
  { id: "memory", label: "Memory", Icon: HeartIcon },
];

const MOODS = ["Happy", "Peaceful", "Inspired", "Sad", "Excited", "Calm"];
const CAPTION_LIMIT = 200;

export default function UploadModal({ open, onClose, onPosted }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [mood, setMood] = useState(null);
  const [location, setLocation] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setCaption("");
    setCategory(CATEGORIES[0].id);
    setMood(null);
    setLocation("");
    setError(null);
  }, []);

  const handleClose = useCallback(() => {
    if (submitting) return;
    reset();
    onClose();
  }, [onClose, reset, submitting]);

  const handleFile = useCallback((selected) => {
    if (!selected || !selected.type.startsWith("image/")) {
      setError("Please choose an image, meme, screenshot, or illustration.");
      return;
    }
    setError(null);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile]
  );

  const handleClearImage = useCallback((e) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!caption.trim()) {
        setError("Add a caption before posting.");
        return;
      }
      if (!file) {
        setError("Choose an image to share.");
        return;
      }

      setSubmitting(true);
      setError(null);
      try {
        const imageUrl = await uploadScrapbookImage(file);

        const { data, error: insertError } = await supabase
          .from(SCRAPBOOK_TABLE)
          .insert({
            image_url: imageUrl,
            caption: caption.trim(),
            category,
            mood: mood?.toLowerCase() ?? null,
            location: location.trim() || null,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        onPosted?.(data);
        reset();
        onClose();
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [caption, category, file, location, mood, onClose, onPosted, reset]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[--scrap-ink]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-xl flex-col overflow-y-auto rounded-t-3xl border border-[--scrap-brown]/10 bg-[--scrap-cream] shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[--scrap-brown]/10 bg-[--scrap-cream]/95 px-5 py-4 backdrop-blur-sm sm:px-7 sm:py-5">
              <div>
                <h2 className="font-display text-xl text-[--scrap-ink] sm:text-2xl">
                  Leave Something Beautiful
                </h2>
                <p className="mt-0.5 text-xs text-[--scrap-ink]/55 sm:text-sm">
                  Share a photo, meme, quote, or memory with the next visitor.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-1.5 text-[--scrap-ink]/50 transition-colors hover:bg-[--scrap-beige] hover:text-[--scrap-ink]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-5 px-5 py-5 sm:px-7 sm:py-6">
              {/* Drag & drop */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !previewUrl && inputRef.current?.click()}
                className={`relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-5 text-center transition-colors ${
                  isDragging
                    ? "border-[--scrap-forest] bg-[--scrap-sage]/10"
                    : previewUrl
                    ? "border-transparent"
                    : "cursor-pointer border-[--scrap-brown]/25 hover:bg-[--scrap-beige]/40"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="object-contain w-full max-h-64 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleClearImage}
                      aria-label="Remove image"
                      className="absolute right-2.5 top-2.5 rounded-full bg-[--scrap-ink]/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-[--scrap-ink]/80"
                    >
                      <X size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="mt-3 text-xs font-medium text-[--scrap-forest] underline-offset-2 hover:underline"
                    >
                      Choose a different image
                    </button>
                  </>
                ) : (
                  <>
                    <ImagePlus className="text-[--scrap-brown]/45" size={26} />
                    <p className="mt-2.5 text-sm font-medium text-[--scrap-ink]/70">
                      Drag & drop an image, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-[--scrap-ink]/40">
                      Photos, memes, screenshots, illustrations
                    </p>
                  </>
                )}
              </div>

              {/* Caption */}
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-medium text-[--scrap-ink]/80">Caption</label>
                  <span className="text-xs text-[--scrap-ink]/40">
                    {caption.length}/{CAPTION_LIMIT}
                  </span>
                </div>
                <textarea
                  value={caption}
                  maxLength={CAPTION_LIMIT}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What's this little moment about?"
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-xl border border-[--scrap-brown]/15 bg-white/70 p-3 text-sm text-[--scrap-ink] placeholder:text-[--scrap-ink]/35 focus:outline-none focus:ring-2 focus:ring-[--scrap-sage]/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-[--scrap-ink]/80">Category</label>
                <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-3">
                  {CATEGORIES.map((c) => {
                    const Icon = c.Icon;
                    const isActive = category === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors ${
                          isActive
                            ? "border-transparent bg-[--scrap-forest] text-white"
                            : "border-[--scrap-brown]/15 bg-white/70 text-[--scrap-ink]/70 hover:bg-[--scrap-beige]/60"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="text-sm font-medium text-[--scrap-ink]/80">
                  Mood <span className="font-normal text-[--scrap-ink]/40">(optional)</span>
                </label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {MOODS.map((m) => {
                    const isActive = mood === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMood(isActive ? null : m)}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          isActive
                            ? "border-transparent bg-[--scrap-forest] text-white"
                            : "border-[--scrap-brown]/15 bg-white/70 text-[--scrap-ink]/70 hover:bg-[--scrap-beige]/60"
                        }`}
                      >
                        {isActive && <Check size={12} />}
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-[--scrap-ink]/80">
                  Location <span className="font-normal text-[--scrap-ink]/40">(optional)</span>
                </label>
                <div className="relative mt-1.5">
                  <MapPin
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[--scrap-brown]/40"
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Somewhere in the world..."
                    className="w-full rounded-xl border border-[--scrap-brown]/15 bg-white/70 py-3 pl-9 pr-3 text-sm text-[--scrap-ink] placeholder:text-[--scrap-ink]/35 focus:outline-none focus:ring-2 focus:ring-[--scrap-sage]/50"
                  />
                </div>
              </div>

              {error && (
                <p className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600/90">{error}</p>
              )}
            </div>

            {/* Sticky footer */}
            <div className="sticky bottom-0 border-t border-[--scrap-brown]/10 bg-[--scrap-cream]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[--scrap-forest] py-3 font-medium text-white shadow-md transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Leaving it behind...
                  </>
                ) : (
                  "Post to the Scrapbook"
                )}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}