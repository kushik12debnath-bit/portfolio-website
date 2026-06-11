import gsap from "gsap";
import { resumeSmoothScroll } from "./smoothScroll";

export function initialFX() {
  try {
    document.body.style.overflowY = "auto";
    resumeSmoothScroll();
    const mainEl = document.getElementsByTagName("main")[0];
    if (mainEl) mainEl.classList.add("main-active");

    gsap.to("body", {
      backgroundColor: "#0b080c",
      duration: 0.5,
      delay: 1,
    });

    const landingLines = document.querySelectorAll(
      ".landing-info h3, .landing-intro h2, .landing-intro h1, .landing-h2-info"
    );
    landingLines.forEach((line) => {
      const chars = line.textContent || "";
      line.innerHTML = "";
      for (const ch of chars) {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(80px)";
        span.style.filter = "blur(5px)";
        line.appendChild(span);
      }
      gsap.to(line.children, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.025,
        delay: 0.3,
      });
    });

    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );

    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.1,
      }
    );

    const swapPairs: [string, string][] = [
      [".landing-h2-info", ".landing-h2-info-1"],
      [".landing-h2-1", ".landing-h2-2"],
    ];
    swapPairs.forEach(([sel1, sel2]) => {
      const el1 = document.querySelector(sel1);
      const el2 = document.querySelector(sel2);
      if (el1 && el2) {
        loopText(el1 as HTMLElement, el2 as HTMLElement);
      }
    });
  } catch (err) {
    console.error("initialFX error:", err);
  }
}

function loopText(el1: HTMLElement, el2: HTMLElement) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const d = 4;

  tl.fromTo(
    el2.children,
    { opacity: 0, y: 80 },
    { opacity: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: d },
    0
  )
    .fromTo(
      el1.children,
      { y: 80 },
      { duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: d * 2 + 1 },
      1
    )
    .fromTo(
      el1.children,
      { y: 0 },
      { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: d },
      0
    )
    .to(
      el2.children,
      { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: d * 2 + 1 },
      1
    );
}
