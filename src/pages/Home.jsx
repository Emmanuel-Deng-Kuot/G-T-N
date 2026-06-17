import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";
import PlatformBadges from "../components/PlatformBadges";
import BestProduct from "../components/BestProduct";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import useAnimations from "../hooks/useAnimations";

const Home = () => {
 const containerRef = useAnimations();

  return (
    <div
  ref={containerRef}
  className="min-h-screen bg-white font-sans overflow-x-hidden"
>
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <Navbar />

      {/* Hero */}
      <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">

        {/* Decorative circles — desktop only */}
        <div className="hidden lg:block absolute right-[20%] top-1/2 -translate-y-1/2 w-130 h-130 rounded-full border border-slate-100 opacity-60 pointer-events-none" />
        <div className="hidden lg:block absolute right-[22%] top-1/2 -translate-y-1/2 w-105 h-105 rounded-full border border-slate-100 opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-10 lg:py-12">

          {/* Mobile: stack vertically — Desktop: side by side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-10">

            {/* Left: Text */}
           <div className="flex flex-col gap-5 lg:gap-6 text-center lg:text-left items-center lg:items-start w-full">
              <h1 className="fade-left text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
                Find Your <span className="text-indigo-700">Gadget</span>
                <br className="hidden sm:block" />
                {" "}with worthy price in the market
              </h1>

              <p className="fade-left text-sm sm:text-base lg:text-xl text-slate-400 leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg">
                Technology continues to shape the way we live, work, and communicate.
                From innovative gadgets to smart digital solutions, modern technology offers endless
                possibilities for improving productivity and enhancing everyday experiences.
              </p>

              <div className="zoom-in">
                <button className="group flex items-center gap-3 bg-indigo-900 hover:bg-indigo-800 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/30 hover:-translate-y-px">
                  Our Product
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="fade-up">
                <PlatformBadges />
              </div>
            </div>

            {/* Right: Hero image */}
        <div className="fade-right flex justify-center lg:justify-end items-center w-full">
          <HeroImage />
        </div>

          </div>
        </div>
      </section>

      <div className="fade-up">
        <BestProduct />
      </div>
      <div className="fade-up">
        <ProductGrid variant="home" />
      </div>
      <div className="fade-up">
        <Footer />
      </div>
    </div>
  );
};

export default Home;