import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";
import {
  createSmoothScroll,
  scrollToTop,
  pauseSmoothScroll,
  scrollToSection,
  destroySmoothScroll,
} from "./utils/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    createSmoothScroll();
    scrollToTop(true);
    pauseSmoothScroll();

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) scrollToSection(section);
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Kaushik Debnath
        </a>
        <a
          href="mailto:kushik12debnath@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          kushik12debnath@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
