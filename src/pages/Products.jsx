import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import useAnimations from "../hooks/useAnimations";

const Products = () => {
  const containerRef = useAnimations();

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar activePage="products" />

      {/* Hero banner */}
      <section
        className="relative w-full overflow-hidden pt-16"
        style={{
          background: `
            radial-gradient(ellipse at -5% 60%, #b8b4e8 0%, #cecdF0 20%, #e0dff6 40%, transparent 60%),
            radial-gradient(ellipse at 105% 50%, #b8b4e8 0%, #cecdF0 20%, #e0dff6 40%, transparent 60%),
            #eeedf8
          `,
        }}
      >
        {/* Decorative large circle left */}
        <div
          className="absolute pointer-events-none zoom-in"
          style={{
            width: "420px",
            height: "420px",
            border: "1px solid rgba(140,130,200,0.25)",
            borderRadius: "50%",
            top: "50%",
            left: "-80px",
            transform: "translateY(-30%)",
          }}
        />

        {/* Decorative large circle right */}
        <div
          className="absolute pointer-events-none zoom-in"
          style={{
            width: "420px",
            height: "420px",
            border: "1px solid rgba(140,130,200,0.25)",
            borderRadius: "50%",
            top: "50%",
            right: "-80px",
            transform: "translateY(-60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 relative z-10 text-center lg:text-left">
          <h1 className="text-lg md:text-4xl font-body text-slate-900 mb-4 zoom-in">
            Our products
          </h1>

          <p className="text-lg md:text-xl font-nav text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0 zoom-in">
            Technology continues to evolve at an incredible pace, bringing new
            opportunities and challenges for consumers. This month, we explore
            some of the most exciting gadgets available on the market,
            highlighting their features, performance, and overall value.
            From smart devices to everyday essentials, these products are
            designed to make life easier, more productive, and more enjoyable.
          </p>
        </div>
      </section>

      <ProductGrid variant="page" />
      <Footer />
    </div>
  );
};

export default Products;