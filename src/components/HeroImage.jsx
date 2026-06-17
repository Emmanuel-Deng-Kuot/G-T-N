const HeroImage = () => {
  return (
    <div className="relative flex h-85 w-full items-center justify-center sm:h-105 lg:h-145 lg:w-160">
      {/* Circular gradient */}
      <div className="absolute left-[clamp(-140px,-5vw,-40px)] top-1/2 z-0 h-[clamp(280px,90vw,620px)] w-[clamp(240px,80vw,560px)] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,#b8bbee_0%,#cfd1f4_30%,#e8e9fb_58%,transparent_75%)]" />

      {/* Hero card */}
      <div className="relative z-10 h-[clamp(240px,62vw,540px)] w-[clamp(180px,52vw,460px)] shrink-0 overflow-hidden rounded-2xl bg-white/80 shadow-lg shadow-indigo-900/20 backdrop-blur-sm">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#7B82E8_0%,#5058C8_25%,#3A3F9E_55%,#252870_80%,#1A1B52_100%)]" />

        {/* Shimmer */}
        <div className="absolute right-0 top-0 h-[clamp(60px,14vw,224px)] w-[clamp(60px,14vw,224px)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,transparent_70%)] opacity-20" />

        {/* Hero person */}
        <img
          src="src/assets/images/hero-person.png"
          alt="Person with headphones browsing gadgets"
          className="absolute bottom-[180] left-1/2 z-20 h-[clamp(70px,74vw,730px)] -translate-x-1/2 object-contain"
        />
      </div>

      {/* Product card 1 - watch */}
      <div className="absolute left-[clamp(4px,2vw,20px)] top-[46%] z-20 flex h-[clamp(50px,10vw,90px)] w-[clamp(50px,10vw,90px)] items-center justify-center rounded-[clamp(10px,2vw,20px)] border border-white/25 bg-white/15 shadow-[0_8px_32px_rgba(80,88,200,0.15)] backdrop-blur-2xl">
        <img
          src="src/assets/images/watch.png"
          alt="Watch"
          className="h-[clamp(30px,6vw,60px)] w-[clamp(30px,6vw,60px)] object-contain"
        />
      </div>

      {/* Product card 2 - headphones */}
      <div className="absolute right-[clamp(4px,2vw,20px)] top-[12%] z-20 flex h-[clamp(50px,10vw,90px)] w-[clamp(50px,10vw,90px)] items-center justify-center rounded-[clamp(10px,2vw,20px)] border border-white/25 bg-white/15 shadow-[0_8px_32px_rgba(80,88,200,0.15)] backdrop-blur-2xl">
        <img
          src="src/assets/images/headphones.png"
          alt="Headphones"
          className="h-[clamp(30px,6vw,60px)] w-[clamp(30px,6vw,60px)] object-contain"
        />
      </div>
    </div>
  );
};

export default HeroImage;