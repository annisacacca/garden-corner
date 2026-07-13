import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

import ScrapbookHero from "../components/scrapbook/ScrapbookHero";

import SearchBar from "../components/scrapbook/SearchBar";
import MasonryGallery from "../components/scrapbook/MasonryGallery";
import Lightbox from "../components/scrapbook/Lightbox";
import UploadModal from "../components/scrapbook/UploadModal";
import FloatingScrapDecor from "../components/scrapbook/FloatingScrapDecor";
import { useScrapbookPosts } from "../hooks/useScrapbookPosts";

// Simple debounce so search doesn't hammer Supabase on every keystroke.
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useMemo(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
}

export default function CommunityScrapbook() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activePost, setActivePost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(searchTerm, 350);

  const { posts, loading, loadingMore, hasMore, error, loadMore, addPostOptimistically } =
    useScrapbookPosts({ category, searchTerm: debouncedSearch });

  const handlePosted = useCallback(
    (post) => addPostOptimistically(post),
    [addPostOptimistically]
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[--scrap-cream] [--scrap-cream:#F7F1E6] [--scrap-beige:#EDE3D0] [--scrap-sage:#9CAF88] [--scrap-forest:#4A5D45] [--scrap-brown:#7A5C3E] [--scrap-ink:#3E362B]">
      {/* soft paper texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <FloatingScrapDecor />

      <div className="relative z-10">
        <ScrapbookHero />

        <div className="sticky top-0 z-20 mb-4 border-b border-[--scrap-brown]/10 bg-[--scrap-cream]/85 py-4 backdrop-blur-md">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
         
        </div>

        {error && (
          <p className="max-w-md mx-auto mb-4 text-sm text-center text-red-600/90">
            {error}
          </p>
        )}

        <main className="pt-2 pb-32">
          <MasonryGallery
            posts={posts}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onOpenPost={setActivePost}
          />
        </main>
      </div>

      {/* Floating upload button */}
      <motion.button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[--scrap-forest] px-5 py-3 font-medium text-white shadow-[0_8px_24px_rgba(74,93,69,0.35)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Feather size={18} />
        <span className="hidden sm:inline">Leave Something Beautiful</span>
        <span className="sm:hidden">Leave a Note</span>
      </motion.button>

      <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} onPosted={handlePosted} />
      <Lightbox post={activePost} onClose={() => setActivePost(null)} />
    </div>
  );
}
