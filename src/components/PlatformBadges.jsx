const platforms = [
  {
    name: "Tokopedia",
    image: "src/assets/images/tokopedia-logo.png",
  },
  {
    name: "Shopee",
    image: "src/assets/images/shopee-logo.png",
  },
  {
    name: "Whatsapp",
    image: "src/assets/images/whatsapp-logo.png",
  },
];

const PlatformBadges = () => {
  return (
    <>
      {/* Desktop — full badges with text: hidden on mobile */}
      <div className="hidden lg:flex flex-row items-center gap-3">
        <span className="text-xs text-slate-400 font-bold">Or find us in :</span>
        <div className="flex items-center gap-2">
          {platforms.map((p) => (
            <a
              key={p.name}
              href="#"
              className="flex items-center gap-1.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-full px-3 py-1.5 transition-all duration-200 group"
            >
              <img src={p.image} alt={p.name} className="w-5 h-5 object-contain" />
              <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">
                {p.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile — icons only, no text: hidden on desktop */}
      <div className="flex lg:hidden items-center gap-3">
        <span className="text-xs text-slate-400 font-bold">Or find us in :</span>
        <div className="flex items-center gap-2">
          {platforms.map((p) => (
            <a
              key={p.name}
              href="#"
              aria-label={p.name}
              className="w-8 h-8 flex items-center justify-center border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-full transition-all duration-200"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-5 h-5 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlatformBadges;