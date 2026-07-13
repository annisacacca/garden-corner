import { useCallback, useEffect, useRef, useState } from "react";
import { supabase, SCRAPBOOK_TABLE } from "../lib/supabaseClient";

const PAGE_SIZE = 12;

/**
 * Handles fetching, category filtering, live search, infinite scroll,
 * and optimistic-insert of new scrapbook posts.
 */
export function useScrapbookPosts({ category, searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const fetchPage = useCallback(
    async (pageIndex, { replace } = {}) => {
      try {
        replace ? setLoading(true) : setLoadingMore(true);
        setError(null);

        let query = supabase
          .from(SCRAPBOOK_TABLE)
          .select("*")
          .order("created_at", { ascending: false })
          .range(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE - 1);

        if (category && category !== "all") {
          query = query.eq("category", category);
        }
        if (searchTerm?.trim()) {
          query = query.ilike("caption", `%${searchTerm.trim()}%`);
        }

        const { data, error: fetchError } = await query;
        if (fetchError) throw fetchError;

        setPosts((prev) => (replace ? data : [...prev, ...data]));
        setHasMore(data.length === PAGE_SIZE);
        pageRef.current = pageIndex;
      } catch (err) {
        setError(err.message || "Something went wrong loading the scrapbook.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, searchTerm]
  );

  // Reset and refetch whenever filters change
  useEffect(() => {
    fetchPage(0, { replace: true });
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    fetchPage(pageRef.current + 1);
  }, [fetchPage, loading, loadingMore, hasMore]);

  /** Add a freshly-created post to the top of the wall immediately. */
  const addPostOptimistically = useCallback((post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  return { posts, loading, loadingMore, hasMore, error, loadMore, addPostOptimistically };
}
