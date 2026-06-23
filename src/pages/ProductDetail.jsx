import { useState } from "react";
import { useCart } from "../context/useCart";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProduct } from "../hooks/useProduct";
import { useProducts } from "../hooks/useProducts";
import useAnimations from "../hooks/useAnimations";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { product, loading, error } = useProduct(id);
  const { products: allProducts } = useProducts();
  const containerRef = useAnimations();

  const [selection, setSelection] = useState({
    productId: id,
    image: 0,
    color: 0,
    variant: 0,
    quantity: 1,
  });

  const currentSelection =
    selection.productId === id
      ? selection
      : { productId: id, image: 0, color: 0, variant: 0, quantity: 1 };

  const selectedImage = currentSelection.image;
  const selectedColor = currentSelection.color;
  const selectedVariant = currentSelection.variant;
  const quantity = currentSelection.quantity;

  const colorFilters = {
    0: 'none',
    1: 'sepia(1) hue-rotate(180deg) saturate(0.5)',
    2: 'grayscale(0.5) brightness(1.2)',
  };

  const currentFilter = colorFilters[selectedColor] || 'none';
  const updateSelection = (patch) => {
    setSelection((current) => ({
      productId: id,
      image: current.productId === id ? current.image : 0,
      color: current.productId === id ? current.color : 0,
      variant: current.productId === id ? current.variant : 0,
      quantity: current.productId === id ? current.quantity : 1,
      ...patch,
    }));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-700 rounded-full animate-spin" />
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-400">Product not found.</p>
    </div>
  );

  return (
    <div ref={containerRef} key={id} className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

          {/* Left: Images */}
          <div className="flex flex-col gap-4 w-full lg:w-120 shrink-0">

            {/* Main image */}
            <div
              className="w-full rounded-3xl flex items-center justify-center overflow-hidden bg-[#f5f5f7] zoom-in"
              style={{ height: "340px", padding: "32px" }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.alt}
                className="object-contain w-full h-full transition-all duration-300"
                style={{ filter: currentFilter }}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center lg:justify-start">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => updateSelection({ image: i })}
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-200 zoom-in ${
                    selectedImage === i
                      ? "border-2 border-indigo-900"
                      : "border-2 border-transparent"
                  }`}
                  style={{ background: "#f5f5f7", padding: "8px" }}
                >
                  <img 
                    src={img} 
                    alt={`thumb-${i}`} 
                    className="object-contain w-full h-full"
                    style={{ filter: currentFilter }}
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6 flex-1 pt-2">

            <p className="text-sm text-slate-400 capitalize zoom-in">{product.category}</p>

            <h1 className="text-xl lg:text-4xl font-extrabold text-slate-900 leading-tight zoom-in">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 zoom-in">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900">${product.price}</span>
              <span className="text-xl text-slate-400 line-through">${product.oldPrice}</span>
            </div>

            {/* Color */}
            <div className="flex flex-col gap-3 zoom-in">
              <p className="text-sm font-semibold text-slate-800">Color</p>
              <div className="flex items-center gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => updateSelection({ color: i })}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      selectedColor === i
                        ? "bg-indigo-100 border-2 border-indigo-300 text-indigo-800 font-semibold"
                        : "border border-slate-300 text-slate-600 hover:border-slate-400 bg-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant */}
            <div className="flex flex-col gap-3 zoom-in">
              <p className="text-sm font-semibold text-slate-800">Variant</p>
              <div className="flex items-center gap-2 flex-wrap">
                {product.variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => updateSelection({ variant: i })}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      selectedVariant === i
                        ? "bg-indigo-100 border-2 border-indigo-300 text-indigo-800 font-semibold"
                        : "border border-slate-300 text-slate-600 hover:border-slate-400 bg-white"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-row sm:flex-row items-stretch sm:items-center gap-3 mt-2 zoom-in">

              <div className="flex items-center gap-3 border border-slate-300 rounded-full px-4 py-2.5 w-fit">
                <button
                  onClick={() => updateSelection({ quantity: Math.max(1, quantity - 1) })}
                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-slate-900 w-4 text-center">{quantity}</span>
                <button
                  onClick={() => updateSelection({ quantity: quantity + 1 })}
                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity, product.variants[selectedVariant], product.colors[selectedColor]);
                  navigate("/cart");
                }}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#2D2B6B] hover:bg-indigo-900 text-white text-sm font-nav py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Get the product
              </button>

            </div>

            {/* Checkout platforms */}
            <div className="flex flex-col gap-3 mt-2 zoom-in">
              <p className="text-sm text-slate-400">Or checkout on :</p>
              <div className="flex flex-row gap-2">
                {["Tokopedia", "Shopee", "Whatsapp"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex-1 flex items-center justify-between gap-1 border border-slate-300 hover:border-slate-400 rounded-full px-3 py-2.5 transition-all duration-200 group min-w-0"
                  >
                    <span className="text-xs font-nav font-medium text-slate-700 truncate">{platform}</span>
                    <svg
                      className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Reviews */}
      <section
        className="relative w-full overflow-hidden py-16"
        style={{
          background: `
            radial-gradient(ellipse at -10% 110%, #9d97df 0%, #b8b4e8 20%, #d4d2f2 40%, transparent 62%),
            radial-gradient(ellipse at 110% -10%, #9d97df 0%, #b8b4e8 20%, #d4d2f2 40%, transparent 62%),
            #eae9f5
          `,
        }}
      >
        <div className="absolute pointer-events-none zoom-in" style={{ width: "380px", height: "380px", border: "1px solid rgba(140,130,200,0.2)", borderRadius: "50%", bottom: "-80px", left: "-80px" }} />
        <div className="absolute pointer-events-none zoom-in" style={{ width: "320px", height: "320px", border: "1px solid rgba(140,130,200,0.2)", borderRadius: "50%", top: "-60px", right: "-60px" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            <div className="flex flex-col gap-4 zoom-in">
              <h2 className="text-2xl font-extrabold text-slate-900">Description</h2>
              <p className="text-sm lg:text-2xl text-slate-600 leading-relaxed">
                Experience premium quality with our latest collection.
                Each product is crafted to deliver exceptional performance and durability.
                Whether you're a professional or enthusiast, our devices offer the perfect blend of style and functionality.
                Join thousands of satisfied customers who have upgraded their setup with our products.
                Shop now and discover the difference that quality makes.
              </p>
            </div>

            <div className="flex flex-col gap-6 zoom-in">
              <h2 className="text-2xl font-extrabold text-slate-900">Review</h2>
              {[
                { name: "David Russel", rating: 3, avatar: "DR", review: "Great product overall, though the setup process was a bit complicated. The build quality is excellent and it works perfectly once configured." },
                { name: "Claire Maxwell", rating: 4, avatar: "CM", review: "Really impressed with the performance and design. It's been a solid addition to my workspace. Highly recommended!" },
                { name: "Darek O'Connor", rating: 5, avatar: "DO", review: "Absolutely love this product! Best investment I've made this year. The quality is outstanding and it arrived earlier than expected." },
              ].map((reviewer, i) => (
                <div key={i} className="flex gap-4 zoom-in">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white" style={{ background: "#9d97df" }}>
                    {reviewer.avatar}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm lg:text-lg font-bold text-slate-900">{reviewer.name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, s) => (
                          <svg key={s} className="w-3.5 h-3.5" fill={s < reviewer.rating ? "#F59E0B" : "none"} stroke="#F59E0B" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs lg:text-xl text-slate-500 leading-relaxed">{reviewer.review}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mt-2 zoom-in">
                <button className="flex items-center gap-2 bg-[#2D2B6B] hover:bg-indigo-900 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-px shadow-lg shadow-indigo-900/20">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="relative w-full bg-white py-16 overflow-hidden">
        <div className="absolute pointer-events-none z-0 zoom-in" style={{ width: "500px", height: "500px", borderRadius: "50%", bottom: "-150px", right: "-150px", background: "radial-gradient(circle at center, #9d97df 0%, #b8b4e8 20%, #d4d2f2 45%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-10 zoom-in">Related product</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {allProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((related, index) => (
                <div
                  key={related.id}
                  className="flex flex-col cursor-pointer group zoom-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => {
                    navigate(`/products/${related.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div
                    className="w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#f5f5f7]"
                    style={{ height: "160px", padding: "16px" }}
                  >
                    <img
                      src={related.image}
                      alt={related.alt}
                      className="object-contain w-full h-full transition-transform duration-500 ease-out will-change-transform"
                      style={{ transformOrigin: "center center" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08) translateY(-4px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0px)"; }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 pt-3 px-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 truncate mr-1">{related.category}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: "#FEF0E0", color: "#D97706" }}>{related.discount}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{related.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">${related.price}</span>
                      <span className="text-sm text-slate-400 line-through">${related.oldPrice}</span>
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

export default ProductDetail;
