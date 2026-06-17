import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollDefaults = {
  start: "top 90%",
  toggleActions: "play none none none",
  once: true,
};

const useAnimations = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    const ctx = gsap.context(() => {

      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            ...scrollDefaults,
          },
        });
      });

      gsap.utils.toArray(".fade-left").forEach((el) => {
        gsap.from(el, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            ...scrollDefaults,
          },
        });
      });

      gsap.utils.toArray(".fade-right").forEach((el) => {
        gsap.from(el, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            ...scrollDefaults,
          },
        });
      });

      gsap.utils.toArray(".zoom-in").forEach((el) => {
        gsap.from(el, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            ...scrollDefaults,
          },
        });
      });

      gsap.utils.toArray(".product-card").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            ...scrollDefaults,
          },
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return containerRef;
};

export default useAnimations;
