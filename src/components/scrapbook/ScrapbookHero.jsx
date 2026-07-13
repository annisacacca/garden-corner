import { motion } from "framer-motion";
import Frog from "../ui/Frog";
import WashiTape from "../ui/WashiTape";

export default function ScrapbookHero() {
  return (
    <header className="relative mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
      {/* corner doodles */}
      <motion.span
        className="pointer-events-none absolute -left-2 top-6 text-3xl sm:left-4"
        initial={{ rotate: -10, y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🍃
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -right-2 top-2 text-3xl sm:right-6"
        initial={{ rotate: 12 }}
        animate={{ y: [0, -8, 0], rotate: [12, 4, 12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🌼
      </motion.span>

      <WashiTape className="absolute left-1/2 top-0 -translate-x-1/2" color="sage" rotate={-4} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mt-6 rounded-3xl border border-[--scrap-brown]/15 bg-[--scrap-cream]/80 px-6 py-10 shadow-[0_8px_30px_rgba(74,93,69,0.12)] backdrop-blur-sm sm:px-12"
      >
        <div className="absolute -top-6 right-6 hidden sm:block">
          <Frog size={56} pose="waving" />
        </div>

        <p className="font-hand text-lg text-[--scrap-forest]/70">✦ a corner just for kindness ✦</p>

        <h1 className="mt-2 font-display text-4xl leading-tight text-[--scrap-ink] sm:text-5xl">
          The Community Scrapbook
        </h1>

        <p className="mt-3 font-hand text-2xl text-[--scrap-brown] sm:text-3xl">
          Leave something beautiful for the next visitor.
        </p>

        <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-[--scrap-ink]/70 sm:text-base">
          This little corner isn't about perfection. It's a collection of tiny moments from
          strangers around the world — a favorite photo, a funny meme, a comforting quote, a
          beautiful sky, a memory worth sharing.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 text-xl text-[--scrap-sage]">
          <span>🐸</span>
          <span className="text-[--scrap-brown]/50">·</span>
          <span>🌸</span>
          <span className="text-[--scrap-brown]/50">·</span>
          <span>⭐</span>
        </div>
      </motion.div>
    </header>
  );
}
