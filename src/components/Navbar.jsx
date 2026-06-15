import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const menuRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const navLinks = useMemo(() => [
    { label: "HOME", path: "/" },
    { label: "PRODUCTS", path: "/products" },
    { label: "BLOG", path: "/blog" },
  ], []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  const closeMobileUI = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(closeMobileUI, 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, closeMobileUI]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMenuOpen(false);
      setSearchQuery("");
      setSearchSuggestions([]);
    }
  }, [searchQuery, navigate]);

  // Debounced search suggestions
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(
      () => {
        if (searchQuery.trim().length <= 1) {
          setSearchSuggestions([]);
          return;
        }

        // Simulate API call - replace with your actual search endpoint
        const fakeSuggestions = [
          `${searchQuery} in Electronics`,
          `${searchQuery} in Fashion`,
          `${searchQuery} in Home & Living`,
        ];
        setSearchSuggestions(fakeSuggestions);
      },
      searchQuery.trim().length > 1 ? 300 : 0
    );

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
    setSearchOpen(false);
    setMenuOpen(false);
    setSearchQuery("");
    setSearchSuggestions([]);
  }, [navigate]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      {/* Main navbar row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Mobile: Hamburger — hidden on desktop */}
        <button
          className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop: Left nav links — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMobileUI}
                className={`relative px-4 py-3 rounded-xl text-sm font-semibold tracking-widest transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-indigo-700" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Logo — always centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" onClick={closeMobileUI}>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              G\<span className="text-indigo-600">T</span>\N
            </span>
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-3 ml-auto">
          {/* Desktop search — hidden on mobile */}
          <form
            onSubmit={handleSearch}
            className={`hidden lg:flex items-center gap-2 border rounded-full px-4 py-2 bg-white transition-all duration-300 ${
              searchFocused
                ? "border-indigo-400 shadow-md shadow-indigo-100 w-64"
                : "border-slate-200 w-44"
            }`}
          >
            <input
              type="text"
              placeholder="Search Something . . ."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => setSearchFocused(false), 200);
              }}
              className="text-xs text-slate-500 bg-transparent outline-none w-full placeholder-slate-400"
              aria-label="Search products"
            />
            <button type="submit" className="shrink-0">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Mobile search icon — hidden on desktop */}
          <button
            className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 hover:bg-slate-50 rounded-full transition-colors"
            aria-label="Cart"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-indigo-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Contact — hidden on mobile */}
          <button
            onClick={() => navigate("/contact")}
            className="hidden lg:block border border-slate-800 text-slate-800 text-xs font-semibold tracking-widest px-5 py-2 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            CONTACT
          </button>
        </div>
      </div>

      {/* Mobile search bar — slides down when open */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          searchOpen ? "max-h-40 border-t border-slate-100" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 bg-white">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Something . . ."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
              className="text-sm text-slate-500 bg-transparent outline-none w-full placeholder-slate-400"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </form>
          
          {/* Mobile search suggestions */}
          {searchSuggestions.length > 0 && searchOpen && (
            <div className="mt-2 border-t border-slate-100 pt-2">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu — slides down when open */}
      <div
        ref={menuRef}
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 border-t border-slate-100" : "max-h-0"
        }`}
      >
        <div className="bg-white px-4 py-4 flex flex-col gap-1">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMobileUI}
                className={`relative px-4 py-3 rounded-xl text-sm font-semibold tracking-widest transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute left-0 w-1 h-full bg-indigo-700 rounded-r-full" />
                )}
              </Link>
            );
          })}

          {/* Contact in mobile menu */}
          <Link
            to="/contact"
            onClick={closeMobileUI}
            className="px-4 py-3 rounded-xl text-sm font-semibold tracking-widest text-slate-700 hover:bg-slate-50 transition-colors duration-200"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
