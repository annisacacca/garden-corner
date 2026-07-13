import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ScrapCard from "./ScrapCard";
import EmptyState from "./EmptyState";

export default function MasonryGallery({ posts, loading, loadingMore, hasMore, onLoadMore, onOpenPost }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoadMore]);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 h-56 animate-pulse rounded-lg bg-[--scrap-beige]/70"
            style={{ height: 160 + (i % 3) * 60 }}
          />
        ))}
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        <AnimatePresence>
          {posts.map((post) => (
            <ScrapCard key={post.id} post={post} onOpen={onOpenPost} />
          ))}
        </AnimatePresence>
      </div>

      <div ref={sentinelRef} className="h-8 w-full" />

      {loadingMore && (
        <p className="pb-8 text-center font-hand text-lg text-[--scrap-brown]/70">
          gathering more little moments...
        </p>
      )}
      {!hasMore && posts.length > 0 && (
        <p className="pb-12 text-center text-sm text-[--scrap-ink]/40">
          You've reached the bottom of the scrapbook ✦
        </p>
      )}
    </div>
  );
}
