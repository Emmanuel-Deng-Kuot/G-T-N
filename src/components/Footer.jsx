const Footer = () => {
  return (
    <footer
      className="w-full py-16 px-6 lg:px-10"
      style={{ background: "#2D2B6B" }}
    >
      <div className="max-w-7xl mx-auto">
      <div className="flex lg:hidden flex-col items-center text-center gap-8 w-full max-w-md mx-auto">

  <span
    className="text-white font-black tracking-tight leading-none text-6xl"
    style={{ fontFamily: "monospace" }}
  >
    G\T\N
  </span>

  <p className="text-white/90 text-lg lg:text-3xl lg:leading-relaxed max-w-xs">
    Mangstore is the solution for high quality goods you need
  </p>

  {/* Social Icons */}
  <div className="flex items-center gap-8 text-white">
    <i className="ri-instagram-line text-3xl"></i>
    <i className="ri-whatsapp-line text-3xl"></i>
    <i className="ri-linkedin-fill text-3xl"></i>
    <i className="ri-twitter-fill text-3xl"></i>
  </div>

  {/* Marketplace Buttons */}
<div className="flex flex-row gap-4 w-full">
  {["Tokopedia", "Shopee"].map((item) => (
    <button
      key={item}
      className="flex items-center justify-between border border-white rounded-full px-6 py-4 text-white w-1/2"
    >
      <span className="text-xl">{item}</span>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 17L17 7M17 7H7M17 7v10"
        />
      </svg>
    </button>
  ))}
</div>

  <p className="text-white/80 text-base mt-4">
    © 2023 Mangcoding. All rights reserved.
  </p>

</div>
      <div className="hidden lg:flex items-start justify-between gap-12">

        {/* Left: Logo + tagline */}
        <div className="flex flex-col items-center lg:items-start gap-6 max-w-md">
          <span
            className="text-white font-black tracking-tight leading-none"
            style={{ fontSize: "52px", fontFamily: "monospace" }}
          >
            G\T\N
          </span>
          <p className="text-sm text-indigo-200/70 lg:text-2xl lg:leading-relaxed">
            Mangstore is the solution for high quality goods you need
          </p>
        </div>

        {/* Right: Nav columns + Find us in */}
        <div className="hidden lg:flex items-start gap-16">

          {/* Mangstore links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold lg:text-3xl text-sm mb-1">Mangstore</h4>
            {["Abaout Mangstore", "Home", "Product", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-indigo-200/60 lg:text-lg hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Buy links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold lg:text-3xl text-sm mb-1">Buy</h4>
            {["Men's Wear", "Woman's Wear", "Kids Wear", "Sport Wear", "Shoes", "Head wear"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-indigo-200/60 lg:text-lg hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Find us in */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold lg:text-3xl text-sm mb-1">Find us in</h4>
            {[
              { name: "Tokopedia", color: "#03AC0E" },
              { name: "Shopee", color: "#EE4D2D" },
            ].map((platform) => (
              <a
                key={platform.name}
                href="#"
                className="flex items-center justify-between gap-6 border border-white/20 hover:border-white/40 rounded-full px-5 py-2.5 transition-all duration-200 group"
                style={{ minWidth: "160px" }}
              >
                <span className="text-sm font-medium text-white lg:text-lg">
                  {platform.name}
                </span>
                <span className="w-6 h-6 rounded-full border border-white/30 group-hover:border-white/60 flex items-center justify-center transition-colors">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;