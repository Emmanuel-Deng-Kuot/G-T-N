import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { posts, popularPosts, recentPosts } from "../data/BlogData";
import useAnimations from "../hooks/useAnimations";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useAnimations();

  const allPosts = [...posts, ...popularPosts, ...recentPosts];
  const post = allPosts.find((p) => p.id === parseInt(id)) || allPosts[0];
  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero image — full bleed on mobile, rounded on desktop */}
      <div className="w-full pt-16">
        <div className="max-w-7xl mx-auto lg:px-10 h-full">
          <div
            className="w-full overflow-hidden lg:rounded-3xl zoom-in"
            style={{ height: "clamp(220px, 50vw, 480px)" }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-8 lg:py-16">

        {/* Mobile: single column — Desktop: article + sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Article content */}
          <div className="flex-1 flex flex-col gap-5 lg:gap-6">

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight zoom-in">
              {post.title}
            </h1>

            {/* Date */}
            <p className="text-xs lg:text-sm text-slate-400 zoom-in">{post.date}</p>

            {/* Share */}
            <div className="flex items-center gap-2 lg:gap-3 zoom-in">
              <span className="text-xs lg:text-sm text-slate-500 font-medium">Share :</span>
              {[
                { label: "Instagram", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A1.5 1.5 0 0119 8v8a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 16V8a1.5 1.5 0 011.5-1.5z" },
                { label: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Link", icon: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                >
                  <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </button>
              ))}
            </div>

            {/* Body part 1 */}
            <div className="flex flex-col gap-3 text-sm lg:text-xl text-slate-600 leading-relaxed zoom-in">
              <p>{post.excerpt}</p>
              <p>
                Experience the perfect blend of quality and performance with our premium products.
                Designed to meet the highest standards, our devices deliver exceptional reliability for everyday use.
                Whether you're working from home, gaming, or creating content, you'll appreciate the attention to detail and superior craftsmanship.
                Join thousands of satisfied customers who have already upgraded their setup.
                The intuitive design makes it easy to get started, while advanced features provide the flexibility power users demand.
                Backed by our comprehensive warranty and responsive customer support team, you can purchase with confidence.
                Transform your digital experience today with technology that works as hard as you do.
              </p>
              <p>
                Experience reliable performance that stands the test of time.
                Our carefully crafted design ensures durability and consistency in every use.
                From everyday tasks to demanding projects, you can count on superior quality that exceeds expectations.
                The intuitive features make it accessible for beginners while providing the depth that professionals appreciate.
                Whether you're upgrading your current setup or building something new, our products deliver the perfect balance of form and function.
              </p>
            </div>

            {/* Inline image — uses post image */}
            <div className="w-full h-55 lg:h-100 rounded-2xl overflow-hidden zoom-in">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body part 2 */}
            <div className="flex flex-col gap-3 text-sm lg:text-xl text-slate-600 leading-relaxed zoom-in">
              <p>
                Discover the perfect combination of quality, performance, and style.
                Our products are designed to exceed your expectations with every use.
                From the moment you unbox, you'll notice the attention to detail and premium craftsmanship.
                Whether you're a professional or just getting started, our intuitive solutions make it easy to achieve amazing results.
                Join countless satisfied customers who have already made the switch to superior quality.
              </p>
              <p>
                Experience reliable performance that stands the test of time.
                Our durable construction ensures your investment is protected for years to come.
                From everyday tasks to demanding projects, you can count on consistent quality.
                The thoughtful design makes it easy to use, while the robust build handles anything you throw at it.
                Upgrade to confidence today.
              </p>
              <p>
                Experience quality that stands the test of time.
                Our durable design ensures reliable performance for all your needs.
                From everyday tasks to demanding projects, you can count on consistent results.
                The thoughtful engineering makes it easy to use, while the robust construction provides peace of mind.
              </p>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mt-1 zoom-in">
              <span className="text-xs lg:text-lg text-slate-500 font-medium">Tag :</span>
              {["tech", "Social", "Tips & Trick"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-xs lg:text-lg font-medium border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile: Popular posts — shown inline below article */}
            <div className="flex flex-col gap-4 mt-4 lg:hidden">
              <button className="w-full bg-[#2D2B6B] text-white text-sm lg:text-2xl font-semibold py-3 rounded-full zoom-in">
                Popular News
              </button>

              <div className="flex flex-col gap-4">
                {popularPosts.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-3 cursor-pointer group zoom-in"
                    onClick={() => { navigate(`/blog/${p.id}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-700">{p.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs lg:text-lg text-slate-400">{p.time}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 lg:text-2xl leading-snug line-clamp-2">{p.title}</p>
                      <span className="text-xs text-slate-400">{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Desktop sidebar only */}
          <div className="hidden lg:flex w-64 shrink-0 flex-col gap-6 sticky top-24">
            <button className="w-full bg-[#2D2B6B] text-white text-sm lg:text-2xl font-semibold py-3 rounded-full zoom-in">
              Popular
            </button>
            <div className="flex flex-col gap-5">
              {popularPosts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col gap-2 cursor-pointer group zoom-in"
                  onClick={() => { navigate(`/blog/${p.id}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <div className="w-full rounded-xl overflow-hidden" style={{ height: "120px" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-700">{p.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-xs text-slate-400">{p.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 lg:text-2xl lg:leading-snug">{p.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{p.date}</span>
                      <button className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                        Read ...
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 my-10 lg:my-16 zoom-in" />

        {/* Related posts */}
        <div>
          <h2 className="text-lg lg:text-2xl font-extrabold text-slate-900 mb-6 lg:mb-8 zoom-in">Related post</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
            {related.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 cursor-pointer group zoom-in"
                onClick={() => { navigate(`/blog/${p.id}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <div className="w-full h-40 lg:h-55 rounded-2xl overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-600">{p.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-400">{p.time}</span>
                  </div>
                  <h3 className="text-sm lg:text-2xl font-bold text-slate-900 leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-500 lg:text-2xl leading-relaxed line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">{p.date}</span>
                    <button className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors">
                      Read ...
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;