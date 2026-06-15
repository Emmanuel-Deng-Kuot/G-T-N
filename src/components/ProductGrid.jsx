import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/productsData";

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[^0-9.-]/g, ""));
};

const ProductCard = ({ product, variant, onNavigate }) => (
  <div
    className={`flex flex-col cursor-pointer group ${
      variant === "home" ? "bg-white rounded-2xl overflow-hidden" : ""
    }`}
    style={variant === "home" ? { boxShadow: "0 2px 16px rgba(100,90,180,0.06)" } : {}}
    onClick={() => onNavigate(`/products/${product.id}`)}
  >
    <div
      className="w-full flex items-center justify-center overflow-hidden rounded-2xl"
      style={{ height: "180px", background: "#f5f5f7", padding: "20px" }}
    >
      <img
        src={product.image}
        alt={product.alt}
        loading="lazy"
        className="object-contain w-full h-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transformOrigin: "center center" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08) translateY(-4px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0px)"; }}
      />
    </div>

    <div className={`flex flex-col gap-1.5 ${variant === "home" ? "p-4" : "pt-3 px-1"}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs lg:text-lg text-slate-400">{product.category}</span>
        <span className="text-xs lg:text-lg font-semibold px-2 py-0.5 rounded-full" style={{ background: "#FEF0E0", color: "#D97706" }}>
          {product.discount}
        </span>
      </div>
      <p className="text-sm lg:text-lg font-bold text-slate-900 leading-snug">{product.name}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm lg:text-lg font-bold text-slate-900">{product.price}</span>
        <span className="text-sm lg:text-lg text-slate-400 line-through">{product.oldPrice}</span>
      </div>
    </div>
  </div>
);

const ITEMS_PER_PAGE = 12;

const categories = ["All", "Keyboard", "Mouse", "Headphone"];
const sortOptions = ["Newest first", "Price: Low to High", "Price: High to Low"];
const priceOptions = ["All", "$0 - $100", "$100 - $200", "$200 - $400", "$400+"];

const ProductGrid = ({ variant = "page" }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest first");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const price = parsePrice(p.price);
      const matchPrice = (() => {
        switch (priceRange) {
          case "$0 - $100": return price <= 100;
          case "$100 - $200": return price > 100 && price <= 200;
          case "$200 - $400": return price > 200 && price <= 400;
          case "$400+": return price > 400;
          default: return true;
        }
      })();
      return matchCategory && matchSearch && matchPrice;
    });
  }, [category, search, priceRange]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filtered];
    if (sortBy === "Price: Low to High") sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === "Price: High to Low") sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }, [filtered, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);

  const paginated = useMemo(() => {
    return sortedProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);
  }, [sortedProducts, safePage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const closeAllDropdowns = () => {
    setShowCategoryDropdown(false);
    setShowSortDropdown(false);
    setShowPriceDropdown(false);
  };

  const handleCategoryChange = (val) => { setCategory(val); setShowCategoryDropdown(false); setCurrentPage(1); };
  const handlePriceChange = (val) => { setPriceRange(val); setShowPriceDropdown(false); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortBy(val); setShowSortDropdown(false); setCurrentPage(1); };

  const anyDropdownOpen = showCategoryDropdown || showSortDropdown || showPriceDropdown;

  return (
    <section className="relative w-full bg-white py-16 overflow-hidden">

      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "500px", height: "500px", borderRadius: "50%",
          bottom: "-150px", right: "-150px",
          background: "radial-gradient(circle at center, #9d97df 0%, #b8b4e8 20%, #d4d2f2 45%, transparent 70%)",
        }}
      />

      {anyDropdownOpen && (
        <div className="fixed inset-0 z-20" onClick={closeAllDropdowns} aria-hidden="true" />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {variant === "page" && (
          <div className="mb-8">

            {/* ── Mobile toolbar ── */}
            <div className="flex lg:hidden items-center gap-3 mb-4">

              {/* Search */}
              <div className="flex items-center gap-2 border border-slate-300 rounded-full px-4 py-2.5 bg-white flex-1">
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="search"
                  value={search}
                  aria-label="Search products"
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="text-sm text-slate-500 bg-transparent outline-none w-full placeholder-slate-400"
                />
              </div>

              {/* Filter icon */}
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="w-11 h-11 flex items-center justify-center border border-slate-300 rounded-full bg-white hover:border-indigo-400 transition-colors shrink-0"
                aria-label="Filters"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </button>

            </div>

            {/* Mobile filter panels */}
            {showMobileFilter && (
              <div className="flex lg:hidden gap-3 mb-4">

                {/* Category panel */}
                <div className="relative flex-1">
                  <button
                    onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowSortDropdown(false); setShowPriceDropdown(false); }}
                    className="w-full flex items-center justify-between border border-slate-800 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900"
                  >
                    <span>Category</span>
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showCategoryDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  </button>
                  {showCategoryDropdown && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-lg z-30 py-1 overflow-hidden">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => handleCategoryChange(c)}
                          className={`w-full text-center px-4 py-3 text-sm border-b border-slate-100 last:border-0 transition-colors ${
                            category === c ? "text-indigo-700 font-semibold bg-indigo-50" : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort + Price panel */}
                <div className="relative flex-1">
                  <button
                    onClick={() => { setShowSortDropdown(!showSortDropdown); setShowCategoryDropdown(false); setShowPriceDropdown(false); }}
                    className="w-full flex items-center justify-between border border-slate-800 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900"
                  >
                    <span>Sort & Price</span>
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showSortDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  </button>
                  {showSortDropdown && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-lg z-30 py-1 overflow-hidden">
                      <p className="text-xs text-slate-400 px-4 pt-2 pb-1 font-semibold">Sort : most search</p>
                      <div className="w-full h-px bg-slate-100" />
                      {sortOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSortChange(s)}
                          className={`w-full text-center px-4 py-3 text-sm border-b border-slate-100 last:border-0 transition-colors ${
                            sortBy === s ? "text-indigo-700 font-semibold bg-indigo-50" : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <div className="w-full h-px bg-slate-100 mt-1" />
                      <p className="text-xs text-slate-400 px-4 pt-2 pb-1 font-semibold">Price range: All</p>
                      {priceOptions.map((price) => (
                        <button
                          key={price}
                          onClick={() => handlePriceChange(price)}
                          className={`w-full text-center px-4 py-3 text-sm border-b border-slate-100 last:border-0 transition-colors ${
                            priceRange === price ? "text-indigo-700 font-semibold bg-indigo-50" : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ── Desktop toolbar ── */}
            <div className="hidden lg:flex items-center justify-between gap-4">

              <div className="flex items-center gap-2 border border-slate-300 rounded-full px-4 py-2.5 bg-white w-56">
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="search"
                  value={search}
                  aria-label="Search products"
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="text-sm text-slate-500 bg-transparent outline-none w-full placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-3">

                {/* Category */}
                <div className="relative z-30">
                  <button
                    aria-haspopup="listbox"
                    aria-expanded={showCategoryDropdown}
                    onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowSortDropdown(false); setShowPriceDropdown(false); }}
                    className="flex items-center border border-slate-800 rounded-full bg-white overflow-hidden hover:border-indigo-400 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 px-4 py-2.5">Category</span>
                    <span className="w-px h-5 bg-slate-300" />
                    <span className="flex items-center gap-1.5 px-4 py-2.5">
                      <span className="text-sm text-slate-500">{category}</span>
                      <svg className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showCategoryDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </span>
                  </button>
                  {showCategoryDropdown && (
                    <div role="listbox" className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-xl shadow-lg z-30 min-w-45 py-1 overflow-hidden">
                      {categories.map((c) => (
                        <button key={c} role="option" aria-selected={category === c} onClick={() => handleCategoryChange(c)} className={`w-full text-left px-4 py-2 text-xs transition-colors ${category === c ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>{c}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="relative z-30">
                  <button
                    aria-haspopup="listbox"
                    aria-expanded={showPriceDropdown}
                    onClick={() => { setShowPriceDropdown(!showPriceDropdown); setShowCategoryDropdown(false); setShowSortDropdown(false); }}
                    className="flex items-center border border-slate-800 rounded-full bg-white overflow-hidden hover:border-indigo-400 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 px-4 py-2.5">Price</span>
                    <span className="w-px h-5 bg-slate-300" />
                    <span className="flex items-center gap-1.5 px-4 py-2.5">
                      <span className="text-sm text-slate-500">{priceRange}</span>
                      <svg className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPriceDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </span>
                  </button>
                  {showPriceDropdown && (
                    <div role="listbox" className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-xl shadow-lg z-30 min-w-45 py-1 overflow-hidden">
                      {priceOptions.map((price) => (
                        <button key={price} role="option" aria-selected={priceRange === price} onClick={() => handlePriceChange(price)} className={`w-full text-left px-4 py-2 text-xs transition-colors ${priceRange === price ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>{price}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort */}
                <div className="relative z-30">
                  <button
                    aria-haspopup="listbox"
                    aria-expanded={showSortDropdown}
                    onClick={() => { setShowSortDropdown(!showSortDropdown); setShowCategoryDropdown(false); setShowPriceDropdown(false); }}
                    className="flex items-center border border-slate-800 rounded-full bg-white overflow-hidden hover:border-indigo-400 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 px-4 py-2.5">Sort by</span>
                    <span className="w-px h-5 bg-slate-300" />
                    <span className="flex items-center gap-1.5 px-4 py-2.5">
                      <span className="text-sm text-slate-500">{sortBy}</span>
                      <svg className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showSortDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </span>
                  </button>
                  {showSortDropdown && (
                    <div role="listbox" className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-xl shadow-lg z-30 min-w-45 py-1 overflow-hidden">
                      {sortOptions.map((s) => (
                        <button key={s} role="option" aria-selected={sortBy === s} onClick={() => handleSortChange(s)} className={`w-full text-left px-4 py-2 text-xs transition-colors ${sortBy === s ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Results count */}
        {variant === "page" && sortedProducts.length > 0 && (
          <p className="mb-4 text-sm text-slate-500">
            Showing {paginated.length} of {sortedProducts.length} products
          </p>
        )}

        {/* Grid or empty state */}
        {variant === "page" && paginated.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setPriceRange("All"); setSortBy("Newest first"); setCurrentPage(1); }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(variant === "home" ? products.slice(0, 12) : paginated).map((product) => (
              <ProductCard key={product.id} product={product} variant={variant} onNavigate={navigate} />
            ))}
          </div>
        )}

        {/* Home CTA */}
        {variant === "home" && (
          <div className="flex justify-end mt-10">
            <button
              onClick={() => navigate("/products")}
              className="group flex items-center gap-3 bg-indigo-900 hover:bg-indigo-800 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:-translate-y-px"
            >
              Our Products
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        )}

        {/* Pagination */}
        {variant === "page" && totalPages > 1 && paginated.length > 0 && (
          <nav aria-label="Product pagination" className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors bg-white ${
                safePage === 1 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-500 hover:border-slate-400"
              }`}
            >
              <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={safePage === page ? "page" : undefined}
                className={`w-11 h-11 rounded-full text-xs font-semibold transition-all duration-200 ${
                  safePage === page
                    ? "bg-[#2D2B6B] text-white border border-[#2D2B6B]"
                    : "bg-white border border-slate-300 text-slate-600 hover:border-slate-400"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors bg-white ${
                safePage === totalPages ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-300 text-slate-500 hover:border-slate-400"
              }`}
            >
              <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        )}

      </div>
    </section>
  );
};

export default ProductGrid;