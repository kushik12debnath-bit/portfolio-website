import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

export function createSmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  lenisInstance = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(window, {
    scrollTop(value) {
      if (arguments.length && lenisInstance) {
        lenisInstance.scrollTo(value, { immediate: true });
      }
      return lenisInstance ? lenisInstance.scroll : 0;
    },
    scrollLeft() {
      return 0;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  ScrollTrigger.addEventListener("refresh", () => {
    lenisInstance?.raf(performance.now());
  });

  return lenisInstance;
}

export function getSmoothScroll() {
  return lenisInstance;
}

export function scrollToTop(immediate = true) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  }
}

export function pauseSmoothScroll() {
  if (lenisInstance) lenisInstance.stop();
}

export function resumeSmoothScroll() {
  if (lenisInstance) lenisInstance.start();
}

export function scrollToSection(target: string) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target);
  }
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
