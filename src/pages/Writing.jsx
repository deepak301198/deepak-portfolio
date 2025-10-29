// src/pages/Writing.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Writing.jsx
 * - Fetches Substack RSS via rss2json
 * - Shows initial 4 posts
 * - "Load More" adds 4 posts per click until all posts are visible
 * - Adequate bottom padding so cards don't touch horizontal line
 */

export default function Writing() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(true);

  const RSS_URL = "https://deepaklearns.substack.com/feed";

  useEffect(() => {
    let mounted = true;
    async function fetchFeed() {
      setLoading(true);
      setError("");
      try {
        // Fetch RSS feed directly to avoid API limits
        const resp = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`);
        if (!resp.ok) throw new Error(`Network ${resp.status}`);
        const xmlText = await resp.text();
        if (!mounted) return;
        
        // Parse XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");
        const items = xml.querySelectorAll("item");
        
        const normalized = Array.from(items).map((item) => ({
          title: item.querySelector("title")?.textContent ?? "Untitled",
          link: item.querySelector("link")?.textContent ?? item.querySelector("guid")?.textContent ?? "#",
          pubDate: item.querySelector("pubDate")?.textContent ?? null,
          description: (item.querySelector("description")?.textContent ?? "").replace(/<[^>]+>/g, ""),
        }));
        
        setPosts(normalized);
      } catch (err) {
        console.error("Writing fetch error:", err);
        if (mounted) setError("Could not load posts. Try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchFeed();
    return () => { mounted = false; };
  }, []);

  const handleLoadMore = () => {
    setShowLoadMore(false); // Hide button immediately
    setVisibleCount((prev) => {
      const newCount = Math.min(prev + 4, posts.length);
      // Calculate animation completion time: last card (idx 3) has delay 0.3s + duration 0.6s = 0.9s
      setTimeout(() => {
        setShowLoadMore(true);
      }, 900); // Show button after animations complete
      return newCount;
    });
  };

  const excerpt = (text = "", max = 140) => {
    const clean = (text || "").replace(/<[^>]+>/g, "");
    return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-32 px-6 pb-40">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl font-bold text-center mb-10"
      >
        Writing ✍️
      </motion.h1>

      {/* Subscribe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto p-10 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-800/40 border border-slate-700 backdrop-blur-md shadow-[0_0_25px_rgba(20,184,166,0.12)] text-center"
      >
        <h2 className="text-2xl font-semibold text-accent mb-3">Subscribe to My Newsletter</h2>
        <p className="text-slate-300 mb-6">I write about Product, Travel and Life lessons. Join me in my curiosity.</p>
        <iframe
          src="https://deepaklearns.substack.com/embed"
          width="100%"
          height="200"
          style={{ border: "1px solid rgba(45,212,191,0.12)", borderRadius: 10, background: "transparent" }}
          frameBorder="0"
          scrolling="no"
          title="substack-embed"
        />
      </motion.div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-semibold text-accent mb-6 text-center"
        >
          Latest Posts
        </motion.h2>

        {loading ? (
          <p className="text-slate-500 text-center">Loading posts...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-500 text-center">No posts found yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.slice(0, visibleCount).map((post, idx) => (
                <motion.a
                  key={post.link ?? idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-6 rounded-xl bg-gradient-to-b from-slate-900/50 to-slate-800/30 border border-slate-800 hover:border-accent hover:shadow-[0_0_20px_rgba(20,184,166,0.12)] transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                  <p className="text-slate-400 text-sm">{excerpt(post.description, 120)}</p>
                  <p className="text-slate-500 text-xs mt-3">{post.pubDate ? new Date(post.pubDate).toLocaleDateString() : ""}</p>
                </motion.a>
              ))}
            </div>

            {/* Load More */}
            {showLoadMore && visibleCount < posts.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-black transition-colors duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}