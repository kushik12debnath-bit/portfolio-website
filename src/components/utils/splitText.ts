import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  try {
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (window.innerWidth < 900) return;

    const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
    const ToggleAction = "play pause resume reverse";

    document.querySelectorAll(".para").forEach((para) => {
      const el = para as ParaElement;
      if (el.anim) {
        el.anim.progress(1).kill();
      }

      const words = (el.textContent || "").split(/\s+/).filter(Boolean);
      el.innerHTML = "";
      const wordSpans: HTMLSpanElement[] = [];
      words.forEach((word, i) => {
        if (i > 0) el.appendChild(document.createTextNode(" "));
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        wordSpans.push(span);
        el.appendChild(span);
      });

      el.anim = gsap.fromTo(
        wordSpans,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: el.parentElement?.parentElement,
            toggleActions: ToggleAction,
            start: TriggerStart,
          },
          duration: 1,
          ease: "power3.out",
          y: 0,
          stagger: 0.02,
        }
      );
    });

    document.querySelectorAll(".title").forEach((title) => {
      const el = title as ParaElement;
      if (el.anim) {
        el.anim.progress(1).kill();
      }

      const chars = (el.textContent || "").split("");
      el.innerHTML = "";
      const charSpans: HTMLSpanElement[] = [];
      chars.forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.display = "inline-block";
        charSpans.push(span);
        el.appendChild(span);
      });

      el.anim = gsap.fromTo(
        charSpans,
        { autoAlpha: 0, y: 80, rotate: 10 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: el.parentElement?.parentElement,
            toggleActions: ToggleAction,
            start: TriggerStart,
          },
          duration: 0.8,
          ease: "power2.inOut",
          y: 0,
          rotate: 0,
          stagger: 0.03,
        }
      );
    });

    ScrollTrigger.addEventListener("refresh", () => setSplitText());
  } catch (err) {
    console.error("setSplitText error:", err);
  }
}
