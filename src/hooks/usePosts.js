import { useState, useEffect } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/posts?limit=30");
        const data = await res.json();

        const mapped = data.posts.map((p, i) => ({
          id: p.id,
          title: p.title,
          excerpt: p.body,
          category: p.tags[0] || "Tech",
          date: "12 September 2023",
          time: `${i + 1} Mins ago`,
          image: `https://picsum.photos/seed/${p.id}/600/400`,
          featured: p.id === 1,
        }));

        setPosts(mapped.slice(0, 4));
        setRecentPosts(mapped.slice(4, 7));
        setPopularPosts(mapped.slice(7, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, popularPosts, recentPosts, loading, error };
};