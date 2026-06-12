const products = [
  {
    id: 1,
    category: "Keyboard and mouse",
    name: "Apollo 11 with gatheron yellow switch pre-lubed",
    price: "$500",
    oldPrice: "$800",
    discount: "20% off",
    image: "/keyboard.png",
    alt: "Apollo 11 Keyboard",
  },
  {
    id: 2,
    category: "Keyboard and mouse",
    name: "Apollo 11 with gatheron yellow switch pre-lubed",
    price: "$500",
    oldPrice: "$800",
    discount: "20% off",
    image: "/mouse.png",
    alt: "Logitech Mouse",
  },
];

const BestProduct = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-20"
      style={{
        background: `
          radial-gradient(ellipse at -10% 110%, #9d97df 0%, #b8b4e8 20%, #d4d2f2 40%, transparent 62%),
          radial-gradient(ellipse at 110% -10%, #9d97df 0%, #b8b4e8 20%, #d4d2f2 40%, transparent 62%),
          #eae9f5
        `,
      }}
    >
      {/* Decorative arc line */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "520px",
          height: "520px",
          border: "1px solid rgba(150,140,200,0.2)",
          borderRadius: "50%",
          top: "50%",
          left: "28%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left: Text content */}
          <div className="flex flex-col items-center text-center gap-5 w-full lg:min-w-70 lg:max-w-80">
            <h2 className="text-3xl font-bold md:text-4xl  text-slate-900 leading-tight">
              Our best products of the month
            </h2>
            <p className="text-sm lg:text-xl text-slate-400 font-nav  leading-relaxed">
              As new products enter the market, consumers are presented with more choices than ever before.
               Understanding the features, benefits, and value of each product can help users make informed
                decisions that best suit their personal and professional needs.
            </p>
            <div>
              <button className="group flex items-center gap-3 bg-indigo-900 hover:bg-indigo-800 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/30 hover:-translate-y-px">
                Look Product
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Right: Product cards */}
          <div className="flex flex-row lg:flex-row items-center lg:items-end gap-4 flex-1 w-full overflow-x-auto">

            {/* Card 1 — left, sits lower */}
            <div
              className="flex flex-col bg-white rounded-3xl overflow-hidden
                        min-w-70 lg:flex-1
                        cursor-pointer hover:-translate-y-1 transition-transform duration-300"
              style={{
                boxShadow: "0 4px 32px rgba(100,90,180,0.08)",
                height: "400px",
              }}
            >
              <div
                className="w-full flex items-center justify-center flex-1"
                style={{ background: "#f8f8fa", padding: "24px" }}
              >
                <img
                  src="src/assets/images/keyboard.png"
                  alt="Keyboard"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Keyboard</span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "#FEF0E0", color: "#D97706" }}
                  >
                    {products[0].discount}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {products[0].name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-slate-900">{products[0].price}</span>
                  <span className="text-sm text-slate-400 line-through">{products[0].oldPrice}</span>
                </div>
              </div>
            </div>

            {/* Card 2 — right, same size but pushed up */}
            <div
              className="flex flex-col bg-white rounded-3xl overflow-hidden
                        min-w-70 lg:flex-1
                        cursor-pointer hover:-translate-y-1 transition-transform duration-300
                        mb-0 lg:mb-12"
              style={{
                boxShadow: "0 4px 32px rgba(100,90,180,0.08)",
                height: "400px",
              }}
            >
              <div
                className="w-full flex items-center justify-center flex-1"
                style={{ background: "#f8f8fa", padding: "24px" }}
              >
                <img
                  src="src/assets/images/mouse.png"
                  alt="Mouse"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{products[1].category}</span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "#FEF0E0", color: "#D97706" }}
                  >
                    {products[1].discount}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {products[1].name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-slate-900">{products[1].price}</span>
                  <span className="text-sm text-slate-400 line-through">{products[1].oldPrice}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BestProduct;