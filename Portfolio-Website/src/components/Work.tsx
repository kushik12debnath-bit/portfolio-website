import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, 
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          
          {/* --- PROJECT 01 --- */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>Water Quality Analyzer</h4>
                  <p>IoT & Embedded Systems</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Embedded Sensors, Cloud Connectivity</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Water Quality Analyzer" />
          </div>

          {/* --- PROJECT 02 --- */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Smart Weighing Balance</h4>
                  <p>IoT & Embedded Systems</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>IoT Integration, Remote Data Logging</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Smart Weighing Balance" />
          </div>

          {/* --- PROJECT 03 --- */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>Edge Data Extraction</h4>
                  <p>Industrial Digitization</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Edge Gateways, SCADA, Cloud Platforms</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Edge Data Extraction" />
          </div>

          {/* --- PROJECT 04 --- */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>Food Delivery App</h4>
                  <p>UI/UX & Mobile Design</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Prototyping, User Research, Usability Testing</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Food Delivery App" />
          </div>

          {/* --- PROJECT 05 --- */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>Hotel Management System</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Web Platform, Operations Management</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Hotel Management System" />
          </div>

          {/* --- PROJECT 06 --- */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>06</h3>
                <div>
                  <h4>Automated Wire Processing</h4>
                  <p>Hardware Engineering</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Yokogawa, KOMAX, Wire Harness Assembly</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Automated Wire Processing" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Work;