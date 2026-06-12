import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { posts, recentPosts, popularPosts } from "../data/blogData";

const tabs = ["All", "tech", "Social", "Tips & Trick"];

const BlogCard = ({ post, height = "220px", onRead }) => (
  <div className="flex flex-col gap-3 cursor-pointer group" onClick={onRead}>
    <div className="w-full rounded-2xl overflow-hidden" style={{ height }}>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-700">{post.category}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-xs text-slate-400">{post.time}</span>
      </div>
      <h3 className="text-base lg:text-lg font-extrabold text-slate-900 leading-snug">{post.title}</h3>
      <p className="text-xs text-slate-500  lg:text-xl lg:leading-relaxed">{post.excerpt}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-slate-400">{post.date}</span>
        <button className="text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
          Read ...
        </button>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-6 lg:mb-8">
    <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900">{title}</h2>
    <button className="group flex items-center gap-2 lg:gap-3 bg-[#2D2B6B] hover:bg-indigo-900 text-white text-xs lg:text-sm font-semibold px-4 lg:px-7 py-2.5 lg:py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:-translate-y-px">
      More Review
      <span className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
        <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </button>
  </div>
);

const Blog = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const filtered =
    activeTab === "All"
      ? posts
      : posts.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-10">

        {/* Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 mb-8 lg:mb-10 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 lg:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                  : "border border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <>
            {/* Mobile: stacked */}
            <div
              className="flex flex-col lg:hidden gap-4 mb-10 cursor-pointer"
              onClick={() => navigate(`/blog/${featured.id}`)}
            >
              <div className="w-full rounded-2xl overflow-hidden" style={{ height: "220px" }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-600">{featured.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs text-slate-400 lg:text-xl">{featured.time}</span>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{featured.title}</h1>
                <p className="text-xs text-slate-400">{featured.date}</p>
                <p className="text-sm text-slate-600 lg:text-2xl leading-relaxed">{featured.excerpt}</p>
                <button className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors text-left mt-1">
                  Read ...
                </button>
              </div>
            </div>

            {/* Desktop: side by side */}
            <div className="hidden lg:flex gap-10 items-start mb-12">
              <div
                className="w-125 shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ height: "300px" }}
                onClick={() => navigate(`/blog/${featured.id}`)}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-3 flex-1 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-amber-600">{featured.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-sm text-slate-400">{featured.time}</span>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{featured.title}</h1>
                <p className="text-sm text-slate-400">{featured.date}</p>
                <p className="text-sm text-slate-600 lg:text-2xl leading-relaxed">{featured.excerpt}</p>
                <button
                  onClick={() => navigate(`/blog/${featured.id}`)}
                  className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors text-left mt-1"
                >
                  Read ...
                </button>
              </div>
            </div>
          </>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-8 lg:mb-12" />
        {/* Small posts — mobile: horizontal card, desktop: 3-col grid */}
        <div className="mb-16 lg:mb-20">

          {/* Mobile: list style with image left */}
          <div className="flex flex-col gap-5 lg:hidden">
            {rest.map((post) => (
              <div
                key={post.id}
                className="flex gap-3 cursor-pointer group"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-amber-600">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-400">{post.time}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-3">{post.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{post.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {rest.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 cursor-pointer group"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="w-full rounded-2xl overflow-hidden" style={{ height: "200px" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-600">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-400">{post.time}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-500 lg:text-xl lg:leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">{post.date}</span>
                    <button className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                      Read ...
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-8 lg:mb-12" />

        {/* Recent section */}
        <div className="mb-16 lg:mb-20">
          <SectionHeader title="Recent" />
          {/* Mobile: single column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
            {recentPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                height="180px"
                onRead={() => navigate(`/blog/${post.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-8 lg:mb-12" />

        {/* Popular section */}
        <div className="mb-10">
          <SectionHeader title="Popular" />
          {/* Mobile: single column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
            {popularPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                height="180px"
                onRead={() => navigate(`/blog/${post.id}`)}
              />
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default Blog;